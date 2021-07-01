/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);


describe("Genres route", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });
  describe("GET /genres", () => {
    it("should get 200", (done) => {
      agent.get("/genres").expect(200);
      done();
    });
    it("should have an ID per genre", () =>
      agent.get("/genres").then((res) => {
        expect(res.body[0]).to.have.property("id");
      }));
    it("should have a name per genre", () =>
      agent.get("/genres").then((res) => {
        expect(res.body[0]).to.have.property("name");
      }));
    it("should get all the genres from the API", () =>
      agent.get("/genres").then((res) => {
        expect(res.body).to.have.length(19);
      }));
  });
});
