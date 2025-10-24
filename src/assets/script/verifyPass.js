import { alertT } from './alert.js';
const email = localStorage.getItem('verification');


const form = document.getElementById("logForm")
const conE = document.getElementById("contenedorErr")

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const errors = []
    const password = form.password.value.trim();
    const passwordRepeat = form.repeatPassword.value.trim();


    if(password === ""){
        errors.push("La contraseña esta vacio")
    }
    else{
        if(passwordRepeat === ""){
            errors.push("Repita la contraseña")
        }
        else{
            if(passwordRepeat !== password){
                errors.push("Las contraseñas son distintas")
            }
        }
    }
   
   
    if (errors.length > 0){
       verifyForm(errors);
    }
    else{
        fetch("../php/resetPass.php",{
            method: "POST",
            body:JSON.stringify({
                password: password,
                gmail: email,
            })
                
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success === true){
                alertT("Contraseña restaurada correctamente");
                setTimeout(()=>{
                    window.location.href = "login.html";
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