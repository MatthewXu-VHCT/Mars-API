//npm packages installed
const dotenv = require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express();
//activate an express app
app.use(express.json());
//enable parsing of JSON data

//define and attach the url to the folder
app.use('/NASA', express.static('public'))

//listen to HTTP get requests
app.get('/NASA/Mars/', (req, res) => {
    const client = new MongoClient(
      //connect mongoDB library to the html
      //process the link from ".env" (a hidden file)
      process.env.DB, {
          //  used to setup Mongo Clients
          useUnifiedTopology: true,
          useNewUrlParser: true
      }
  );

  client.connect(err => {
      if (err) {
          console.log(err);
      }
      //applied a filter here
      let query = {
      };

      let projection = {
      }

      //        search in mongoDb for all dragons
      client.db("NASA").collection("Mars")
          .find(query)
          .project(projection)
          //transfer the data into an array
          .toArray((err, item) => {
              if (err) {
                  res.send({
                      'error': 'An error has occured'
                  });
              } else {
                  res.send(item);
              }
          });
  })
});


app.listen(0, () => {
  console.log("We are okay");
})
