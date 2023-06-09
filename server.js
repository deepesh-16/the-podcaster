const exp = require("express");
const app = exp();
const mclient=require("mongodb").MongoClient;

// require("dotenv").config()

const path = require('path');

app.use(exp.static(path.join(__dirname, "./build")));

const DBurl= "mongodb+srv://sample2022:sample2022@cluster0.6nytb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mclient.connect(DBurl)
.then((client)=>{

    let dbObj=client.db("thePodcaster");
    let userCollectionObject=dbObj.collection("usercollection");
    let favoriteCollectionObject=dbObj.collection("favoritecollection");
    let podcastCollectionObject=dbObj.collection("podcastcollection");

    app.set("userCollectionObject",userCollectionObject);
    app.set("favoriteCollectionObject",favoriteCollectionObject);
    app.set("podcastCollectionObject",podcastCollectionObject);

    console.log("DB connection success")
})
.catch(err=>console.log('Error in DB connection ',err))

const userApp = require("./APIs/userApi");
const favoriteApp = require("./APIs/favoriteAPI");
const podApp=require("./APIs/podcastAPI");

app.use("/user-api", userApp);
app.use("/favorite-api", favoriteApp);
app.use('/podcast-api',podApp);

app.use('*',(request, response) => {
    response.sendFile(path.join(__dirname,'./build/index.html'));
});


app.use((request, response, next) => {
    response.send({ message: `path ${request.url} is invalid` });
});
app.use((error, request, response, next) => {
    response.send({ message: "Error occurred", reason: `${error.message}` });
});

// let port = process.env.PORT
app.listen(4000, () => console.log("server listening on port 4000"));