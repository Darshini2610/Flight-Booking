import React, { useState, useEffect } from "react";
import axios from "axios";
import myLogo from './mylogo.png'
import { useNavigate } from "react-router-dom";

function SignIn () {

    const navigate = useNavigate()

    const [flightNames, setFlightNames] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState('');


    useEffect(() => {
        // Fetch airline names from the server
        fetch('/api/flightNames')
          .then((response) => response.json())
          .then((data) => setFlightNames(data))
          .catch((error) => console.error(error));
      }, []);


    const handleFlightChange = (e) => {
        setSelectedFlight(e.target.value);
    };

    const [Phone, setPhone] = useState('')
    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [Contact, setContact] = useState('')
    const [log, setlog] = useState(null)
    const [reg, setreg] = useState(null)

    const LogIn = () => {
        axios.post("http://localhost:3001/login", {
            phone: Phone
        }).then((response) => {
            if (response.data === 'Not Registered') {
                setlog(response.data)
            }
            else {
                localStorage.setItem('CustID', response.data[0].custID)
                localStorage.setItem('FName', response.data[0].fname)
                localStorage.setItem('LName', response.data[0].lname)
                localStorage.setItem('Phone', response.data[0].contact)
                navigate(-1)
            }
        }
        );
    }

    let flightName = ['Indigo', 'SpiceJet', 'AirIndia', 'GoFirst', 'Vistara']

    const Register = () => {
            axios.post("http://localhost:3001/register", {
                fname: FName,
                lname: LName,
                contact: Contact,
                airline: selectedFlight
            }).then((response) => {
                    if (response.data === 'Already Registered') {
                        setreg(response.data)
                    }
                    else {                                           
                        localStorage.setItem('FName', response.data[0].fname)
                        localStorage.setItem('LName', response.data[0].lname)
                        localStorage.setItem('Phone', response.data[0].contact)
                        navigate(-1)
                    }
                }
            );
        }

    return (
        <div className="h-screen bg-gradient-to-b to-sky-700 from-gray-950">
            <div className="grid grid-cols-2 place-items-center">
                <h1 className="font-semibold m-20 col-span-2 text-3xl text-white">book <img src={myLogo} className="inline-block h-14"/> flight</h1>
                <div className='h-full shadow-lg shadow-slate-900 bg-white p-5 grid w-2/3'>
                    <h2 className="text-center text-lg m-2">LOGIN</h2>
                    <label>Phone Number:</label>
                    <input className="border-2 rounded-md px-2" onChange={(event) => {setPhone(event.target.value)}}/>
                    {log ? <p className='text-red-500 text-sm'>{log}</p> : null}
                     <button className="border-2 rounded-md bg-green-500 border-black mt-4" onClick={LogIn}>LogIn</button>
                </div>
                <div className='h-full shadow-lg shadow-slate-900 bg-white p-5 grid w-2/3'>
                    <h2 className="text-center text-lg m-2">REGISTER</h2>
                    <label>First Name:</label>
                    <input className="border-2 rounded-md px-2" type='tel' onChange={(event) => {setFName(event.target.value)}}/>
                    <label>Last Name:</label>
                    <input className="border-2 rounded-md px-2" type='tel' onChange={(event) => {setLName(event.target.value)}}/>
                    <label>Phone Number:</label>
                    <input className="border-2 rounded-md px-2" type='tel' onChange={(event) => {setContact(event.target.value)}}/>
                    <label htmlFor="flight">Select a Flight:</label>
                    <select name="flight" id="flight" value={selectedFlight} onChange={(event) => handleFlightChange(event)}>
                        <option value="">Select a flight</option>
                        {flightName.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                        ))}
                    </select>
                    {reg ? <p className='text-red-500 text-sm'>{reg}</p> : null}
                     <button className="border-2 rounded-md bg-green-500 border-black mt-4" onClick={Register}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;