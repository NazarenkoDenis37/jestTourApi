import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user, user2, user3 } from "../../data/user";

describe("USER SIGN UP", () => {
  describe("POSITIVE TESTS", () => {
    it.skip("create new user", async () => {
      const res = await request
        .post("/users/signup")
        .send({
          email: "den123@gmail.com",
          password: "pass1234",
          passwordConfirm: "pass1234",
          name: "Denis",
        })
        .expect(201);
      console.log(res.body);
      expect(res.body.data.user.name).toBe("Denis");
      expect(res.body.data.user.email).toBe("den123@gmail.com");
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });
    it("create new user with imported data v1", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      console.log(res.body, "===========");
      expect(res.body.data.user.name).toBe(user.name);
      expect(res.body.data.user.email).toBe(user.email);
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });
    it("create new user with imported data v2", async () => {
      const res = await request
        .post("/users/signup")
        .send(user2)
        .expect(201)
        .then((response) => {
          console.log(response.body, "+++++++++++++");
          expect(response.body.data.user.name).toBe(user2.name);
          expect(response.body.data.user.email).toBe(user2.email);
          expect(response.body.status).toBe("success");
          //expect(response.body.data.photo).toBe('default.jpg')
          //expect(response.body.data.role).toBe('user')
          //expect(response.body.data.active).toEqual(true)
        });
    });
    it("create new user with imported data v3", (done) => {
      request
        .post("/users/signup")
        .send(user3)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body, "=====-----=====");
          expect(res.body.data.user.name).toBe(user3.name);
          expect(res.body.data.user.email).toBe(user3.email);
          expect(res.body.status).toBe("success");
          //expect(res.body.data.photo).toBe('default.jpg')
          //expect(response.body.data.role).toBe('user')
          //expect(response.body.data.active).toEqual(true)
          done();
        });
    });
  });
  describe("NEGATIVE TESTS", () => {
    it('should not create user with the same email', async() => {
      await request.post("/users/signup").send(user)
      await request.post("/users/signup").send(user).then(resp=>{
        console.log(resp.body, '==============')
        expect(resp.body.message).toBe(`E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`)
      })
    })
  })
});
