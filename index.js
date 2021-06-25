const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const app = express();
const port = process.env.PORT || 5000

const CONNECTION_URL = "mongodb+srv://m001-student:m001-mongodb-basics@lab3.wech6.mongodb.net/myFirstDatabasetest?retryWrites=true&w=majority";
const DATABASE_NAME = "smartcarpark";
const COLLECTION_NAME_1 = "carpark";
const COLLECTION_NAME_2 = "daily_usage_carpark";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var database, collection_1, collection_2;


app.post("/carpark", (request, response) => {
  collection_1.insert(request.body, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result.result);
  });
});

app.get("/carpark", (request, response) => {
  collection_1.find({}).toArray((error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/carpark/faculty/:name", (request, response) => {
  collection_1.find({ "Faculty": request.params.name }).toArray((error, result) => { 
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/carpark/building/:name", (request, response) => {
  collection_1.find({ "Building": request.params.name }).toArray((error, result) => { 
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/carpark/:id", (request, response) => {
  collection_1.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.patch("/carpark/:id", (request, response) => {
  collection_1.updateOne({"_id": new ObjectId(request.params.id)}, {$set: request.body}, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send("Updated successfully");
  });
});

app.delete("/carpark", (request,response) => {
  collection_1.deleteOne(request.body, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send('Deleted successfully')
  });
});

app.delete("/carpark/:id", (request, response) => {
  collection_1.deleteOne({"_id": new ObjectId(request.params.id)}, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send("Delete successfully");
  });
});

//--------------------------------------------------------

app.post("/daily_usage_carpark", (request, response) => {
  collection_2.insert(request.body, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result.result);
  });
});

app.get("/daily_usage_carpark", (request, response) => {
  collection_2.find({}).toArray((error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/daily_usage_carpark/faculty/:name", (request, response) => {
  collection_2.find({ "Faculty": request.params.name }).toArray((error, result) => { 
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/daily_usage_carpark/:name", (request, response) => {
  collection_2.find({ "Building": request.params.name }).toArray((error, result) => { 
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get("/daily_usage_carpark/:id", (request, response) => {
  collection_2.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.patch("/daily_usage_carpark/:id", (request, response) => {
  collection_2.updateOne({"_id": new ObjectId(request.params.id)}, {$set: request.body}, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send("Updated successfully");
  });
});

app.delete("/daily_usage_carpark", (request,response) => {
  collection_2.deleteOne(request.body, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send('Deleted successfully')
  });
});

app.delete("/daily_usage_carpark/:id", (request, response) => {
  collection_2.deleteOne({"_id": new ObjectId(request.params.id)}, (error, result) => {
      if (error) {
          return response.status(500).send(error);
      }
      response.send("Delete successfully");
  });
});

app.listen(port, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection_1 = database.collection(COLLECTION_NAME_1);
    collection_2 = database.collection(COLLECTION_NAME_2);
    });
});

/*
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/