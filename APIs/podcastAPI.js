const exp = require("express");
const podApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");

// require("dotenv").config();

// extract body of request
podApp.use(exp.json());

podApp.get("/getpodcast", expressAsyncHandler(async (request, response) =>{
        let podcastCollectionObject = request.app.get("podcastCollectionObject");
        //get all users
        let podcasts=await podcastCollectionObject.find().toArray();
        //send res
        response.send ({ message: "Podcasts list", payload: podcasts });
        })
);

podApp.post("/create-podcast", expressAsyncHandler(async (request, response) => {
        let podcastCollectionObject = request.app.get("podcastCollectionObject");
        let newPodcastObj = request.body;
        await podcastCollectionObject.insertOne(newPodcastObj)
        response.send({ message: "New Podcast added" });
    })
);

podApp.get("/getpodcasts/:name", expressAsyncHandler(async (request, response) => {
    let podCollectionObject = request.app.get("podCollectionObject");
    let podName = request.params.name;

    let podDB = await podCollectionObject.find({
            name: podName
    }).toArray();
    
    if (podDB == null) {
            response.send({ message: "No favorites found" });
    } 
    else {
            response.send({ message: "Here are your favs: ",payload: podDB });
    }
})
);      

podApp.delete("/remove-podcasts/:id", expressAsyncHandler(async (request, response)=>{
    let podCollectionObject = request.app.get("podCollectionObject");
    let podId = request.params.id;

    let podDB = await podCollectionObject.deleteMany({
            _id: ObjectId(podId)
    }).toArray();

    console.log(podDB)
    
    if (podDB == null) {
            response.send({ message: "No pod found" });
    } 
    else {
            response.send({ message: "successfully deleted",payload: podDB });
    }
})
)

module.exports = podApp;