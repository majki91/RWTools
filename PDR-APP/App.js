import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ClientsContext from "./context/ClientsContext";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";



function App() {
    const [clients, setClients] = useState([]);
    const [cars, setCars] = useState([]);
    const [repairs, setRepairs] = useState([]);
    
    useEffect(() => {
    const savedRepairs = localStorage.getItem("repairs");

    if (savedRepairs) {
        setRepairs(JSON.parse(savedRepairs));
    }
}, []);
useEffect(() => {
    const savedCars = localStorage.getItem("cars");

    if (savedCars) {
        setCars(JSON.parse(savedCars));
    }
}, []);
useEffect(() => {
    const savedClients = localStorage.getItem("clients");

    if (savedClients) {
        setClients(JSON.parse(savedClients));
    }
}, []);

useEffect(() => {
    localStorage.setItem("repairs", JSON.stringify(repairs));
}, [repairs]);
useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
}, [cars]);
useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
}, [clients]);
    
    return (
        <div
            style={{
                background: "#f9f9f9",
                padding: "20px",
                minHeight: "100vh"
            }}
        >
            <nav
                style={{
                    padding: "10px",
                    margin: "5px",
                    borderBottom: "1px solid #ccc"
                }}
            >
                <Link style={{ margin: "5px" }} to="/test">
                    Klienci
                </Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>

            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            clients={clients}
                            cars={cars}
                            repairs={repairs}
                        />
                    }
                />
                <Route
                    path="/test"
                    element={
                        <TestPage
                            clients={clients}
                            setClients={setClients}
                            cars={cars}
                            setCars={setCars}
                            repairs={repairs}
                            setRepairs={setRepairs}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
