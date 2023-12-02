import React from "react";
import "./App.css";
import Navbar from "./components/header";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Calculator from "./pages/calculator";
import History from "./pages/history";
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="*" element={<Calculator />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/history" element={<History />}/>
            </Routes>
        </Router>
    );
}
 
export default App;