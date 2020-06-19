const express = require("express");
const { asyncHandler } = require("../utils");
const { checkJwt } = require("../auth");
const User = require("../models/user");
const router = express.Router();
//connects mongodb
require("../config");
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({}).exec();
    res.status(200).json({ data: users });
  })
);

router.post(
  "/",
  checkJwt,
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      res.status(200).send({ userId: user.id });
    } else {
      const newUser = await User.create({ name: name, email: email }).exec();
      res.status(201).json({ data: newUser });
    }
  })
);

module.exports = router;
