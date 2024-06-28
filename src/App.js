import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing_Page from "./Landing_Page";
import SignIn from './SignIn'
import Flights from "./Flights";
import BookTicket from "./BookTicket";
import Ticket from "./Ticket";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Landing_Page} />
        <Route path='/SignIn' Component={SignIn} />
        <Route path='/Flights' Component={Flights} />
        <Route path='/BookTicket' Component={BookTicket} />
        <Route path='/Ticket' Component={Ticket} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;