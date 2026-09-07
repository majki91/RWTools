import CarsSection from "../components/CarsSection";

export default function ClientsSection({
    clients,
    selectClient,
    startEditClient,
    deleteClient,
    addClientForm,
    clientName,
    clientSurname,
    phoneNumber,
    setClientName,
    setClientSurname,
    setPhoneNumber,
    addClient,
    setAddClientForm,
    setEditClientName,
    setEditClientSurname,
    setEditPhone,
    setEditingClientId,
    setSearchClient,
    searchClient,
    editingClientId,
    editClientName,
    editClientSurname,
    editPhone,
    saveClientEdit,
    selectedClientId,
    selectedClient,
    closeClient,
    cars,
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
    if (clients.length === 0) {
        return <span style={{ color: "red" }}>lista jest pusta</span>;
    }
    const filteredClients = clients.filter(
        cl =>
            cl.clientName.toLowerCase().includes(searchClient.toLowerCase()) ||
            cl.clientSurname.toLowerCase().includes(searchClient.toLowerCase())
    );
    return (
        <>
            <input
                onChange={e => setSearchClient(e.target.value)}
                placeholder="szukaj"
            />
            <ul>
                {filteredClients.map(cl => (
                    <li key={cl.clientId}>
                        <div>
                            <p
                                style={{
                                    marginRight: "2rem"
                                }}
                            >
                                <span onClick={() => selectClient(cl.clientId)}>
                                    {cl.clientName} {cl.clientSurname} (tel:
                                    {cl.phoneNumber})
                                </span>
                                <button onClick={() => startEditClient(cl)}>
                                    ✏️
                                </button>
                                <button
                                    onClick={() => deleteClient(cl.clientId)}
                                >
                                    ❌
                                </button>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            {addClientForm === true ? (
                <div>
                    <h2>Dodaj klienta</h2>
                    <input
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        placeholder="Imię"
                    />
                    <input
                        value={clientSurname}
                        onChange={e => setClientSurname(e.target.value)}
                        placeholder="Nazwisko"
                    />
                    <input
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="Telefon"
                    />

                    <button onClick={addClient}>Dodaj</button>
                    <button onClick={() => setAddClientForm(false)}>
                        Zamknij
                    </button>
                </div>
            ) : (
                <button onClick={() => setAddClientForm(true)}>
                    Dodaj klienta
                </button>
            )}
            {editingClientId && (
                <div style={{ marginBottom: "2rem" }}>
                    <h2>Edycja klienta</h2>
                    <input
                        value={editClientName}
                        onChange={e => setEditClientName(e.target.value)}
                    />
                    <input
                        value={editClientSurname}
                        onChange={e => setEditClientSurname(e.target.value)}
                    />
                    <input
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                    />

                    <button onClick={saveClientEdit}>Zapisz</button>
                    <button onClick={() => setEditingClientId(null)}>
                        Anuluj
                    </button>
                </div>
            )}
            {selectedClientId === null ? (
                ""
            ) : (
                <div style={{ marginBottom: "2rem" }}>
                    <h2>
                        Klient: {selectedClient?.clientName}{" "}
                        {selectedClient?.clientSurname}
                    </h2>
                    <button onClick={closeClient}>Zamknij klienta</button>
                    <CarsSection
                        cars={cars}
                        selectedClientId={selectedClientId}
                        searchCar={searchCar}
                        setSearchCar={setSearchCar}
                        setSelectedCarId={setSelectedCarId}
                        startEditCar={startEditCar}
                        deleteCar={deleteCar}
                        addCarForm={addCarForm}
                        setAddCarForm={setAddCarForm}
                        editingCarId={editingCarId}
                        editCarName={editCarName}
                        setEditCarName={setEditCarName}
                        editModel={editModel}
                        setEditModel={setEditModel}
                        editYear={editYear}
                        setEditYear={setEditYear}
                        editRegistration={editRegistration}
                        setEditRegistration={setEditRegistration}
                        saveCarEdit={saveCarEdit}
                        setEditingCarId={setEditingCarId}
                        carName={carName}
                        setCarName={setCarName}
                        model={model}
                        setModel={setModel}
                        year={year}
                        setYear={setYear}
                        registration={registration}
                        setRegistration={setRegistration}
                        addCar={addCar}
                    />
                </div>
            )}
        </>
    );
}
