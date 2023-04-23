
const exp = require("express");
const favoritesApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const ObjectId = require('mongodb').ObjectID;

favoritesApp.use(exp.json());

favoritesApp.get("/get-favorites", expressAsyncHandler(async (request, response) =>{
        let favoriteCollectionObject = request.app.get("favoriteCollectionObject");
        let favorites = await favoriteCollectionObject.find().toArray();
        response.send ({ message: "Favorites list", payload: favorites });
    })
);

favoritesApp.post("/add-to-favorites", expressAsyncHandler(async (request, response) => {
        let favoriteCollectionObject = request.app.get("favoriteCollectionObject");
        let newFavoriteObject = request.body;
        await favoriteCollectionObject.insertOne(newFavoriteObject);
        response.send({ message: "New favorite added" });
    })
);

favoritesApp.get("/get-my-favorites/:email", expressAsyncHandler(async (request, response) => {
        let favoriteCollectionObject = request.app.get("favoriteCollectionObject");
        let userEmail = request.params.email;

        let favoritesDB = await favoriteCollectionObject.find({
                email: userEmail
        }).toArray();
        
        if (favoritesDB == null) {
                response.send({ message: "No favorites found" });
        } 
        else {
                response.send({ message: "Here are your favs: ",payload: favoritesDB });
        }
    })
);      

favoritesApp.delete("/remove-favorite/:id", expressAsyncHandler(async (request, response)=>{
        let favoriteCollectionObject = request.app.get("favoriteCollectionObject");
        let favoriteId = request.params.id;

        let favoritesDB = await favoriteCollectionObject.deleteMany({
                _id: ObjectId(favoriteId)
        }).toArray();

        console.log(favoritesDB)
        
        if (favoritesDB == null) {
                response.send({ message: "No favorites found" });
        } 
        else {
                response.send({ message: "successfully deleted",payload: favoritesDB });
        }
    })
)

module.exports = favoritesApp;