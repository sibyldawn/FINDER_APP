update applicant
set active = ${active}, attachment = ${attachment}, bio = ${bio}, current_zipcode = ${current_zipcode}, education_background = ${education_background}, email = ${email}, first_name = ${first_name}, last_name = ${last_name}, industry_code = ${industry_code}, job_interest = ${job_interest}, job_title = ${job_title}, picture = ${picture}, preferred_location = ${preferred_location}, work_history = ${work_history}
where auth0_id = ${auth0_id};
select * from users
where auth0_id = ${auth0_id};