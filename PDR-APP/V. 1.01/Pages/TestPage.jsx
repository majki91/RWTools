import { useState, useEffect } from "react";
import RepairForm from "../components/RepairForm";
import RepairItem from "../components/RepairItem";
import OrderItem from "../components/OrderItem";
import RepairsSection from "../components/RepairsSection";
import OrdersSection from "../components/OrdersSection";
import ClientsSection from "../components/ClientsSection";
import AddOrderForm from "../components/AddOrderForm";
import EditOrderForm from "../components/EditOrderForm";
import CarOrders from "../components/CarOrders";

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
    const [editingOrderId, setEditingOrderId] = useState(null);
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
            closeDate: "",
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

                <ClientsSection
                    clients={clients}
                    selectClient={selectClient}
                    startEditClient={startEditClient}
                    deleteClient={deleteClient}
                    addClientForm={addClientForm}
                    clientName={clientName}
                    clientSurname={clientSurname}
                    phoneNumber={phoneNumber}
                    setClientName={setClientName}
                    setClientSurname={setClientSurname}
                    setPhoneNumber={setPhoneNumber}
                    addClient={addClient}
                    setAddClientForm={setAddClientForm}
                    setEditClientName={setEditClientName}
                    setEditClientSurname={setEditClientSurname}
                    setEditPhone={setEditPhone}
                    setEditingClientId={setEditingClientId}
                    setSearchClient={setSearchClient}
                    searchClient={searchClient}
                    editingClientId={editingClientId}
                    editClientName={editClientName}
                    editClientSurname={editClientSurname}
                    editPhone={editPhone}
                    saveClientEdit={saveClientEdit}
                    selectedClientId={selectedClientId}
                    selectedClient={selectedClient}
                    closeClient={closeClient}
                    cars={cars}
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
                    <CarOrders
                        selectedCar={selectedCar}
                        closeCar={closeCar}
                        orderNumber={orderNumber}
                        setOrderNumber={setOrderNumber}
                        date={date}
                        setDate={setDate}
                        orderNotes={orderNotes}
                        setOrderNotes={setOrderNotes}
                        addOrder={addOrder}
                        setAddOrderForm={setAddOrderForm}
                        editOrderNumber={editOrderNumber}
                        setEditOrderNumber={setEditOrderNumber}
                        editDate={editDate}
                        setEditDate={setEditDate}
                        editOrderNotes={editOrderNotes}
                        setEditOrderNotes={setEditOrderNotes}
                        editDiscount={editDiscount}
                        setEditDiscount={setEditDiscount}
                        editPayment={editPayment}
                        setEditPayment={setEditPayment}
                        saveOrderEdit={saveOrderEdit}
                        setEditingOrderId={setEditingOrderId}
                        orders={orders}
                        repairs={repairs}
                        selectedCarId={selectedCarId}
                        calculateFinalPrice={calculateFinalPrice}
                        setSelectedOrderId={setSelectedOrderId}
                        changeOrderStatus={changeOrderStatus}
                        startEditOrder={startEditOrder}
                        deleteOrder={deleteOrder}
                        addOrderForm={addOrderForm}
                        editingOrderId={editingOrderId}
                    />
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
                            <RepairsSection
                                selectedOrder={selectedOrder}
                                selectedCar={selectedCar}
                                repairs={repairs}
                                selectedCarId={selectedCarId}
                                selectedOrderId={selectedOrderId}
                                repairFilter={repairFilter}
                                setRepairFilter={setRepairFilter}
                                startEditRepair={startEditRepair}
                                changeRepairStatus={changeRepairStatus}
                                deleteRepair={deleteRepair}
                                updateRepair={updateRepair}
                                editingRepairId={editingRepairId}
                                calculateFinalPrice={calculateFinalPrice}
                                totalRepairsPrice={totalRepairsPrice}
                            />
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
