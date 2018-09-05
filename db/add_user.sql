insert into users (auth0_id, first_name, last_name, picture, email, active)
values (${auth0_id}, ${first_name}, ${last_name}, ${picture}, ${email}, 'true');

select * from users where auth0_id = ${auth0_id};