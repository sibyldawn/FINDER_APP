const express = require('express');
const Chatkit = require('@pusher/chatkit-server');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
require('dotenv').config();
const axios = require('axios');
const controller = require('./controller');
const cloudinary = require('cloudinary')


const app = express();
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );

// do not forget to comment this app.use out after cypress testing

// app.use((req, res, next) => {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
// });


// Redis Implementation
app.use(session({
    store: new RedisStore( {url: process.env.REDIS_URI} ),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

//CONST for CHATKIT
const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY
})

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    dbInstance = db;
}).catch(error => {
    console.log('----------- Massive Error', error);
});

// Session endpoints
app.get('/api/session/user', (req, res) => {
    req.session.user ?
    res.status(200).send(req.session.user)
    : res.status(200).send('No user logged in!')
})
app.post('/api/session/user', (req, res) => {
    req.session.destroy()
    res.status(200).send('Session destroyed')
})

// User endpoints
app.post('/api/user', controller.updateUser)
app.post('/api/user/matches', controller.createConnection)
app.get('/api/user', controller.getUser)
app.get('/api/users/filter', controller.getUsersCards)
app.get('/api/users/zipcodes',controller.getAllUsersZipCodes)
app.get('/api/users/industry_code',controller.getUserIndustryCodes)
app.put('/api/user/email', controller.updateEmail)
app.put('/api/user/toggle', controller.userToggle)
app.delete('/api/user', (req, res) => {
    const dbInstance = req.app.get('db')
    const { id } = req.query

    dbInstance.query(`delete from users where id = ${id}`)
    .then(user => {
        req.session.destroy()
        res.status(200).send('User delete success!')
    })
    .catch(error => {
        console.log('------------ deeteUser error', error)
        res.status(500).send('Delete User Error!')
    })
})

// Cloudinary endpoints
app.get('/api/upload', (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000)
    const apiSecret = process.env.CLOUDINARY_SECRET
    const signature = cloudinary.utils.api_sign_request({ timestamp }, apiSecret)
    const payload = {
        signature,
        timestamp
    }
    res.json(payload)
})

//ChatKit endpoints
app.get('/api/rooms/:roomId',controller.getRoom)
app.get('/api/rooms/users',controller.getChatRoomUsers)
app.post('/api/rooms',controller.createRoom)
app.post('/api/users', (req,res) => {
    const { auth0_id,username,picture } = req.body
    console.log("hit username", username);
    
    chatkit.createUser({
      name: username,
      id: auth0_id,
      avatarURL: picture
    })
    .then( newUser => {
      console.log("chatkit response", newUser);
      res.status(200).json(newUser)})
      .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
          res.sendStatus(201)
        } else {
          res.status(error.status).json(error)
        }
    }) 
  })


  
app.get('/api/getusers', (req,res) => {
    chatkit.getUsers()
    .then( users => {
      res.status(200).send(users)
    })
    .catch( err => console.log("Error gettings users",err))
  })
  
  app.post('/api/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
  }) 

  app.get('/api/users/:userId',(req,res)=> {
    const {userId} = req.params;
    console.log("userId to get", userId);
    chatkit.apiRequest({
      method: 'GET',
      path:`/users/${userId}`,
      jwt: chatkit.generateAccessToken({ su: true }).token
    }).then((user) => {
        res.status(200).send(user);
      }).catch((err) => {
        res.status(500).send(err);
      });
  })
  

// Auth0 implementation
app.get('/auth/callback', (req, res) => {
    // The payload you will be providing to Auth0 for a token
    console.log('------------ Auth0 initialized')
    console.log(req.query)
    const { prevPath }= req.query
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `https://${req.headers.host}/auth/callback`
    }
    // Trading a token for an access code at Auth0
    function tradeCodeForAccessToken() {
        console.log('------------ tradeCodeForAccessToken')
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }
    // Trading a token for user info at Auth0
    function exchangeAccessTokenForUserInfo(response) {
        console.log('------------ exchangeAccessTokenForUserInfo')
        const accessToken = response.data.access_token
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
    }
    // This function will take the returned user info, determine whether a user is logged in, and store their info in the database if they are new.
    function storeUserInfoInDatabase (response) {
        // console.log('------------ Auth0 response', response)
        const auth0Id = response.data.sub // .sub is short for 'subject' on Auth0
        const db = req.app.get('db')
        return db.get_single_user(auth0Id).then(users => {
            if (users.length) {
                const user = users[0]
                req.session.user = user // Using sessions with Auth0
                res.redirect(prevPath)
                console.log('------------ users', users)
                console.log('------------ req.session.user', req.session.user)
            } else {
                const {given_name, family_name, picture, email} = response.data
                const createUserData = {
                    auth0_id: auth0Id,
                    first_name: given_name,
                    last_name: family_name,
                    picture: picture,
                    email: email
                }
                return db.add_user(createUserData).then(newUsers => {
                    const user = newUsers[0]
                    console.log('------------ newUsers', newUsers)
                    controller.sendEmail(user, 'welcome') // Sending welcome email with nodemailer
                    chatkit.createUser({ // Creating a new user on chatkit
                        name: `${user.first_name} ${user.last_name}`,
                        id: user.auth0_id,
                        avatarURL: user.picture
                    }).then( newUser => {
                        console.log("chatkit response", newUser);
                        res.status(200).json(newUser)})
                    .catch(error => {
                        if (error.error === 'services/chatkit/user_already_exists') {
                            res.sendStatus(201)
                        } else {
                            res.status(error.status).json(error)
                        }
                    })
                    req.session.user = user // Here is session again
                    res.redirect('/profile')
                    }).catch(error => console.log('------------ Add user error', error))
            }
        }).catch(error => console.log('------------ Get user error', error))
    }
    //Here is where all the above functions are chained together.
    tradeCodeForAccessToken()
    .then(exchangeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(error => {
        console.log('---------- Auth0 error', error)
        res.status(500).json({message: "Auth0 error in server!"})
    })
})


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})



const PORT =  4000;
app.listen(PORT, () => console.log(`Server Is Listening on port ${PORT} 👏`));