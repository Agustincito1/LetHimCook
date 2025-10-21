export function alertT(text){
    const div = document.getElementById("alertTure");
    const textM = document.getElementById("textT");
    div.style.display = "grid";
    textM.textContent = text;
    setTimeout(()=>{
        div.style.display = "none";
    }, 3000)
}   