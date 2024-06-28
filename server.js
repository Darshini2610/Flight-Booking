const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use(cors());
const LoginController = require('./controllers/LoginController');

const db = mysql.createConnection ({
    user: "root",
    host: "localhost",
    password: "password",
    database: "flightbooking"
})

app.post('/register', (req, res) => {

    const fname = req.body.fname
    const lname = req.body.lname
    const contact = req.body.contact
    const airline = req.body.airline

    db.query(
        "SELECT contact FROM customers WHERE contact = ?", [contact],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result!=0) {
                res.send("Already Registered")
            }
            if (result==0) {
                db.query(
                    "INSERT INTO customers (fname, lname, contact, airline) VALUES (?, ?, ?, ?)",
                    [fname, lname, contact, airline],
                    (err, result) => {
                        if (err) {
                            res.send({err : err});
                        }
                        if(result!=0) {
                            db.query (
                                "SELECT * from customers WHERE contact = ?", [contact],
                                (err, result) => {
                                    console.log(result)
                                    res.send(result)
                                }
                            )
                            
                        }
                    }
                )
            }
        }
    )
}) 

const DropdownController = require('./controllers/dropdownController');

// Serve static files (React frontend)
app.use(express.static('public'));

// API route to fetch airline names
app.get('/api/flightNames', DropdownController.getAirlineNames);

app.post('/login', (req,res) => {
    const phone = req.body.phone
    // const isValidLogin = LoginController.login(phone);
    // if (isValidLogin) {
    db.query(
        "SELECT contact from customers WHERE contact = ?", [phone],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result==0) {
                res.send('Not Registered')
            }
            if (result!=0) {
                db.query(
                    "SELECT * from customers WHERE contact = ?", [phone],
                    (err, result) => {
                        res.send(result)
                    }
                )
            }
        }
    )
    
})

app.post('/book', (req,res) => {
    const CustID = req.body.CustID
    const Airline = req.body.Airline
    const Origin = req.body.Origin
    const DepartTime = req.body.DepartTime
    const Destination = req.body.Destination
    const ArrivalTime = req.body.ArrivalTime
    const Date = req.body.Date
    const Class = req.body.Class
    const Travellers = req.body.Travellers
    const TotalAmt = req.body.TotalAmt

    db.query(
        "INSERT INTO tickets (CustID, Airline, Origin, DepartTime, Destination, ArrivalTime, Date, Class, Travellers, TotalAmt) VALUES (?,?,?,?,?,?,?,?,?,?)",
         [CustID, Airline, Origin, DepartTime, Destination, ArrivalTime, Date, Class, Travellers, TotalAmt],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("POSTED")
            }
        }
    )
})

app.put('/update/:TicketID', (req,res) => {
    const TicketID = req.params.TicketID
    const Date = req.body.Date
    db.query(
        "UPDATE tickets SET Date = ? WHERE TicketID = ?",[Date, TicketID],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("UPDATED")
            }
        }
    )
})

app.delete('/delete/:TicketID', (req,res) => {
    const TicketID = req.params.TicketID
    db.query(
        "DELETE FROM tickets WHERE TicketID = ?",TicketID,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("DELETED")
            }
        }
    )
})

app.get('/ticket', (req,res) => {
    db.query(
        "SELECT * FROM tickets",
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result!=0) {
                res.send(result)
            }
        }
    )
})

app.post('/tickets', (req,res) => {
    const CustID = req.body.CustID
    db.query(
        "SELECT * FROM tickets WHERE CustID = ?", [CustID],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result!=0) {
                res.send(result)
            }
        }
    )
})


app.listen(3001, () => {
    console.log("running server")
})