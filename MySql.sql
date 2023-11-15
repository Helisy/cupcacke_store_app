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
description text,
category_id int,
dough int not null,
filling int not null,
cover int not null,
decoration int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

select * from cupcakes;

select * from cupcakes where category_id = 1; 

insert into cupcakes(name, cover_image, description, dough, filling, cover, decoration) 
values("Cupcake Doce De Leite", "/public/images/flavors/cupcake.png", "Cupcake recheado com doce de leite, coberto de chantilly com estrelinhas rochas", 3, 4, 5, 6);

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

create table orders(
id int not null auto_increment,
delivery_date TIMESTAMP,
client_id int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key(client_id) references users(id),
primary key(id) 
);

select * from orders;
insert into orders(delivery_date, client_id) values();

create table orders_items(
id int not null auto_increment,
order_id int not null,
cupcake_id int not null,
quantity int not null,
unity_price real not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key(cupcake_id) references cupcakes(id),
primary key(id) 
);

select * from orders_items;

insert into orders_items(order_id, cupcake_id, quantity, unity_price) values();

create table coupons(
id int not null auto_increment,
name varchar(255) not null,
description varchar(255) not null,
discount real not null,
is_percentage boolean not null,
minimum_value real not null,
expires_in datetime not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

select * from coupons where id = 1;
insert into coupons(name, description, discount, is_percentage, minimum_value, expires_in) values ("BEMVINDO5", "5% de desconto em todos os cupcakes após uma compra acima de R$ 100,00.", 5, true, 5,"2030-12-30 12:00:00");



create table categories(
id int not null auto_increment,
name varchar(255) not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(id) 
);

select * from categories;

insert into categories(name) values('?');

create table reviews(
id int not null auto_increment,
review varchar(255) not null,
cupcake_id int not null,
user_id int not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key(cupcake_id) references cupcakes(id),
foreign key(user_id) references users(id),
primary key(id) 
);

insert into reviews(review, cupcake_id, user_id) values('Mds foi a melhor coisa que ja comi na vida, comprem! super recomendo!', 5, 1);

select reviews.*, users.first_name from reviews join users on users.id = user_id where cupcake_id = 5;

select id from reviews where cupcake_id = 5 and user_id = 1;


select orders_items.* from orders_items join orders on order_id = orders.id where cupcake_id = 8 and client_id = 1;









select cupcakes.*,
sum(a.selling_price + b.selling_price + c.selling_price) as selling_price
from cupcakes
join ingredients a on cupcakes.dough = a.id
join ingredients b on cupcakes.filling = b.id
join ingredients c on cupcakes.cover = c.id
join ingredients d on cupcakes.decoration = d.id
where cupcakes.id = 1
group by id;

create fulltext index cupcake_search on cupcakes(name);
create fulltext index ingredient_seacrh on ingredients(name, ingredients);
# ALTER TABLE answers ADD FULLTEXT(category);
SELECT * FROM answers WHERE MATCH (title, body, category) AGAINST ('abri lata de milho' IN NATURAL LANGUAGE MODE);

#correct querry
select cupcakes.*, a.name as dough_name, b.name as filling_name, c.name as cover_name, d.name as decoration_name
from cupcakes
join ingredients as a on cupcakes.dough = a.id
join ingredients as b on cupcakes.filling = b.id
join ingredients as c on cupcakes.cover = c.id
join ingredients as d on cupcakes.decoration = d.id
WHERE 
MATCH (cupcakes.name) AGAINST ('essência de baunilha' IN NATURAL LANGUAGE MODE) or
MATCH (a.name, a.ingredients) AGAINST ('essência de baunilha' IN NATURAL LANGUAGE MODE) or
MATCH (b.name, b.ingredients) AGAINST ('essência de baunilha' IN NATURAL LANGUAGE MODE) or
MATCH (c.name, c.ingredients) AGAINST ('essência de baunilha' IN NATURAL LANGUAGE MODE) or
MATCH (d.name, d.ingredients) AGAINST ('essência de baunilha' IN NATURAL LANGUAGE MODE);
#correct querry


select * FROM ingredients where match (name, ingredients) AGAINST ('soja' IN NATURAL LANGUAGE MODE);

select * from 
(
	select cupcakes.* from cupcakes where MATCH (cupcakes.name) AGAINST ('soja' IN NATURAL LANGUAGE MODE) as dog
    inner join ingredients as a on cupcakes.dough = a.id
) as e;


select cupcakes.* from cupcakes MATCH (cupcakes.name) AGAINST ('soja' IN NATURAL LANGUAGE MODE) dog;

SELECT
course_id, course_code, course_name, course_descript, course_detail,
MATCH (course_name, course_descript, course_detail)
AGAINST ('$string')
AS score;

select * from
(
select cupcakes.*, MATCH (name) AGAINST ('leite' IN NATURAL LANGUAGE MODE) as score 
from cupcakes
where MATCH (name) AGAINST ('leite' IN NATURAL LANGUAGE MODE) 
) as e
join ingredients as c on e.cover = c.id;









