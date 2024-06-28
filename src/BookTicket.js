import React, {useState } from "react";
import { bookflight, flightLogo } from "./Flights";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookTicket () {

    const navigate = useNavigate()

    const fromAirport = localStorage.getItem('fromAirName')
    const toAirport = localStorage.getItem('toAirName')
    const date = localStorage.getItem('Date')
    const travellers = localStorage.getItem('Travellers')
    const Class = localStorage.getItem('Class')

    const getcost = () => {
        let Class = null
        if (localStorage.getItem('Class') === 'Economy') {
            Class = 7;
        }
        if (localStorage.getItem('Class') === 'Premium Economy') {
            Class = 8;
        }
        if (localStorage.getItem('Class') === 'Business') {
            Class = 9;
        }
        localStorage.setItem('Cost', travellers[0]*bookflight[Class])
        return travellers[0]*bookflight[Class]
    }

    const [empty, setempty] = useState('')

    function checkdata () {
        if (((document.getElementById("number")).value) === ''
            || ((document.getElementById("name")).value) === ''
            || ((document.getElementById("expiry")).value) === ''
            || ((document.getElementById("cvv")).value) === '') {
            setempty('Incomplete Data')
        }
        else {
            setempty('')
            axios.post('http://localhost:3001/book', {
                CustID: localStorage.getItem('CustID'),
                Airline: bookflight[6],
                Origin: fromAirport,
                DepartTime: bookflight[3],
                Destination: toAirport,
                ArrivalTime: bookflight[5],
                Date: date,
                Class: Class,
                Travellers: travellers[0],
                TotalAmt: localStorage.getItem('Cost')
            })
            navigate('/Ticket')
        }
    }

    return (
        <div className="bg-black h-screen grid place-items-center">
            <Navbar />
            <div className="grid grid-cols-2 top-28 absolute w-screen place-items-center bg-cover bg-gradient-to-b to-sky-700 from-gray-950 h-fit p-10">
                <div className="bg-white p-5 py-5 w-4/5 place-self-end mr-5 shadow-xl shadow-black">
                    <p className="m-7 mt-5 text-lg font-semibold text-center">FARE SUMMARY</p>
                    <div className="w-fit grid grid-cols-2 font-bold place-items-center"><p className="w-2/3 inline-block">{flightLogo}</p>{bookflight[6]}</div>
                    <div className="border-2 rounded-md p-2 w-full m-2">FROM: <p className="font-bold inline-block">{fromAirport}, {bookflight[3]}</p></div>
                    <div className="border-2 rounded-md p-2 w-full m-2">TO: <p className="font-bold inline-block">{toAirport}, {bookflight[5]}</p></div>
                    <div className="border-2 rounded-md p-2 w-full m-2">DATE: <p className="font-bold inline-block">{date}</p></div>
                    <div className="border-2 rounded-md p-2 w-full m-2">CLASS: <p className="font-bold inline-block">{Class}</p></div>
                    <div className="border-2 rounded-md p-2 w-full m-2">TRAVELLERS: <p className="font-bold inline-block">{travellers}</p></div>
                    <div className="border-2 rounded-md p-2 w-full m-2">TOTAL AMOUNT: <p className="font-bold inline-block">Rs. {getcost()}</p></div>
                </div>
                <div className="bg-white w-1/2 text-center py-5 shadow-xl shadow-black">
                    <p className=" m-7 mt-5 text-lg font-semibold">CARD DETAILS</p>
                    <p className='text-red-500 m-2'>{empty}</p>
                    <input id='number' type="number" className=" border-2 rounded-md p-2 w-fit m-2" placeholder="Card Number" />
                    <input id='name' type="text" className="border-2 rounded-md p-2 w-fit/3 m-2" placeholder="Name on Card" />
                    <input id='expiry' type="text" className="border-2 rounded-md p-2 w-1/3 m-2" placeholder="Expriry" />
                    <input id='cvv' type="password" className="border-2 rounded-md p-2 w-1/3 m-2" placeholder="CVV" />
                    <button className="mt-3 bg-blue-500 py-1 px-5 rounded-3xl text-lg text-white border-2 border-sky-800 "
                        onClick={checkdata}
                    >SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default BookTicket;