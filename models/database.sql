
create table users(
 "id" serial primary key,
 "superadmin" boolean default false not null,
 "name" varchar(50) default "username",
 "password" varchar(50) not null,
 "image" text,
 "email" varchar(100) not null,  
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);


create table bigcategories(
 "id" serial primary key,
 "title" varchar(200) not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);


create table categories(
 "id" serial primary key,
 "big_category_id" integer not null,
 "title" varchar(200) not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table subcategories(
 "id" serial primary key,
 "category_id" integer not null,
 "title" varchar(200) not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);


create table homiy(
 "id" serial primary key,
 "link" text not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table ishlab_chiqaruvchi(
 "id" serial primary key,
 "title" varchar(200) not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table tavfsif(
 "id" serial primary key,
 "title" varchar(100) not null,
 "image" text not null,
 "desc" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table tavfsif_product(
 "id" serial primary key,
 "tavfsif_id" integer not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);



create table product(
 "id" serial primary key,
 "title" text not null,
 "desc" text not null,
 "look_mor" integer default 0 not null,
 "kafolat" integer default 0 not null,
 "model" varchar(50) not null,
 "image" text not null,
 "davlat" varchar(50),
 "maqola" varchar(50) not null,
 "ishlab_chiqaruvchi_id" integer not null,
 "skitka" integer default 0 not null,
 "price" integer not null,
 "sotishdan_oldin" boolean default false not null,
 "free_mas" boolean default false not null,
 "subcategory_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table product_image(
 "id" serial primary key,
 "image" text not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);


create table product_xususiyat(
 "id" serial primary key,
 "title" varchar(50) not null,
 "result" text not null,
 "order" integer default 100,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table product_fayllar(
 "id" serial primary key,
 "image" text not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table product_sharx(
 "id" serial primary key,
 "name" varchar(100) not null,
 "email" varchar(200) not null,
 "pros" text not null,
 "minuslar" text not null,
 "korib_chiqish" text not null,
 "mark" integer not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table product_savol(
 "id" serial primary key,
 "email" varchar(200) not null,
 "name" varchar(200) not null,
 "savol" text not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table product_sertificat(
 "id" serial primary key,
 "image" text not null,
 "product_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table company(
 "id" serial primary key,
 "phone1" varchar(50) not null,
 "phone2" varchar(50) not null,
 "image" text not null,
 "worktime1" varchar(400) not null,
 "worktime2" varchar(400) not null,
 "address" text not null,
 "email" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
)


create table qaytaqongiroq(
 "id" serial primary key,
 "name" text not null,
 "contact" text not null,
 "bigcategory_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
)


ALTER SEQUENCE mark_id_seq OWNED BY mark.id;
GRANT USAGE, SELECT ON SEQUENCE mark_id_seq TO uzdubuz_id_rsa;