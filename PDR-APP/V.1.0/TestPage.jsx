import { useState, useEffect } from "react";
import RepairForm from "../components/RepairForm";
import RepairItem from "../components/RepairItem";
import OrderItem from "../components/OrderItem";

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
    // const today = new Date().toISOString().split("T")[0];
    const today = new Date().toLocaleDateString();

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
    const [closeDate, setCloseDate] = useState("");
    const [orderStatus, setOrderStatus] = useState("Otwarte");
    const [orderNotes, setOrderNotes] = useState("");
    const [addOrderForm, setAddOrderForm] = useState(false);
    const [editingOrderId, setEditingOrderId] = useState("");
    const [editOrderNumber, setEditOrderNumber] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editDiscount, setEditDiscount] = useState(0);
    const [editPayment, setEditPayment] = useState(0);
    const [editOrderNotes, setEditOrderNotes] = useState("");

    const [panel, setPanel] = useState("");
    const [price, setPrice] = useState(0);

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
            closeDate: closeDate,
            clientId: selectedClientId,
            carId: selectedCarId,
            orderStatus: orderStatus,
            discount: 0,
            payment: 0,
            orderNotes: orderNotes,
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
            orders.map(o => {
                if (o.id !== id) return o;
                if (o.orderStatus === newStatus) return o;
                let closeOrderDate = "";

                if (newStatus === "Zamknięte") {
                    closeOrderDate = new Date().toLocaleDateString();
                }
                return {
                    ...o,
                    orderStatus: newStatus,
                    closeDate: closeOrderDate,
                    history: [
                        ...o.history,
                        {
                            date: new Date().toLocaleDateString(),
                            orderStatus: newStatus
                        }
                    ]
                };
            })
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
        setEditDiscount(o.discount);
        setEditPayment(o.payment);
        setEditOrderNotes(o.orderNotes);
    }

    function saveOrderEdit() {
        setOrders(
            orders.map(o => {
                if (o.id !== editingOrderId) return o;

                let action = "";

                if (o.orderNumber !== editOrderNumber) {
                    action += "numer zlecenia " + editOrderNumber;
                }
                if (o.date !== editDate) {
                    action += (action ? ", " : "") + "data " + editDate;
                }
                if (Number(o.discount) !== Number(editDiscount)) {
                    action +=
                        (action ? ", " : "") + "rabat " + editDiscount + "zł";
                }
                if (Number(o.payment) !== Number(editPayment)) {
                    action +=
                        (action ? ", " : "") + "płatność " + editPayment + "zł";
                }
                if (o.orderNotes !== editOrderNotes) {
                    action += (action ? ", " : "") + "zmiana notatki";
                }

                return {
                    ...o,
                    orderNumber: editOrderNumber,
                    date: editDate,
                    discount: editDiscount,
                    payment: editPayment,
                    orderNotes: editOrderNotes,
                    history: [
                        ...o.history,
                        {
                            date: new Date().toLocaleDateString(),
                            action: "Edycja zlecenia: " + action
                        }
                    ]
                };
            })
        );

        setEditingOrderId(null);
        setEditDate("");
        setNumber("");
        setEditDiscount(0);
        setEditPayment(0);
        setEditOrderNotes("");
    }

    //funkcje wgniecenia
    function addRepair() {
        const newRepair = {
            id: Date.now() + Math.random(),
            orderId: selectedOrderId,
            carId: selectedCarId,
            panel: panel,
            price: Number(price),
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
                          history: [
                              ...r.history,
                              {
                                  date: new Date().toLocaleDateString(),
                                  action: "Edycja naprawy"
                              }
                          ]
                      }
                    : r
            )
        );

        /*setOrders(
            orders.map(o => {
                if (o.id !== editingOrderId) return o;

                let action = "";

                if (o.orderNumber !== editOrderNumber) {
                    action += "numer zlecenia " + editOrderNumber;
                }
                if (o.date !== editDate) {
                    action += (action ? ", " : "") + "data " + editDate;
                }
                if (Number(o.discount) !== Number(editDiscount)) {
                    action +=
                        (action ? ", " : "") + "rabat " + editDiscount + "zł";
                }
                if (Number(o.payment) !== Number(editPayment)) {
                    action +=
                        (action ? ", " : "") + "płatność " + editPayment + "zł";
                }
                if (o.orderNotes !== editOrderNotes) {
                    action += (action ? ", " : "") + "zmiana notatki";
                }

                return {
                    ...o,
                    orderNumber: editOrderNumber,
                    date: editDate,
                    discount: editDiscount,
                    payment: editPayment,
                    orderNotes: editOrderNotes,
                    history: [
                        ...o.history,
                        {
                            date: new Date().toLocaleDateString(),
                            action: "Edycja zlecenia: " + action
                        }
                    ]
                };
            })
        );*/

        setOrders(
            orders.map(o =>
                o.id === selectedOrderId
                    ? {
                          ...o,
                          history: [
                              ...o.history,
                              {
                                  date: new Date().toLocaleDateString(),
                                  action: "Edytowano naprawę :" + panel
                              }
                          ]
                      }
                    : o
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
                                      action: "Zmiana statusu:" + newStatus
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

    function updateRepair(r, changes) {
        setRepairs(repairs =>
            repairs.map(rep => (rep.id === r.id ? { ...rep, ...changes } : rep))
        ); //changes to obiekt
        if ("paid" in changes) {
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
                                          "Zmieniono status płatności " +
                                          r.panel +
                                          " : " +
                                          changes.paid
                                  }
                              ]
                          }
                        : o
                )
            );
        }
    }

    const totalRepairsPrice = repairs
        .filter(r => selectedOrderId === r.orderId)
        .reduce(
            (sum, r) =>
                sum + Number(calculateFinalPrice(r)) * Number(r.quantity),
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
                                <p>
                                    Numer zlecenia
                                    <input
                                        value={orderNumber}
                                        onChange={e =>
                                            setOrderNumber(e.target.value)
                                        }
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
                                        onChange={e =>
                                            setOrderNotes(e.target.value)
                                        }
                                    ></textarea>
                                </p>
                                <button onClick={() => addOrder()}>
                                    Dodaj
                                </button>
                            </div>
                        )}
                        {editingOrderId && (
                            <div style={{ marginBottom: "2rem" }}>
                                <h2>Edycja zlecenia</h2>
                                <p>
                                    Numer zlecenia
                                    <input
                                        value={editOrderNumber}
                                        onChange={e =>
                                            setEditOrderNumber(e.target.value)
                                        }
                                    />
                                </p>
                                <p>
                                    Data
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={e =>
                                            setEditDate(e.target.value)
                                        }
                                    />
                                </p>
                                <p>
                                    Notatka
                                    <textarea
                                        value={editOrderNotes}
                                        onChange={e =>
                                            setEditOrderNotes(e.target.value)
                                        }
                                    ></textarea>
                                </p>
                                <p>
                                    Rabat
                                    <input
                                        value={editDiscount}
                                        onChange={e =>
                                            setEditDiscount(e.target.value)
                                        }
                                    />
                                </p>
                                <p>
                                    Płatność
                                    <input
                                        value={editPayment}
                                        onChange={e =>
                                            setEditPayment(e.target.value)
                                        }
                                    />
                                </p>

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
                                .map(o => {
                                    const orderRepairs = repairs.filter(
                                        r => r.orderId === o.id
                                    );
                                    const orderTotal = orderRepairs.reduce(
                                        (sum, r) => {
                                            return (
                                                sum +
                                                calculateFinalPrice(r) *
                                                    r.quantity
                                            );
                                        },
                                        0
                                    );

                                    const finalPrice = orderTotal - o.discount;
                                    return (
                                        <OrderItem
                                            key={o.id}
                                            o={o}
                                            orderTotal={orderTotal}
                                            finalPrice={finalPrice}
                                            setSelectedOrderId={
                                                setSelectedOrderId
                                            }
                                            changeOrderStatus={
                                                changeOrderStatus
                                            }
                                            startEditOrder={startEditOrder}
                                            deleteOrder={deleteOrder}
                                        />
                                    );
                                })
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
                                        <RepairItem
                                            r={r}
                                            key={r.id}
                                            startEditRepair={startEditRepair}
                                            changeRepairStatus={
                                                changeRepairStatus
                                            }
                                            deleteRepair={deleteRepair}
                                            updateRepair={updateRepair}
                                            editingRepairId={editingRepairId}
                                            calculateFinalPrice={
                                                calculateFinalPrice
                                            }
                                        />
                                    ))}
                            </ul>
                            <p>
                                Suma wszystkich napraw: {totalRepairsPrice} zł
                            </p>
                            <button onClick={() => setAddRepairForm(true)}>
                                Dodaj naprawę
                            </button>
                            {addRepairForm && (
                                <RepairForm
                                    editingRepairId={editingRepairId}
                                    panel={panel}
                                    setPanel={setPanel}
                                    price={price}
                                    setPrice={setPrice}
                                    description={description}
                                    setDescription={setDescription}
                                    estimatedRepairTime={estimatedRepairTime}
                                    setEstimatedRepairTime={
                                        setEstimatedRepairTime
                                    }
                                    isDisassembly={isDisassembly}
                                    setIsDisassembly={setIsDisassembly}
                                    disassemblyTime={disassemblyTime}
                                    setDisassemblyTime={setDisassemblyTime}
                                    isAluminium={isAluminium}
                                    setIsAluminium={setIsAluminium}
                                    isGlue={isGlue}
                                    setIsGlue={setIsGlue}
                                    isEdge={isEdge}
                                    setIsEdge={setIsEdge}
                                    isReinforcement={isReinforcement}
                                    setIsReinforcement={setIsReinforcement}
                                    isHSS={isHSS}
                                    setIsHSS={setIsHSS}
                                    isSharp={isSharp}
                                    setIsSharp={setIsSharp}
                                    isDeep={isDeep}
                                    setIsDeep={setIsDeep}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    modifiers={modifiers}
                                    disassemblyPrice={disassemblyPrice}
                                    addRepair={addRepair}
                                    handleSaveRepair={handleSaveRepair}
                                    setAddRepairForm={setAddRepairForm}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
