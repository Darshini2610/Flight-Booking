import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import myLogo from './mylogo.png'
import { bookflight, flightLogo } from "./Flights";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IndiGo from './IndiGo.jpeg'
import AirAsia from './AirAsia.png'
import GoFirst from './GoFirst.jpeg'
import Vistara from './Vistara.png'
import SpiceJet from './SpiceJet.png'
import AirIndia from './AirIndia.png'

function Ticket () {

    const navigate = useNavigate();

    const [tickets, settickets] = useState([[]])

    const getLogo = (airline) => {
        if (airline === 'IndiGo') {
            return <img src={IndiGo} />
        }
        if (airline === 'AirAsia India') {
            return <img src={AirAsia} />;
        }
        if (airline === 'Go First') {
            return <img src={GoFirst} />;
        }
        if (airline === 'Vistara') {
            return <img src={Vistara} />;
        }
        if (airline === 'SpiceJet') {
            return <img src={SpiceJet} />;
        }
        if (airline === 'Air India') {
            return <img src={AirIndia} />;
        }
    }

    const [empty, setempty] = useState(false)

    useEffect(() => {
        async function ticket () {
            await axios.post("http://localhost:3001/tickets", {
                CustID: localStorage.getItem('CustID')
            }).then((response) => {
                settickets(response.data)
            })
            
        }
        ticket();
        if (tickets && tickets.length === 0) {
            setempty(true)
        }
    }, [])
    
    function deleteTicket (TicketID) {
        axios.post("http://localhost:3001/delete", {
            TicketID: TicketID
        })
        window.location.reload()
    }

    return (
        <div className="bg-cover bg-gradient-to-b to-sky-700 from-gray-950 grid place-items-center">
            <Navbar />
            <button className="absolute top-10 bg-white p-2 rounded-2xl font-medium" onClick={(event) => navigate('/')}>Book Flights</button>
            {empty ? <p className="h-screen grid place-content-center text-white text-xl">No Booking :(</p> : 
            tickets.map((onedata) => {
                return <div className="bg-white w-3/4 p-10 grid place-items-center m-28">
                    <h1 className="font-semibold text-3xl text-neutral-700">book <img src={myLogo} className="inline-block h-14"/> flight</h1>
                    <div className="w-fit grid grid-cols-2 font-bold place-items-center m-5 border-2 p-5 pl-1"><p className="w-2/3 inline-block">{getLogo(onedata.Airline)}</p>{onedata.Airline}</div>
                    <div className="grid grid-cols-2 place-items-center">
                        <div className="border-2 p-2 w-full">FROM: <p className="font-bold inline-block">{onedata.Origin}</p></div>
                        <div className="border-2 p-2 w-full">TO: <p className="font-bold inline-block">{onedata.Destination}</p></div>
                        <div className="border-2 p-2 w-full">DEPARTURE: <p className="font-bold inline-block">{onedata.DepartTime}</p></div>
                        <div className="border-2 p-2 w-full">ARRIVAL: <p className="font-bold inline-block">{onedata.ArrivalTime}</p></div>
                        <div className="border-2 p-2 w-full">DATE: <p className="font-bold inline-block">{onedata.Date}</p></div>
                        <div className="border-2 p-2 w-full">CLASS: <p className="font-bold inline-block">{onedata.Class}</p></div>
                        <div className="border-2 p-2 w-full">TRAVELLERS: <p className="font-bold inline-block">{onedata.Travellers}</p></div>
                        <div className="border-2 p-2 w-full">TOTAL AMOUNT: <p className="font-bold inline-block">Rs. {onedata.TotalAmt}</p></div>
                        <button className="mt-5 col-span-2 w-fit bg-red-500 py-1 px-5 rounded-3xl text-lg text-white border-2 border-red-300 hover:bg-red-700"
                            onClick={(event) => deleteTicket(onedata.TicketID)}
                        >CANCEL TICKET</button>
                    </div>
                </div>
                })}
        </div>
    );
}

export default Ticket