/* eslint-disable no-undef */
const bcrypt =  require('bcryptjs');
const jwt = require("jsonwebtoken");

const { login } = require("../controllers/users");
const { User } = require('../models');

describe("User login", () => {
  let req = {};
  let res = {};
  it("Login func should return code status 200", async () => {
    req = {
      body: {
        email: "dima@mail.com",
        password: "123456",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data)
    };
    const user = {
      _id: "123456",
      email: req.body.email,
      password: req.body.password,
      subscription: 'starter'
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => true);
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => 'token');
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => user);

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });
});
