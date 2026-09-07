import OrderItem from "./OrderItem";

export default function OrdersSection({
    orders,
    repairs,
    selectedCarId,
    calculateFinalPrice,
    setSelectedOrderId,
    changeOrderStatus,
    startEditOrder,
    deleteOrder
}) {
    const carOrders = orders.filter(o => o.carId === selectedCarId);

    if (carOrders.length === 0) {
        return <span style={{ color: "red" }}>lista jest pusta</span>;
    }

    return (
        <>
            {carOrders.map(o => {
                const orderRepairs = repairs.filter(r => r.orderId === o.id);

                const orderTotal = orderRepairs.reduce(
                    (sum, r) =>
                        sum + calculateFinalPrice(r) * Number(r.quantity),
                    0
                );

                const finalPrice = orderTotal - Number(o.discount);

                return (
                    <OrderItem
                        key={o.id}
                        o={o}
                        orderTotal={orderTotal}
                        finalPrice={finalPrice}
                        setSelectedOrderId={setSelectedOrderId}
                        changeOrderStatus={changeOrderStatus}
                        startEditOrder={startEditOrder}
                        deleteOrder={deleteOrder}
                    />
                );
            })}
        </>
    );
}
