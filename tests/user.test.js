const req = require("supertest")
// const express = require("express")
const app = require("../app")

describe("Test Endpoint POST /login", () => {
    it("Test Login Success", (done) => {
        req(app)
        .post("/login")
        .send({
            email: "admin@mail.com",
            password: "Bambang123"
        })
        .then(res => {
            const { body, status } = res
            expect(status).toBe(200);
            expect(body).toHaveProperty("token",expect.any(String));
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it("Test Login Fail - Wrong Email/Password", (done) => {
        req(app)
        .post("/login")
        .send({
            email: "admin@mail.com",
            password: "Bambang12"
        })
        .then(res => {
            const { body, status } = res
            expect(status).toBe(401);
            // expect(body).toHaveProperty("status", 401);
            expect(body).toHaveProperty("msg", "Wrong Email/Password");
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})