module.exports = {
    updateUser(req, res) {
        const dbInstance = req.app.get('db')
        const { auth0_id, active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history } = req.body

        dbInstance.update_applicant({
            auth0_id,
            active, 
            attachment, 
            bio, 
            current_zipcode, 
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
        }).then(user => res.status(200).send(user))
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
        const { industry } = req.query
        console.log('------------ industry', req.query)

        dbInstance.get_user_by_industry([industry])
        .then(users => res.status(200).send(users))
        .catch(error => {
            res.status(500).send('Error retrieving Users!')
            console.log('------------ getUsersByIndustry error', error)
        })
    }
}