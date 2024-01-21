const baseServerURL = `https://mockapi-lrqd.onrender.com/blogs`;
let mainSection=document.getElementById("blog-wrapper");
let blogPaginationWrapper=document.getElementById("blog-pagination-wrapper");

//serching 
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


//pagination
function pagination(pages,limit){
   
    blogPaginationWrapper.innerHTML="";
    for (let i = 1; i <= pages; i++) {
        let btn = document.createElement("button");
        btn.classList.add("button", "button-primary");
        btn.innerText = i;
        btn.addEventListener("click", () => {
          fetchData(`${baseServerURL}?_page=${i}&_limit=${limit}`);
        });
        blogPaginationWrapper.append(btn);
      }
}

async function fetchData(url) {
    try {
      let res = await fetch(`${url}`);
      let totalData = res.headers.get("X-Total-Count");
      let limit = 4;
      let Totalpages = Math.ceil(totalData / limit);
      pagination(Totalpages, limit);
  
      let data = await res.json();
    //   console.log(data);
      appendData(data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData(`${baseServerURL}?_page=1&_limit=4`);

  //create card
function createCard(item){
    let card=document.createElement("div");
    card.className="blog-card";

   let title=document.createElement("h1");
   title.className="title";
   title.innerText=item.title;


   let date=document.createElement("p");
   date.className="date-author";
   date.innerText=`Published On ${item.date} by ${item.author}`;

   let img=document.createElement("img");
   img.src=item.img;

  let description=document.createElement("p");
   description.className="description";
   description.innerText=item.description;

   let blogurl=document.createElement("a");
   blogurl.className="blogUrl";
   blogurl.innerText=`Continue Reading`;
   blogurl.href=item.url;

  card.append(title,date,img,description,blogurl);
 return card;
}


function appendData(data){
    let blogCardList=document.createElement("div");
    blogCardList.className="blog-card-list";

    data.forEach((item)=>{
        blogCardList.appendChild(createCard(item));
    });

    mainSection.textContent="";
    mainSection.append( blogCardList);
}


// search

async function search() {
  try {
    let res;
    if (searchBySelect.value === "title") {
      res = await fetch(`${baseServerURL}?title=${searchByInput.value}`);
    } else if(searchBySelect.value === "author") {
      res = await fetch(`${baseServerURL}?author=${searchByInput.value}`);
    }
    else{
      res = await fetch(`${baseServerURL}?date=${searchByInput.value}`);
    }
    let result = await res.json();
    appendData(result);
  } catch (error) {
    console.log(error);
  }
}

searchByButton.addEventListener("click", search);