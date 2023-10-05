//Validation Form
document.querySelector("#btnSend").onclick = Validation = (event) => {
  event.preventDefault();

  const noResiValue = Math.floor(Math.random() * 100000000000);
  const nameSenderValue = document.querySelector("#nameSender").value;
  const nameRecipientValue = document.querySelector("#nameRecipient").value;
  const emailValue = document.querySelector("#email").value;
  const addressValue = document.querySelector("#address").value;
  const cityFromValue = document.querySelector("#cityFrom").value;
  const cityToValue = document.querySelector("#cityTo").value;
  const packageServiceValue = document.querySelector("#packageService").value;
  const weightValue = parseFloat(document.querySelector("#weight").value);

  //   alert condition if field empty
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

  const parentPackageDiv = document.createElement("div");
  parentPackageDiv.className = "parentPackage";

  parentPackageDiv.innerHTML = `
        <div>
          <p>No Resi</p>
          <p>:</p>
          ${noResiValue}
        </div>
        <div>
          <p>Name Sender</p>
          <p>:</p>
          ${nameSenderValue}
        </div>
        <div>
          <p>Name Recipient</p>
          <p>:</p>
          ${nameRecipientValue}
        </div>
        <div>
          <p>Email</p>
          <p>:</p>
          ${emailValue}
        </div>
        <div>
          <p>Address</p>
          <p>:</p>
          ${addressValue}
        </div>
        <div>
          <p>City From</p>
          <p>:</p>
          ${cityFromValue}
        </div>
        <div>
          <p>City To</p>
          <p>:</p>
          ${cityToValue}
        </div>
        <div>
          <p>Package Service</p>
          <p>:</p>
          ${packageServiceValue}
        </div>
        <div>
          <p>Weight</p>
          <p>:</p>
          ${weightValue} kg
        </div>
        <div>
          <p>Total Price</p>
          <p>:</p>
          ${calculateTotalPrice(packageServiceValue, weightValue)}
        </div>
        <div>
          <button class="clearBtn">Clear</button>
        </div>
      `;

  // button clear data
  const clearBtn = parentPackageDiv.querySelector(".clearBtn");
  clearBtn.addEventListener("click", () => {
    parentPackageDiv.remove();
  });

  document.querySelector(".result_package").appendChild(parentPackageDiv);

  // Clear the form inputs
  document.querySelector("#nameSender").value = "";
  document.querySelector("#nameRecipient").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#cityFrom").value = "";
  document.querySelector("#cityTo").value = "";
  document.querySelector("#packageService").value = "";
  document.querySelector("#weight").value = "";
};

//Check Resi
document.querySelector(".button-track").onclick = checkResi = (event) => {
  event.preventDefault();

  const resiTrack = document.querySelector("#resi").value;

  if (!resiTrack) {
    alert("Please fill in all fields correctly before sending.");
    return;
  }
};

//Logic Price Per Kilogram
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
