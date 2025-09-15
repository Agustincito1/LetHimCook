
const form = document.getElementById("logForm")
const conE = document.getElementById("contenedorErr")
const sus = document.getElementById("succ")


form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = []
    const gmail = form.gmail.value.trim();
    const password = form.password.value.trim();

    if (!gmailRegex.test(gmail)) {
        errors.push("Ingresa correctamente el gmail");
    }

    if(gmail === ""){
        errors.push("El gmail esta vacio")
    }
    if(password === ""){
        errors.push("La contraseña esta vacia")
    }

    if (errors.length > 0){
       verifyForm(errors);
    }
    else{
        fetch("../php/login.php",{
            method: "POST",
            body:JSON.stringify({
                password: password,
                gmail: gmail
            })
                
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success === true){
                console.log(data.message)
                sus.style.display = "block"
                
                sus.style.opacity = 1
                setInterval(()=>{
                    sus.style.opacity = 0
                },2000)
                setInterval(()=>{
                    window.location.href = "menu.html"
                },2200)
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