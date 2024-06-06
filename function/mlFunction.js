const User = require("../model/user")
const {Restaurant,
    CulinaryTypeView,
    PaymentMethodView,
    AvailableFacilityView,
    PriceRangeView} = require("../model/restaurant")
const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const brain = require('brain.js');
const tf = require('@tensorflow/tfjs');

const createMLModel = async () => {
    const users = await User.find().populate('restaurants');
    const restaurants = await Restaurant.find();

    const dataset = users.map(user => {
        const restaurantCounts = restaurants.reduce((acc, restaurant) => {
            acc[restaurant.culinary_type] = 0;
            return acc;
        }, {});

        user.restaurants.forEach(restaurantId => {
            const restaurant = restaurants.find(rest => rest._id.equals(restaurantId));
            if (restaurant) {
                restaurantCounts[restaurant.culinary_type]++;
            }
        });

        return {
            input: Object.values(restaurantCounts),
            output: user.preferredCulinaryType // Assuming this is a field in user schema
        };
    });

    // Membuat dan melatih model
    // Memuat model pretrained, misalnya MobileNet
    const baseModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    // Membekukan lapisan model dasar
    baseModel.layers.forEach(layer => layer.trainable = false);

     // Get unique culinary types from the restaurants
    const uniqueCulinaryTypes = [...new Set(restaurants.map(restaurant => restaurant.culinary_type))];
    const numCategories = uniqueCulinaryTypes.length;

    // const numCategories = new Set(users.map(user => user.preferredCulinaryType)).size;
    if (numCategories !== restaurants.length) {
        throw new Error('Number of categories does not match number of restaurants.');
    }

    // Create the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [dataset[0].input.length], units: 64, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 })); // Add dropout for regularization
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: numCategories, activation: 'softmax' }));

    // Compile the model
    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.adam(0.001), // Adjust learning rate
        metrics: ['accuracy']
    });

    

    // Prepare the data
    const inputs = dataset.map(data => data.input);
    // Map each user's preferred culinary type to an index
    const outputs = dataset.map(data => {
        const index = uniqueCulinaryTypes.indexOf(data.output);
        return Array(numCategories).fill(0).map((_, i) => i === index ? 1 : 0);
    });

    // Train the model with added callbacks
    await model.fit(tf.tensor2d(inputs), outputs, {
        epochs: 10,
        callbacks: [
            tf.callbacks.earlyStopping({ monitor: 'loss' }),
            {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`);
                }
            }
        ]
    });

    return model;
};

const getTopCulinaryTypes = async (user, net) => {
    const restaurants = await Restaurant.find();

    const restaurantCounts = restaurants.reduce((acc, restaurant) => {
        acc[restaurant.culinary_type] = 0;
        return acc;
    }, {});

    if (user.restaurants && user.restaurants.length > 0) {
        user.restaurants.forEach(restaurantId => {
            const restaurant = restaurants.find(rest => rest._id.equals(restaurantId));
            if (restaurant) {
                restaurantCounts[restaurant.culinary_type]++;
            }
        });
    }

    const prediction = net.predict(tf.tensor2d([Object.values(restaurantCounts)]));
    const topCulinaryTypes = await prediction.data();
    const topIndexes = Array.from(topCulinaryTypes)
        .map((prob, index) => ({ probability: prob, index }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 4)
        .map(item => restaurants[item.index].culinary_type);

    return topIndexes;
};


module.exports={
    createMLModel,
    getTopCulinaryTypes
}