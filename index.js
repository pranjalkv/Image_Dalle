
const inpImg=document.querySelector(".inp-img");
const formSub=document.querySelector(".form-sub");
const imgDiv=document.querySelector(".img-under-grid");
const load=document.querySelector(".loader")
const error=document.querySelector(".Error");
const btnClose=document.querySelector("#close")
const btnDown=document.querySelector("#download")
const fullview=document.querySelector(".fullview");
const contfull=document.querySelector(".container-full")
const genImg=document.querySelectorAll(".image-size")
const imgview=document.querySelector(".imgview")

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
    "size": "512x512"
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
underGrid.setAttribute("src",ele.url)
underGrid.loading="lazy"
imgDiv.append(underGrid)

underGrid.addEventListener("click",()=>{
    let fullimg=document.createElement("img")
    fullimg.setAttribute("src",underGrid.src);
    fullimg.classList.add("imgview")

    let fullBtn=document.createElement("button")
    fullBtn.textContent="Download ";

    let logo=document.createElement("i")
    logo.classList.add("fa-solid", "fa-arrow-down")
    fullBtn.appendChild(logo)
    fullBtn.classList.add("download")

    contfull.appendChild(fullBtn)
    contfull.appendChild(fullimg);
    fullview.style.display="flex";

fullBtn.addEventListener('click', () => downloadImage(underGrid.src));
    btnClose.addEventListener("click",()=>{
        contfull.removeChild(fullimg);
        contfull.removeChild(fullBtn);
    fullview.style.display="none"

})
})


})
console.log(dataGet);
load.style.display="none"
formSub.disabled=false;
error.style.display="none"
}
catch(err)
{
    dataGet=[];
console.log(err.message)
load.style.display="none"
error.style.display="block"
formSub.disabled=false;
}
}
function downloadImage(imgurl)
{
    let alink=document.createElement("a")
    alink.href=imgurl
    alink.target="_blank"
    alink.download=""
    document.body.appendChild(alink)
    alink.click();
    document.body.removeChild(alink)
}

