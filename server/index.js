const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
require('dotenv').config();
const axios = require('axios');
const controller = require('./controller');
// const SocketManager = require('./SocketManager')
const cloudinary = require('cloudinary')


app.use(bodyParser.json());

// Redis Implementation
app.use(session({
    store: new RedisStore( {url: process.env.REDIS_URI} ),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

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
        redirect_uri: `http://${req.headers.host}/auth/callback`
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
                controller.sendEmail(user, 'welcome') // Sending welcome email with nodemailer
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
                return db.add_applicant(createUserData).then(newUsers => {
                    const user = newUsers[0]
                    console.log('------------ newUsers', newUsers)
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


//Socket.io Implementation
io.on('connection', (socket)=> {

    socket.on("sibyl", (message) => {
        console.log(message)
        io.emit("message", message)
    })
    
})


const PORT =  4000;
server.listen(PORT, () => console.log(`Server Is Listening on port ${PORT} 👏`));