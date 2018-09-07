const nodemailer = require('nodemailer')
require('dotenv').config()

var self = module.exports = {
    // This function updates a user's information from the values entered on the Profile component. It also removes connections made to allow for new matching.
    updateUser(req, res) {
        const dbInstance = req.app.get('db')
        const { auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history } = req.body
        console.log('------------ isrecruiter', isrecruiter)

        dbInstance.update_user({
            auth0_id,
            active, 
            attachment, 
            bio, 
            current_zipcode,
            isrecruiter,
            education_background, 
            email, 
            first_name, 
            last_name, 
            industry_code, 
            looking_for, 
            current_job, 
            picture, 
            preferred_location, 
            work_history
        }).then(user => {
            // Using a database query to delete old connections
            dbInstance.query(`delete from connections where "${isrecruiter ? 'recruiter_id' : 'applicant_id'}" = '${auth0_id}'`)
            req.session.user = user[0]
            res.status(200).send(user)
        })
        .catch(error => {
            res.status(500).send('Error updating applicant!')
            console.log('------------ updateApplicant Error', error)
        })
    },
    
    // This function returns one user's information when provided an id
    getUser(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.get_single_user([id])
        .then(user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send('Error retrieving applicant!')
            console.log('------------ getUser error', error)
        })
    },

    // This function utilizes nodemailer to send emails configured for different events on the app
    sendEmail(user, type) {
        const {email, first_name} = user

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: `"Finder" <${process.env.EMAIL}`,
            to: String(email),
            subject: type === 'welcome' ? `Welcome to Finder!` : 'New match on Finder!',
            html: type === 'welcome' ? `<h1>${first_name}, thank you for signing up on Finder!</h1><p>Our mission is to get you in contact with potential employers - in the most simple way possible!</p>` :  `<h1>${first_name}, you have a new match on Finder!</h1><p>Log in now to start chatting!</p>`
        }

        transporter.sendMail(mailOptions, (error,info) => {
            error ?
                console.log('------------ Send mail error', error)
            :
                console.log(`Email sent: ${info.response}`)
        })
    },

    // This function gives back a list of user who don't already have a connection with the logged in user.
    getUsersCards(req, res) {
        const dbInstance = req.app.get('db')
        const { industry, recruiter} = req.query
        console.log('------------ req.query', req.query) 
        const stringToBoolean = (string) => {
            switch(string.toLowerCase().trim()) {
                case "false": case "no": case "0": case "": case 'f': return false; 
                default: return true;
            }
        }
        
        // Using massive's query method to allow variable column names
        dbInstance.query(
            `select u.*, c.* from users u 
            left outer join connections c
            on u.auth0_id = c."${stringToBoolean(recruiter) ? 'recruiter_id' : 'applicant_id'}"
<<<<<<< HEAD
            where "${stringToBoolean(recruiter) ? 'applicant_decision' : 'recruiter_decision'}" is null 
=======
            where "${stringToBoolean(recruiter) ? 'applicant_id' : 'recruiter_id'}" is null 
>>>>>>> 7050674d542a8eda9a187af06c3317d51c534ef5
            and industry_code = '${industry}' 
            and isrecruiter = '${recruiter}'
            and active = 'true';`)
        .then(users => { console.log('------------ users', users); res.status(200).send(users)})
        .catch(error => {
            res.status(500).send('Error retrieving Users!')
            console.log('------------ getUsersCards error', error)
        })
    },

    // This function will return a list of users that are all in the industry provided to it.
    getUserIndustryCodes(req, res) {
        const dbInstance = req.app.get('db')
        const { industry_code } = req.query

        dbInstance.get_industry_code([industry_code])
        .then(users => res.status(200).send(users))
        .catch(error => {
            res.status(500).send('Error retrieveing industrycode!')
            console.log('------------getUserIndustryCodes', error)
        })
    },
    
    // This function returns a list of users based on their recruiter status
    getAllUsersZipCodes(req, res) {
        const dbInstance = req.app.get('db')
        const { isRecruiter } = req.query

        dbInstance.get_user_by_zipcode([isRecruiter])
        .then(users => res.status(200).send(users))
        .catch(error => {
            res.status(500).send('Error retrieveing Zipcodes!')
            console.log('------------getAllUsersZipCodes', error)
        })
    },

    // This function is responsible for checking if a connection already exists, then updating it if it does or creating it if it doesn't. It aslo uses the sendEmail function from above to send a notification email to each user.
    createConnection(req, res) {
        const dbInstance = req.app.get('db')
        const { direction, userId, cardId, isRecruiter, email, first_name } = req.body
        const userInfo = {email, first_name}
        let liked

        direction === 'right' ? liked = true : liked = false

        dbInstance.check_connections({
            recruiterId: isRecruiter ? userId : cardId,
            applicantId: isRecruiter ? cardId : userId
        }).then(checkedRes => {
            checkedRes[0] ?
                dbInstance.update_connection({
                    id: checkedRes[0].id,
                    recruiterDecision: isRecruiter ? liked : checkedRes[0].recruiter_decision,
                    applicantDecision: isRecruiter ? checkedRes[0].applicant_decision : liked
                }).then(updateRes => {
                    console.log('------------ updateRes', updateRes)
                    if(updateRes[0].applicant_decision && updateRes[0].recruiter_decision){
                        dbInstance.get_single_user([isRecruiter ? updateRes[0].applicant_id : updateRes[0].recruiter_id])
                            .then(getUserRes => {
                                const otherUserInfo = {email: getUserRes[0].email, first_name: getUserRes[0].first_name}
                                self.sendEmail(otherUserInfo, 'match')
                            })
                        self.sendEmail(userInfo, 'match')
                        res.status(200).send(updateRes)
                    } else {
                        res.status(200).send(false)
                    }
                }).catch(error => {
                    res.status(500).send('Error updating connections')
                    console.log('------------ createConnection (update) error', error)
                })
            :
            dbInstance.create_connection({
                recruiterId: isRecruiter ? userId : cardId,
                applicantId: isRecruiter ? cardId : userId,
                recruiterDecision: isRecruiter ? liked : null,
                applicantDecision: isRecruiter ? null : liked
            }).then(createRes => res.status(200).send(false)
            ).catch(error => {
                res.status(500).send('Error creating connections')
                console.log('------------ createConnection (create) error', error)
            })
        }).catch(error => {
            res.status(500).send('Error retrieving connections')
            console.log('------------ createConnection (check) error', error)
        })
    },
    getRoom(req,res){
        const dbInstance = req.app.get('db')
        const { roomId } = req.params;

        dbInstance.get_room([roomId]).then( res => {
            res.status(200).send(res.data)
        }).catch(err => console.log("Can't find room", err))
    },
    getChatRoomUsers(req,res){
        const dbInstance = req.app.get('db')
        const { user1,user2 } = req.query;
        dbInstance.get_chat_users_by_id([+user1,+user2]).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log("Error finding users",err))

    },
    createRoom(req,res){
        const dbInstance = req.app.get('db')
        const {connection_id,room_id,room_name} = req.body;
        dbInstance.add_chatroom([connection_id,room_id,room_name]).then( response => {
            res.status(200).send(response)
        }).catch(err => console.log("Error adding room",err));
    },

    updateEmail(req, res) {
        const dbInstance = req.app.get('db')
        const { email, id } = req.body;

        dbInstance.update_email({ email, id })
        .then(user => {
            req.session.user = user[0]
            res.status(200).send(user)
        })
        .catch(error => {
            console.log('------------ updateEmail error', error)
            res.status(500).send('Error updating email!')
        })
    },

    userToggle(req, res) {
        const dbInstance = req.app.get('db')
        const { field, value, id } = req.body;

        dbInstance.query(`update users set "${field}" = ${value} where id = ${id} returning *`)
        .then(user => {
            req.session.user = user[0]
            res.status(200).send(user)
        })
        .catch(error => {
            console.log('------------ userToggle error', error)
            res.status(500).send('Error Toggling Value!')
        })
    }
}