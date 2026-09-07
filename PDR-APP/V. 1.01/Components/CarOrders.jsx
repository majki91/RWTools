import AddOrderForm from "../components/AddOrderForm";
import EditOrderForm from "../components/EditOrderForm";
import OrdersSection from "../components/OrdersSection";

export default function CarOrders({
    selectedCar,
    closeCar,
    orderNumber,
    setOrderNumber,
    date,
    setDate,
    orderNotes,
    setOrderNotes,
    addOrder,
    setAddOrderForm,
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
    setEditingOrderId,
    orders,
    repairs,
    selectedCarId,
    calculateFinalPrice,
    setSelectedOrderId,
    changeOrderStatus,
    startEditOrder,
    deleteOrder,
    addOrderForm,
    editingOrderId
}) {
    return (
        <>
            <div id="zlecenia">
                Zlecenia auta:
                {selectedCar?.carName} {selectedCar?.model}
                <p>
                    <button onClick={() => setAddOrderForm(true)}>
                        Dodaj zlecenie
                    </button>
                </p>
                {addOrderForm && (
                    <AddOrderForm
                        orderNumber={orderNumber}
                        setOrderNumber={setOrderNumber}
                        date={date}
                        setDate={setDate}
                        orderNotes={orderNotes}
                        setOrderNotes={setOrderNotes}
                        addOrder={addOrder}
                        setAddOrderForm={setAddOrderForm}
                    />
                )}
                {editingOrderId && (
                    <EditOrderForm
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
                    />
                )}
                {orders.length === 0 ? (
                    <span style={{ color: "red" }}>lista jest pusta</span>
                ) : (
                    <OrdersSection
                        orders={orders}
                        repairs={repairs}
                        selectedCarId={selectedCarId}
                        calculateFinalPrice={calculateFinalPrice}
                        setSelectedOrderId={setSelectedOrderId}
                        changeOrderStatus={changeOrderStatus}
                        startEditOrder={startEditOrder}
                        deleteOrder={deleteOrder}
                    />
                )}
            </div>
            {selectedCarId === null ? (
                ""
            ) : (
                <button onClick={() => closeCar()}>Zamknij auto</button>
            )}
        </>
    );
}
