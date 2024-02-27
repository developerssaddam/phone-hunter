// Fetch Data.
const getData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  showData(phones);
};

// ShowData.
const showData = (phones) => {
  const phoneContainer = document.getElementById("phoneContainer");
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

getData();
