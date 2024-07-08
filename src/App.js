import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Header from "./components/Header";
import Cart from "./pages/cart";
import  "./main.css"
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
    <div className="routes">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>

    </div>


    </div>
  );
}

export default App;
