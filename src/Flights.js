import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse'
import Navbar from "./Navbar";
import IndiGo from './IndiGo.jpeg'
import AirAsia from './AirAsia.png'
import GoFirst from './GoFirst.jpeg'
import Vistara from './Vistara.png'
import SpiceJet from './SpiceJet.png'
import AirIndia from './AirIndia.png'

export let bookflight;
export let flightLogo;

function Flights () {

    const navigate = useNavigate();
    function navigatetoBook (flight) {
        if (localStorage.getItem('Phone') === null) {
            navigate('/SignIn')
        }
        else {
            bookflight = flight;
            flightLogo = getLogo(flight);
            navigate('/BookTicket')
        }
    }

    const fromAirport = localStorage.getItem('fromAirName')
    const toAirport = localStorage.getItem('toAirName')
    const fromAirportCode = localStorage.getItem('fromAirCode')
    const toAirportCode = localStorage.getItem('toAirCode')
    const date = localStorage.getItem('Date')
    const travellers = localStorage.getItem('Travellers')
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

    const [csvData, setCsvData] = useState([]);
    useEffect(() => {
        fetch('/domestic_flights.csv')
        .then((response) => response.text())
        .then((csvContent) => {
            Papa.parse(csvContent, {
            complete: (result) => {
                setCsvData(result.data);
            },
            });
        })
        .catch((error) => {
            console.error('Error fetching or parsing CSV file:', error);
        });
    }, []); 

    const getLogo = (airline) => {
        if (airline[6] === 'IndiGo') {
            return <img src={IndiGo} />
        }
        if (airline[6] === 'AirAsia India') {
            return <img src={AirAsia} />;
        }
        if (airline[6] === 'Go First') {
            return <img src={GoFirst} />;
        }
        if (airline[6] === 'Vistara') {
            return <img src={Vistara} />;
        }
        if (airline[6] === 'SpiceJet') {
            return <img src={SpiceJet} />;
        }
        if (airline[6] === 'Air India') {
            return <img src={AirIndia} />;
        }
    }

    return (
        <div className="bg-gray-950 place-items-center h-screen">
            <Navbar />
            <div className="absolute top-5 place-items-center w-full flex justify-center gap-x-5 ">
                <div className=" bg-gray-500 bg-opacity-30 rounded-lg p-2 w-1/5 font-semibold">
                    <p className="text-blue-500 text-sm">FROM</p>
                    <p className="text-white overflow-hidden truncate">{fromAirport}</p>
                </div>
                <div className=" bg-gray-500 bg-opacity-30 rounded-lg p-2 w-1/5 font-semibold">
                    <p className="text-blue-500 text-sm">TO</p>
                    <p className="text-white overflow-hidden truncate">{toAirport}</p>
                </div>
                <div className=" bg-gray-500 bg-opacity-30 rounded-lg p-2 w-fit font-semibold">
                    <p className="text-blue-500 text-sm">DATE</p>
                    <p className="text-white">{date}</p>
                </div>
                <div className=" bg-gray-500 bg-opacity-30 rounded-lg p-2 w-1/6 font-semibold">
                    <p className="text-blue-500 text-sm">PASSENGERS & CLASS</p>
                    <p className="text-white overflow-hidden truncate">{travellers}, {localStorage.getItem('Class')}</p>
                </div>
            </div>
            <div className="text-black grid place-items-center gap-y-5 absolute top-1/4 w-screen bg-cover bg-gradient-to-b to-sky-500 from-gray-950">
            {csvData.map((flight, index) => {
                if (flight[0] === fromAirportCode) {
                    if (flight[2] === toAirportCode) {
                        if(flight[Class]!=0){
                            return (
                                <div className="bg-white w-4/5 m-2 grid grid-cols-6 p-2 border-2 border-black text-center place-items-center shadow-lg shadow-black hover:w-5/6">
                                    <div className="text-lg font-medium grid place-items-center"><p className="w-2/3">{getLogo(flight)}</p>{flight[6]}</div>
                                    <div className="m-2 text-lg font-bold">{flight[3]}<p className="text-base font-normal">{flight[0]} - {fromAirport}</p></div>
                                    <div className="m-2 text-lg font-bold">{flight[5]}<p className="text-base font-normal">{flight[2]} - {toAirport}</p></div>                                
                                    <div className="m-2">Duration<p className="text-lg font-bold">{flight[4]}</p></div>
                                    <p className="m-2 text-xl font-bold">Rs. {flight[Class]}</p>
                                    <button className="bg-blue-500 py-1 px-4 rounded-3xl text-white border-2 border-sky-800 hover:bg-blue-700"
                                        onClick={(event) => navigatetoBook(flight)}
                                    >BOOK NOW</button>                                   
                                </div>
                           
                            )
                        }
                    }
                }
            }) }
             </div>
                
        </div>
        
    );
}

export default Flights;