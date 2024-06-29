import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./Pages/Home.jsx";
import { Tutorials } from './Pages/Tutorials';
import { Contact } from "./Pages/Contact.jsx";
import { Teams } from "./Pages/Teams.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { Overview } from "./Pages/Overview.jsx";
import { Library } from "./Pages/Library.jsx";
import { Events } from "./Pages/Events.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/tutorials" element={<Tutorials/>} />
               <Route path="/contact" element={<Contact/>} />
               <Route path="/teams" element={<Teams/>} />
               <Route path="/profile" element={<Profile/>} />
               <Route path="/Overview" element={<Overview/>} />
               <Route path="/Library" element={<Library/>} />
               <Route path="/Events" element={<Events/>} />
           </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
