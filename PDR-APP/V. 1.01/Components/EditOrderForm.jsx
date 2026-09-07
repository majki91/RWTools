export default function EditOrderForm({
    editOrderNumber,
    setEditOrderNumber,
    editDate,
    setEditDate,
    editOrderNotes,
    setEditOrderNotes,
    editDiscount,
    setEditDiscount,
    editPayment,
    setEditPayment,
    saveOrderEdit,
    setEditingOrderId
}) {
    return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                <h2>Edycja zlecenia</h2>
                <p>
                    Numer zlecenia
                    <input
                        value={editOrderNumber}
                        onChange={e => setEditOrderNumber(e.target.value)}
                    />
                </p>
                <p>
                    Data
                    <input
                        type="date"
                        value={editDate}
                        onChange={e => setEditDate(e.target.value)}
                    />
                </p>
                <p>
                    Notatka
                    <textarea
                        value={editOrderNotes}
                        onChange={e => setEditOrderNotes(e.target.value)}
                    ></textarea>
                </p>
                <p>
                    Rabat
                    <input
                        value={editDiscount}
                        onChange={e => setEditDiscount(e.target.value)}
                    />
                </p>
                <p>
                    Płatność
                    <input
                        value={editPayment}
                        onChange={e => setEditPayment(e.target.value)}
                    />
                </p>

                <button onClick={() => saveOrderEdit()}>Zapisz</button>
                <button onClick={() => setEditingOrderId(null)}>Anuluj</button>
            </div>
        </>
    );
}
