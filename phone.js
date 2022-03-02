// search field
const search=()=>{
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value
   
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCard(data))
}
const displayCard=data=>{
    const gridContainer=document.getElementById('grid-container')
   
    data.data.slice(0,20).forEach(n => {
        const gridCild=document.getElementById('grid-child')
        console.log(n)
        const div=document.createElement('div')
       div.innerHTML=`
       <div class="col">
       <div class="card rounded-3">
         <img src="${n.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
         <div class="card-body text-center">
           <h1 class="card-title mb-3">${n.brand}</h1>
           <h3 class="card-text my-3">${n.phone_name}</h3>
           <button onclick=details("${n.slug}") type="button" class="btn btn-outline-primary">Details</button>
         </div>
       </div>
     </div>`
     gridCild.appendChild(div)
    });

}

const details=data=>{
    
    url=`https://openapi.programming-hero.com/api/phone/${data}`
    fetch(url)
    .then(res=>res.json())
    .then(phone=>displayDetail(phone))
}
const displayDetail=n=>{
console.log(n)
}