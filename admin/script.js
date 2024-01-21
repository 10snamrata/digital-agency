let url = "https://mockapi-lrqd.onrender.com";
let urlParam = "";
let services = document.getElementById("services");
let project = document.getElementById("project");
let blog = document.getElementById("blog");
let tbody = document.getElementById("tbody");
async function fetchData(param) {
  try {
    let res = await fetch(`${url}/${param}?page=1&_limit=20`);
    let data = await res.json();
    let count = res.headers.get("X-Total-Count");
    if (param === "employee") {
      appendUser(data);
    } else if (param === "services") {
      services.innerHTML = count;
    } else if (param === "projects") {
      project.innerHTML = count;
    } else {
      blog.innerHTML = count;
    }
  } catch (error) {
    console.log(error);
  }
}
fetchData("employee");

function createUser(item) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.className = "people";
  let img = document.createElement("img");
  img.src = item.profile;
  img.alt = "image";

  let peopleD = document.createElement("div");
  peopleD.className = "people-d";
  let name = document.createElement("h5");
  name.textContent = item.name;
  let email = document.createElement("p");
  email.textContent = `${item.email}`;

  let td2 = document.createElement("td");
  td2.className = "people-de";

  let des = document.createElement("h5");
  des.textContent = item.designation;

  let td3 = document.createElement("td");
  td3.className = "people-active";
  let active = document.createElement("p");
  active.textContent = "active";

  let td4 = document.createElement("td");
  td4.className = "role";
  let owner = document.createElement("p");
  owner.textContent = "Owner";

  tr.append(td1, td2, td3, td4);
  td1.append(img, peopleD);
  peopleD.append(name, email);
  td2.append(des);
  td3.append(active);
  td4.append(owner);

  return tr;
}

function appendUser(data) {
  data.forEach((item) => {
    tbody.append(createUser(item));
  });
}

function totalService() {
  services.textContent = fetchData("services");
}
totalService();

function totalProject() {
  let data = fetchData("projects");
  project.textContent = data;
}
totalProject();

function totalBlog() {
  project.textContent = fetchData("blogs");
}
totalBlog();
