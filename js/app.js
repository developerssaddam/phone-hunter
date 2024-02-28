// Fetch Data.
const getDataFromApi = async (inputValue, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  const data = await res.json();
  const status = data.status;
  const phones = data.data;
  showData(phones, status, isShowAll);
};

// Get SearchInput.
const getSearchInput = (isShowAll) => {
  const searchInputField = document.getElementById("searchInputField");
  const inputValue = searchInputField.value;
  // Validation
  if (!inputValue) {
    alert("Please input your phone name!");
  } else {
    getDataFromApi(inputValue, isShowAll);
  }
};

// ShowData.
const showData = (phones, status, isShowAll) => {
  const phoneContainer = document.getElementById("phoneContainer");
  const msgContainer = document.getElementById("msgContainer");
  const showAllBtn = document.getElementById("showAllBtn");

  // Validation Data found or not.
  if (!status) {
    msgContainer.classList.remove("hidden");
  } else {
    msgContainer.classList.add("hidden");
  }

  // ToggleShowAll Button.
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // Clear PreviousPhones.
  phoneContainer.innerText = "";

  // Validation all data show or not.
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

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

// If Clicked showAllBtn.
const clickShowAllBtn = () => {
  getSearchInput(true);
};
