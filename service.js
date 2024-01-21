const baseServerURL = `https://mockapi-lrqd.onrender.com/services`;

let mainSection=document.getElementById("service-wrapper");
let servicePaginationWrapper=document.getElementById("service-pagination-wrapper");
let servicepaginationButton=document.getElementById("card-button-container");

//pagination
function pagination(pages,limit){
   
    servicePaginationWrapper.innerHTML="";
    for (let i = 1; i <= pages; i++) {
        let btn = document.createElement("button");
        btn.classList.add("button", "button-primary");
        btn.innerText = i;
        btn.addEventListener("click", () => {
          fetchData(`${baseServerURL}?_page=${i}&_limit=${limit}`);
        });
        servicePaginationWrapper.append(btn);
      }
}

async function fetchData(url) {
    try {
      let res = await fetch(`${url}`);
      let totalData = res.headers.get("X-Total-Count");
      let limit = 6;
      let Totalpages = Math.ceil(totalData / limit);
      pagination(Totalpages, limit);
  
      let data = await res.json();
    //   console.log(data);
      appendData(data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData(`${baseServerURL}?_page=1&_limit=6`);



//create card
function createCard(item){
    let card=document.createElement("div");
    card.className="service-card";


  let cardImg = document.createElement("div");
  cardImg.className = "service-card-img";

  let img=document.createElement("img");
  img.src=item.image;
 
  let cardbody=document.createElement("div");
  cardbody.className="service-card-body";

  let title = document.createElement("h3");
  title.className = "card-title";
  title.innerText=item.title;


 let description=document.createElement("p");
 description.className="card-description";
 description.innerText=item.description;


 card.append(cardImg,cardbody);
 cardImg.append(img);
 cardbody.append(title,description);

 return card;
}


function appendData(data){
    let serviceCardList=document.createElement("div");
    serviceCardList.className="service-card-list";

    data.forEach((item)=>{
        serviceCardList.appendChild(createCard(item));
    });

    mainSection.textContent="";
    mainSection.append(serviceCardList);
}