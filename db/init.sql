drop table if exists applicant;
drop table if exists recruiter;
drop table if exists applicant_likes;
drop table if exists recruiter_likes;
drop table if exists message_by_applicant;
drop table if exists message_by_recruiter;

select * from applicant;
select * from recruiter;
select * from applicant_likes;
select * from recruiter_likes;
select * from message_by_applicant;
select * from message_by_recruiter;

create table applicant (
id serial primary key,
auth0_id text unique not null,
first_name text,
last_name text,
picture text,
email text,
job_title text,
industry_code integer,
job_interest text,
preferred_location text,
current_zipcode integer,
work_history text,
education_background text,
bio text,
active boolean,
attachment text
);

create table recruiter(
id serial primary key,
auth0_id text unique not null,
first_name text,
last_name text,
picture text,
email text,
job_title text,
industry_code integer,
job_listing text,
preferred_location text,
current_zipcode integer,
work_history text,
education_background text,
bio text,
active boolean
);

create table applicant_likes (
id serial primary key,
user_id integer references applicant(id) not null,
shownUserId integer references recruiter(id) not null,
liked boolean not null
);

create table recruiter_likes (
id serial primary key,
user_id integer references recruiter(id) not null,
shownUserId integer references applicant(id) not null,
liked boolean not null
);

drop table if exists message_by_recruiter

create table message_by_applicant(
id serial primary key,
date timestamp,
conversation_between text not null,
recipient integer references recruiter(id) not null,
message text,
user_id integer references applicant(id) not null
);

create table message_by_recruiter(
id serial primary key,
date timestamp,
conversation_between text not null,
recipient integer references applicant(id) not null,
message text,
user_id integer references recruiter(id) not null
);

