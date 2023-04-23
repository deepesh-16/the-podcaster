//router
const exp = require("express");
const podApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");

podApp.use(exp.json());

// userApp.post("/create-podcast", expressAsyncHandler(async (request, response) => {
//     let userCollectionObject = request.app.get("userCollectionObject");
//     let newUserObj = request.body;
//     let userOfDB = await userCollectionObject.findOne({
//         email: newUserObj.email,
//     });
//     if (userOfDB !== null) {
//         response.send({
//         message: "Email already exists!",
//         });
//     }
//     //if user does not exist,
//     else {
//         //hash password
//         let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
//         newUserObj.password = hashedPassword;
//         await userCollectionObject.insertOne(newUserObj);
//         response.send({ message: "New User created" });
//     }
// })
// );
module.exports = podApp;