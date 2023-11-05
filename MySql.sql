create table users(
id int not null auto_increment,
first_name varchar(255) not null,
last_name varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
document_id varchar(255) not null,
address_cep varchar(255) not null,
address_number varchar(255) not null,
role varchar(255) DEFAULT 'basic',
verified boolean DEFAULT false,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) );

select * from users;

select address_cep, address_number from users where id = 1;

create table cupcakes(
id int not null auto_increment,
name varchar(255) not null,
cover_image varchar(255) not null,
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

insert into cupcakes(name, cover_image, description, dough, filling, cover, decoration) 
values("Cupcake Doce De Leite", "public/images/flavors/cupcake.png", "Cupcake recheado com doce de leite, coberto de chantilly com estrelinhas rochas", 3, 4, 5, 6);

select cupcakes.*, a.name as dough_name, b.name as filling_name, c.name as cover_name, d.name as decoration_name
from cupcakes
join ingredients a on cupcakes.dough = a.id
join ingredients b on cupcakes.filling = b.id
join ingredients c on cupcakes.cover = c.id
join ingredients d on cupcakes.decoration = d.id;

select cupcakes.*,
sum(a.selling_price + b.selling_price + c.selling_price) as selling_price
from cupcakes
join ingredients a on cupcakes.dough = a.id
join ingredients b on cupcakes.filling = b.id
join ingredients c on cupcakes.cover = c.id
join ingredients d on cupcakes.decoration = d.id
group by id;


create table ingredients(
id int not null auto_increment,
type varchar(255) not null,
name varchar(255) not null,
selling_price real not null,
cost_price real not null,
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

insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("filling", "Sem recheio", 0, 0, "", 0, 0, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("cover", "Sem cobertura", 0, 0, "", 0, 0, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("decoration", "Sem decoração", 0, 0, "", 0, 0, "");

insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("dough", "Massa Branca", 2.25, 0.78, "ovos, essência de baunilha, óleo de soja, trigo, açúcar, leite, fermento químico", 100, 150, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("filling", "Doce de Leite", 3, 1.38, "doce de leite", 50, 100, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("cover", "chantilly", 2, 0.50, "creme de leite fresco, açúcar", 15, 50, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("decoration", "Estrelinhas", 2, 0.25, "Açucar, corante", 3, 15, "");
insert into ingredients(type, name, selling_price, cost_price, ingredients, weight, calories, nutritional_info) values("cover", "Creme de Morando", 6, 3.7, "morangos, leite condensado, leite", 50, 150, "");

select * from ingredients;

create table kart(
id int not null auto_increment,
client_id int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

create table orders(
id int not null auto_increment,
delivery_date TIMESTAMP,
client_id int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

create table orders_items(
id int not null auto_increment,
order_id int not null,
cupcake_id int not null,
quantity int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key(cupcake_id) references cupcakes(id),
primary key(id) 
);






