let url = "https://mockapi-lrqd.onrender.com/services";
let mainSection = document.getElementById("data-list-wrapper");

let paginationWrapper = document.getElementById("pagination-wrapper");

// job
let jobRoleInput = document.getElementById("job-role");
let jobImageInput = document.getElementById("job-image");
let jobCompanyNameInput = document.getElementById("job-companyName");
let jobExperienceRequiredInput = document.getElementById(
  "job-experienceRequired"
);
let jobEmploymentTypeInput = document.getElementById("job-employmentType");
let jobpackageCTCInput = document.getElementById("job-packageCTC");
let jobKeySkillsInput = document.getElementById("job-keySkills");
let jobCreateBtn = document.getElementById("add-job");

// Update job
let updateJobIdInput = document.getElementById("update-job-id");
let updateJobRoleInput = document.getElementById("update-job-role");
let updateJobImageInput = document.getElementById("update-job-image");
let updateJobCompanyNameInput = document.getElementById(
  "update-job-companyName"
);
let updateJobExperienceRequiredInput = document.getElementById(
  "update-job-experienceRequired"
);
let updateJobEmploymentTypeInput = document.getElementById(
  "update-job-employmentType"
);
let updateJobPackageCTCInput = document.getElementById("update-job-packageCTC");
let updateJobKeySkillsInput = document.getElementById("update-job-keySkills");
let updateJobBtn = document.getElementById("update-job");

let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

async function fetchData(url, params = "") {
  try {
    let res = await fetch(`${url}&${params}`);
    let totalData = res.headers.get("X-Total-Count");
    let limit = 4;
    let totalPages = Math.ceil(totalData / limit);
    console.log(totalPages);
    pagination(totalPages, limit, params);
    let data = await res.json();
    appendData(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData(`${url}?_page=1&_limit=4`);

function createCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id;
  let cardImg = document.createElement("div");
  cardImg.className = "card-img";

  let img = document.createElement("img");
  img.src = item.image;
  img.alt = "services";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardRole = document.createElement("h5");
  cardRole.classList.add("card-role");
  cardRole.textContent = `${item.title}`;

  let cardCompanyName = document.createElement("p");
  cardCompanyName.className = "card-companyName";
  // cardCompanyName.textContent = item.companyName;

  let cardExperience = document.createElement("p");
  cardExperience.className = "card-experienceRequired";
  // cardExperience.textContent = `experience required : ${item.experienceRequired} Yrs`;

  let cardEmploymentType = document.createElement("p");
  cardEmploymentType.className = "card-employmentType";
  cardEmploymentType.textContent = `${item.description}`;

  let packageCTC = document.createElement("p");
  packageCTC.className = "card-packageCTC";
  packageCTC.textContent = item.price;

  let skills = document.createElement("p");
  skills.className = "card-keySkills";
  //   skills.textContent = `key Skills : ${item.keySkills}`;

  let edit = document.createElement("a");
  edit.href = "#";
  edit.dataset.id = item.id;
  edit.className = "card-link";
  edit.textContent = "Edit";

  edit.addEventListener("click", (e) => {
    e.preventDefault();
    updateJobIdInput.value = item.id;
    updateJobRoleInput.value = item.title;
    updateJobImageInput.value = item.image;
    updateJobEmploymentTypeInput.value = item.description;
    updateJobPackageCTCInput.value = item.price;
  });

  let delBtn = document.createElement("button");
  delBtn.className = "card-button";
  delBtn.dataset.id = item.id;
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("delete");
    deleteJob(item.id);
  });

  card.append(cardImg, cardBody);
  cardImg.append(img);
  cardBody.append(
    cardRole,
    cardCompanyName,
    cardExperience,
    cardEmploymentType,
    packageCTC,
    skills,
    edit,
    delBtn
  );

  return card;
}
function pagination(totalPages, limit, params) {
  paginationWrapper.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
      fetchData(`${url}?_page=${i}&_limit=${limit}`, params);
    });
    paginationWrapper.append(btn);
  }
}

function appendData(data) {
  let cardList = document.createElement("div");
  cardList.className = "card-list";
  data.forEach((item) => {
    cardList.appendChild(createCard(item));
  });
  mainSection.innerText = "";
  mainSection.append(cardList);
}

async function addServices() {
  try {
    let serviceData = {
      title: jobRoleInput.value,
      description: jobEmploymentTypeInput.value,
      image: jobImageInput.value,
      price: jobpackageCTCInput.value,
    };
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceData),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${url}?_page=1&_limit=4`);
    jobRoleInput.value = "";
    jobEmploymentTypeInput.value = "";
    jobImageInput.value = "";
    jobpackageCTCInput.value = "";
  } catch (error) {
    console.log(error);
  }
}

jobCreateBtn.addEventListener("click", addServices);

async function deleteJob(item) {
  try {
    let res = await fetch(`${url}/${item}`, {
      method: "DELETE",
    });
    let data = await res.json();
    fetchData(`${url}?_page=1&_limit=4`);
  } catch (error) {
    console.log(error);
  }
}

async function updateService() {
  try {
    let serviceData = {
      title: updateJobRoleInput.value,
      description: updateJobEmploymentTypeInput.value,
      image: updateJobImageInput.value,
      price: updateJobPackageCTCInput.value,
    };
    let res = await fetch(`${url}/${updateJobIdInput.value}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceData),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${url}?_page=1&_limit=4`);
    updateJobIdInput.value = "";
    updateJobRoleInput.value = "";
    updateJobEmploymentTypeInput.value = "";
    updateJobImageInput.value = "";
    updateJobPackageCTCInput.value = "";
  } catch (error) {
    console.log(error);
  }
}

updateJobBtn.addEventListener("click", updateService);
