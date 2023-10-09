//Validation Form
const baseUrl = "http://localhost:3000/";
let formCustomer = document.getElementById("formSend");
let formTrack = document.getElementById("formTrack");
let display = document.querySelector(".result_package");
const urlPackage = "http://localhost:3000/packages";

// console.log(formCustomer);

function generateNumberResi() {
  const randomResi = Math.floor(Math.random() * 100000000000);
  return randomResi;
}
// clear Output
function clearOutput() {
  display.innerHTML = "";
}
//Post Database
formCustomer.addEventListener("submit", (event) => {
  event.preventDefault();
  const noResiValue = generateNumberResi();
  const nameSenderValue = document.querySelector("#nameSender").value;
  const nameRecipientValue = document.querySelector("#nameRecipient").value;
  const emailValue = document.querySelector("#email").value;
  const addressValue = document.querySelector("#address").value;
  const cityFromValue = document.querySelector("#cityFrom").value;
  const cityToValue = document.querySelector("#cityTo").value;
  const packageServiceValue = document.querySelector("#packageService").value;
  const weightValue = parseFloat(document.querySelector("#weight").value);
  const totalPrice = calculateTotalPrice(packageServiceValue, weightValue);

  // alert condition if field empty
  if (
    !nameSenderValue ||
    !nameRecipientValue ||
    !emailValue ||
    !addressValue ||
    !cityFromValue ||
    !cityToValue ||
    isNaN(weightValue) ||
    weightValue <= 0
  ) {
    alert("Please fill in all fields correctly before sending.");
    return;
  }

  const submittedData = {
    idreceipt: noResiValue,
    namesender: nameSenderValue,
    namerecipient: nameRecipientValue,
    email: emailValue,
    address: addressValue,
    cityfrom: cityFromValue,
    cityto: cityToValue,
    packageservice: packageServiceValue,
    itemweight: weightValue,
    totalprice: totalPrice,
  };

  fetch(`${baseUrl}packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submittedData),
  })
    .then((res) => {
      if (res.ok) {
        alert("Add Customer successfully");
      } else {
        alert("Add Customer Not successfully");
      }
    })
    .catch((error) => {
      alert(`Error Massage: ${error.message}`);
    })
    .finally(() => {
      display.innerHTML = `
      <div class="parentPackageDiv">
        <div>
          <p>No Resi : ${submittedData.idreceipt}</p>
        </div>
        <div>
          <p>Name Sender : ${submittedData.namesender}</p>
        </div>
        <div>
          <p>Name Recipient : ${submittedData.namerecipient}</p>
        </div>
        <div>
          <p>Email : ${submittedData.email}</p>
        </div>
        <div>
          <p>Address : ${submittedData.address}</p>
        </div>
        <div>
          <p>City From : ${submittedData.cityfrom}</p>
        </div>
        <div>
          <p>City To : ${submittedData.cityto}</p>
        </div>
        <div>
          <p>Package Service : ${submittedData.packageservice}</p>
        </div>
        <div>
          <p>Item Weight : ${submittedData.itemweight}</p>
        </div>
        <div>
          <p>Total Price : ${submittedData.totalprice}</p>
        </div>
        <div class="button-container">
          <button type="button" onclick="clearOutput()">Clear</button>
        </div>
      </div>
      `;
    });
  // Clear the form inputs
  document.querySelector("#nameSender").value = "";
  document.querySelector("#nameRecipient").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#cityFrom").value = "";
  document.querySelector("#cityTo").value = "";
  document.querySelector("#packageService").value = "";
  document.querySelector("#weight").value = "";
});

// //Check Resi
formTrack.addEventListener("submit", (event) => {
  event.preventDefault();

  const idrecipt = document.getElementById("resi").value;

  if (!idrecipt) {
    alert("Please fill in all fields correctly before sending.");
    return;
  }

  const getDataResi = async () => {
    const res = await fetch(`${urlPackage}/${idrecipt}`);
    const data = await res.json();
    console.log(data.result);
    return data.result;
  };
  getDataResi();

  const displayTrack = async () => {
    const load = await getDataResi();

    let dataDisplay = load.map((obj) => {
      const {
        idreceipt,
        namesender,
        namerecipient,
        email,
        address,
        cityfrom,
        cityto,
        packageservice,
        itemweight,
        totalprice,
      } = obj;

      return (display.innerHTML = `
      <div class="parentPackageDiv">
          <div>
            <p>No Resi : ${idreceipt} </p>
          </div>
          <div>
            <p>Name : ${namesender} </p>
          </div>
          <div>
            <p>Name : ${namerecipient} </p>
          </div>
          <div>
            <p>Name : ${email} </p>
          </div>
          <div>
            <p>Name : ${address} </p>
          </div>
          <div>
            <p>Name : ${cityfrom} </p>
          </div>
          <div>
            <p>Name : ${cityto} </p>
          </div>
          <div>
            <p>Name : ${packageservice} </p>
          </div>
          <div>
            <p>Name : ${itemweight} </p>
          </div>
          <div>
            <p>Name : ${totalprice} </p>
          </div>
          <div>
            <button type="button" onclick="clearOutput()">Clear</button>
          </div>
      </div>
        `);
    });

    display.innerHTML = dataDisplay;
  };
  displayTrack();
});

// //Logic Price Per Kilogram
function calculateTotalPrice(packageService, weight) {
  // Define prices for Regular and Kilat packages
  const regularPricePerKg = 10000;
  const kilatPricePerkg = 15000;

  // Calculate total price based on the selected package service
  if (packageService === "Regular") {
    return `Rp. ${regularPricePerKg * weight}`;
  } else if (packageService === "Kilat") {
    return `Rp. ${kilatPricePerkg * weight}`;
  } else {
    return "Invalid Package Service";
  }
}
