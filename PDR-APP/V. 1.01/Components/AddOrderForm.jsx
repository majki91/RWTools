export default function AddOrderForm({
    orderNumber,
    setOrderNumber,
    date,
    setDate,
    orderNotes,
    setOrderNotes,
    addOrder,
    setAddOrderForm
}) {
    return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                {" "}
                <p>
                    Numer zlecenia
                    <input
                        value={orderNumber}
                        onChange={e => setOrderNumber(e.target.value)}
                    />
                </p>
                <p>
                    Data
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </p>
                <p>
                    Notatka
                    <textarea
                        value={orderNotes}
                        onChange={e => setOrderNotes(e.target.value)}
                    ></textarea>
                </p>
                <button onClick={() => addOrder()}>Dodaj</button>
                <button onClick={() => setAddOrderForm(false)}>Anuluj</button>
            </div>
        </>
    );
}
