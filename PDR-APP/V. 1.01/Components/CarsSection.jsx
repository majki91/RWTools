export default function CarsSection({
    cars,
    selectedClientId,
    searchCar,
    setSearchCar,
    setSelectedCarId,
    startEditCar,
    deleteCar,
    addCarForm,
    setAddCarForm,
    editingCarId,
    editCarName,
    setEditCarName,
    editModel,
    setEditModel,
    editYear,
    setEditYear,
    editRegistration,
    setEditRegistration,
    saveCarEdit,
    setEditingCarId,
    carName,
    setCarName,
    model,
    setModel,
    year,
    setYear,
    registration,
    setRegistration,
    addCar
}) {
    if (cars.length === 0) {
        return <span style={{ color: "red" }}>lista jest pusta</span>;
    }

    const filteredCars = cars
        .filter(c => selectedClientId === c.clientId)
        .filter(
            c =>
                c.carName.toLowerCase().includes(searchCar.toLowerCase()) ||
                c.model.toLowerCase().includes(searchCar.toLowerCase())
        );
    return (
        <>
            <h3>Lista aut</h3>
            <input
                onChange={e => setSearchCar(e.target.value)}
                placeholder="szukaj"
            />
            <ul>
                {filteredCars.map(c => (
                    <li key={c.carId}>
                        <p onClick={() => setSelectedCarId(c.carId)}>
                            {c.carName} {c.model} ({c.year}) /{c.registration}
                            <button onClick={() => startEditCar(c)}>✏️</button>
                            <button onClick={() => deleteCar(c.carId)}>
                                ❌
                            </button>
                        </p>
                    </li>
                ))}
            </ul>
            {addCarForm === true ? (
                ""
            ) : (
                <button onClick={() => setAddCarForm(true)}>Dodaj auto</button>
            )}

            {editingCarId && (
                <div style={{ marginBottom: "2rem" }}>
                    <h2>Edycja auta</h2>
                    <input
                        value={editCarName}
                        onChange={e => setEditCarName(e.target.value)}
                    />
                    <input
                        value={editModel}
                        onChange={e => setEditModel(e.target.value)}
                    />
                    <input
                        value={editYear}
                        onChange={e => setEditYear(e.target.value)}
                    />
                    <input
                        value={editRegistration}
                        onChange={e => setEditRegistration(e.target.value)}
                    />

                    <button onClick={saveCarEdit}>Zapisz</button>
                    <button onClick={() => setEditingCarId(null)}>
                        Anuluj
                    </button>
                </div>
            )}

            {addCarForm === true ? (
                <div>
                    <h2>Dodaj auto</h2>
                    <input
                        value={carName}
                        onChange={e => setCarName(e.target.value)}
                        placeholder="Marka"
                    />
                    <input
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        placeholder="Model"
                    />
                    <input
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        placeholder="Rok"
                    />
                    <input
                        value={registration}
                        onChange={e => setRegistration(e.target.value)}
                        placeholder="Rejestracja"
                    />
                    <button onClick={addCar}>Dodaj</button>
                    <button onClick={() => setAddCarForm(false)}>
                        Zamknij
                    </button>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
