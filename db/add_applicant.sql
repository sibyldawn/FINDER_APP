insert into applicant (auth0_id, first_name, last_name, picture, email)
values (${auth0_id}, ${first_name}, ${last_name}, ${picture}, ${email});

select * from applicant where auth0_id = ${auth0_id}