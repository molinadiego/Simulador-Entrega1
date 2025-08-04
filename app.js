// Simulador entrega #1.

const TAX = 1.084;
const DISCOUNT = 0.1;
const cart = [];
let tax = 0;
let priceTotal = 0;
let priceTotalWithTax = 0;
let priceWithDiscount = 0;

const products = [
    {
        id: 1,
        name: "Unanime",
        description: "Vino",
        price: 23,
        stock: 25,
    },
    {
        id: 2,
        name: "Catena Zapata",
        description: "Vino",
        price: 34,
        stock: 25,
    },
    {
        id: 3,
        name: "Norton",
        description: "Vino",
        price: 17,
        stock: 25,
    },
    {
        id: 4,
        name: "Phebus",
        description: "Vino",
        price: 10,
        stock: 25,
    },
    {
        id: 5,
        name: "Ed Edmundo",
        description: "Vino",
        price: 12,
        stock: 25,
    },
    {
        id: 6,
        name: "Chivas Regal 12 Years",
        description: "Whisky",
        price: 40,
        stock: 25,
    },
    {
        id: 7,
        name: "Chivas Regal 18 Years",
        description: "Whisky",
        price: 165,
        stock: 25,
    },
    {
        id: 8,
        name: "Johnnie Walker Black Label",
        description: "Whisky",
        price: 33,
        stock: 25,
    },
    {
        id: 9,
        name: "Johnnie Walker Green Label",
        description: "Whisky",
        price: 61,
        stock: 25,
    },
    {
        id: 10,
        name: "Johnnie Walker Blue Label",
        description: "Whisky",
        price: 175,
        stock: 25,
    },
];

/**
 *
 * @param {Array} products
 */
function listProducts(products) {
    console.log("***** LISTA DE PRODUCTOS *****");
    for (let product of products) {
        console.log(
            `ID ${product.id} -- ${product.description} -- ${product.name} -- U$S ${product.price} -- STOCK ${product.stock}`
        );
    }
}

/**
 *
 * @param {Array} products
 */
function listProductsPrompt(products) {
    let lista = "";
    lista = lista + "***** LISTA DE PRODUCTOS *****\n";
    for (let product of products) {
        lista =
            lista +
            `ID ${product.id} -- ${product.description} -- ${product.name} -- U$S ${product.price} -- STOCK ${product.stock}\n`;
    }
    return lista;
}

/**
 *
 * @param {Array} cart
 */
function listCart(cart) {
    console.log("***** LISTA DEL CARRITO *****");
    for (let item of cart) {
        console.log(
            `Producto - ${item.description} -- ${item.name} -- Qty- ${item.quantity} -- Precio Unidad - ${item.price} -- Precio total -${item.totalprice}`
        );
    }
}

/**
 *
 * @param {Number} id
 * @param {Number} quantity
 */
function fillCart(id, quantity) {
    const product = products.find((product) => product.id === id);
    if (product === undefined) {
        alert("Codigo de producto no encontrado.");
        return;
    }
    if (product.stock >= quantity) {
        let description = product.description;
        let name = product.name;
        let price = product.price;
        let totalprice = price * quantity;
        cart.push({
            description: description,
            name: name,
            quantity: quantity,
            price: price,
            totalprice: totalprice,
        });
        product.stock = product.stock - quantity;
    } else {
        alert("Transaccion cancelada. no tenemos suficientes productos.");
        return;
    }
}

function ticket(cart) {
    let productQty = 0;
    let groceryList = "***** Ticket *****\n";
    for (let item of cart) {
        groceryList += `\n${item.quantity} - ${item.name} - Unidad $:${item.price} - Total $:${item.totalprice}`;
        productQty += item.quantity;
        priceTotal += item.totalprice;
    }
    groceryList += `\n Precio total de la compra sin TAX. - $ ${priceTotal}`;
    priceTotalWithTax = plusTax(priceTotal, TAX);
    groceryList += `\n Precio total con 8.4% del TAX.     - $ ${priceTotalWithTax.toFixed(
        2
    )}`;
    if (productQty >= 5) {
        priceWithDiscount = applyDiscount(priceTotalWithTax, DISCOUNT);
        groceryList += `\n Descuento de 10% (5 productos o mas) -- Total a pagar $:${priceWithDiscount.toFixed(
            2
        )}`;
    }
    return groceryList;
}

/**
 *
 * @param {Number} priceTotal
 * @param {Number} TAX
 * @returns {Number}
 */
const plusTax = (priceTotal, TAX) => {
    return priceTotal * TAX;
};

/**
 *
 * @param {Number} priceTotalWithTax
 * @param {Number} DISCOUNT
 * @returns
 */
const applyDiscount = (priceTotalWithTax, DISCOUNT) => {
    return priceTotalWithTax - priceTotalWithTax * DISCOUNT;
};

// App

let answerConfirm = confirm(`Bienvenido a la tienda online de vinos y whiskys.\n
Presione OK para iniciar la compra o Cancelar para salir.`);
let item = 0;
let qty = 0;
let lista = "";
while (answerConfirm) {
    console.clear();
    lista = listProductsPrompt(products);
    do {
        console.log(lista);
        item = parseInt(
            prompt(
                `${lista}\n` + `ingrese el ID del producto que desea adquirir :`
            )
        );
        qty = parseInt(prompt("Ingrese la cantidad que desea :"));
    } while (isNaN(item) || isNaN(qty) || qty <= 0);

    fillCart(item, qty);
    answerConfirm = confirm("Desea seguir comprando ?");
}

if (cart.length > 0) {
    console.clear();
    console.log(listProducts(products));
    alert(ticket(cart));
}
