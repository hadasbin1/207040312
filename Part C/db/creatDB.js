var SQL = require('./db.js');
const path = require('path');
const csv=require('csvtojson');
const { read } = require('fs');

const CreateTables = (req,res,next)=> {
    var Q1 = "CREATE TABLE userReservation (full_name VARCHAR(255), email VARCHAR(255), phone VARCHAR(11))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created user table');
        return;
        next();
    })
    var Q2 = "CREATE TABLE shops (coffee_shop VARCHAR(255), X DECIMAL (9,2), Y DECIMAL (9,2), sockets TINYINT(1), quiet_place TINYINT(1), wifi TINYINT(1), cosher TINYINT(1), vegan TINYINT(1), price TINYINT, places INT, free_places INT)";
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created shops table');
        return;
        next();
    })
    var Q3 = "CREATE TABLE rating (id Int NOT NULL AUTO_INCREMENT, coffee_shop VARCHAR(255), rate TINYINT(1), PRIMARY KEY(id))";
    SQL.query(Q3,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created rating table');
        return;
        next();
    })
    var Q15 = "CREATE TABLE contact (full_name VARCHAR(255), email VARCHAR(255), free_text VARCHAR(255))";
    SQL.query(Q15,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created contact table');
        return;
    })
    res.render('initdata', { message: "created all tables" });
}

const InsertData = (req,res,next)=>{
    var Q4 = "INSERT INTO userReservation SET ?";
    const userCsvFilePath= path.join(__dirname, "userResrvation.csv");
    csv().fromFile(userCsvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "full_name": element.full_name,
                "email": element.email,
                "phone": element.phone
            }
            SQL.query(Q4, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
        next();
    });
    var Q5 = "INSERT INTO shops SET ?";
    const shopsCsvFilePath= path.join(__dirname, "coffeShops.csv");
    csv().fromFile(shopsCsvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "coffee_shop": element.coffee_shop,
                "X": element.X,
                "Y": element.Y,
                "sockets": element.sockets,
                "quiet_place": element.quiet_place,
                "wifi": element.wifi,
                "cosher": element.cosher,
                "vegan": element.vegan,
                "price": element.price,
                "places": element.places,
                "free_places": element.free_places
            }
            SQL.query(Q5, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
        next();
    });
    var Q6 = "INSERT INTO rating SET ?";
    const raetCsvFilePath= path.join(__dirname, "rating.csv");
    csv().fromFile(raetCsvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "coffee_shop": element.coffee_shop,
                "rate": element.rate,
            }
            SQL.query(Q6, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
        next();
    });
    var Q16 = "INSERT INTO contact SET ?";
    const contactCsvFilePath= path.join(__dirname, "contact.csv");
    csv().fromFile(contactCsvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "full_name": element.full_name,
                "email": element.email,
                "free_text": element.text,
            }
            SQL.query(Q16, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
    });
    res.render('initdata', { message: "data inserted to all tables"});
};

const ShowUserTable = (req,res)=>{
    var Q7 = "SELECT * FROM userReservation";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing user table");
        res.send(mySQLres);
        return;
    })
};

const ShowShopsTable = (req,res)=>{
    var Q8 = "SELECT * FROM shops";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing shops table");
        res.send(mySQLres);
        return;
    })
};

const ShowRatingTable = (req,res)=>{
    var Q8 = "SELECT * FROM rating";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing rating table");
        res.send(mySQLres);
        return;
    })
};

const ShowContactTable = (req,res)=>{
    var Q17 = "SELECT * FROM contact";
    SQL.query(Q17, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing contact table");
        res.send(mySQLres);
        return;
    })
};

const DropUserTable = (req, res)=>{
    var Q9 = "DROP TABLE userReservation";
    SQL.query(Q9, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("user table drpped");
        res.render('initdata', { message: "user table drpped" });
        return;
    })
}

const DropShopTable = (req, res)=>{
    var Q10 = "DROP TABLE shops";
    SQL.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("shops table drpped");
        res.render('initdata', { message: "shop table drpped" });
        return;
    })
}

const DropRatingTable = (req, res)=>{
    var Q11 = "DROP TABLE rating";
    SQL.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("rating table drpped");
        res.render('initdata', { message: "rating table drpped" });
        return;
    })
}

const DropContactTable = (req, res)=>{
    var Q11 = "DROP TABLE contact";
    SQL.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("contact table drpped");
        res.render('initdata', { message: "contact table drpped" });
        return;
    })
}

const DropAllTables = (req, res,next)=>{
    var Q12 = "DROP TABLE userReservation";
    SQL.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("user table drpped");
        return;
        next();
    })
    var Q13 = "DROP TABLE shops";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("shops table drpped");
        return;
        next();
    })
    var Q14 = "DROP TABLE rating";
    SQL.query(Q14, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("rating table drpped");
        return;
        next();
    })
    var Q18 = "DROP TABLE contact";
    SQL.query(Q18, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("contact table drpped");
        return;
    })
    res.render('initdata', { message: "All tables drpped" });

}

module.exports = {CreateTables, InsertData, ShowUserTable, ShowShopsTable, ShowRatingTable, ShowContactTable, DropUserTable, DropShopTable, DropRatingTable, DropContactTable, DropAllTables};


