const MongoClient = require('mongodb').MongoClient;
const databaseName = 'scheduling-db';
const collectionName = 'schedules';
require('dotenv').config()
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

const Insert = function(schedule) {
    return new Promise((resolve, reject) => {
        const scheduleCollection = database.collection(collectionName);
        scheduleCollection.insertOne(schedule, function(err, res) {
            if (err) {
                reject(err);
            }
            else {
                console.log('successfully inserted a new schedule');
                resolve(res);
            }
        });
    });
};

const Update = function(schedule, newSchedule) {
    return new Promise((resolve, reject) => {
        const scheduleCollection = database.collection(collectionName);
        scheduleCollection.updateOne(schedule, newSchedule, function(err, res) {
            if (err) {
                reject(err)
            }
            else {
                console.log('successfully updated a schedule');
                resolve(res);
            }
        });
    });
};

const Remove = function(schedule) {
    return new Promise((resolve, reject) => {
        const scheduleCollection = database.collection(collectionName);
        scheduleCollection.deleteOne(schedule, function(err, res) {
            if (err) {
                reject(err);
            }
            else {
                console.log('successfully removed a schedule');
                resolve(res);
            }
        });
    });
};

module.exports = { Connect, Find, Insert, Update, Remove };