const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const server = express();
server.use(bodyParser.json());
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
 
//Establish the database connection
 
const db = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "rootpassword",
    database: "products",
 
});
 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  server.listen(8085,function check(error) {
    if (error)
    {
    console.log("Error....dddd!!!!");
    }
 
    else
    {
        console.log("Started....!!!! 8085");
 
    }
});

//Create the Records
 
server.post("/api/products/add", (req, res) => {
    let details = {
      productID: req.body.productID,
      productname: req.body.productname,
      category: req.body.category,
      categoryid: req.body.categoryid,
    };
    let sql = "INSERT INTO prodinfo SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Product Failed To Add" });
      } else {
        res.send({ status: true, message: "Product Added Successfully" });
      }
    });
  });

   
//view the Records
 
server.get("/api/product", (req, res) => {
    var sql = "SELECT * FROM prodinfo";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //Search the Records
 
server.get("/api/product/:productID", (req, res) => {
  var prodID = req.params.productID;
  var sql = "SELECT * FROM prodinfo WHERE id=" + prodID;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records
 
server.put("/api/product/update/:productID", (req, res) => {
  let sql =
    "UPDATE prodinfo SET productname='" +
    req.body.productname +
    "', category='" +
    req.body.category +
    "',categoryid='" +
    req.body.categoryid +
    "'  WHERE productID=" +
    req.params.productID;
console.log(req.params)
console.log(req.body)
  let a = db.query(sql, (error, result) => {
    console.log(error)
    if (error) {
      res.send({ status: false, message: "Product Updated Failed" });
    } else {
      res.send({ status: true, message: "Product Updated successfully" });
    }
  });
});



  //Delete the Records
 
  server.delete("/api/product/delete/:productID", (req, res) => {
    let sql = "DELETE FROM prodinfo WHERE productID=" + req.params.productID + "";
    console.log(req.params)
    let query = db.query(sql, (error) => {
      console.log(error)
      if (error) {
        res.send({ status: false, message: "Product not Deleted " });
      } else {
        res.send({ status: true, message: "Product Deleted successfully" });
      }
    });
  });