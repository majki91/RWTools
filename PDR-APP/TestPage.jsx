import { useState, useEffect } from "react";

export default function TestPage({
    clients,
    setClients,
    cars,
    setCars,
    repairs,
    setRepairs
}) {
    const today = new Date().toISOString().split("T")[0];

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clientName, setClientName] = useState("");
    const [clientSurname, setClientSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addClientForm, setAddClientForm] = useState(false);

    const [editingClientId, setEditingClientId] = useState(null);
    const [editClientName, setEditClientName] = useState("");
    const [editClientSurname, setEditClientSurname] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [searchClient, setSearchClient] = useState("");

    const [selectedCarId, setSelectedCarId] = useState(null);
    const [carName, setCarName] = useState("");
    const [carId, setCarId] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [registration, setRegistration] = useState("");
    const [addCarForm, setAddCarForm] = useState(false);
    const [searchCar, setSearchCar] = useState("");
    const [editingCarId, setEditingCarId] = useState(null);
    const [editCarName, setEditCarName] = useState("");
    const [editModel, setEditModel] = useState("");
    const [editYear, setEditYear] = useState("");
    const [editRegistration, setEditRegistration] = useState("");

    const [panel, setPanel] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Nowa");
    const [date, setDate] = useState(today);
    const [description, setDescription] = useState("");
    const [isDisassembly, setIsDisassembly] = useState(false);
    const [disassemblyTime, setDisassemblyTime] = useState("");
    const [isAluminium, setIsAluminium] = useState(false);
    const [isGlue, setIsGlue] = useState(false);
    const [isEdge, setIsEdge] = useState(false);
    const [isReinforcement, setIsReinforcement] = useState(false);
    const [isHSS, setIsHSS] = useState(false);
    const [isSharp, setIsSharp] = useState(false);
    const [isDeep, setIsDeep] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [orderNumber, setOrderNumber] = useState("");

    const [newPrice, setNewPrice] = useState("");
    const [newPanel, setNewPanel] = useState("");
    const [editingRepairId, setEditingRepairId] = useState(null);
    const [repairFilter, setRepairFilter] = useState("Wszystkie");

    let modifiers = 0;
    let disassemblyPrice = Number(disassemblyTime * 50);

    if (isAluminium) modifiers += 25;
    if (isGlue) modifiers += 10;
    if (isEdge) modifiers += 15;
    if (isReinforcement) modifiers += 10;
    if (isHSS) modifiers += 20;
    if (isSharp) modifiers += 10;
    if (isDeep) modifiers += 15;

    useEffect(() => {
        const year = new Date().getFullYear();
        const suggestion = `${year}/${repairs.length + 1}`;
        setOrderNumber(suggestion);
    }, [repairs.length]);

    function calculateFinalPrice(r) {
        const base = Number(r.price);
        const mod = Number(r.modifiers || 0);
        const dis = r.isDisassembly ? Number(r.disassemblyTime) * 50 : 0;

        const perItem = base + base * (mod / 100) + dis;

        return perItem;
    }

    //komponenty
    function RepairItem({ r }) {
        return (
            <div>
                <li style={{ listStyleType: "none" }}>
                    <p>Zlecenie:{r.orderNumber}</p>
                    <p>
                        {r.panel}– {r.price} zł
                    </p>
                    <p>Termin: {r.date}</p>
                    <p>Opis: {r.description}</p>
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
                                : ""}
                            {r.isAluminium && <span>✅Aluminium(25%)</span>}
                            {r.isGlue && <span>✅Klej(10%)</span>}
                            {r.isEdge && <span>✅Rant(15%)</span>}
                            {r.isReinforcement && (
                                <span>✅Wzmocnienie(10%)</span>
                            )}
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
                    </p>
                    <p>Ilość:{r.quantity}</p>
                    <p>
                        Cena finalna:
                        {Number(calculateFinalPrice(r)) * Number(r.quantity)} zł
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
                        onChange={e => changeStatus(r.id, e.target.value)}
                    >
                        <option value="Nowa">Nowa</option>
                        <option value="W trakcie">W trakcie</option>
                        <option value="Zrobiona">Zrobiona</option>
                    </select>
                    <button onClick={() => startEdit(r)}>✏️</button>
                    <button onClick={() => deleteRepair(r.id)}>❌</button>
                    <div style={{ fontSize: 8 }}>
                        <h3>Historia</h3>
                        <ul>
                            {r.history.map((h, i) => (
                                <li key={i}>
                                    {h.date} – {h.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {editingRepairId === r.id}
                </li>
            </div>
        );
    }
    //funkcje

    // funkcje klienta
    function selectClient(id) {
        setSelectedClientId(id);
        setSelectedCarId(null);
    }

    function closeClient() {
        setSelectedCarId(null);
        setSelectedClientId(null);
    }

    function addClient() {
        const newClient = {
            clientId: Date.now() + Math.random(),
            clientName: clientName,
            clientSurname: clientSurname,
            phoneNumber: phoneNumber
        };

        setClients([...clients, newClient]);
        setClientName("");
        setClientSurname("");
        setPhoneNumber("");
        setAddClientForm(false);
    }

    function deleteClient(id) {
        const clientCarIds = cars
            .filter(c => c.clientId === id)
            .map(c => c.carId);
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");

        if (!confirmDelete) return;

        setClients(clients.filter(c => c.clientId !== id));
        setCars(cars.filter(c => c.clientId !== id));
        setRepairs(repairs.filter(r => !clientCarIds.includes(r.carId)));
        // setRepairs(repairs.filter(r => r.carId !== id));
        closeClient();
    }

    function startEditClient(cl) {
        setEditingClientId(cl.clientId);
        setEditClientName(cl.clientName);
        setEditClientSurname(cl.clientSurname);
        setEditPhone(cl.phoneNumber);
    }

    function saveClientEdit() {
        setClients(
            clients.map(cl =>
                cl.clientId === editingClientId
                    ? {
                          ...cl,
                          clientName: editClientName,
                          clientSurname: editClientSurname,
                          phoneNumber: editPhone
                      }
                    : cl
            )
        );

        setEditingClientId(null);
    }

    //funkcje auta

    function addCar() {
        const newCar = {
            clientId: selectedClientId,
            carId: Date.now() + Math.random(),
            carName: carName,
            model: model,
            year: year,
            registration: registration
        };

        setCars([...cars, newCar]);
        setCarName("");
        setModel("");
        setYear("");
        setRegistration("");
        setAddCarForm(false);
    }

    function deleteCar(id) {
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");
        if (!confirmDelete) return;
        setCars(cars.filter(c => c.carId !== id));
        setRepairs(repairs.filter(r => r.carId !== id));
    }
    function startEditCar(c) {
        setEditingCarId(c.carId);
        setEditCarName(c.carName);
        setEditModel(c.model);
        setEditYear(c.year);
        setEditRegistration(c.registration);
    }

    function saveCarEdit() {
        setCars(
            cars.map(c =>
                c.carId === editingCarId
                    ? {
                          ...c,
                          carName: editCarName,
                          model: editModel,
                          year: editYear,
                          registration: editRegistration
                      }
                    : c
            )
        );

        setEditingCarId(null);
    }

    //funkcje wgniecenia
    function addRepair() {
        const newRepair = {
            id: Date.now() + Math.random(),
            orderNumber: orderNumber,
            carId: selectedCarId,
            panel: panel,
            price: Number(price),
            modifiers: Number(modifiers),
            status: status,
            history: [
                { date: new Date().toLocaleDateString(), status: status }
            ],
            date: date,
            description: description,
            isDisassembly: isDisassembly,
            disassemblyTime: disassemblyTime,
            isAluminium: isAluminium,
            isGlue: isGlue,
            isEdge: isEdge,
            isReinforcement: isReinforcement,
            isHSS: isHSS,
            isSharp: isSharp,
            isDeep: isDeep,
            quantity: quantity
        };

        setRepairs([...repairs, newRepair]);

        setPanel("");
        setPrice("");
        setDescription("");
        setIsDisassembly(false);
        setDisassemblyTime("");
        setIsAluminium(false);

        setIsGlue(false);
        setIsEdge(false);
        setIsReinforcement(false);
        setIsHSS(false);
        setIsSharp(false);
        setIsDeep(false);
        setQuantity(1);
    }

    function deleteRepair(id) {
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");
        if (!confirmDelete) return;
        setRepairs(repairs.filter(r => r.id !== id));
    }
    function startEdit(r) {
        setEditingRepairId(r.id);
        setPanel(r.panel);
        setPrice(r.price);
        setDescription(r.description);
        setIsDisassembly(r.isDisassembly);
        setDisassemblyTime(r.disassemblyTime);
        setIsAluminium(r.isAluminium);
        setIsGlue(r.isGlue);
        setIsEdge(r.isEdge);
        setIsReinforcement(r.isReinforcement);
        setIsHSS(r.isHSS);
        setIsSharp(r.isSharp);
        setIsDeep(r.isDeep);
        setQuantity(r.quantity);
    }

    function handleSaveRepair() {
        setRepairs(
            repairs.map(r =>
                r.id === editingRepairId
                    ? {
                          ...r,
                          price: price,
                          panel: panel,
                          description: description,
                          isDisassembly: isDisassembly,
                          disassemblyTime: disassemblyTime,
                          isAluminium: isAluminium,
                          isGlue: isGlue,
                          isEdge: isEdge,
                          isReinforcement: isReinforcement,
                          isHSS: isHSS,
                          isSharp: isSharp,
                          isDeep: isDeep,
                          quantity: quantity
                      }
                    : r
            )
        );

        setEditingRepairId(null);
        setPanel("");
        setPrice("");
        setDescription("");
        setIsDisassembly(false);
        setDisassemblyTime("");
        setIsAluminium(false);
        setIsGlue(false);
        setIsEdge(false);
        setIsReinforcement(false);
        setIsHSS(false);
        setIsSharp(false);
        setIsDeep(false);
        setQuantity(1);
        setDisassemblyTime(0);
    }

    function changeStatus(id, newStatus) {
        setRepairs(
            repairs.map(r =>
                r.id === id
                    ? r.status != newStatus
                        ? {
                              ...r,
                              status: newStatus,
                              history: [
                                  ...r.history,
                                  {
                                      date: new Date().toLocaleDateString(),
                                      status: newStatus
                                  }
                              ]
                          }
                        : r
                    : r
            )
        );
    }

    const totalRepairsPrice = repairs
        .filter(r => selectedCarId === r.carId)
        .reduce(
            (sum, r) =>
                sum + Number(calculateFinalPrice(r)) * Number(r.quantity),
            0
        );

    const selectedCar = cars.find(c => c.carId === selectedCarId);
    const selectedClient = clients.find(c => c.clientId === selectedClientId);
    return (
        <div style={{ padding: 20 }}>
            <div>
                <h2>Lista klientów</h2>
                <input
                    onChange={e => setSearchClient(e.target.value)}
                    placeholder="szukaj"
                />
                <ul>
                    {clients.length === 0 ? (
                        <span style={{ color: "red" }}>lista jest pusta</span>
                    ) : (
                        clients
                            .filter(
                                cl =>
                                    cl.clientName
                                        .toLowerCase()
                                        .includes(searchClient.toLowerCase()) ||
                                    cl.clientSurname
                                        .toLowerCase()
                                        .includes(searchClient.toLowerCase())
                            )
                            .map(cl => (
                                <li key={cl.clientId}>
                                    <div>
                                        <p
                                            style={{
                                                marginRight: "2rem"
                                            }}
                                        >
                                            <span
                                                onClick={() =>
                                                    selectClient(cl.clientId)
                                                }
                                            >
                                                {cl.clientName}{" "}
                                                {cl.clientSurname} (tel:
                                                {cl.phoneNumber})
                                            </span>
                                            <button
                                                onClick={() =>
                                                    startEditClient(cl)
                                                }
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteClient(cl.clientId)
                                                }
                                            >
                                                ❌
                                            </button>
                                        </p>
                                    </div>
                                </li>
                            ))
                    )}
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
                    <div>
                        <h2>
                            Klient: {selectedClient?.clientName}{" "}
                            {selectedClient?.clientSurname}
                        </h2>
                        <button onClick={closeClient}>Zamknij klienta</button>
                        <h3>Lista aut</h3>
                        <input
                            onChange={e => setSearchCar(e.target.value)}
                            placeholder="szukaj"
                        />
                        <ul>
                            {cars.length === 0 ? (
                                <span style={{ color: "red" }}>
                                    lista jest pusta
                                </span>
                            ) : (
                                cars
                                    .filter(
                                        c => selectedClientId === c.clientId
                                    )
                                    .filter(
                                        c =>
                                            c.carName
                                                .toLowerCase()
                                                .includes(
                                                    searchCar.toLowerCase()
                                                ) ||
                                            c.model
                                                .toLowerCase()
                                                .includes(
                                                    searchCar.toLowerCase()
                                                )
                                    )
                                    .map(c => (
                                        <li key={c.carId}>
                                            <p
                                                onClick={() =>
                                                    setSelectedCarId(c.carId)
                                                }
                                            >
                                                {c.carName} {c.model} ({c.year})
                                                /{c.registration}
                                                <button
                                                    onClick={() =>
                                                        startEditCar(c)
                                                    }
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteCar(c.carId)
                                                    }
                                                >
                                                    ❌
                                                </button>
                                            </p>
                                        </li>
                                    ))
                            )}
                        </ul>
                        {addCarForm === true ? (
                            ""
                        ) : (
                            <button onClick={() => setAddCarForm(true)}>
                                Dodaj auto
                            </button>
                        )}
                    </div>
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
            </div>
            {selectedCarId === null ? (
                ""
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}
                >
                    <p>
                        Naprawy auta: {selectedCar?.carName}{" "}
                        {selectedCar?.model}{" "}
                    </p>
                    {selectedCarId === null ? (
                        ""
                    ) : (
                        <button onClick={() => setSelectedCarId(null)}>
                            Zamknij auto
                        </button>
                    )}
                    
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
                        {repairs
                            .filter(r => selectedCarId === r.carId)
                            .filter(r =>
                                repairFilter === "Wszystkie"
                                    ? true
                                    : r.status === repairFilter
                            )
                            .map(r => (
                                <RepairItem r={r} key={r.id} />
                            ))}
                    </ul>
                    <p>Suma napraw: {totalRepairsPrice} zł</p>
                    <h2>
                        {editingRepairId != null
                            ? "Edytuj wgniecenia"
                            : "Dodaj wgniecenia"}
                    </h2>
                    <input
                        value={orderNumber}
                        onChange={e => setOrderNumber(e.target.value)}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <select
                        value={panel}
                        onChange={e => setPanel(e.target.value)}
                    >
                        <option value="" disabled>
                            Wybierz część
                        </option>

                        <optgroup label="Przód">
                            <option value="Maska">Maska</option>
                            <option value="Zderzak przedni">
                                Zderzak przedni
                            </option>
                            <option value="Błotnik lewy przód">
                                Błotnik lewy przód
                            </option>
                            <option value="Błotnik prawy przód">
                                Błotnik prawy przód
                            </option>
                            <option value="Słupek A lewy">Słupek A lewy</option>
                            <option value="Słupek A prawy">
                                Słupek A prawy
                            </option>
                        </optgroup>

                        <optgroup label="Bok">
                            <option value="Drzwi lewe przednie">
                                Drzwi lewe przednie
                            </option>
                            <option value="Drzwi prawe przednie">
                                Drzwi prawe przednie
                            </option>
                            <option value="Drzwi lewe tylne">
                                Drzwi lewe tylne
                            </option>
                            <option value="Drzwi prawe tylne">
                                Drzwi prawe tylne
                            </option>
                            <option value="Próg lewy">Próg lewy</option>
                            <option value="Próg prawy">Próg prawy</option>
                            <option value="Słupek B lewy">Słupek B lewy</option>
                            <option value="Słupek B prawy">
                                Słupek B prawy
                            </option>
                        </optgroup>

                        <optgroup label="Tył">
                            <option value="Klapa bagażnika">
                                Klapa bagażnika
                            </option>
                            <option value="Zderzak tylny">Zderzak tylny</option>
                            <option value="Błotnik lewy tył">
                                Błotnik lewy tył
                            </option>
                            <option value="Błotnik prawy tył">
                                Błotnik prawy tył
                            </option>
                            <option value="Słupek C lewy">Słupek C lewy</option>
                            <option value="Słupek C prawy">
                                Słupek C prawy
                            </option>
                        </optgroup>

                        <optgroup label="Inne">
                            <option value="Dach">Dach</option>
                            <option value="Inne">Inne</option>
                        </optgroup>
                    </select>

                    <select
                        onChange={e => setPrice(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Wybierz rozmiar
                        </option>
                        <option value="100">0-30mm(S)</option>
                        <option value="200">30-60mm(M)</option>
                        <option value="400">60-100mm(L)</option>
                        <option value="600">100mm+(XL)</option>
                    </select>
                    <input
                        placeholder="Cena"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <textarea
                        style={{ height: "3rem" }}
                        placeholder="Opis:"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <p>
                        <input
                            type="checkbox"
                            checked={isDisassembly}
                            onChange={e => setIsDisassembly(e.target.checked)}
                        />
                        Demontaż
                        {isDisassembly && (
                            <input
                                value={disassemblyTime}
                                onChange={e =>
                                    setDisassemblyTime(e.target.value)
                                }
                                placeholder="Czas demontażu w h"
                            />
                        )}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <p>
                            <input
                                type="checkbox"
                                checked={isAluminium}
                                onChange={e => setIsAluminium(e.target.checked)}
                            />
                            <span>Aluminium(25%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isGlue}
                                onChange={e => setIsGlue(e.target.checked)}
                            />
                            <span>Klej(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isEdge}
                                onChange={e => setIsEdge(e.target.checked)}
                            />
                            <span>Rant(15%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isReinforcement}
                                onChange={e =>
                                    setIsReinforcement(e.target.checked)
                                }
                            />
                            <span> Wzmocnienie(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isHSS}
                                onChange={e => setIsHSS(e.target.checked)}
                            />
                            <span>Twarda blacha(20%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isSharp}
                                onChange={e => setIsSharp(e.target.checked)}
                            />
                            <span> Ostra(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isDeep}
                                onChange={e => setIsDeep(e.target.checked)}
                            />
                            <span>Głęboka(15%)</span>
                        </p>
                    </div>
                    <p>Bazowa cena wgniecenia:{price} zł</p>

                    <p>Modyfikatory: {modifiers}%</p>
                    {isDisassembly ? <p>Demontaż:{disassemblyPrice} zł</p> : ""}
                    <p>
                        Aktualna cena wgniecenia:
                        {Number(price) +
                            price * (Number(modifiers) / 100) +
                            (isDisassembly ? disassemblyTime * 50 : 0) *
                                quantity}
                        zł
                    </p>
                    <input
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        placeholder="Ilosć"
                    />
                    <button
                        onClick={
                            editingRepairId === null
                                ? addRepair
                                : handleSaveRepair
                        }
                    >
                        {editingRepairId != null ? "Zapisz" : "Dodaj"}
                    </button>
                </div>
            )}
        </div>
    );
}
