import { BrowserRouter , Routes , Route } from "react-router-dom"
import Header from "./components/Header"
import FooterCom from "./components/footer"
import Dashboard from "./pages/Dashbord"


function App() {


  return (
 <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    <FooterCom/>
 </BrowserRouter>
  )
}

export default App
