// Fetch Data.
const getData = async (inputValue) => {
  const main = document.getElementById("main");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  const data = await res.json();
  const phones = data.data;
  showData(phones);

  // Validation
  if (data.status === false) {
    main.innerHTML = `<div class="flex justify-center items-center min-h-[500px]">
        <h1 class="text-6xl font-bold text-yellow-400">Data not found!</h1>
      </div> `;
  }
};

// ShowData.
const showData = (phones) => {
  const phoneContainer = document.getElementById("phoneContainer");

  // Clear previous Data in phoneContainer.
  phoneContainer.textContent = "";

  // ShowAllBtn Toggle here.
  const showAllBtn = document.getElementById("showAllBtn");
  if (phones.length > 12) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // Show only first 12 Items.
  phones = phones.slice(0, 12);

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

// Search button.
const searchData = () => {
  const searchInput = document.getElementById("searchInput");
  const inputValue = searchInput.value;

  // Validation.
  if (!inputValue) {
    alert("Please Search your phone!");
  } else {
    getData(inputValue);
  }
};
