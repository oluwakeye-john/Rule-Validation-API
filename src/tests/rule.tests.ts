import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import app from "..";
import { RESPONSE_STATUS, STATUS_CODE } from "../@types/general";
import { invalid, valid } from "./mock";

chai.use(chaiHTTP);

describe("Rule controller API", () => {
  describe("GET /", () => {
    it("should return an object", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(STATUS_CODE.SUCCESS);
          expect(res).to.be.an("object");
          expect(res.body.status).to.be.equal(RESPONSE_STATUS.SUCCESS);
          expect(res.body.message).to.be.a("string");
          expect(res.body.data).to.be.an("object");
          done();
        });
    });
  });

  describe("rule validation", () => {
    it("should validate", (done) => {
      invalid.map((item) => {
        chai
          .request(app)
          .post("/validate-rule")
          .send(item)
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(STATUS_CODE.BAD_REQUEST);
            expect(res.body).to.be.an("object");
            expect(res.body.status).to.be.equal(RESPONSE_STATUS.ERROR);
            expect(res.body.message).to.be.a("string");
            expect(res.body.data).to.be.a("null");
          });
      });

      valid.map((item) => {
        chai
          .request(app)
          .post("/validate-rule")
          .send(item)
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(STATUS_CODE.SUCCESS);
            expect(res.body).to.be.an("object");
            expect(res.body.status).to.be.equal(RESPONSE_STATUS.SUCCESS);
            expect(res.body.message).to.be.a("string");
            expect(res.body.data).to.be.an("object");
          });
      });

      done();
    });
  });
});
