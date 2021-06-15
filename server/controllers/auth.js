const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

//Models
const UserModel = require("../models/user");

module.exports = {
  userNameValidation: async (req, res) => {
    try {
      const data = await UserModel.findOne({ userName: req.body.userName });
      res.status(200).json(data);
    } catch (error) {
      res
        .status(400)
        .json("Something went wrong on validation user name, Please try again");
    }
  },
  mailValidation: async (req, res) => {
    try {
      const data = await UserModel.findOne({ mail: req.body.mail });
      res.status(200).json(data);
    } catch (error) {
      res
        .status(400)
        .json("Something went wrong on validating mail ID, Please try again");
    }
  },
  signup: (req, res) => {
    bcrypt.genSalt(10, req.body.data.password, (saltErr, salt) => {
      if (saltErr) {
        throw new Error("Something went wrong");
      } else {
        bcrypt.hash(req.body.data.password, salt, (hashErr, hash) => {
          if (hashErr) {
            console.log(hashErr);
            throw new Error("Something went wrong");
          } else {
            const user = new UserModel({
              userName: req.body.data.userName,
              sureName: req.body.data.sureName,
              mail: req.body.data.mail,
              password: hash,
              avatar: "",
            });

            user
              .save()
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(400)
                  .json(
                    "Something went wrong on creating account, Please try again"
                  );
              });
          }
        });
      }
    });
  },
  signin: async (req, res) => {
    UserModel.findOne({ mail: req.body.data.mail })
      .then((MongoResult) => {
        bcrypt.compare(
          req.body.data.password,
          MongoResult.password,
          function (err, result) {
            if (result === false) {
              res.status(404).json("Mail id wrong");
            } else {
              res.status(200).json({ uid: MongoResult._id });
            }
          }
        );
      })
      .catch((err) =>
        res.status(404).json("Something went wrong, Please try again")
      );
  },
  googleAuth: async (req, res) => {
    const { email, familyName, givenName, name, photoUrl } = req.body.data;
    UserModel.findOne({ mail: email })
      .then((MongoResult) => {
        if (!MongoResult) {
          const user = new UserModel({
            userName: name.replace("/ /g", ""),
            sureName: `${givenName} ${familyName}`,
            mail: email,
            password: "$ngr@dev15_shadow@15_csrIsADev",
            avatar: photoUrl,
          });

          user
            .save()
            .then((data) => {
              console.log(data);
              res.status(200).json({ uid: data._id });
            })
            .catch((err) => {
              res
                .status(400)
                .json(
                  "Something went wrong on creating account, Please try again"
                );
            });
        } else {
          res.status(200).json({ uid: MongoResult._id });
        }
      })
      .catch((err) =>
        res.status(404).json("Something went wrong, Please try again")
      );
  },
};
