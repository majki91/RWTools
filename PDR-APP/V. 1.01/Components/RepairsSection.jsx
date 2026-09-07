import RepairItem from "../components/RepairItem";

export default function RepairsSection({
    selectedOrder,
    selectedCar,
    repairs,
    selectedCarId,
    selectedOrderId,
    repairFilter,
    setRepairFilter,
    startEditRepair,
    changeRepairStatus,
    deleteRepair,
    updateRepair,
    editingRepairId,
    calculateFinalPrice,
    totalRepairsPrice
}) {
    return (
        <>
            <p>Naprawy zlecenia: {selectedOrder?.orderNumber} </p>
            <p>
                Naprawy auta: {selectedCar?.carName} {selectedCar?.model}
            </p>
            <h3>Lista napraw</h3>
            <select onChange={e => setRepairFilter(e.target.value)}>
                <option>Wszystkie</option>
                <option>Nowa</option>
                <option>W trakcie</option>
                <option>Zrobiona</option>
            </select>
            <ul
                style={{
                    paddingBottom: "1rem"
                }}
            >
                {repairs.length === 0 ? (
                    <span style={{ color: "red" }}>lista jest pusta</span>
                ) : (
                    ""
                )}
                {repairs
                    .filter(r => r.orderId === selectedOrderId)
                    .filter(r =>
                        repairFilter === "Wszystkie"
                            ? true
                            : r.status === repairFilter
                    )
                    .map(r => (
                        <RepairItem
                            r={r}
                            key={r.id}
                            startEditRepair={startEditRepair}
                            changeRepairStatus={changeRepairStatus}
                            deleteRepair={deleteRepair}
                            updateRepair={updateRepair}
                            editingRepairId={editingRepairId}
                            calculateFinalPrice={calculateFinalPrice}
                        />
                    ))}
            </ul>
            <p>Suma wszystkich napraw: {totalRepairsPrice} zł</p>
        </>
    );
}
