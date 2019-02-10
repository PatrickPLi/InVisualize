var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('assets'));
app.use(express.static(__dirname));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/categories");

var nameSchema = new mongoose.Schema({
    Ticker: String,
    Category: String
});


var stock = mongoose.model("stock", nameSchema);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/vision.html");
});



app.post("/addname", (req, res) => {
    var myData = new stock(req.body);
    myData.save()
        .then(item => {
            //res.send("Name saved to database");
            res.sendFile(__dirname + "/vision.html");
            console.log("success");
        })
        .catch(err => {
            // res.status(400).send("Unable to save to database");
            console.log("failed");
        });
});


app.get('/find', function (req, res) {
    //res.send(req.query.category);
    var cat = req.query.category;
    var ret = "NULL"
    //res.send(cat);
    //var ret = stock.findOne({ 'Category': 'car' });
    //var returnvalue = ret.category;

    switch (cat) {
        case "electronics":
            ret = "AAPL";
            break;
        case "car":
            ret = "F";
            break;
    }

    res.send(ret);
    //res.send("heloo");

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});











// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');


// var findDocuments = function (db, callback) {
//     // Get the documents collection
//     var collection = db.collection('categories');
//     // Find some documents
//     collection.find({"Categories": "electronics"}).toArray(function (err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }


// // Connection URL
// var url = 'mongodb://localhost:27017/local';
// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//         findDocuments(db, function () {
//             db.close();
//         });
// });