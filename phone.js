// big card
  const bigCard=document.getElementById('big-card')
// search field

const search=()=>{
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value
  
    bigCard.textContent=''
   
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCard(data))
}
// display card
const displayCard=data=>{
    
    const gridCild=document.getElementById('grid-child')
    gridCild.textContent=''
    data.data.slice(0,20).forEach(n => {
        
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
// big card details url
const details=data=>{
    
    url=`https://openapi.programming-hero.com/api/phone/${data}`
    fetch(url)
    .then(res=>res.json())
    .then(phone=>displayDetail(phone))
}
const displayDetail=n=>{
console.log(n)
const otherDetail=d=>
{
    const other=n.data.others?.d? n.data.others.d:'' 
    return other 
}
// sensor function
const sensors=s=>{
   const sensorArray=s.map(sensor=>" "+sensor)
   return sensorArray
}
// big card
bigCard.innerHTML=`
<div class="card flex-md-row  align-items-center justify-content-around mx-auto my-5" style="width: 32rem;">
  <div class= "mx-4 d-flex flex-column justify-content-center" >
  <img src="${n.data.image}" class="card-img-top w-75 my-4 mx-auto" alt="...">
  <h4 class="text-center">${n.data.name}</h4>
  <h5 class="text-center">${n.data.releaseDate? n.data.releaseDate:'soon'}</h5>
  </div>
  <div class="card-body mx-4 d-flex flex-column justify-content-center">
  <h4 class="text-center my-4 fw-bold ">${n.data.name} Specification</h4>
  <table class="table  table-striped w-100">
  

  <tbody>
    <tr>
      <th colspan="2">Connectivity</th>
    </tr>
    <tr>
    <td>WLAN:</td>
    <td>${n.data.others?.WLAN? n.data.others.WLAN:'' }</td>
   </tr>
    <tr>
    <td>Blutooth:</td>
    <td>${n.data.others?.Blutooth? n.data.others?.Blutooth:''}</td>
   </tr>
    <tr>
    <td>GPS:</td>
    <td>${n.data.others?.GPS? n.data.others?.GPS:''}</td>
   </tr>
    <tr>
    <td>NFC:</td>
    <td>${n.data.others?.NFC? n.data.others?.NFC:''  }</td>
   </tr>
 
    <tr>
    <td>Radio:</td>
    <td>${n.data.others?.Radio? n.data.others?.Radio:''}</td>
   </tr>
   <tr>
   <th colspan="2">Sensors</th>
    </tr>

    <tr>
    <td>Sensors:</td>
    <td class="text-wrap">${sensors(n.data.mainFeatures.sensors)}</td>
    </tr>

    
  </tbody>
  

</table>
  </div>
</div>
`
}