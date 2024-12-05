
//TODO: Задание 1 START
const calculateTotal = (price: number, quantity: number, discount: number = 0): number => {
    return (price * quantity) - (price * quantity * discount / 100);
}

console.log(`calculateTotal(100, 2): ${calculateTotal(100, 2)}`); // 200
console.log(`calculateTotal(100, 2, 10): ${calculateTotal(100, 2, 10)}`); // 180
//TODO: Задание 1 END


//TODO: Задание 2 START
let id: string | number;
const displayId = (id: string | number): string | number => {
    if (typeof id === 'string') {
        return id.toUpperCase();
    } else {
        return id * 10;
    }
}
console.log(`displayId('abc'): ${displayId('abc')}`); // ABC
console.log(`displayId(123): ${displayId(123)}`); // 123
//TODO: Задание 2 END


//TODO: Задание 3 START
interface Order {
    orderId: number,
    amount: number,
    status: "pending" | "shipped" | "delivered"
}

const orders: Order[] = [
    { orderId: 1, amount: 100, status: "pending" },
    { orderId: 2, amount: 200, status: "shipped" },
    { orderId: 3, amount: 300, status: "delivered" },
    { orderId: 4, amount: 400, status: "pending" },
    { orderId: 5, amount: 500, status: "shipped" },
    { orderId: 6, amount: 600, status: "delivered" },
    { orderId: 7, amount: 700, status: "pending" },
    { orderId: 8, amount: 800, status: "shipped" },
    { orderId: 9, amount: 900, status: "delivered" },
    { orderId: 10, amount: 1000, status: "pending" }
]

const filterOrdersByStatus = (orders: Order[], status: "pending" | "shipped" | "delivered"): object[] => {
    return orders.filter(order => order.status === status);
}

console.log(`filterOrdersByStatus(orders, 'pending'): ${JSON.stringify(filterOrdersByStatus(orders, 'pending'))}`);
//TODO: Задание 3 END


//TODO: Задание 4 START
let productInfo: [string, number, number] = ['Apple', 1, 100];
interface Inventory {
    name: string,
    quantity: number,
}

const updateStack = (inventory: Inventory, productInfo: [string, number, number]): Inventory => {
    return {
        name: productInfo[0],
        quantity: inventory.quantity + productInfo[1]
    }
}

const inventory = { name: 'Apple', quantity: 10 };
console.log(`updateStack(inventory, productInfo): ${JSON.stringify(updateStack(inventory, productInfo))}`);
//TODO: Задание 4 END

