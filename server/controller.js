module.exports = {
    updateUser(req, res) {
        const dbInstance = req.app.get('db')
        const { active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, job_interest, job_title, picture, preferred_location, work_history } = req.body

        dbInstance.update_applicant({
            active, 
            attachment, 
            bio, 
            current_zipcode, 
            education_background, 
            email, 
            first_name, 
            last_name, 
            industry_code, 
            job_interest, 
            job_title, 
            picture, 
            preferred_location, 
            work_history
        }).then(user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send('Error updating applicant!')
            console.log('------------ updateApplicant Error', error)
        })
    }
}