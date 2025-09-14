
const form = document.getElementById("logForm")
const conE = document.getElementById("contenedorErr")


form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const errors = []
    const name = form.username.value.trim();
    const password = form.password.value.trim();


    

    if(name === ""){
        errors.push("Nombre esta vacio")
    }
    if(password === ""){
        errors.push("La contraseña esta vacia")
    }

    if (errors.length > 0){
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
})

