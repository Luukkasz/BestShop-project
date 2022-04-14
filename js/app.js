// Zmienne do obliczeń
const productPrice = 0.5;
const orderPrice = 0.25;
const basicPrice = 0;
const professionalPrice = 25;
const premiumPrice = 60;
let accountingPrice = 50;
let terminalPrice = 25;
let totalValue = 0;


// Zmienne do kluczowych elementów
const productsInput = document.querySelector("#products");
const ordersInput = document.querySelector("#orders");
const packageDiv = document.querySelector(".select__input");
const packageList = document.querySelector(".select__dropdown");
const selectInput = document.querySelector("#package");
const accountingCheckBox = document.querySelector("#accounting");
const terminalCheckBox = document.querySelector("#terminal");
const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");

const liProducts = document.querySelector(".calc__summary li:nth-of-type(1)");
const liOrders = document.querySelector(".calc__summary li:nth-of-type(2)");
const liPackage = document.querySelector(".calc__summary li:nth-of-type(3)");
const liAccounting = document.querySelector(".calc__summary li:nth-of-type(4)");
const liTerminal = document.querySelector(".calc__summary li:nth-of-type(5)");

const productsCalcSpan = document.querySelector(".calc__summary li:nth-of-type(1) .item__calc");
const productsPriceSpan = document.querySelector(".calc__summary li:nth-of-type(1) .item__price")
const ordersCalcSpan = document.querySelector(".calc__summary li:nth-of-type(2) .item__calc");
const ordersPriceSpan = document.querySelector(".calc__summary li:nth-of-type(2) .item__price");
const packageCalcSpan = document.querySelector(".calc__summary li:nth-of-type(3) .item__calc");
const packagePriceSpan = document.querySelector(".calc__summary li:nth-of-type(3) .item__price");
const accountingPriceSpan = document.querySelector(".calc__summary li:nth-of-type(4) .item__price");
const terminalPriceSpan = document.querySelector(".calc__summary li:nth-of-type(5) .item__price");
const totalInfoContainer = document.querySelector(".summary__total");
const totalPriceSpan = document.querySelector(".total__price");


// Funkcja która rozwija listę package po kliknięciu
selectInput.addEventListener("click", function(){
    packageList.classList.toggle("showItem");
    document.querySelector(".calc__select .select__input::after").style.transform = "rotate(180deg)";
});


// Funkcja zmieniająca napis w package oraz zielonym divie
packageList.querySelectorAll("li").forEach(function(item){
    item.addEventListener("click", function(e){
        packageDiv.textContent = item.textContent;
        packageCalcSpan.textContent = item.textContent;
    });
});


// Funkcja ukrywająca niezaznaczone elementy
function hideNotSelectedSummary(){
    if(productsInput.value.length > 0){
        liProducts.style.display = "flex";
    } else {
        liProducts.style.display = "none";
    };

    if(ordersInput.value.length > 0){
        liOrders.style.display = "flex";
    } else {
        liOrders.style.display = "none";
    };

    if(["Professional", "Basic", "Premium"].includes(packageDiv.textContent)){
        liPackage.style.display = "flex";
    } else {
        liPackage.style.display = "none";
    };

    if(accountingCheckBox.checked){
        accountingPriceSpan.textContent = `$${accountingPrice}`;
        liAccounting.style.display = "flex";
    } else {
        accountingPriceSpan.textContent = "";
        liAccounting.style.display = "none";
    };

    if(terminalCheckBox.checked){
        terminalPriceSpan.textContent = `$${terminalPrice}`;
        liTerminal.style.display = "flex";
    } else {
        terminalPriceSpan.textContent = "";
        liTerminal.style.display = "none";
    };

    
    if(liProducts.style.display === "flex" || liOrders.style.display === "flex" || liPackage.style.display === "flex" || liAccounting.style.display === "flex"|| liTerminal.style.display === "flex"){
        totalInfoContainer.style.display = "flex";
    } else {
        totalInfoContainer.style.display = "none"
    };
};



// Funkcja wyświetlająca odpowiednie cyfry w bocznym divie oraz odpowiednią sumę całkowitą
function addPrices(event){
    // Obliczenia
    productsCalcSpan.textContent = `${productsInput.value} * $${productPrice}`;
    // Wynik
    productsPriceSpan.textContent = `$${productsInput.value * productPrice}`;

    // Obliczenia
    ordersCalcSpan.textContent = `${ordersInput.value} * $${orderPrice}`;
    // Wynik
    ordersPriceSpan.textContent = `$${ordersInput.value * orderPrice}`;

    // Package wynik tekstu
    if(packageCalcSpan.textContent === "Basic"){
        packagePriceSpan.textContent = `$${basicPrice}`;
    } else if(packageCalcSpan.textContent === "Professional"){
        packagePriceSpan.textContent = `$${professionalPrice}`;
    } else if(packageCalcSpan.textContent === "Premium") {
        packagePriceSpan.textContent = `$${premiumPrice}`;
    };


    // Suma całkowita
    totalValue = productsInput.value * productPrice + ordersInput.value * orderPrice;

    if(packageCalcSpan.textContent === "Basic"){
        totalValue += basicPrice;
    } else if(packageCalcSpan.textContent === "Professional"){
        totalValue += professionalPrice;;
    } else if(packageCalcSpan.textContent === "Premium") {
        totalValue += premiumPrice;
    };

    if(accountingCheckBox.checked){
        totalValue += accountingPrice;
    };

    if (terminalCheckBox.checked){
        totalValue += terminalPrice;
    };

    totalPriceSpan.textContent = `$${totalValue}`;
};




// Jakie eventy uzyc
// checkboxy --- change
// input --- input
// selectory --- klikniecie


productsInput.addEventListener("input", hideNotSelectedSummary);productsInput.addEventListener("input", addPrices);

ordersInput.addEventListener("input", hideNotSelectedSummary);
ordersInput.addEventListener("input", addPrices);

selectInput.addEventListener("click", hideNotSelectedSummary);
selectInput.addEventListener("click", addPrices);

accountingCheckBox.addEventListener("change", hideNotSelectedSummary);
accountingCheckBox.addEventListener("change", addPrices);

terminalCheckBox.addEventListener("change", hideNotSelectedSummary);
terminalCheckBox.addEventListener("change", addPrices);
