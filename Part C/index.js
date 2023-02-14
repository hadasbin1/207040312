const express = require('express');
const path = require('path');
const csv=require('csvtojson');
const BodyParser = require('body-parser');
const SQL = require('./db/db');
const CreateDB = require('./db/creatDB');
const CRUD = require('./db/CRUD.js');
const port = 3000;
const app = express();
const { read } = require('fs');
const fs = read.fs;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "static")));
app.set('views', path.join(__dirname, "views"));
app.set("view engine", 'pug');

app.get('/initData', (req,res)=>{
    res.render('initData');
})

app.get('/', (req,res)=>{
    res.render('homePage');
})

app.get('/homePage', (req,res)=>{
    res.render('homePage');
})

app.get('/rateUs', (req,res)=>{
    const Q1 = "SELECT coffee_shop FROM shops";
    SQL.query(Q1, (err, shops) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all shops: " + err});
            return;
            }
        res.render('rateUs', {coffeeShops: shops})
    })
})

app.get('/contactUs', (req,res)=>{
    res.render('contactUs');
})

app.get('/aboutUs', (req,res)=>{
    res.render('aboutUs');
})

app.get('/shops', (req,res)=>{
    const Q1 = "SELECT * FROM shops";
    SQL.query(Q1, (err, shopDetails) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all shops: " + err});
            return;
        }
        const Q2 = "SELECT coffee_shop, avg(rate) FROM rating GROUP BY coffee_shop"
        SQL.query(Q2, (err, shopAVGRate) =>{
            if (err) {
                console.log("error: ", err);
                res.status(400).send({message: "error in getting all shops: " + err});
                return;
            }            
            res.render('shops', {details: shopDetails, rating: shopAVGRate });  
        })
    })
})

app.get('/reservation', (req,res)=>{
    res.render('reservation');
})

app.get('/OrderConfirmation', (req,res)=>{
    res.render('OrderConfirmation');
})

app.listen(port, ()=>{
    console.log("server is running on port 3000");
})

app.get('/CreateTables',CreateDB.CreateTables);
app.get('/InsertData',CreateDB.InsertData);
app.get('/ShowUserTable',CreateDB.ShowUserTable);
app.get('/ShowShopsTable',CreateDB.ShowShopsTable);
app.get('/ShowRatingTable',CreateDB.ShowRatingTable);
app.get('/ShowContactTable',CreateDB.ShowContactTable);
app.get('/DropUserTable',CreateDB.DropUserTable);
app.get('/DropShopTable',CreateDB.DropShopTable);
app.get('/DropRatingTable',CreateDB.DropRatingTable);
app.get('/DropContactTable',CreateDB.DropContactTable);
app.get('/DropAllTables',CreateDB.DropAllTables);

app.get('/showAllShops',CRUD.showAllShops);
app.get('/showAllShopsDetais',CRUD.showAllShopsDetais);
app.post('/createNewCall',CRUD.createNewCall);
app.post('/createNewRes',CRUD.createNewRes);
app.post('/createNewRate',CRUD.createNewRate);


