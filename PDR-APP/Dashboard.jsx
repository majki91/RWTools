export default function Dashboard({ clients, cars, repairs }) {
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

    const mostExpensive = repairs.reduce((max, r) => {
        return calculateFinalPrice(r) > calculateFinalPrice(max) ? r : max;
    });

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
            </div>
            <div>
                <h3>💰 Finanse</h3>
                <p>Najdroższa naprawa:{calculateFinalPrice(mostExpensive)}zł</p>
                <p>Zarobione łącznie: {total}zł</p>
            </div>
        </>
    );
}
