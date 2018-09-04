select * from chat_rooms cr
join connections c on cr.connection_id = c.id
where room_id = $1;