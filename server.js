const express = require('express')
const mongoose = require('mongoose')
const app =express()
const Person = require ('./Models/personSchema')
require('dotenv').config()
const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl,(err)=>{
  err? console.log(err) : console.log('database is connected')

})

app.use(express.json())
//Create and Save a Record of a Model:
var person = new Person({
  name: "Foulan",
  age: 35,
  favoriteFoods: ["Mekla1", "Mekla2"],
});
person.save((err, data) => {
  if (err) console.log(err);
  else console.log('Foulan data saved');
});
//Create Many Records with model.create()
let arrayOfPeople =[
  {
      name: "Rabeb",
      age: 25,
      favoriteFoods: ["juice", "crispy chicken"],
  },
  {
      name: "Ouafa",
      age: 39,
      favoriteFoods: ["lablebi", "verveine"],
  },
{
      name: "Najib",
      age: 28,
      favoriteFoods: ["burritos","Burger", "Tacos"],
  },
{
    name: "Anchassy",
    age: 22,
    favoriteFoods: ["burritos","kebsa", "kfc"],
}

]
Person.create(arrayOfPeople,
  (err, data) => {
    if (err) console.log(err);
    else console.log('data created');
    
  }
);
//Use model.find() to Search Your Database
Person.findOne({ name: "Rabeb" }, (err, data) => {
  if (err) console.log(err);
  else console.log('data found by name');
});
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne(
  { favoriteFoods: { $in: ["lablebi", "verveine"] } },
  (err, done) => {
    if (err) console.log(err);
    else console.log('data found by favouriteFoods');
  }
);
//Use model.findById() to Search Your Database By _id
Person.findById("637a85017251ba331db044c8", function (err, data) {
  if (err) {
      console.log(err);  
  } 
  else 
   console.log('data found by id');
});
//Perform Classic Updates by Running Find, Edit, then Save
Person.findByIdAndUpdate("637a918c9d7b1b67a1260f53", (err, data) => {
  if (err) console.log(err)
    
  else{
      data.favoriteFoods.push('makloub')
      data.save()
      console.log('data found by id and updated')
  }
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
const functionFindAndUpdate = (personName) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate({name:personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) {
        return (err);
      } 
        return updatedDoc
    })
  };

functionFindAndUpdate ("Foulan")
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove("6372eeae245d6081aa207128",(error, data) =>{
  if (error)  console.log('err')
  else   console.log('data found by id and removed')
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.deleteMany({age: {$gt:25}}, (error, data)=>{
  error? console.log(error) : console.log('data with age>25 removed')

 });

 //Chain Search Query Helpers to Narrow Search Results
 Person.find({favoriteFoods: {$all: ['burritos']}})
.sort({name: 'asc'})
.limit(2)
.select('name')
.exec((error,data)=>{
    error? console.log(error) : console.log('search done')
});



const port =  process.env.PORT
app.listen(port, (err)=>{
    err? console.log(err) : console.log('server is running')
})