import { verifySession } from "./verSession.js";

async function verify(){
    const user = await verifySession();

    if(user === false){
        window.location.href = "./login.html";
    }
    else{
        // codigo de algo
    }
}


async function getRecipes() {
    const recipeCont = document.getElementById("recipeShow");
    try {
        const response = await fetch("../php/recipes.php",{
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();

        if(data.success){
            const listRecipes = document.getElementById("recipeCont");
            data.data.forEach(receta => {
                const li = document.createElement('li');
                li.className = 'recipe';

                // Parsear imagen principal
                let imagenPrincipal = '../assets/img/user.jpg';
                try {
                    const imagenes = JSON.parse(receta.imagenes);
                    if (imagenes && imagenes.principal) {
                        imagenPrincipal = imagenes.principal.replace('..', '..'); // Ajusta si es necesario
                    }
                } catch (e) {}

                // Header con imagen principal
                const header = document.createElement('header');
                const img = document.createElement('img');
                img.src = imagenPrincipal;
                img.alt = '';
                header.appendChild(img);

                // Main con título y pasos
                const main = document.createElement('main');
                const h3 = document.createElement('h3');
                h3.textContent = receta.titulo || 'Sin título';
                const p = document.createElement('p');
                p.textContent = 'En 3 pasos'; // Puedes ajustar si tienes la cantidad real de pasos
                main.appendChild(h3);
                main.appendChild(p);

                // Footer con nombre de usuario
                const footer = document.createElement('footer');
                footer.textContent = receta.nombreUsuario || 'Desconocido';

                li.appendChild(header);
                li.appendChild(main);
                li.appendChild(footer);

                listRecipes.appendChild(li);
            });
            return data.data;
        }
        else{
            console.log(data.error)
            // const error = document.createElement("h2");
            // error.innerHTML = data.error
            // error.classList.add("errorRecipe")
            // recipeCont.appendChild(error)
            // return data.error;
        }
    } catch (error) {
        return error;
    }
}

verify()
const recetas = await getRecipes();