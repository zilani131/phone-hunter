// big card
  const bigCard=document.getElementById('big-card')

//   toggle function
const toggle=(n,id)=>{
    const alertBar=document.getElementById(id)
    alertBar.style.display=n
}

// search field


const search=()=>{
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value
    toggle('none',"alert-not-found")
    toggle('none','alert')
   
    bigCard.textContent=''
   
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    if(searchText=="")
    {
        toggle('block','alert')
        toggle('none','grid-container')
        
    }
  
    else{
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayCard(data))
        toggle('block',"grid-container")
      
    }
    document.getElementById('search-field').value=''
}
// display card
const displayCard=data=>{
      console.log(data)
      if(data.status==false){
        toggle('block',"alert-not-found")
        toggle('none','grid-container')
    }
    else{toggle('block',"grid-container")
        
        const gridCild=document.getElementById('grid-child')
        
        gridCild.textContent=''
        data.data.slice(0,20).forEach(n => {
            console.log(n)
            
            const div=document.createElement('div')
           
           div.innerHTML=`
           <div class="col">
           <div class="card shadow-lg rounded-3 mb-3 ">
             <img src="${n.image}" class="card-img-top w-75 mx-auto my-4" alt="...">
             <div class="card-body text-center">
               <h1 class="card-title mb-3">${n.brand}</h1>
               <h3 class="card-text my-3">${n.phone_name}</h3>
               <button onclick=details("${n.slug}") type="button" class="btn btn-outline-primary btn-light fw-bold border-3">Details</button>
             </div>
           </div>
         </div>`
         gridCild.appendChild(div)
         
        });
    }
    
   

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
// big card details
bigCard.innerHTML=`
<div class="card flex-md-row  align-items-center justify-content-around  mx-auto my-5 w-75 shadow-lg ">
  <div style="width:35%" class= "mx-1 d-flex flex-column justify-content-center" >
  <img src="${n.data?.image}" class="card-img-top w-75 my-4 mx-auto" alt="...">
  <h4 class="text-center">${n.data?.name}</h4>
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
    <td class="text-wrap">${sensors(n.data.mainFeatures?.sensors)}</td>
    </tr>
    <tr>
   <th colspan="2">Display</th>
    </tr>
    <tr>
    <td>Display:</td>
    <td>${n.data.mainFeatures?.displaySize }</td>
   </tr>
   
   <tr>
   <th colspan="2">Performance</th>
    </tr>
    <tr>
    <td>Chipset:</td>
    <td>${n.data.mainFeatures?.chipSet? n.data.mainFeatures?.chipSet:''}</td>
   </tr>
   <tr>
   <th colspan="2">Storage</th>
    </tr>
    <tr>
    <td>RAM:</td>
    <td>${n.data.mainFeatures?.memory? n.data.mainFeatures?.memory:''}</td>
   </tr>
   <tr>
    <td>ROM:</td>
    <td>${n.data.mainFeatures?.storage? n.data.mainFeatures?.storage:''}</td>
   </tr>
  </tbody>
  

</table>
  </div>
</div>
`
}