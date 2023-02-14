var SQL = require('./db.js');
const path = require('path');
const csv=require('csvtojson');
const { read } = require('fs');

const showAllShops = function(req,res){
    const Q1 = "SELECT coffee_shop FROM shops";
    SQL.query(Q1, (err, shops) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all shops: " + err});
            return;
            }
        res.render('rateUs', {coffeeShops: shops});  
    })
    return;  
};

const createNewCall = function(req,res){
    if (!req.body) {
        res.status(400).send('error' ,{message: "content cannot be empty"});
        return;
    }
    const nowContact = {
        "full_name": req.body.contactName,
        "email": req.body.contactEmail,
        "free_text": req.body.contactText
    }
    const Q2 = 'INSERT INTO contact SET ?';
    SQL.query(Q2, nowContact, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).render('error' , {message:"could not sign up"});
            return;
        }
        res.redirect('/homePage');
        return;
    })
}

const createNewRes = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    const newRes = {
        "full_name": req.body.full_name,
        "email": req.body.email,
        "phone": req.body.phone
    };
    SQL.query("INSERT INTO userReservation SET ?", newRes, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating new reservation: " + err});
            return;
        }
        console.log("reservation has confirmed");
        res.redirect('/OrderConfirmation');
    });
};

const createNewRate = function(req,res){
    if (!req.body) {
        res.status(400).send('error' ,{message: "content cannot be empty"});
        return;
    }
    const nowRate = {
        "coffee_shop": req.body.coffeeShop,
        "rate": req.body.rating,
    }
    console.log(nowRate);
    const Q3 = 'INSERT INTO rating SET ?';
    SQL.query(Q3, nowRate, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).render('error' , {message:"could not sign up"});
            return;
        }
        res.redirect('/homePage');
        return;
    })
}


const showAllShopsDetais = function(req,res){
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
            res.render('shops', {details: shopDetails, rating: shopAVGRate});  
        })

    })
    return;  
};

module.exports = {showAllShops, createNewCall, createNewRes, createNewRate, showAllShopsDetais};
