update users
set active = ${active}, attachment = ${attachment}, bio = ${bio}, current_zipcode = ${current_zipcode}, education_background = ${education_background}, email = ${email}, first_name = ${first_name}, last_name = ${last_name}, industry_code = ${industry_code}, looking_for = ${looking_for}, current_job = ${current_job}, picture = ${picture}, preferred_location = ${preferred_location}, work_history = ${work_history}
where auth0_id = ${auth0_id};
select * from users
where auth0_id = ${auth0_id};