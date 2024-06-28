import React, {useState} from "react";
import myLogo from './mylogo.png'
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [Profile, setProfile] = useState(false)
    const viewProfile = () => {
        setProfile(!Profile)
    }
    const logout = () => {
        localStorage.removeItem('FName')
        localStorage.removeItem('LName')
        localStorage.removeItem('Phone')
        navigate('/');
    }

  return (
    <div className='m-3 absolute top-5 text-white flex justify-between w-full z-10'>
      <h1 className="font-semibold ml-5">book <img src={myLogo} className="inline-block h-8"/> flight</h1>
        {localStorage.getItem('Phone') ? <div><button><FaUserCircle size={30} onClick={viewProfile} className='mr-10'/></button>
            <div className={Profile ? 'mt-3 fixed right-5 bg-sky-100 rounded-lg p-3 grid place-items-end border-2 ' : 'hidden'}> 
                <p className="font-serif text-md text-cyan-950 font-semibold inline-block"> {localStorage.getItem('FName')} {localStorage.getItem('LName')}</p>
                <p className="text-cyan-950 text-sm">{localStorage.getItem('Phone')}</p>
                <button className="text-cyan-950 text-md font-medium font-serif " onClick={(event) => navigate('/Ticket')}>View Ticket</button>
                <p className="text-cyan-950" onClick={logout}>Logout</p>
            </div>
        </div> : <button className="mr-5" onClick={(event) => navigate('/SignIn')}>Login / Register</button>}
    </div>
  );
}

export default Navbar;