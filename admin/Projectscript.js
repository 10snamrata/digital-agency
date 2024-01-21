// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `https://mockapi-lrqd.onrender.com`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const jobURL = `${baseServerURL}/projects`;
let mainSection = document.getElementById("data-list-wrapper");

let paginationWrapper = document.getElementById("pagination-wrapper");

// project
let projectid = document.getElementById("project-id");
let jobRoleInput = document.getElementById("project-title");
let jobImageInput = document.getElementById("project-description");
let jobCompanyNameInput = document.getElementById("project-img");
let jobExperienceRequiredInput = document.getElementById(
  "project-tag"
);
let jobEmploymentTypeInput = document.getElementById("project-status");
let jobpackageCTCInput = document.getElementById("project-link");
let jobKeySkillsInput = document.getElementById("project-client");
let jobCreateBtn = document.getElementById("add-project");

// Update project
let updateJobIdInput = document.getElementById("update-project-id");
let updateJobRoleInput = document.getElementById("update-project-title");
let updateJobImageInput = document.getElementById("update-project-description");
let updateJobCompanyNameInput = document.getElementById(
  "update-project-img"
);
let updateJobExperienceRequiredInput = document.getElementById(
  "update-project-tag"
);
let updateJobEmploymentTypeInput = document.getElementById(
  "update-project-status"
);
let updateJobPackageCTCInput = document.getElementById("update-project-link");
let updateJobKeySkillsInput = document.getElementById("update-project-client");
let updateJobBtn = document.getElementById("update-project");



//sort and filter

let filterGoogle = document.getElementById("filter-completed");
let filterMicrosoft = document.getElementById("filter-pending");




//Jobs Data
let jobsData = [];
let queryParamString = null;
let pageNumber = 1;

function createCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id;
  let cardImg = document.createElement("div");
  cardImg.className = "card-img";

  let img = document.createElement("img");
  img.src = item.image;
  img.alt = "project";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardRole = document.createElement("h5");
  cardRole.classList.add("card-role");
  cardRole.textContent = `Project Title : ${item.title}`;

  let cardCompanyName = document.createElement("p");
  cardCompanyName.className = "card-companyName";
  cardCompanyName.textContent =`Tag : ${item.tags}` ;

  let cardExperience = document.createElement("p");
  cardExperience.className = "card-experienceRequired";
  cardExperience.textContent = `Project Link : ${item.project_link} `;

  let cardEmploymentType = document.createElement("p");
  cardEmploymentType.className = "card-employmentType";
  cardEmploymentType.textContent = `Status : ${item.status}`;

  let packageCTC = document.createElement("p");
  packageCTC.className = "card-packageCTC";
  packageCTC.textContent = `Client: ${item.client}`;

  let skills = document.createElement("p");
  skills.className = "card-keySkills";
  skills.textContent = `Description : ${item.description}`;

  let edit = document.createElement("a");
  edit.href = "#";
  edit.dataset.id = item.id;
  edit.className = "card-link";
  edit.textContent = "Edit";

  edit.addEventListener("click", (e) => {
    e.preventDefault();
    updateJobIdInput.value = item.id;
    updateJobRoleInput.value = item.title;
    updateJobImageInput.value = item.description;
    updateJobCompanyNameInput.value = item.image;
    updateJobExperienceRequiredInput.value = item.tags;
    updateJobEmploymentTypeInput.value = item.status;
    updateJobPackageCTCInput.value = item.project_link;
    updateJobKeySkillsInput.value = item.client;

   
  });

  let delBtn = document.createElement("button");
  delBtn.className = "card-button";
  delBtn.dataset.id=item.id;
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

function appendData(data) {
  let cardList = document.createElement("div");
  cardList.className="card-list";
  data.forEach((item) => {
    cardList.appendChild(createCard(item));
  });
  mainSection.innerText = "";
  mainSection.append(cardList);
}

function pagination(totalPages, limit, params) {
  paginationWrapper.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
      fetchData(`${jobURL}?_page=${i}&_limit=${limit}`, params);
    });
    paginationWrapper.append(btn);
  }
}

async function fetchData(url, params = "") {
  try {
    let res = await fetch(`${url}&${params}`);
    let totalData = res.headers.get("X-Total-Count");
    let limit = 3;
    let totalPages = Math.ceil(totalData / limit);
    console.log(totalPages);
    pagination(totalPages, limit, params);
    let data = await res.json();
    appendData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData(`${jobURL}?_page=1&_limit=3`);

async function addJob() {
  try {
    let projectdata = {
        id:projectid.value,
      title: jobRoleInput.value,
      description:jobImageInput.value, 
      image:jobCompanyNameInput.value, 
      tags: jobExperienceRequiredInput.value, 
      status: jobEmploymentTypeInput.value,
      project_link: jobpackageCTCInput.value,
      client: jobKeySkillsInput.value
    };
    let res = await fetch(jobURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectdata),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${jobURL}?_page=1&_limit=5`);
  } catch (error) {
    console.log(error);
  }
}

jobCreateBtn.addEventListener("click", addJob);

async function updateJob() {
  try {
    let projectdata = {
      id:updateJobIdInput.value,
    title: updateJobRoleInput.value,
    description:updateJobImageInput.value, 
    image:updateJobCompanyNameInput.value, 
    tags: updateJobExperienceRequiredInput.value, 
    status: updateJobEmploymentTypeInput.value,
    project_link: updateJobPackageCTCInput.value,
    client: updateJobKeySkillsInput.value
  };
    let res = await fetch(`${jobURL}/${updateJobIdInput.value}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectdata),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${jobURL}?_page=1&_limit=3`);
  } catch (error) {
    console.log(error);
  }
}

updateJobBtn.addEventListener("click", updateJob);
async function deleteJob(jobId) {
  try {
    // Make a DELETE request to the API endpoint for deleting a job
    let res = await fetch(`${jobURL}/${jobId}`, {
      method: "DELETE",
    });

    // Check if the request was successful (HTTP status code 200)
    if (res.ok) {
      console.log(`Job with ID ${jobId} deleted successfully`);
      fetchData(`${jobURL}?_page=1&_limit=3`);
    } else {
      console.error(`Failed to delete job with ID ${jobId}`);
    }
  } catch (error) {
    console.error("Error while deleting job:", error);
  }
}





async function fGoogle() {
  fetchData(`${jobURL}?_page=1&_limit=3`, `&status=completed`);
}

filterGoogle.addEventListener("click", fGoogle);

async function fMicroSoft() {
  fetchData(`${jobURL}?_page=1&_limit=3`, `&status=pending`);
}

filterMicrosoft.addEventListener("click", fMicroSoft);



