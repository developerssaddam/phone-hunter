// Fetch Data.
const getDataFromApi = async (inputValue) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  const data = await res.json();
  const status = data.status;
  const phones = data.data;
  showData(phones, status);
};

// Get SearchInput.
const getSearchInput = () => {
  const searchInputField = document.getElementById("searchInputField");
  const inputValue = searchInputField.value;
  // Validation
  if (!inputValue) {
    alert("Please input your phone name!");
  } else {
    getDataFromApi(inputValue);
  }
};

// ShowData.
const showData = (phones, status) => {
  const phoneContainer = document.getElementById("phoneContainer");
  const msgContainer = document.getElementById("msgContainer");

  // Validation messege Data found or not.
  if (!status) {
    msgContainer.classList.remove("hidden");
  } else {
    msgContainer.classList.add("hidden");
  }

  // Clear PreviousPhones.
  phoneContainer.innerText = "";

  phones.map((phone) => {
    const { phone_name, image } = phone;
    const childDiv = document.createElement("div");
    childDiv.classList.add("card", "bg-base-100", "shadow-xl", "p-6");
    childDiv.innerHTML = `
            <figure>
            <img
            src="${image}"
            alt="Phone"
            />
        </figure>
        <div class="card-body text-center">
            <h2 class="text-2xl">${phone_name}</h2>
            <div class="card-actions justify-center">
            <button class="btn bg-gray">Show details</button>
            </div>
        </div>`;

    phoneContainer.appendChild(childDiv);
  });
};
