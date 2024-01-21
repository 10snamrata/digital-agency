const baseServerURL = "https://mockapi-lrqd.onrender.com/projects";

let mainSection = document.getElementById("project-wrapper");
let projectPaginationWrapper = document.getElementById("projects-pagination-wrapper");

//serching 
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


// fetch data from api

async function fetchData(url)
{
    try{
        let res = await fetch(`${url}`);

        let totalData = res.headers.get("X-Total-Count");
        let limit = 2;
        let Totalpages = Math.ceil(totalData / limit);
        // pagination(Totalpages, limit);
        projectPaginationWrapper.innerHTML="";
        for (let i = 1; i <= Totalpages; i++) {
            let btn = document.createElement("button");
            btn.classList.add("button", "button-primary");
            btn.innerText = i;
            btn.addEventListener("click", () => {
                fetchData(`${baseServerURL}?_page=${i}&_limit=${limit}`);
            });
            projectPaginationWrapper.append(btn);
            console.log("hii");
        }

        let data = await res.json();
        // console.log(data);
        appendData(data);
    }
    catch(error){
        console.log(error);
    }
}
fetchData(`${baseServerURL}?_page=1&_limit=2`)
// console.log(`${baseServerURL}`)


// append data fetched from api to dom
function appendData(data)
{   
    let projectsCardList = document.createElement("div");
    projectsCardList.classList.add("projects-card-list");

    data.forEach((element) => {
        let card = createCard(element);
        projectsCardList.append(card);
    });
    
    mainSection.textContent="";
    mainSection.append(projectsCardList);
}


// create card
function createCard(ele)
{   
    let card = document.createElement("div");
    card.classList.add("project-card");

    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    let img = document.createElement("img");
    img.src = ele.image;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let title = document.createElement("h2");
    title.classList.add("card-title");
    title.innerText = ele.title;
    let description = document.createElement("p");
    description.classList.add("card-description");
    description.innerText = ele.description;
    let tags = document.createElement("p");
    tags.classList.add("tags");
    tags.innerText = `Tags: ${ele.tags}`;
    let status = document.createElement("p");
    status.classList.add("status");
    status.innerText = `status: ${ele.status}`;
    let project_link = document.createElement("a");
    project_link.classList.add("project-link");
    project_link.innerText = `project_link: ${ele.project_link}`;
    project_link.href = `${ele.project_link}`;
    let btn = document.createElement("button");
    btn.classList.add("card-btn");
    btn.innerText = "Explore Project";
    btn.addEventListener("click", ()=>{
        window.location.href = `${ele.project_link}`;
    })


    cardImg.append(img);
    cardBody.append(title, description, tags , status, project_link, btn);
    card.append(cardImg, cardBody);
    return card;
}


// search

async function search() {
    try {
      let res;
      if (searchBySelect.value === "title") {
        res = await fetch(`${baseServerURL}?title=${searchByInput.value}`);
      } else if(searchBySelect.value === "tags") {
        res = await fetch(`${baseServerURL}?tags=${searchByInput.value}`);
      }
      else{
        res = await fetch(`${baseServerURL}?status=${searchByInput.value}`);
      }
      let result = await res.json();
      appendData(result);
    } catch (error) {
      console.log(error);
    }
  }
  
  searchByButton.addEventListener("click", search);