const {sequelize} =require("../models")
const {queryInterface} = sequelize
const req = require("supertest")
const app = require("../app")

let token;
let id;
let product;

beforeAll(done => {
    req(app)
    .post("/login")
    .send({
        email: "admin@mail.com",
        password: "Bambang123"
    })
    .then(res => {
        token = res.body.token
        done()
    })
    .catch(err => {
        console.log(err)
    })
})

beforeAll(done => {
    req(app)
    .post('/products')
    .set({ token })
    .send({
        name: "Sendal Jepit",
        image_url: "https://cdn1-production-images-kly.akamaized.net/g2xG3Kv4UVyicqdxCB-aUzkDb_E=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/895783/original/001999100_1433756065-1.jpg",
        price: 20000,
        stock: 100
    })
    .then(res => {
        id = res.body.id
        done()
    })
    .catch(err => {
        console.log(err)
    })
})

afterAll(done => {
    queryInterface.bulkDelete('Products')
    .then(() => { done() })
    .catch(err => {
        console.log(err)
    })
})


describe("Test Endpoint /products", () => {
    describe("Test Endpoint POST ", () => {
        it("Test Create Product Success", (done) => {
            req(app)
            .post("/products")
            .set({
                token
            })
            .send({
                name: "Sendal Jepit",
                image_url: "https://cdn1-production-images-kly.akamaized.net/g2xG3Kv4UVyicqdxCB-aUzkDb_E=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/895783/original/001999100_1433756065-1.jpg",
                price: 20000,
                stock: 100

            })
            .then(res => {
                const { body, status } = res
                product = body;
                // id = body.id;
                expect(status).toBe(201) // body = { name, image_url, price, stock }
                expect(body).toHaveProperty('name', expect.any(String)) /// { name: string}
                expect(body).toHaveProperty('image_url', expect.any(String)) 
                expect(body).toHaveProperty('price', expect.any(Number))
                expect(body).toHaveProperty('stock', expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })

        it("Test Create Product Fail - No Token", (done) => {
            req(app)
            .post("/products")
            .set({
                token : ""
            })
            .send({
                name: "Sendal Jepit",
                image_url: "https://cdn1-production-images-kly.akamaized.net/g2xG3Kv4UVyicqdxCB-aUzkDb_E=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/895783/original/001999100_1433756065-1.jpg",
                price: 20000,
                stock: 100

            })
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401); // body = { error }
                expect(body).toHaveProperty('error',"Authentication failed")
                // expect(body).toHaveProperty("msg", "Authentication failed");
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })

        it("Test Create Product Fail - Stock minus", (done) => {
            req(app)
            .post("/products")
            .set({
                token
            })
            .send({
                name: "Sendal Jepit",
                image_url: "https://cdn1-production-images-kly.akamaized.net/g2xG3Kv4UVyicqdxCB-aUzkDb_E=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/895783/original/001999100_1433756065-1.jpg",
                price: 20000,
                stock: -20

            })
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400); // body = { errors }
                expect(body).toHaveProperty('msg',"Please input the right Stock!")
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    describe("Test Endpoint GET ", () => {
        it("Test GET list Product Success", (done) => {
            req(app)
            .get("/products")
            .set({
                token
            })
            .then(res => {
                const { body, status } = res
                expect(status).toBe(200) // body = { name, image_url, price, stock }
                expect(body).toEqual(expect.arrayContaining([product]));
                // expect(body).toHaveProperty('name', expect.any(String)) /// { name: string}
                // expect(body).toHaveProperty('image_url', expect.any(String)) 
                // expect(body).toHaveProperty('price', expect.any(Number))
                // expect(body).toHaveProperty('stock', expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    describe("Test Endpoint PUT ", () => {
        it('Test Update Product Success', (done) => {
            req(app)
            .put(`/products/${id}`)
            .set({ token })
            .send({
                name: "Louis Vuitton Bag",
                image_url: "https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--M53151_PM2_Front%20view.jpg",
                price: 200000000,
                stock: 2
            })
            .then(res => {
                // console.log(id, "<<<<<<<<<<<<<< ID");
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('image_url', expect.any(String))
                expect(body).toHaveProperty('price', expect.any(Number))
                expect(body).toHaveProperty('stock', expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })

        it('Test Update Product Fail - Stock is not Number', (done) => {
            req(app)
            .put(`/products/${id}`)
            .set({ token })
            .send({
                name: "Louis Vuitton Bag",
                image_url: "https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--M53151_PM2_Front%20view.jpg",
                price: 200000000,
                stock: "Halo"
            })
            .then(res => {
                // console.log(id, "<<<<<<<<<<<<<< ID");
                const { body, status } = res
                expect(status).toBe(400); // body = { errors }
                expect(body).toHaveProperty('msg',"Required NUMBER!")
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    describe("Test Endpoint DELETE ", () => {
        it('Test Delete Product Success', (done) => {
            req(app)
            .delete(`/products/${id}`)
            .set({ token })
            .then(res => {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg', 'Data Success To Delete')
                done()
            })
            .catch(err => {c
                console.log(err)
            })
        })

        it('Test Delete Product - No Token', (done) => {
            req(app)
            .delete(`/products/${id}`)
            .set({ token : "" })
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401); // body = { error }
                expect(body).toHaveProperty('error',"Authentication failed")
                done()
            })
            .catch(err => {c
                console.log(err)
            })
        })
    })
})