
const form = document.getElementById("regForm")
const conE = document.getElementById("contenedorErr")
const sus = document.getElementById("succ")
form.addEventListener("submit", (event)=>{

    
    event.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const errors = []
    const name = form.name.value.trim();
    const password = form.password.value.trim();
    const Rpassword = form.repeatPassword.value.trim();
    const gmail = form.email.value.trim();

    

    if(name === ""){
        errors.push("Nombre esta vacio")
    }
    if(password === ""){
        errors.push("La contraseña esta vacia")
    }
    if(Rpassword === ""){
        errors.push("La contraseña repetida esta vacia")
    }
    if (!gmailRegex.test(gmail)) {
        errors.push("Ingresa correctamente el gmail");
    }
    if (password !== Rpassword) {
        errors.push("Las contraseñas no coinciden");
    }
    if(gmail === ""){
        errors.push("El gmail esta vacio")
    }

    if (errors.length > 0){
        verifyForm(errors)
        
    }
    else{
        fetch("../php/registro.php",{
            method: "POST",
            body:JSON.stringify({
                name: name,
                password: password,
                rPass: Rpassword,
                gmail: gmail
            })
                
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success === true){
                console.log(data.message)
                sus.style.display = "block"
                
                sus.style.opacity = 1
                setTimeout(()=>{
                    sus.style.opacity = 0
                },2000)
                setTimeout(()=>{
                    window.location.href = "login.html"
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