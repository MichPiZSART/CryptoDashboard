const appEl = document.getElementById("app");

let currentPage = 1;
const objPerPage = 20;

const URL =
  "https://rest.coincap.io/v3/assets?apiKey=88e7ce44ff68f93f1da093ee52a771ec9b2fe3ef07a9c90388c16ba28556f4e7";

const btnData = document.getElementById("getData");

btnData.addEventListener("click", function () {
  fetch(URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("CryptoData", JSON.stringify(data));

      btnData.textContent = "Odśwież";
      btnData.classList.add("activeDataButton");

      setTimeout(()=>{
        btnData.classList.remove("activeDataButton")
      },1000)

      generateTable();
    })
    .catch((error) => console.error("Coś poszło nie tak...", error));
});

function generateTable() {
  const LocalStorageData = JSON.parse(localStorage.getItem("CryptoData"));

  const tBodyEl = document.getElementById("dynamicTableBody");
  tBodyEl.innerHTML = "";

  const firstEl = (currentPage - 1) * objPerPage;
  const lastEl = firstEl + objPerPage;

  LocalStorageData.data.slice(firstEl, lastEl).forEach((obj, index) => {
    const cryptoElement = new CryptoDataElement(
      firstEl + index + 1,
      obj.name,
      obj.symbol,
      obj.priceUsd,
      obj.changePercent24Hr
    );
    cryptoElement.generateCryptoElm();
  });
}

class CryptoDataElement {
  constructor(lp, name, symbol, price, curretRate) {
    this.lp = lp;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.curretRate = curretRate;
  }
  generateCryptoElm() {
    const tBodyEl = document.getElementById("dynamicTableBody");
    const rowEl = document.createElement("tr");
    tBodyEl.appendChild(rowEl);
    const lpTdEl = document.createElement("td");
    lpTdEl.textContent = this.lp + ".";
    rowEl.appendChild(lpTdEl);
    const nameTdEl = document.createElement("td");
    nameTdEl.textContent = this.name;
    rowEl.appendChild(nameTdEl);
    const symbolTdEl = document.createElement("td");
    symbolTdEl.textContent = this.symbol;
    rowEl.appendChild(symbolTdEl);
    const priceTdEl = document.createElement("td");
    priceTdEl.textContent = this.price;
    rowEl.appendChild(priceTdEl);
    const currRateTdEl = document.createElement("td");
    currRateTdEl.textContent = this.curretRate;
    rowEl.appendChild(currRateTdEl);
  }
}

const pageOne = document.getElementById("1stPage");

pageOne.addEventListener("click", function () {
  currentPage = 1;
  generateTable();
  pageOne.classList.add("activeButton");
  pageTwo.classList.remove("activeButton");
  pageThree.classList.remove("activeButton");
  pageFour.classList.remove("activeButton");
  pageFive.classList.remove("activeButton");
});

const pageTwo = document.getElementById("2ndPage");

pageTwo.addEventListener("click", function () {
  currentPage = 2;
  generateTable();
  pageOne.classList.remove("activeButton");
  pageTwo.classList.add("activeButton");
  pageThree.classList.remove("activeButton");
  pageFour.classList.remove("activeButton");
  pageFive.classList.remove("activeButton");
});

const pageThree = document.getElementById("3rdPage");

pageThree.addEventListener("click", function () {
  currentPage = 3;
  generateTable();
  pageOne.classList.remove("activeButton");
  pageTwo.classList.remove("activeButton");
  pageThree.classList.add("activeButton");
  pageFour.classList.remove("activeButton");
  pageFive.classList.remove("activeButton");
});

const pageFour = document.getElementById("4thPage");

pageFour.addEventListener("click", function () {
  currentPage = 4;
  generateTable();
  pageOne.classList.remove("activeButton");
  pageTwo.classList.remove("activeButton");
  pageThree.classList.remove("activeButton");
  pageFour.classList.add("activeButton");
  pageFive.classList.remove("activeButton");
});

const pageFive = document.getElementById("5thPage");

pageFive.addEventListener("click", function () {
  currentPage = 5;
  generateTable();
  pageOne.classList.remove("activeButton");
  pageTwo.classList.remove("activeButton");
  pageThree.classList.remove("activeButton");
  pageFour.classList.remove("activeButton");
  pageFive.classList.add("activeButton");
});


