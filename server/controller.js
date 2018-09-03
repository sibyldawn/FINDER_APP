// let jobsSearched = []

module.exports = {
    updateUser(req, res) {
        const dbInstance = req.app.get('db')
        const { auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history } = req.body

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
            req.session.user = user[0]
            res.status(200).send(user)
        })
        .catch(error => {
            res.status(500).send('Error updating applicant!')
            console.log('------------ updateApplicant Error', error)
        })
    },
    
    getUser(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.get_single_applicant([id])
        .then(user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send('Error retrieving applicant!')
            console.log('------------ getUser error', error)
        })
    },

    getUsersByIndustry(req, res) {
        const dbInstance = req.app.get('db')
        const { industry, recruiter } = req.query
        console.log('------------ req.query', req.query)

        dbInstance.get_user_by_industry([industry, recruiter])
        .then(users => res.status(200).send(users))
        .catch(error => {
            res.status(500).send('Error retrieving Users!')
            console.log('------------ getUsersByIndustry error', error)
        
        
        })
    },
    
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

    createConnection(req, res) {
        const dbInstance = req.app.get('db')
        const { direction, userId, cardId, isRecruiter } = req.body
        let liked

        direction === 'right' ? liked = true : liked = false

        dbInstance.check_connections({
            recruiterId: isRecruiter ? userId : cardId,
            applicantId: isRecruiter ? cardId : userId
        }).then(checkedRes => {
            console.log('------------ checkedRes', checkedRes)
            checkedRes[0] ?
                dbInstance.update_connection({
                    id: checkedRes[0].id,
                    recruiterDecision: isRecruiter ? liked : checkedRes[0].recruiter_decision,
                    applicantDecision: isRecruiter ? checkedRes[0].applicant_decision : liked
                }).then(updateRes => {
                    console.log('------------ updateRes', updateRes)
                    updateRes[0].applicant_decision && updateRes[0].recruiter_decision ?
                        res.status(200).send(true)
                    :
                        res.status(200).send(false)
                }).catch(error => {
                    res.status(500).send('Error updating connections')
                    console.log('------------ createConnection error', error)
                })
            :
            dbInstance.create_connection({
                recruiterId: isRecruiter ? userId : cardId,
                applicantId: isRecruiter ? cardId : userId,
                recruiterDecision: isRecruiter ? liked : null,
                applicantDecision: isRecruiter ? null : liked
            }).then(createRes => res.status(200).send(false)).catch(error => {
                res.status(500).send('Error creating connections')
                console.log('------------ createConnection error', error)
            })
        }).catch(error => {
            res.status(500).send('Error retrieving connections')
            console.log('------------ createConnection error', error)
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
        dbInstance.add_chatroom([connection_id,room_id,room_name]).then( res => {
            res.status(200).send(res.data)
        }).catch(err => console.log("Error adding room",err));
    }

    
}