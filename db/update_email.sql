update users
set email = ${email}
where id = ${id};

select * from users
where id = ${id};