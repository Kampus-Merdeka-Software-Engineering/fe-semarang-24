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

  fetch(`${baseUrl}packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  })
    .then((res) => {
      if (res.ok) {
        alert("Add Customer successfully");
      } else {
        alert("Add Customer Not successfully");
      }
      console.log(res);
    })
    .catch((error) => {
      alert(`Error Massage: ${error.message}`);
    });
});

// For Display
formCustomer.addEventListener("submit", (event) => {
  event.preventDefault();

  // const noResiValue = generateNumberResi();
  const nameSenderValue = document.getElementById("nameSender").value;
  // const nameRecipientValue = document.querySelector("#nameRecipient").value;
  // const emailValue = document.querySelector("#email").value;
  // const addressValue = document.querySelector("#address").value;
  // const cityFromValue = document.querySelector("#cityFrom").value;
  // const cityToValue = document.querySelector("#cityTo").value;
  // const packageServiceValue = document.querySelector("#packageService").value;
  // const weightValue = parseFloat(document.querySelector("#weight").value);

  const getData = async () => {
    const res = await fetch(`${urlPackage}/${nameSenderValue}`);
    const data = await res.json();
    console.log(data.result);
    return data.result;
  };
  // getData();

  const displayUser = async () => {
    const payLoad = await getData();

    let dataDisplay = payLoad.map((obj) => {
      const { idreceipt, namesender } = obj;

      return `
          <div>
            <p>No Resi : ${idreceipt} </p>
          </div>
          <div>
            <p>Name : ${namesender} </p>
          </div>
        `;
    });

    display.innerHTML = dataDisplay;
  };
  displayUser();

  //   alert condition if field empty
  // if (
  //   !nameSenderValue ||
  //   !nameRecipientValue ||
  //   !emailValue ||
  //   !addressValue ||
  //   !cityFromValue ||
  //   !cityToValue ||
  //   isNaN(weightValue) ||
  //   weightValue <= 0
  // ) {
  //   alert("Please fill in all fields correctly before sending.");
  //   return;
  // }

  // const parentPackageDiv = document.createElement("div");
  // parentPackageDiv.className = "parentPackage";

  // parentPackageDiv.innerHTML = `
  //       <div>
  //         <p>No Resi</p>
  //         <p>:</p>
  //         ${noResiValue}
  //       </div>
  //       <div>
  //         <p>Name Sender</p>
  //         <p>:</p>
  //         ${nameSenderValue}
  //       </div>
  //       <div>
  //         <p>Name Recipient</p>
  //         <p>:</p>
  //         ${nameRecipientValue}
  //       </div>
  //       <div>
  //         <p>Email</p>
  //         <p>:</p>
  //         ${emailValue}
  //       </div>
  //       <div>
  //         <p>Address</p>
  //         <p>:</p>
  //         ${addressValue}
  //       </div>
  //       <div>
  //         <p>City From</p>
  //         <p>:</p>
  //         ${cityFromValue}
  //       </div>
  //       <div>
  //         <p>City To</p>
  //         <p>:</p>
  //         ${cityToValue}
  //       </div>
  //       <div>
  //         <p>Package Service</p>
  //         <p>:</p>
  //         ${packageServiceValue}
  //       </div>
  //       <div>
  //         <p>Weight</p>
  //         <p>:</p>
  //         ${weightValue} kg
  //       </div>
  //       <div>
  //         <p>Total Price</p>
  //         <p>:</p>
  //         ${calculateTotalPrice(packageServiceValue, weightValue)}
  //       </div>
  //       <div>
  //         <button class="clearBtn">Clear</button>
  //       </div>
  //     `;

  // button clear data
  // const clearBtn = parentPackageDiv.querySelector(".clearBtn");
  // clearBtn.addEventListener("click", () => {
  //   parentPackageDiv.remove();
  // });

  // document.querySelector(".result_package").appendChild(parentPackageDiv);

  // // Clear the form inputs
  // document.querySelector("#nameSender").value = "";
  // document.querySelector("#nameRecipient").value = "";
  // document.querySelector("#email").value = "";
  // document.querySelector("#address").value = "";
  // document.querySelector("#cityFrom").value = "";
  // document.querySelector("#cityTo").value = "";
  // document.querySelector("#packageService").value = "";
  // document.querySelector("#weight").value = "";
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

      return `
      <div>
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
      </div>
        `;
    });

    display.innerHTML = dataDisplay;
  };
  displayTrack();

  // const displayTrack = () => {
  //   const load = getDataResi();
  // };
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
