
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

function fetchCards()
{
fetch("http://localhost:3000/toys")
.then((resp)=>resp.json())
.then((toys)=>showCards(toys))
.catch((error)=>console.log(error))
}
fetchCards();
//this function is going to call createNewCards function to create the divs 
//for all the ones inside the URL database
//it has the loop that will display all the cards in the API 
function showCards(toys)
{
  for(let i=0;i<toys.length;i++)
  {
   createNewCards(toys[i]); /// specified the index for the toys[i] for the loop to run through all toys 
  }
}
// createNewCards function will create structure of a new card so everytime we use 
// the fetch for POST, and this function will be invoked inside the .then it will create new 
//structure for new card
const toyCollection=document.getElementById("toy-collection");

function createNewCards(toys)
{
  const createDiv=document.createElement("div");
   createDiv.className="card";

  const h2=document.createElement("h2");
   h2.innerHTML=toys.name;

  const img=document.createElement("img");
   img.className="toy-avatar";
   img.src=toys.image;

  let para=document.createElement("p");
   para.innerHTML=toys.likes;
   para.id="collect-likes"

  let btn=document.createElement("button");
   btn.className="like-btn";
   btn.id=toys.id;
   btn.innerText="Like <3"

   // how should like button work ?
// it should be that everytime i am clicking on the like button it is triggering the event listener
// and what's it's asked to do in the call back function
// first i need to call fetch on the specific id for all the like buttons and call Patch method on it
// since i am editing it 
// then after i get the id, i should add event listener that works on all the buttons that when they are clicked
// they should increment the likes by getting the inside value of p tag and converting it to an integer
// after it has been converted it will be incremented.
// and the value will be passed in the body of the fetch to "likes"

   btn.addEventListener("click",(e)=>{
     e.preventDefault();
    let collectPvalue = e.target.previousElementSibling // get the previous elements of btn which is p tag
    let likeCount = parseInt(collectPvalue.innerText)+1; // converts the value of p tag into integer
    collectPvalue.innerHTML=likeCount; // after it has fetched it should update the p tag's inner value
    fetch(`http://localhost:3000/toys/${e.target.id}`,{
     method:"PATCH",
     headers:{
       "Content-Type":"application/json",
       "Accept":"application/json"
     },
     body:JSON.stringify({
       "likes": likeCount
     })
   }).then((resp)=>resp.json())
  })
  createDiv.append(h2,img,para,btn);
  toyCollection.append(createDiv);
}
//created these ids in the HTML file, but can be created by JS using set attribute
const forms=document.querySelector(".add-toy-form");  

forms.addEventListener("submit",(e)=>{
  const toyName=document.getElementById("toy-name");
  const toyUrl=document.getElementById("toy-url");
  e.preventDefault();
  alert("Create Toy has been clicked")
  fetch("http://localhost:3000/toys",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
      },
      body:JSON.stringify({
        "name":toyName.value,
        "image":toyUrl.value,
        "likes":0
      })
    }).
    then((resp)=>resp.json())
    .then((toy)=>createNewCards(toy))
    .catch((err)=>console.log(err))
    e.target.reset();
})
});
