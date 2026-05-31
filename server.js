const express = require("express");

const mongoose= require("mongoose");
const cors= require("cors");

const app=express();

app.use(cors());

mongoose.connect("mongodb://pooja:poojaPassword@ac-tjhhzyu-shard-00-00.y0et2p5.mongodb.net:27017,ac-tjhhzyu-shard-00-01.y0et2p5.mongodb.net:27017,ac-tjhhzyu-shard-00-02.y0et2p5.mongodb.net:27017/?ssl=true&replicaSet=atlas-cwh60b-shard-0&authSource=admin&appName=Cluster0");

const registrationSchema = new mongoose.Schema({
    opened:Boolean
});

const  Registration = mongoose.model(
  "registration",
  registrationSchema
);

app.get('/check-registration', async (req, res) => {

    let data = await Registration.findOne();

    if (!data) {
        data = new Registration({
            opened: false
        });

        await data.save();
    }

    if (data.opened) {
        return res.json({
            success: false,
            message: "Registration filled successfully"
        });
    }

    data.opened = true;
    await data.save();

    res.json({
        success: true
    });

});

    app.listen(8000,()=>{
        console.log("server running ");

        
    })




