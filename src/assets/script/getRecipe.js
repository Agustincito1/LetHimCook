const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');       
const imgP = document.getElementById("imgPrincipal");
const titleName = document.getElementById("titleName");
const ingredienteCont = document.getElementById("IngredientesCont");
const pasosCont = document.getElementById("pasosCont");

async function getRecipe(){
    try{
        const response = await fetch("../php/getRecipe.php",{
            method: "POST",
            body: JSON.stringify({ id: id}),
        });
        const data = await response.json();
        if(data.success){

            const receta = data.data.receta[0];
            const ingredientes = data.data.ingrediente;
          
            const imagenes = JSON.parse(receta.imagenes);
            imgP.src = imagenes.principal;

            titleName.textContent = receta.titulo;
            
            const listI = ingredientes;
            listI.forEach((value, index) => {
                const li = document.createElement("li");
                const pNumber = document.createElement("p");
                const pText = document.createElement("p");
                pNumber.textContent = index + 1;
                pText.textContent = value.nombre +" - "+ value.cantidad + " " + value.unidad;
                li.appendChild(pNumber);
                li.appendChild(pText);
                ingredienteCont.appendChild(li)
            });
            
            const listC = JSON.parse(receta.pasos);
            listC.forEach((value, index) => {
                const li = document.createElement("li");
                const stepV = document.createElement("span");
                const divContImg = document.createElement("div");
                const title = document.createElement("h3");
                const description = document.createElement("p");
                const img = document.createElement("img");
                stepV.textContent = index+1;
                title.textContent = value.paso;
                description.textContent = value.description
                img.src = imagenes.pasos[index];
                li.appendChild(stepV);
                li.appendChild(title);
                li.appendChild(description);
                divContImg.appendChild(img);
                li.appendChild(divContImg);
                pasosCont.appendChild(li)
                
            });

        }
        else{
            console.log(data.error);
        }
    }
    catch(err){
        console.log(err)
    }

}

getRecipe()

 
window.myPuntaje = 0;
const stars = document.querySelectorAll(".sectionH--starContainer .star");

function highlightStars(count) {
    stars.forEach(star => {
        star.classList.toggle("active", star.dataset.star <= count);
    });
}

async function raiting(){
    
    try {
        const response = await fetch("../php/MUser.php", {
            method: "POST",
            body: JSON.stringify({
                idRecipe: id,
            })
        })

        const data = await response.json();

        
        if(!data){


            stars.forEach((star, index) => {
                const starValue = index + 1;
                star.dataset.star = starValue;

                star.addEventListener("mouseover", () => {
                    highlightStars(starValue);
                });

                star.addEventListener("click", () => {
                    window.myPuntaje = starValue;
                    saveRaiting(window.myPuntaje);
                });
            });

            document.querySelector(".sectionH--starContainer").addEventListener("mouseleave", () => {
                highlightStars(window.myPuntaje);
            });

            
        }


    } catch (error) {
        console.error(error)
        return false
    }

}

raiting()


async function saveRaiting(rating) {

    try {
       
        const response = await fetch("../php/opinion.php", {
            method: "POST",
            body: JSON.stringify({
                idRecipe: id,
                rating: rating
            })
        });

        const data = await response.json();

        if (data) {
            console.log("Rating saved successfully");
        } 
        
    } catch (error) {
        console.error(error)
        return false
    }

}
async function getData(){
    try {
        const response = await fetch("../php/getDataUser.php", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();
        if(data.success){

            window.nameUser = data.data[0].nombreUsuario;
            return data.data
        }
        else{
            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}
getData();

async function enviarMensaje(mensaje){
    const fecha = new Date();
    const mensajeObj = {
        mensaje: mensaje,
        fecha: fecha.toLocaleDateString(),
    };
    try {
        const response = await fetch("../php/opinion.php", {
            method: "POST",
            body: JSON.stringify({
                idRecipe: id,
                mensaje: mensajeObj,
            })
        })

        const data = await response.json();

        
        if(data){
            console.log("Mensaje enviado");
        }


    } catch (error) {
        console.error(error)
        return false
    }

}

const formMensaje = document.getElementById("formComentario");
formMensaje.addEventListener("submit", (e) => {
    e.preventDefault();
    const mensajeInput = document.getElementById("comentario");
    const mensaje = mensajeInput.value.trim();
    if (mensaje) {
        mensajeInput.value = "";
        const fecha = new Date();
        const fechaStr = fecha.toLocaleDateString();
        if(enviarMensaje(mensaje)){
            const comentariosCont = document.getElementById("comentariosCont");
            const mensajeDiv = document.createElement("div");
            const fecha = document.createElement("span");
            const username = document.createElement("h4");
            username.textContent = window.nameUser;
            
            fecha.classList.add("fechaComentario");
            fecha.textContent = fechaStr;
            mensajeDiv.classList.add("comentarioUser");
            mensajeDiv.textContent = mensaje;
            
            mensajeDiv.appendChild(username);
            mensajeDiv.appendChild(fecha);
            comentariosCont.appendChild(mensajeDiv);
        };
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../php/opinion.php", {
            method: "POST",
            body: JSON.stringify({
                idRecipe: id,
                tipo: "getMensajesOpinions",
            })
        })

        const data = await response.json();
        
        if(data){
            const myopinions = data.myOpinion;
            window.myPuntaje = myopinions.puntaje;
            highlightStars(window.myPuntaje);

            const AllOpinion = data.AllOpinion;

            const comentariosCont = document.getElementById("comentariosCont");

            if(AllOpinion){
                AllOpinion.forEach((value) => {

                    const mensajeDiv = document.createElement("div");
                    const fecha = document.createElement("span");
                    const username = document.createElement("h4");
                    username.textContent = value.nombreUsuario;
                    
                    fecha.classList.add("fechaComentario");
                    fecha.textContent = value.mensaje.fecha;
                    mensajeDiv.classList.add("comentarioUser");
                    mensajeDiv.textContent = value.mensaje.mensaje;
                    
                    mensajeDiv.appendChild(username);
                    mensajeDiv.appendChild(fecha);
                    comentariosCont.appendChild(mensajeDiv);
                });

            }

            if(myopinions){
                const comentarios = JSON.parse(myopinions.mensaje);
                comentarios.forEach((value) => {
                    const mensajeDiv = document.createElement("div");
                    const fecha = document.createElement("span");
                    const username = document.createElement("h4");
                    username.textContent = myopinions.nombreUsuario;
                    
                    fecha.classList.add("fechaComentario");
                    fecha.textContent = value.fecha;
                    mensajeDiv.classList.add("comentarioUser");
                    mensajeDiv.textContent = value.mensaje;
                    
                    mensajeDiv.appendChild(username);
                    mensajeDiv.appendChild(fecha);
                    comentariosCont.appendChild(mensajeDiv);
                });
               
            }


        }


    } catch (error) {
        console.error(error)
        return false
    }

});


