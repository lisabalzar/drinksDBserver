const express = require("express");
const mongoose = require("mongoose");
const drinkSchema = require("./model");
const app = express();

app.use(express.json());

const NewDrink = mongoose.model("Drink", drinkSchema, "ownDrinks");
const Drink = mongoose.model("Drink", drinkSchema, "drinks");


app.post("/add_drink", async (request, response) => {
    console.log("drink");
    console.log(request.body);
    const drink = new NewDrink(request.body);
    console.log(drink);
  
    try {
      await drink.save();
      console.log("hej");
      response.send({drink});
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/own_drinks", async (request, response) => {
    const drinks = await NewDrink.find({});
    try {
        response.send({drinks});
      } catch (error) {
        response.status(500).send(error);
      }
    });


app.get("/drinks", async (request, response) => {
    const drinks = await Drink.find({});
    console.log("hej");
    console.log(drinks);
    try {
      response.send({drinks});
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;