create table users(
id int not null auto_increment,
first_name varchar(255) not null,
last_name varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
role varchar(255) DEFAULT 'basic',
verified boolean DEFAULT false,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) );

select * from users;

create table cupcakes(
id int not null auto_increment,
name varchar(255) not null,
description varchar(255),
dough int not null,
filling int not null,
cover int not null,
decoration int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

select * from cupcakes;

insert into cupcakes(name, description, dough, filling, cover, decoration) 
values("Cupcake Doce De Leite", "Cupcake recheado com doce de leite, coberto de chantilly com estrelinhas rochas", 3, 4, 5, 6);

select cupcakes.*, a.name as dough_name, b.name as filling_name, c.name as cover_name, d.name as decoration_name from cupcakes
join ingredients a on cupcakes.dough = a.id
join ingredients b on cupcakes.filling = b.id
join ingredients c on cupcakes.cover = c.id
join ingredients d on cupcakes.decoration = d.id;

create table ingredients(
id int not null auto_increment,
type varchar(255) not null,
name varchar(255) not null,
ingredients varchar(255) not null,
contains_allergens boolean not null default true,
is_vegan boolean not null default false,
weight real not null,
calories real not null,
nutritional_info varchar(255) not null,
theme varchar(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("filling", "Sem recheio", "", 0, 0, "");
insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("cover", "Sem cobertura", "", 0, 0, "");
insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("decoration", "Sem decoração", "", 0, 0, "");

insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("dough", "Massa Branca", "ovos, essência de baunilha, óleo de soja, trigo, açúcar, leite, fermento químico", 100, 150, "");
insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("filling", "Doce de Leite", "dcoe de leite", 50, 100, "");
insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("cover", "chantilly", "creme de leite fresco, açúcar", 15, 50, "");
insert into ingredients(type, name, ingredients, weight, calories, nutritional_info) values("decoration", "Estrelinhas", "Açucar, corante", 3, 15, "");

select * from ingredients;


