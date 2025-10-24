const email = localStorage.getItem('email');
const contetgmail = document.getElementById("Gmail");
contetgmail.textContent = email;


import { alertT } from './alert.js';

const form = document.getElementById("logForm")
const conE = document.getElementById("contenedorErr")

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const errors = []
    const code = form.code.value.trim();

    if(code === ""){
        errors.push("El codigo esta vacio")
    }

    if (errors.length > 0){
       verifyForm(errors);
    }
    else{
        fetch("../php/verifyCode.php",{
            method: "POST",
            body:JSON.stringify({
                code: code,
                gmail: email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success === true){
                alertT("El codigo es correcto");
                setTimeout(()=>{
                    localStorage.removeItem('email');
                    localStorage.setItem('verification', email);
                    window.location.href = "resetPassword.html";
                },2000)
            }
            else{
                errors.push(data.message)
                verifyForm(errors)
            }
            
        })
        .catch(error => console.log("error:", error))
    }
})




function verifyForm(errors){
    conE.innerHTML = ""
    var contador = 0;
   
    conE.style.opacity = 1
    conE.style.flex = "0.3"
    setTimeout(()=>{
        conE.style.opacity = 1
    }, 200)
    conE.style.flex = "0.3"

    setTimeout(()=>{
        conE.style.opacity = 0
        setTimeout(()=>{
            conE.style.flex = "0"
        }, 200)
        
        setTimeout(()=>{
            conE.innerText = ""
        }, 300)
    }, 2000)
    const ul = document.createElement("ul")
    errors.forEach((value) =>{
        if(contador === 5){return}
        const li = document.createElement("li")
        const p = document.createElement("p")
        const img = document.createElement("img")
        img.src = "../assets/img/advertencia.png"
        img.classList.add("errImg")
        p.innerText = value
        li.append(img, p);
        ul.appendChild(li)
        contador++
    })

    conE.appendChild(ul)
}