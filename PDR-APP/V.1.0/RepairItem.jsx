export default function RepairItem({
    r,
    calculateFinalPrice,
    changeRepairStatus,
    startEditRepair,
    deleteRepair,
    updateRepair,
    editingRepairId
}) {
    const total = Number(calculateFinalPrice(r)) * Number(r.quantity);

    return (
        <div>
            <li style={{ listStyleType: "none" }}>
                <h3>{r.panel}</h3>
                <p>Opis: {r.description}</p>
                <p>
                    Cena bazowa:
                    {r.price} zł
                </p>
                <p>
                    Modyfikatory:
                    <li
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        Demontaż:
                        {r.isDisassembly === true
                            ? "Tak (" +
                              r.disassemblyTime +
                              "h) =" +
                              Number(r.disassemblyTime * 50) +
                              "zł"
                            : "0 zł"}
                        {r.isAluminium && <span>✅Aluminium(25%)</span>}
                        {r.isGlue && <span>✅Klej(10%)</span>}
                        {r.isEdge && <span>✅Rant(15%)</span>}
                        {r.isReinforcement && <span>✅Wzmocnienie(10%)</span>}
                        {r.isHSS && <span>✅Twarda blacha(20%)</span>}
                        {r.isSharp && <span>✅Ostra(10%)</span>}
                        {r.isDeep && <span>✅Głęboka(15%)</span>}
                        {r.isAluminium === false &&
                        r.isGlue === false &&
                        r.isEdge === false &&
                        r.isReinforcement === false &&
                        r.isHSS === false &&
                        r.isSharp === false &&
                        r.isDeep === false
                            ? "brak"
                            : ""}
                    </li>
                    <p>Łącznie:{r.modifiers}%</p>
                </p>
                <p>Ilość:{r.quantity}</p>
                <p>Szacowany czas naprawy:{r.estimatedRepairTime}h</p>
                <p>
                    Cena:
                    {total} zł
                </p>
                Status:
                <span
                    style={{
                        color:
                            r.status === "Nowa"
                                ? "red"
                                : r.status === "Zrobiona"
                                  ? "green"
                                  : "yellow"
                    }}
                >
                    {r.status}
                </span>
                <select
                    style={{ marginLeft: "1rem" }}
                    value={r.status}
                    onChange={e => changeRepairStatus(r, e.target.value)}
                >
                    <option value="Nowa">Nowa</option>
                    <option value="W trakcie">W trakcie</option>
                    <option value="Zrobiona">Zrobiona</option>
                </select>
                <button onClick={() => startEditRepair(r)}>✏️</button>
                <button onClick={() => deleteRepair(r)}>❌</button>
                {r.status === "Zrobiona" && (
                    <div>
                        Realny czas naprawy:{r.actualRepairTime} h
                        <input
                            style={{ width: "80%" }}
                            type="range"
                            min="0"
                            max="30"
                            step="0.5"
                            value={r.actualRepairTime}
                            onChange={e =>
                                updateRepair(r, {
                                    actualRepairTime: e.target.value
                                })
                            }
                        />
                    </div>
                )}
                <div style={{ fontSize: 8 }}>
                    <h3>Historia</h3>
                    <ul>
                        {r.history.map((h, i) => (
                            <li key={i}>
                                {h.date} – {h.action}
                            </li>
                        ))}
                    </ul>
                </div>
                {editingRepairId === r.id}
            </li>
        </div>
    );
}
