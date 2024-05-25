import ContactUs from "./pages/ContactUs/ContactUs"
import Diabetes from "./pages/Diabetes/Diabetes"
import DiabetesResult from "./pages/DiabetesResult/DiabetesResult"
import HDis from "./pages/HDis/HDis"
import HDisRes from "./pages/HDisRes/HDisRes"
import Home from "./pages/Home/Home"
import Information from "./pages/Information/Information"
import  Login from "./pages/Login/Login"
import Malaria from "./pages/Malaria/Malaria"
import MalariaResult from "./pages/MalariaResult/MalariaResult"
import Navbar from "./pages/Navbar/Navbar"
import Registration from "./pages/Registration/Registration"
import Welcome from "./pages/Welcome/Welcome"

function App() {
 
  return (
    <>
   <Navbar/>
   <Welcome/>
   <Login/>
   <Registration/>
   <Home/>
   <Diabetes/>
   <DiabetesResult/>
   <HDis/>
   <HDisRes/>
   <Malaria/>
   <MalariaResult/>
   <ContactUs/>
   <Information/>
    </>
  )
}

export default App
