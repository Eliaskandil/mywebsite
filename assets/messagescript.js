function delay(ms){
    return new Promise(resolve =>setTimeout(resolve,ms))
}
const wsok = new WebSocket("https://api.sanojo.com:12520/realtime")
const raintext = document.getElementById("rainbow")
const texts = document.getElementsByClassName("dark")
const tinp = document.getElementById("textinp")
const btn = document.getElementById("button")
const msg = document.getElementById("message")
async function sammyreq(ENDPOINT, BODY) {
    let path = "https://api.sanojo.com:12520/";
    const res = await fetch(path + ENDPOINT, {
        body: JSON.stringify(BODY),
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    return {
        res: res,
        json: json,
    };
}
let color = 0
var mousover = 0
async function rainbow(){
    raintext.style.color = `hsl(${color},100%,50%)`
    color += 1
    await delay(10)
    requestAnimationFrame(rainbow)
    tinp.style.height = `${window.innerWidth/20}px`
    tinp.style.width = `${window.innerWidth/5}px`
    tinp.style.fontSize = `${window.innerWidth/30}px`
    btn.style.height = `${window.innerWidth/20}px`
    btn.style.width = `${window.innerWidth/5}px`
    btn.style.fontSize = `${window.innerWidth/30}px`
    {
        let color = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (color){
            document.body.style.backgroundColor = "#000000"
            for(let i=0;i<texts.length;i++){
                texts[i].style.color = "#FFFFFF"
            }
            tinp.style.backgroundColor = "#222222"
            tinp.style.color = "#FFFFFF"
            tinp.style.borderColor = "#FF00FF"
            btn.style.color = "#000000"
        }else{
            document.body.style.backgroundColor = "#FFFFFF"
            for(let i=0;i<texts.length;i++){
                texts[i].style.color = "#000000"
            }
            tinp.style.backgroundColor = "#BBBBBB"
            tinp.style.color = "#000000"
            btn.style.color = "#FFFFFF"
            tinp.style.borderColor = "#00FF00"
        }
    }
    {
        let color = window.matchMedia("(prefers-color-scheme: dark)").matches
        if(color){
            if(mousover==1){
                btn.style.backgroundColor = "#CCCCCC"
            }else if(mousover==2){
                btn.style.backgroundColor = "#999999"
            }else{
                btn.style.backgroundColor = "#FFFFFF"
            }
        }else{
            if(mousover==1){
                btn.style.backgroundColor = "#333333"
            }else if(mousover==2){
                btn.style.backgroundColor = "#666666"
            }else{
                btn.style.backgroundColor = "#000000"
            }
        }
    }
}
rainbow()
async function btnactivate(){
    if(2<=tinp.value.length&&tinp.value.length<=200){
        if(!btn.disabled)mousover = 0
        btn.disabled = true
        const result = await sammyreq("api/message/new",{message:tinp.value})
        await delay(5000)
        btn.disabled = false
    }else{
        alert("message is past bounds! (2-200 letters)")
        alert("i am NOT risking the life of my servers just for a 3,000 digit approximation of PI, Okay?")
    }
}
async function load(){
    btn.disabled = true
    await delay(5000)
    btn.disabled = false
}
setInterval(()=>{
    wsok.send("MESSAGE")
},1000)
wsok.addEventListener("message",(mesg)=>{
    msg.innerText = mesg.data
})
load()
btn.addEventListener('click',btnactivate)
btn.onmouseenter =function(){if(!btn.disabled)mousover = 1}
btn.onmousedown= function(){mousover = 2}
btn.onmouseleave= function(){if(!btn.disabled)mousover = 0}