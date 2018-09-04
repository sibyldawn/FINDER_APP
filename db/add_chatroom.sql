insert into chat_rooms
(connection_id,room_id,room_name)
values
($1,$2,$3)
returning *;