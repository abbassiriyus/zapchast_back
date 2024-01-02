create table look_me(
 "id" serial primary key,
 "cinema_id" integer not null,
 "user_id" integer not null,
 unique(cinema_id, user_id),
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);






ALTER SEQUENCE image_cinema_id_seq OWNED BY image_cinema.id;
GRANT USAGE, SELECT ON SEQUENCE image_cinema_id_seq TO uzdubuz_id_rsa;