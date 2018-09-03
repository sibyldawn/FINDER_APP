-- select auth0_id from users
-- where industry_code = $1 and isrecruiter = $2;

select u.*, c.* from users u 
left outer join connections c
on u.auth0_id = c.$4
where applicant_id is null and industry_code = $1 and isrecruiter = $2;