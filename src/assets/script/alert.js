export function alertT(text){
    window.scrollTo(0, 0);
    const div = document.getElementById("alertTure");
    const textM = document.getElementById("textT");
    div.style.display = "grid";
    textM.textContent = text;
    setTimeout(()=>{
        div.style.display = "none";
    }, 3000)
}   