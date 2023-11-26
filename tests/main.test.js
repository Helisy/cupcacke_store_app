const request = require('supertest');
const app = require('../index.js');

const header_admin = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJHYWJyaWVsYSBFbGlzZSIsImxhc3ROYW1lIjoiRGlhcyBEYSBTaWx2YSIsInVzZXJJZCI6MSwicm9sZSI6ImFkbWluIiwidmVyaWZpZWQiOjAsImlhdCI6MTcwMDk0Mjg0MX0.Z1lB4z6jLCZw8MYjUj2DFK-5tALXNbuM9MTid_G1o8Y"};
const header_basic = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJUZXN0ZSBUZXN0ZSIsImxhc3ROYW1lIjoiVGVzdGUgVGVzdGUiLCJ1c2VySWQiOjIsInJvbGUiOiJiYXNpYyIsInZlcmlmaWVkIjowLCJpYXQiOjE3MDA5NDM4MjV9.lRAqUh_GqTFCiYsl46y-V3D_GJd3TLKLThN72GQqjV0"};

describe("/api/v1/auth", () => {
    describe("Register new user", () => {
        test("POST /api/v1/auth/register - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/auth/register")
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/auth/register - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/auth/register").send(
                {
                    "firstName": "Teste Teste", 
                    "lastName": "Teste Teste",
                    "email": "teste@test.com", 
                    "password": "123456789",
                    "document_id": "12345678910",
                    "address_cep": "12345678",
                    "address_number": "132"
                }
            )
            expect(res.statusCode).toBe(201);
        });
    });

    describe("Logs login", () => {
        test("POST /api/v1/auth/login - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/auth/login")
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        //change the log in info

        test("POST /api/v1/auth/login - With body - Should respond with status 200 and a accessToken cooki", async () => {
            const res = await request(app).post("/api/v1/auth/login").send(
                {
                    "email": "teste@test.com", 
                    "password": "123456789"
                }
            )
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.statusCode).toBe(200);
        });
    });
})

describe("/api/v1/category", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/category - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/category")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/category/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/category/1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });
    });

    
    describe("User is admin", () => {    
        test("POST /api/v1/category - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/category").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/category - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/category").send(
                {
                    "name": "TESTE",
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });
    });

    describe("User is not admin", () => {    
        test("POST /api/v1/category - Without body - Should respond with status 401 and send body with details and hints", async () => {
            const res = await request(app).post("/api/v1/category").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });

        test("POST /api/v1/category - With body - Should respond with status 401 and send body with details and hints", async () => {
            const res = await request(app).post("/api/v1/category").send(
                {
                    "name": "TESTE",
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });
    });
})

describe("/api/v1/coupon", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/coupon - Should respond with status 403 and send body with details and hints", async () => {
            const res = await request(app).get("/api/v1/coupon");
            expect(res.statusCode).toBe(403);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });
    });

    describe("User is admin", () => {
        test("GET /api/v1/coupon - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/coupon").set(header_admin);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/coupon/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/coupon/1").set(header_admin);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("POST /api/v1/coupon - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/coupon").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/coupon - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/coupon").send(
                {
                    "name": "TESTE01",
                    "description": "Teste Teste",
                    "discount": 1,
                    "is_percentage": false,
                    "minimum_value": 500,
                    "expires_in": "2030-12-30 12:00:00"
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });
    });

    describe("User is not admin", () => {
        test("GET /api/v1/coupon?q=BEMVINDO5 - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/coupon?q=BEMVINDO5").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/coupon - Should respond with status 401 and send body with details and hints", async () => {
            const res = await request(app).get("/api/v1/coupon").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });

        test("GET /api/v1/coupon/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/coupon/1").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("POST /api/v1/coupon - Without body - Should respond with status 401 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/coupon").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/coupon - With body - Should respond with status 401", async () => {
            const res = await request(app).post("/api/v1/coupon").send(
                {
                    "name": "TESTE01",
                    "description": "Teste Teste",
                    "discount": 1,
                    "is_percentage": false,
                    "minimum_value": 500,
                    "expires_in": "2030-12-30 12:00:00"
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });
    });
})

describe("/api/v1/cupcake", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/cupcake - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?q=$query - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?cupcake=nutella")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?category=$category_id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?category=1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?dough=$dough_id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?dough=1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?filling=$filling_id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?filling=1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?cover=$cover_id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?cover=1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake?decoration=$decoration_id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake?decoration=1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake/1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/cupcake/:id/review - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/cupcake/1/review")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });
    });

    describe("User is admin", () => {
        test("POST /api/v1/cupcake - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/cupcake").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/cupcake - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/cupcake").send(
                {
                    "name" : "Cupcake de Baunilha",
                    "cover_image": "https://www.teste.com/img_1.jpg",
                    "description": "<p>Cupcake de Baunilha</p>",
                    "category_id": 1,
                    "dough_id": 4,
                    "filling_id": 1,
                    "cover_id": 2,
                    "decoration_id": 3
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });

        test("POST /api/v1/cupcake/:id/review - Without body - Should respond with status 401 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/cupcake/1/review").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/cupcake/:id/review - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/cupcake/1/review").send(
                {
                    "review": "Cupcake muito gostoso."
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });
    });

    describe("User is not admin", () => {
        test("POST /api/v1/cupcake - Without body - Should respond with status 401 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/cupcake").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/cupcake - With body - Should respond with status 401", async () => {
            const res = await request(app).post("/api/v1/cupcake").send(
                {
                    "name" : "Cupcake de Baunilha",
                    "cover_image": "https://www.teste.com/img_1.jpg",
                    "description": "<p>Cupcake de Baunilha</p>",
                    "category_id": 1,
                    "dough_id": 4,
                    "filling_id": 1,
                    "cover_id": 2,
                    "decoration_id": 3
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/cupcake/:id/review - Without body - Should respond with status 401 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/cupcake/1/review").set(header_basic);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/cupcake/:id/review - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/cupcake/1/review").send(
                {
                    "review": "Cupcake muito gostoso."
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(201);
        });
    });
})


