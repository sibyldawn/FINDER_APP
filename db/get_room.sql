select * from chat_rooms cr
join connections c on cr.connection_id = c.id
where connection_id = $1;