import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";

function App() {
    // localStorage.clear();
    const [clients, setClients] = useState(() => {
        const saved = localStorage.getItem("clients");
        return saved ? JSON.parse(saved) : [];
    });
    const [cars, setCars] = useState(() => {
        const saved = localStorage.getItem("cars");
        return saved ? JSON.parse(saved) : [];
    });

    const [repairs, setRepairs] = useState(() => {
        const saved = localStorage.getItem("repairs");
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("repairs", JSON.stringify(repairs));
    }, [repairs]);
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);
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
                            orders={orders}
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
                            orders={orders}
                            setOrders={setOrders}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