describe("/api/v1/ingredient", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/ingredient - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/ingredient")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        test("GET /api/v1/ingredient/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/ingredient/1")
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        });
    });

    describe("User is admin", () => {
        test("POST /api/v1/ingredient - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/ingredient").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/ingredient - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/ingredient").send(
                {
                    "type": "decoration", 
                    "name": "Raspas de Laranja", 
                    "selling_price": 0.3,
                    "cost_price": 0.1,
                    "ingredients": "Açucar, corante, Laranja",
                    "weight": 2,
                    "contains_allergens": 0,
                    "is_vegan": 1,
                    "calories": 5,
                    "nutritional_info": "Não contém alergênicos"
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });
    });

    describe("User is not admin", () => {
        test("POST /api/v1/ingredient - Without body - Should respond with status 401 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/ingredient").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/ingredient - With body - Should respond with status 400", async () => {
            const res = await request(app).post("/api/v1/ingredient").send(
                {
                    "type": "decoration", 
                    "name": "Raspas de Laranja", 
                    "selling_price": 0.3,
                    "cost_price": 0.1,
                    "ingredients": "Açucar, corante, Laranja",
                    "weight": 2,
                    "contains_allergens": 0,
                    "is_vegan": 1,
                    "calories": 5,
                    "nutritional_info": "Não contém alergênicos"
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
        });
    });
})

describe("/api/v1/orders", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/orders - Should respond with status 403 and send body with details and hints", async () => {
            const res = await request(app).get("/api/v1/orders");
            expect(res.statusCode).toBe(403);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });
    });

    
    describe("User is admin", () => {    
        test("GET /api/v1/orders - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/orders").set(header_admin);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("GET /api/v1/orders/current - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/orders/current").set(header_admin);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("GET /api/v1/orders/:id - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/orders/1").set(header_admin);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("POST /api/v1/orders - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/orders").set(header_admin);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/orders - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/orders").send(
                {
                    "delivery_date": "2023-11-06T13:40:59.283Z",
                    "items": [
                        {
                            "product_id": "1",
                            "quantity": "3"
                        }
                    ]
                }
            ).set(header_admin);
            expect(res.statusCode).toBe(201);
        });
    });

    describe("User is not admin", () => {    
        test("GET /api/v1/orders - Should respond with status 401 and send body with details and hints", async () => {
            const res = await request(app).get("/api/v1/orders").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });
        
        test("GET /api/v1/orders/current - Should respond with status 200 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/orders/current").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("GET /api/v1/orders/:id - Should respond with status 401 and send body with details and hints", async () => {
            const res = await request(app).get("/api/v1/orders/1").set(header_basic);
            expect(res.statusCode).toBe(401);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        });

        test("POST /api/v1/orders - Without body - Should respond with status 400 and send body with details array", async () => {
            const res = await request(app).post("/api/v1/orders").set(header_basic);
            expect(res.statusCode).toBe(400);
            expect(res.body.details).toBeDefined();
        });

        test("POST /api/v1/orders - With body - Should respond with status 201", async () => {
            const res = await request(app).post("/api/v1/orders").send(
                {
                    "delivery_date": "2023-11-06T13:40:59.283Z",
                    "items": [
                        {
                            "product_id": "1",
                            "quantity": "3"
                        }
                    ]
                }
            ).set(header_basic);
            expect(res.statusCode).toBe(201);
        });
    });
})

describe("/api/v1/user", () => {
    describe("User isn't authenticated", () => {
        test("GET /api/v1/user/current - Should respond with status 403 and send body with data array", async () => {
            const res = await request(app).get("/api/v1/user/current");
            expect(res.statusCode).toBe(403);
            expect(res.body.details).toBeDefined();
            expect(res.body.hints).toBeDefined();
        })
    });

    describe("User is authenticated", () => {
        test("GET /api/v1/user/current - Should respond with status 200 and send body with data object", async () => {
            const res = await request(app).get("/api/v1/user/current").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("GET /api/v1/user/current/address - Should respond with status 200 and send body with data object", async () => {
            const res = await request(app).get("/api/v1/user/current/address ").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })

        test("GET /api/v1/user/cep/:cep - Should respond with status 200 and send body with data object", async () => {
            const res = await request(app).get("/api/v1/user/cep/12310009").set(header_basic);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
        })
    });
})
