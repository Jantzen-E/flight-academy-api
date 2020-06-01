const MongoClient = require('mongodb').MongoClient;
const databaseName = 'scheduling-db';
const collectionName = 'schedules';
const mongoDbUrl = process.env.ATLAS_CONNECTION;
const settings = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

let database;

const Connect = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDbUrl, settings, function(err, client) {
            if (err) {
                reject(err);
            }
            else {
                console.log('successfully connected to database');
                database = client.db(databaseName);
                resolve();
            }
        });
    });
};

const Find = function(item) {
    let itemQuery = {};
    if (item) {
        itemQuery = item;
    }
    console.log(item)
    return new Promise((resolve, reject) => {
        const scheduleCollection = database.collection(collectionName);
        scheduleCollection.find(itemQuery).toArray(function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully found schedules');
                resolve(res);
            }
        });
    });
};

module.exports = { Connect, Find };