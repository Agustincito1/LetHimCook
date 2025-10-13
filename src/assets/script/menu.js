import { verifySession } from "./verSession.js";

async function verify(){
    const user = await verifySession();

    if(user === false){
        window.location.href = "./login.html";
    }
}

const menu = document.getElementById("nameUser");
async function getData(){
    try {
        const response = await fetch("../php/getDataUser.php", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();
        if(data.success){
            menu.textContent = data.data[0].nombreUsuario;
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
                const a = document.createElement('a');
                a.href = `./recipes.html?id=${receta.id_receta}`;
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
                p.textContent = receta.descripcion || "Sin descripcion"; // Puedes ajustar si tienes la cantidad real de pasos
                main.appendChild(h3);
                main.appendChild(p);

                // Footer con nombre de usuario
                const footer = document.createElement('footer');
                footer.textContent = receta.nombreUsuario || 'Desconocido';
                
                a.appendChild(header);
                a.appendChild(main);
                a.appendChild(footer);
                li.appendChild(a);
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



const formFilt = document.getElementById("formFilter");
const input = document.getElementById("filter");


input.addEventListener("input", async function(e) {
    // Evitar el envío del formulario, ya que no estamos usando un botón de submit
    e.preventDefault();
    
    const query = input.value.toLowerCase();
    console.log(query);

    const res = await fetch(`../php/filter.php`, {
        method: "POST",
        body: JSON.stringify({ query: query }),
    });

    const data = await res.json();
    console.log(data);

    // Manejo de errores
    if (data.success === false) {
        const listRecipes = document.getElementById("recipeCont");
        listRecipes.innerHTML = `<h2 class="errorRecipe">${data.error}</h2>`;
        return data.error;
    }

    // Mostrar las recetas
    const listRecipes = document.getElementById("recipeCont");
    listRecipes.innerHTML = ""; // Limpiar recetas anteriores

    data.data.forEach(receta => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `./recipes.html?id=${receta.id_receta}`;
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
        
        a.appendChild(header);
        a.appendChild(main);
        a.appendChild(footer);
        li.appendChild(a);
        listRecipes.appendChild(li);
    });
    return data.data;
});




verify()

const recetas = getRecipes();


const arrow = document.getElementById("arrow");
const mainS = document.getElementById("main-section");
const mainA = document.getElementById("main-aside");
const header = document.getElementById("header");

let isChecked = false;

arrow.addEventListener("mouseenter" ,()=>{
    if(!isChecked){
        mainA.classList.add("asideLeft");
        arrow.classList.add("arrow--move");
        isChecked = true;
    }

})

mainA.addEventListener("mouseleave" ,()=>{

    if (isChecked) {
        mainA.classList.add("aside--end")
        mainA.classList.remove("aside--end")
        mainA.classList.remove("asideLeft");
        arrow.classList.remove("arrow--move");
        isChecked = false;
    }
})

arrow.addEventListener("click", () => {
    if (isChecked) {
        mainA.classList.add("aside--end")
        mainA.classList.remove("aside--end")
        mainA.classList.remove("asideLeft");
        arrow.classList.remove("arrow--move");
        isChecked = false;
    }
});
