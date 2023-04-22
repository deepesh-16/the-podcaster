//router
const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
//bcryptjs for password hashing
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

// require("dotenv").config();

// extract body of request
userApp.use(exp.json());

userApp.get("/getusers", expressAsyncHandler(async (request, response) =>{
        let userCollectionObject = request.app.get("userCollectionObject");
        //get all users
        let users=await userCollectionObject.find().toArray();
        //send res
        response.send ({ message: "Users list", payload: users });
        })
);

userApp.post("/login", expressAsyncHandler(async (request, response) => {
        let userCollectionObject = request.app.get("userCollectionObject");

        let userCredObj = request.body;
        // console.log(userCollectionObject)

        let userOfDB = await userCollectionObject.findOne({
            email: userCredObj.email
        });
        // console.log(userOfDB)

        if (userOfDB == null) {
            response.send({ message: "Invalid user" });
        }
        //if username existed
        else {
            let status = await bcryptjs.compare(
                userCredObj.password,
                userOfDB.password
            );
            if (status == false) {
            response.send({ message: "Invalid password" });
            }
            else {
                // console.log(userOfDB.email);
                let token = jwt.sign(
                    { email: userOfDB.email },
                    "abcd",
                    { expiresIn: 100 }
                );
                // console.log(token);
                response.send({
                    message: "success",
                    payload: token,
                    userObj: userOfDB,
                });
            }
        }
        })
    );

userApp.post("/create-user", expressAsyncHandler(async (request, response) => {
        let userCollectionObject = request.app.get("userCollectionObject");
        let newUserObj = request.body;
        let userOfDB = await userCollectionObject.findOne({
            email: newUserObj.email,
        });
        if (userOfDB !== null) {
            response.send({
            message: "Email already exists!",
            });
        }
        //if user does not exist,
        else {
            //hash password
            let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
            newUserObj.password = hashedPassword;
            await userCollectionObject.insertOne(newUserObj);
            response.send({ message: "New User created" });
        }
    })
);

module.exports = userApp;