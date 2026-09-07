export default function OrderItem({
    o,
    orderTotal,
    finalPrice,
    setSelectedOrderId,
    changeOrderStatus,
    startEditOrder,
    deleteOrder
}) {
    return (
        <li style={{ listStyleType: "none" }}>
            <div
                style={{
                    border: "1px solid black",

                    marginBottom: "5px"
                }}
            >
                <p
                    style={{ color: "blue" }}
                    onClick={() => setSelectedOrderId(o.id)}
                >
                    Numer zlecenia:
                    {o.orderNumber}
                </p>
                <p>
                    Status:{o.orderStatus}
                    <select
                        style={{
                            marginLeft: "1rem"
                        }}
                        value={o.orderStatus}
                        onChange={e => changeOrderStatus(o.id, e.target.value)}
                    >
                        <option value="Otwarte">Otwarte</option>
                        <option value="W trakcie">W trakcie</option>

                        <option value="Oczekiwanie na płatność">
                            Oczekiwanie na płatność
                        </option>
                        <option value="Zamknięte">Zamknięte</option>
                    </select>
                </p>
                <p>Suma:{orderTotal} zł</p>
                <p>Rabat:{o.discount} zł</p>
                <p>Cena finalna:{finalPrice} zł</p>
                <p>
                    Płatność:
                    <span
                        style={{
                            color:
                                Number(o.payment) >= Number(finalPrice)
                                    ? "green"
                                    : Number(o.payment) === 0
                                      ? "red"
                                      : "orange"
                        }}
                    >
                        {o.payment} zł
                    </span>
                </p>
                <p>Notatki:{o.orderNotes}</p>

                <p>Data otwarcia:{o.date}</p>
                <p>
                    Data zamknięcia:
                    {o.closeDate}
                </p>
                <div style={{ fontSize: 8 }}>
                    <h3>Historia</h3>
                    <ul>
                        {o.history.map((h, i) => (
                            <li key={i}>
                                {h.date} – {h.orderStatus}
                                {h.action}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={() => startEditOrder(o)}>✏️</button>
            <button onClick={() => deleteOrder(o.id)}>❌</button>
        </li>
    );
}
