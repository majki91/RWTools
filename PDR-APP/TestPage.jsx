import { useState, useEffect } from "react";

export default function TestPage({
    clients,
    setClients,
    cars,
    setCars,
    repairs,
    setRepairs,
    orders,
    setOrders
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

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderNumber, setOrderNumber] = useState("");
    const [date, setDate] = useState(today);
    const [orderStatus, setOrderStatus] = useState("Otwarte");
    const [orderNotes, setOrderNotes] = useState("");
    const [addOrderForm, setAddOrderForm] = useState(false);
    const [editingOrderId, setEditingOrderId] = useState("");
    const [editOrderNumber, setEditOrderNumber] = useState("");
    const [editDate, setEditDate] = useState("");

    const [panel, setPanel] = useState("");
    const [price, setPrice] = useState(0);
    const [rabat, setRabat] = useState(0);
    const [status, setStatus] = useState("Nowa");

    const [addRepairForm, setAddRepairForm] = useState(false);
    const [description, setDescription] = useState("");
    const [isDisassembly, setIsDisassembly] = useState(false);
    const [disassemblyTime, setDisassemblyTime] = useState(0);
    const [isAluminium, setIsAluminium] = useState(false);
    const [isGlue, setIsGlue] = useState(false);
    const [isEdge, setIsEdge] = useState(false);
    const [isReinforcement, setIsReinforcement] = useState(false);
    const [isHSS, setIsHSS] = useState(false);
    const [isSharp, setIsSharp] = useState(false);
    const [isDeep, setIsDeep] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [estimatedRepairTime, setEstimatedRepairTime] = useState(0);
    const [actualRepairTime, setActualRepairTime] = useState(0);
    const [paid, setPaid] = useState("Nieopłacone");

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

    let actualPrice =
        calculateFinalPrice({
            price,
            modifiers,
            isDisassembly,
            disassemblyTime
        }) * quantity;

    useEffect(() => {
        const year = new Date().getFullYear();
        const suggestion = `${year}/${orders.length + 1}`;
        setOrderNumber(suggestion);
    }, [orders.length]);

    function calculateFinalPrice(r) {
        const base = Number(r.price);
        const mod = Number(r.modifiers || 0);
        const dis = r.isDisassembly ? Number(r.disassemblyTime) * 50 : 0;

        const perItem = base + base * (mod / 100) + dis;

        return perItem;
    }

    //komponenty
    function RepairItem({ r }) {
        const total = Number(calculateFinalPrice(r)) * Number(r.quantity);

        const afterDiscount = total - Number(r.rabat);
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
                        <p>Łącznie:{r.modifiers}%</p>
                    </p>
                    <p>Ilość:{r.quantity}</p>
                    <p>Szacowany czas naprawy:{r.estimatedRepairTime}h</p>
                    <p>
                        Cena:
                        {total} zł
                    </p>
                    <p>Rabat:{r.rabat} zł</p>
                    <p>
                        Cena po rabacie:
                        {afterDiscount} zł
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
                            <p>
                                Płatność:{" "}
                                <span
                                    style={{
                                        color:
                                            r.paid === "Opłacone"
                                                ? "green"
                                                : r.paid === "Częściowo"
                                                  ? "yellow"
                                                  : "red"
                                    }}
                                >
                                    {r.paid}
                                </span>
                                <select
                                    value={r.paid}
                                    onChange={e =>
                                        updateRepair(r.id, {
                                            paid: e.target.value
                                        })
                                    }
                                >
                                    <option value="Nieopłacone">
                                        Nieopłacone
                                    </option>
                                    <option value="Częściowo">Częściowo</option>
                                    <option value="Opłacone">Opłacone</option>
                                </select>
                            </p>
                            Realny czas naprawy:{r.actualRepairTime} h
                            <input
                                style={{ width: "80%" }}
                                type="range"
                                min="0"
                                max="30"
                                step="0.5"
                                value={r.actualRepairTime}
                                onChange={e =>
                                    updateRepair(r.id, {
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
        setSelectedOrderId(null);
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

        const clientOrderIds = orders
            .filter(o => clientCarIds.includes(o.carId))
            .map(o => o.id);

        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");

        if (!confirmDelete) return;

        setClients(clients.filter(c => c.clientId !== id));
        setCars(cars.filter(c => c.clientId !== id));
        setOrders(orders.filter(o => !clientOrderIds.includes(o.id)));
        setRepairs(repairs.filter(r => !clientOrderIds.includes(r.orderId)));
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

    function closeCar() {
        setSelectedCarId(null);
        setSelectedOrderId(null);
    }

    function deleteCar(id) {
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");
        if (!confirmDelete) return;
        setCars(cars.filter(c => c.carId !== id));
        setOrders(orders.filter(o => o.carId !== id));
        setRepairs(repairs.filter(r => r.carId !== id));
        setSelectedCarId(null);
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

    //funkcje zlecenia

    function addOrder() {
        const newOrder = {
            id: Date.now() + Math.random(),
            orderNumber: orderNumber,
            date: date,
            clientId: selectedClientId,
            carId: selectedCarId,
            orderStatus: orderStatus,
            history: [
                {
                    date: new Date().toLocaleDateString(),
                    orderStatus: orderStatus
                }
            ]
        };

        setOrders([...orders, newOrder]);
        setAddOrderForm(false);
        setDate(today);
        setOrderStatus("Otwarte");
        setOrderNotes("");
    }

    function changeOrderStatus(id, newStatus) {
        setOrders(
            orders.map(o =>
                o.id === id
                    ? o.status != newStatus
                        ? {
                              ...o,
                              orderStatus: newStatus,
                              history: [
                                  ...o.history,
                                  {
                                      date: new Date().toLocaleDateString(),
                                      orderStatus: newStatus
                                  }
                              ]
                          }
                        : o
                    : o
            )
        );
    }

    function deleteOrder(id) {
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");
        if (!confirmDelete) return;
        setOrders(orders.filter(o => o.id !== id));
        setRepairs(repairs.filter(r => r.orderId !== id));

        setSelectedOrderId(null);
    }
    function startEditOrder(o) {
        setEditingOrderId(o.id);
        setEditOrderNumber(o.orderNumber);
        setEditDate(o.date);
    }

    function saveOrderEdit() {
        setOrders(
            orders.map(o =>
                o.id === editingOrderId
                    ? {
                          ...o,
                          orderNumber: editOrderNumber,
                          date: editDate
                      }
                    : o
            )
        );

        setEditingOrderId(null);
        setEditDate("");
        setEditOrderNumber("");
    }

    //funkcje wgniecenia
    function addRepair() {
        const newRepair = {
            id: Date.now() + Math.random(),
            orderId: selectedOrderId,
            carId: selectedCarId,
            panel: panel,
            price: Number(price),
            rabat: Number(rabat),
            modifiers: Number(modifiers),
            status: status,
            history: [
                { date: new Date().toLocaleDateString(), status: status }
            ],
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
            quantity: quantity,
            estimatedRepairTime: Number(estimatedRepairTime),
            actualRepairTime: Number(actualRepairTime),
            paid: paid
        };

        setRepairs([...repairs, newRepair]);
        setOrders(
            orders.map(o =>
                o.id === selectedOrderId
                    ? {
                          ...o,
                          history: [
                              ...o.history,
                              {
                                  date: new Date().toLocaleDateString(),
                                  action: "Dodano naprawę :" + panel
                              }
                          ]
                      }
                    : o
            )
        );

        setPanel("");
        setPrice(0);
        setDescription("");
        setIsDisassembly(false);
        setDisassemblyTime(0);
        setIsAluminium(false);

        setIsGlue(false);
        setIsEdge(false);
        setIsReinforcement(false);
        setIsHSS(false);
        setIsSharp(false);
        setIsDeep(false);
        setQuantity(1);
        setEstimatedRepairTime(0);
        setActualRepairTime(0);
        setPaid("Nieopłacone");
        setRabat(0);
        setStatus("Nowa");
        setAddRepairForm(false);
    }

    function deleteRepair(r) {
        const confirmDelete = window.confirm("Na pewno chcesz usunąć?");
        if (!confirmDelete) return;
        setOrders(
            orders.map(o =>
                o.id === r.orderId
                    ? {
                          ...o,
                          history: [
                              ...o.history,
                              {
                                  date: new Date().toLocaleDateString(),
                                  action: "Usunięto naprawę :" + r.panel
                              }
                          ]
                      }
                    : o
            )
        );
        setRepairs(repairs.filter(repair => repair.id !== r.id));
    }
    function startEditRepair(r) {
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
        setEstimatedRepairTime(r.estimatedRepairTime);
        setActualRepairTime(r.actualRepairTime);
        setPaid(r.paid);
        setRabat(r.rabat);
        setAddRepairForm(true);
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
                          quantity: quantity,
                          estimatedRepairTime: estimatedRepairTime,
                          actualRepairTime: actualRepairTime,
                          paid: paid,
                          rabat: rabat
                      }
                    : r
            )
        );

        setEditingRepairId(null);
        setPanel("");
        setPrice(0);
        setDescription("");
        setIsDisassembly(false);
        setDisassemblyTime(0);
        setIsAluminium(false);
        setIsGlue(false);
        setIsEdge(false);
        setIsReinforcement(false);
        setIsHSS(false);
        setIsSharp(false);
        setIsDeep(false);
        setQuantity(1);
        setDisassemblyTime(0);
        setEstimatedRepairTime(0);
        setActualRepairTime(0);
        setPaid("Nieopłacone");
        setRabat(0);
    }

    function changeRepairStatus(r, newStatus) {
        setRepairs(
            repairs.map(repair =>
                repair.id === r.id
                    ? repair.status != newStatus
                        ? {
                              ...repair,
                              status: newStatus,
                              history: [
                                  ...repair.history,
                                  {
                                      date: new Date().toLocaleDateString(),
                                      status: newStatus
                                  }
                              ]
                          }
                        : repair
                    : repair
            )
        );

        setOrders(
            orders.map(o =>
                o.id === r.orderId
                    ? {
                          ...o,
                          history: [
                              ...o.history,
                              {
                                  date: new Date().toLocaleDateString(),
                                  action:
                                      "Zmieniono status naprawy " +
                                      r.panel +
                                      ":" +
                                      newStatus
                              }
                          ]
                      }
                    : o
            )
        );
    }

    function updateRepair(id, changes) {
        setRepairs(repairs =>
            repairs.map(r => (r.id === id ? { ...r, ...changes } : r))
        );
    }

    const totalRepairsPrice = repairs
        .filter(r => selectedOrderId === r.orderId)
        .reduce(
            (sum, r) =>
                sum +
                Number(calculateFinalPrice(r)) * Number(r.quantity) -
                Number(r.rabat),
            0
        );

    const selectedCar = cars.find(c => c.carId === selectedCarId);
    const selectedClient = clients.find(c => c.clientId === selectedClientId);
    const selectedOrder = orders.find(o => o.id === selectedOrderId);
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
                    <div style={{ marginBottom: "2rem" }}>
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
                    <div id="zlecenia">
                        Zlecenia auta:
                        {selectedCar?.carName} {selectedCar?.model}
                        <p>
                            <button onClick={() => setAddOrderForm(true)}>
                                Dodaj zlecenie
                            </button>
                        </p>
                        {addOrderForm && (
                            <div style={{ marginBottom: "2rem" }}>
                                {" "}
                                <input
                                    value={orderNumber}
                                    onChange={e =>
                                        setOrderNumber(e.target.value)
                                    }
                                />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                                <button onClick={() => addOrder()}>
                                    Dodaj
                                </button>
                            </div>
                        )}
                        {editingOrderId && (
                            <div style={{ marginBottom: "2rem" }}>
                                <h2>Edycja zlecenia</h2>

                                <input
                                    value={editOrderNumber}
                                    onChange={e =>
                                        setEditOrderNumber(e.target.value)
                                    }
                                />
                                <input
                                    type="date"
                                    value={editDate}
                                    onChange={e => setEditDate(e.target.value)}
                                />

                                <button onClick={() => saveOrderEdit()}>
                                    Zapisz
                                </button>
                                <button onClick={() => setEditingOrderId(null)}>
                                    Anuluj
                                </button>
                            </div>
                        )}
                        {orders.length === 0 ? (
                            <span style={{ color: "red" }}>
                                lista jest pusta
                            </span>
                        ) : (
                            orders
                                .filter(o => o.carId === selectedCarId)
                                .map(o => (
                                    <li
                                        style={{ listStyleType: "none" }}
                                        key={o.id}
                                    >
                                        <div
                                            style={{
                                                border: "1px solid black",

                                                marginBottom: "5px"
                                            }}
                                        >
                                            <p
                                                style={{ color: "blue" }}
                                                onClick={() =>
                                                    setSelectedOrderId(o.id)
                                                }
                                            >
                                                Numer zlecenia:{o.orderNumber}
                                            </p>
                                            <p>
                                                Status:{o.orderStatus}
                                                <select
                                                    style={{
                                                        marginLeft: "1rem"
                                                    }}
                                                    value={o.orderStatus}
                                                    onChange={e =>
                                                        changeOrderStatus(
                                                            o.id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="Otwarte">
                                                        Otwarte
                                                    </option>
                                                    <option value="Zamknięte">
                                                        Zamknięte
                                                    </option>
                                                </select>
                                            </p>
                                            <p>Płatność: 🔴</p>
                                            <p>Notatki:</p>
                                            <p>Data otwarcia:{o.date}</p>
                                            <p>Data zamknięcia:</p>
                                            <div style={{ fontSize: 8 }}>
                                                <h3>Historia</h3>
                                                <ul>
                                                    {o.history.map((h, i) => (
                                                        <li key={i}>
                                                            {h.date} –{" "}
                                                            {h.orderStatus}
                                                            {h.action}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => startEditOrder(o)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteOrder(o.id)}
                                        >
                                            ❌
                                        </button>
                                    </li>
                                ))
                        )}
                    </div>
                    {selectedCarId === null ? (
                        ""
                    ) : (
                        <button onClick={() => closeCar()}>Zamknij auto</button>
                    )}
                    {selectedOrderId === null ? (
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
                                Naprawy zlecenia:{" "}
                                {selectedOrder?.orderNumber}{" "}
                            </p>
                            <p>
                                Naprawy auta: {selectedCar?.carName}{" "}
                                {selectedCar?.model}
                            </p>
                            <h3>Lista napraw</h3>
                            <select
                                onChange={e => setRepairFilter(e.target.value)}
                            >
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
                                    <span style={{ color: "red" }}>
                                        lista jest pusta
                                    </span>
                                ) : (
                                    ""
                                )}
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
                            <p>
                                Suma wszystkich napraw: {totalRepairsPrice} zł
                            </p>
                            <button onClick={() => setAddRepairForm(true)}>
                                Dodaj naprawę
                            </button>
                            {addRepairForm && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    <h2>
                                        {editingRepairId != null
                                            ? "Edytuj wgniecenia"
                                            : "Dodaj wgniecenia"}
                                    </h2>
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
                                            <option value="Słupek A lewy">
                                                Słupek A lewy
                                            </option>
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
                                            <option value="Próg lewy">
                                                Próg lewy
                                            </option>
                                            <option value="Próg prawy">
                                                Próg prawy
                                            </option>
                                            <option value="Słupek B lewy">
                                                Słupek B lewy
                                            </option>
                                            <option value="Słupek B prawy">
                                                Słupek B prawy
                                            </option>
                                        </optgroup>

                                        <optgroup label="Tył">
                                            <option value="Klapa bagażnika">
                                                Klapa bagażnika
                                            </option>
                                            <option value="Zderzak tylny">
                                                Zderzak tylny
                                            </option>
                                            <option value="Błotnik lewy tył">
                                                Błotnik lewy tył
                                            </option>
                                            <option value="Błotnik prawy tył">
                                                Błotnik prawy tył
                                            </option>
                                            <option value="Słupek C lewy">
                                                Słupek C lewy
                                            </option>
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
                                    Cena:
                                    <input
                                        placeholder="Cena"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                    Opis:
                                    <textarea
                                        style={{ height: "3rem" }}
                                        placeholder="Opis:"
                                        value={description}
                                        onChange={e =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                    Szacowany czas naprawy:{" "}
                                    {estimatedRepairTime} h
                                    <input
                                        style={{ width: "80%" }}
                                        type="range"
                                        min="0"
                                        max="30"
                                        step="0.5"
                                        value={estimatedRepairTime}
                                        onChange={e =>
                                            setEstimatedRepairTime(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p>
                                        <input
                                            type="checkbox"
                                            checked={isDisassembly}
                                            onChange={e =>
                                                setIsDisassembly(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        Demontaż
                                        {isDisassembly && (
                                            <input
                                                value={disassemblyTime}
                                                onChange={e =>
                                                    setDisassemblyTime(
                                                        e.target.value
                                                    )
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
                                                onChange={e =>
                                                    setIsAluminium(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span>Aluminium(25%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isGlue}
                                                onChange={e =>
                                                    setIsGlue(e.target.checked)
                                                }
                                            />
                                            <span>Klej(10%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isEdge}
                                                onChange={e =>
                                                    setIsEdge(e.target.checked)
                                                }
                                            />
                                            <span>Rant(15%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isReinforcement}
                                                onChange={e =>
                                                    setIsReinforcement(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span> Wzmocnienie(10%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isHSS}
                                                onChange={e =>
                                                    setIsHSS(e.target.checked)
                                                }
                                            />
                                            <span>Twarda blacha(20%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isSharp}
                                                onChange={e =>
                                                    setIsSharp(e.target.checked)
                                                }
                                            />
                                            <span> Ostra(10%)</span>
                                        </p>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={isDeep}
                                                onChange={e =>
                                                    setIsDeep(e.target.checked)
                                                }
                                            />
                                            <span>Głęboka(15%)</span>
                                        </p>
                                    </div>
                                    <p>Bazowa cena wgniecenia:{price} zł</p>
                                    <p>Modyfikatory: {modifiers}%</p>
                                    {isDisassembly ? (
                                        <p>Demontaż:{disassemblyPrice} zł</p>
                                    ) : (
                                        ""
                                    )}
                                    <p>
                                        Aktualna cena wgniecenia:
                                        {Number(price) +
                                            price * (Number(modifiers) / 100) +
                                            (isDisassembly
                                                ? disassemblyTime * 50
                                                : 0) *
                                                quantity}
                                        zł
                                    </p>
                                    <p>
                                        {" "}
                                        Rabat:{" "}
                                        <input
                                            onChange={e =>
                                                setRabat(e.target.value)
                                            }
                                            value={rabat}
                                        />
                                    </p>
                                    <input
                                        value={quantity}
                                        onChange={e =>
                                            setQuantity(e.target.value)
                                        }
                                        placeholder="Ilosć"
                                    />
                                    <button
                                        onClick={
                                            editingRepairId === null
                                                ? addRepair
                                                : handleSaveRepair
                                        }
                                    >
                                        {editingRepairId != null
                                            ? "Zapisz"
                                            : "Dodaj"}
                                    </button>
                                    <button
                                        onClick={() => setAddRepairForm(false)}
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
