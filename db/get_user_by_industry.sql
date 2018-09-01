select auth0_id from users
where industry_code = $1 and isrecruiter = $2;