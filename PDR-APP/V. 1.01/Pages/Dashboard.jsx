export default function Dashboard({ clients, cars, repairs, orders }) {
    const total = repairs.reduce((sum, r) => {
        const base = Number(r.price);
        const mod = Number(r.modifiers || 0);
        const dis = r.isDisassembly ? Number(r.disassemblyTime) * 50 : 0;
        const perItem = base + base * (mod / 100) + dis;
        return sum + perItem * Number(r.quantity || 1);
    }, 0);

    function calculateFinalPrice(r) {
        const base = Number(r.price);
        const mod = Number(r.modifiers || 0);
        const dis = r.isDisassembly ? Number(r.disassemblyTime) * 50 : 0;

        const perItem = base + base * (mod / 100) + dis;

        return perItem;
    }
    function calculateOrderPrice(o) {
        const orderRepairs = repairs.filter(r => r.orderId === o.id);
        const total = orderRepairs.reduce((sum, o) => {
            const base = Number(o.price);
            const mod = Number(o.modifiers || 0);
            const dis = o.isDisassembly ? Number(o.disassemblyTime) * 50 : 0;
            const perItem = base + base * (mod / 100) + dis;
            return sum + perItem * Number(o.quantity || 1);
        }, 0);
        return total - Number(o.discount || 0);
    }

    const mostExpensiveRepair =
        repairs.length > 0
            ? repairs.reduce((max, r) =>
                  calculateFinalPrice(r) > calculateFinalPrice(max) ? r : max
              )
            : null;
    const mostExpensiveOrder =
        orders.length > 0
            ? orders.reduce((max, o) =>
                  calculateOrderPrice(o) > calculateOrderPrice(max) ? o : max
              )
            : null;

    const overduePayments = orders.reduce((sum, o) => {
        return sum + (calculateOrderPrice(o) - o.payment);
    }, 0);

    const paymentsMade = orders.reduce((sum, o) => {
        return Number(sum + o.payment);
    }, 0);

    return (
        <>
            <div>
                <h2>Dashboard</h2>
                <h3>📊 Liczniki</h3>
                <p>Klienci: {clients.length}</p>
                <p>Auta: {cars.length}</p>
                <p>Naprawy: {repairs.length}</p>
                <p>
                    Nowe naprawy:{" "}
                    {repairs.filter(r => r.status === "Nowa").length}
                </p>
                <p>
                    Naprawy w trakcie:{" "}
                    {repairs.filter(r => r.status === "W trakcie").length}
                </p>
                <p>
                    Zakończone naprawy:{" "}
                    {repairs.filter(r => r.status === "Zrobiona").length}
                </p>
                <p>Zlecenia:{orders.length}</p>
                <p>
                    Zlecenia otwarte:
                    {orders.filter(o => o.orderStatus === "Otwarte").length}
                </p>
                <p>
                    Zlecenia w trakcie:
                    {orders.filter(o => o.orderStatus === "W trakcie").length}
                </p>
                <p>
                    Zlecenia oczekiwane na płatność:
                    {
                        orders.filter(
                            o => o.orderStatus === "Oczekiwanie na płatność"
                        ).length
                    }
                </p>
                <p>
                    Zlecenia zamknięte:
                    {orders.filter(o => o.orderStatus === "Zamknięte").length}
                </p>
            </div>
            <div>
                <h3>💰 Finanse</h3>

                <p>
                    Najdroższa naprawa:
                    {mostExpensiveRepair
                        ? calculateFinalPrice(mostExpensiveRepair)
                        : 0}{" "}
                    zł
                </p>
                <p>
                    Najdroższe zlecenie:
                    {mostExpensiveOrder
                        ? calculateOrderPrice(mostExpensiveOrder)
                        : 0}{" "}
                    zł
                </p>
                <p>Wartość wszystkich zleceń: zł</p>
                <h4>Zapłaty</h4>
                <p>Zapłacona kwota: {paymentsMade}zł</p>
                <h4>Zaległości</h4>
                <p>Niezapłacona kwota:{overduePayments}zł</p>
                <p>Zarobione łącznie: {total}zł</p>
            </div>
        </>
    );
}
