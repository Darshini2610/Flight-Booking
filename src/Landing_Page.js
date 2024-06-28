import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Papa from 'papaparse';
import Flight from './Flight.gif'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Landing_Page() {

    const navigate = useNavigate();

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

  let Airports = []
  csvData.forEach((airport, index) => {
    if (index > 1 && !Airports.includes(airport[0])) {
      Airports.push(airport[0]);
    }
  });

  const getAirport = (Airport) => {
    let AirportName = ''
    csvData.map((i) => {
      if (Airport === i[0]) {
        AirportName = i[1]
      }
    })
    return AirportName
  }
  
  const [selectfrom, setselectfrom] = useState('')
  const [fromAir, setfromAir] = useState('Indira Gandhi International Airport, Delhi')
  function fromAirport (event) {
    setselectfrom(event.target.value)
    setfromAir(getAirport(event.target.value))
  }
  localStorage.setItem('fromAirCode', selectfrom)
  localStorage.setItem('fromAirName', fromAir)

  const [selectto, setselectto] = useState('BOM')
  const [toAir, settoAir] = useState('Chhatrapati Shivaji International Airport, Mumbai')
  function toAirport (event) {
    setselectto(event.target.value)
    settoAir(getAirport(event.target.value))
  }
  localStorage.setItem('toAirCode', selectto)
  localStorage.setItem('toAirName', toAir)

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  if (selectedDate) { 
    localStorage.setItem('Date', selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}))
  }

  function setTravellers (travellers) {
    localStorage.setItem('Travellers', travellers)
  }
  function setClass (event) {
    localStorage.setItem('Class', event.target.value)
  }

  return (
    <div className='bg-gradient-to-b to-sky-700 from-gray-950 h-screen grid place-items-center'>
      <Navbar />
      <div className="h-3/5 w-2/3 rounded-xl mx-10 grid grid-cols-3 bg-sky-200 place-content-center shadow-lg shadow-black">
        <div className='h-full mx-10'>
        <p className="bg-sky-800 rounded-lg text-white px-2 text-center">From</p>
          <button className="border-black border-2 h-2/5 bg-white rounded-lg mb-5 w-full">
          <select className="w-full px-1 text-sky-800 font-bold text-lg rounded-lg" onChange={fromAirport}>
            {Airports.map((airport, index) => (        
                  <option key={index} value={airport}>
                    {airport}
                  </option>   
            ))}
          </select>
          <p className="text-left px-2">{fromAir}</p>
          </button>
          <p className="bg-sky-800 rounded-lg text-white px-2 text-center mt-5">Date</p>
          <div className="border-black border-2 h-1/4 bg-white rounded-lg px-2 pt-1 mb-4">
          <DatePicker
          className="rounded-lg text-lg text-sky-800 font-bold font-serif w-full"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd MMMM `yy"
          />
          {selectedDate && (
            <p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
          )}
          </div>         
        </div>
        <div className='h-full mx-10'>
          <p className="bg-sky-800 rounded-lg text-white px-2 text-center">To</p>
          <button className="border-black border-2 h-2/5 bg-white rounded-lg mb-5 w-full">
          <select className="w-full px-1 text-sky-800 font-bold text-lg rounded-lg" onChange={toAirport} value={selectto}>
            {Airports.map((airport, index) => (        
                  <option key={index} value={airport}>
                    {airport}
                  </option>   
            ))}
          </select>
          <p className="text-left px-2">{toAir}</p>
          </button>
          {fromAir === toAir ? <p className='text-red-500 text-xs font-medium mt-0 w-full'>Origin & Destination cannot be same</p> : null}
          <p className="bg-sky-800 rounded-lg text-white px-2 text-center mt-5">Travellers & Class</p>
          <div className="border-black border-2 h-1/4 bg-white rounded-lg">
            <select className="text-lg text-sky-800 font-bold font-serif py-1 px-2 rounded-lg w-full" onChange={(event) => setTravellers(event.target.value)}>
              <option>1 Traveller </option>
              <option>2 Travellers </option>
              <option>3 Travellers </option>
              <option>4 Travellers </option>
              <option>5 Travellers </option>
            </select>
            <select className=" pl-2 rounded-lg w-full" onChange={setClass}>
              <option>Economy </option>
              <option>Premium Economy </option>
              <option>Business </option>
            </select>
          </div>
        </div>
        <img src={Flight} className="grid place-self-center w-3/4 border-2 border-sky-800 rounded-lg"/>
      </div>
      <button className="absolute top-3/4 mt-3 bg-blue-500 py-1 px-5 rounded-3xl text-lg text-white border-2 border-sky-800 shadow-lg shadow-black hover:bg-sky-700"
        onClick={(event) => navigate('/Flights')}
      >SEARCH</button>
    </div>
  );
}

export default Landing_Page;
