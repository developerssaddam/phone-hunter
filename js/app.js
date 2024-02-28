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

    // Show loading
    loadingToggle("hidden");
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
    const { phone_name, slug, image } = phone;
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
            <button onclick="getSinglePhone('${slug}')" class="btn bg-gray">Show details</button>
            </div>
        </div>`;

    phoneContainer.appendChild(childDiv);
  });

  // Hideloading
  loadingToggle("hidden");
};

// If Clicked showAllBtn.
const clickShowAllBtn = () => {
  getSearchInput(true);
};

// Loading Toggle.
const loadingToggle = (hidden) => {
  const loading = document.getElementById("loading");
  if (loading.classList.contains(hidden)) {
    loading.classList.remove(hidden);
  } else {
    loading.classList.add(hidden);
  }
};

// ShowModal.
const showModal = (phoneDetails) => {
  const { name, slug, image, mainFeatures, releaseDate, brand, others } =
    phoneDetails;
  const modal = document.getElementById("showDetailsModal");
  modal.showModal();
  modal.innerHTML = `<div class="modal-box">
  <form method="dialog">
    <button
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    >
      ✕
    </button>
  </form>
  <div class="flex justify-center mb-3">
    <img src="${image}" alt="">
  </div>
  <h3 class="font-bold text-lg">${name}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Brand :</span> ${brand}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Storage :</span> ${mainFeatures?.memory}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Display-Size :</span> ${mainFeatures?.displaySize}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Chipset :</span> ${mainFeatures?.chipSet}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Slug :</span> ${slug}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">Release Date :</span> ${releaseDate}</h3>
  <h3 class="text-[14px] font-bold"> <span class=" text-base">GPS :</span> ${others?.GPS}</h3>
  
</div>`;
};

// Get singlePhone info.
const getSinglePhone = async (slug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  showModal(phoneDetails);
};
