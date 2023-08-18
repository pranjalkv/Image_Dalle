const inpImg=document.querySelector(".inp-img");
const formSub=document.querySelector(".form-sub");
const imgDiv=document.querySelector(".img-under-grid");
const load=document.querySelector(".loader")
const error=document.querySelector(".Error");
let dataGet=[];
//  https://api.openai.com/v1/images/generations 

formSub.addEventListener("click",fetchImg);

async function fetchImg(e)
{
e.preventDefault();

    load.style.display="block"
    error.style.display="none"
    
    formSub.disabled=true;
const options={
    method:"POST",
    headers: {
        "Authorization":`Bearer ${API_KEY}` ,
         "Content-Type": "application/json" 
    },
    body:JSON.stringify({
            "prompt": inpImg.value,
    "n": 4,
    "size": "1024x1024"
    })
}
try{
     dataGet=[];
     imgDiv.innerHTML="";
    const res = await fetch("https://api.openai.com/v1/images/generations",options)
 dataGet=await res.json();

    dataGet?.data.forEach((ele)=>{
    let underGrid=document.createElement("img");
underGrid.classList.add("image-size")
underGrid.src=ele.url
underGrid.loading="lazy"
imgDiv.append(underGrid)
})

console.log(dataGet);
load.style.display="none"
formSub.disabled=false;
error.style.display="none"
}
catch(err)
{
    dataGet=[];
    console.log(err)
load.style.display="none"
error.style.display="block"
formSub.disabled=false;
}
}
