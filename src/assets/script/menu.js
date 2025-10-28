
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
            const id = data.data[0].id_usuario;
            const recetas = getRecipes(id);
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


async function addFav(receta_id){
    try{
        const res = await fetch(`../php/addFav.php`, {
            method: "POST",
            body: JSON.stringify({ id: receta_id }),
        });
        
        const data = await res.json();
        console.log(data)
        if(data.success){
            return true
        }
        else{
            return false
        }
    }
    catch(e){
        console.log(e)
    }
}

async function getRecipes(id) {
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

                if (id !== receta.id_usuario){
                    const buttonCont = document.createElement('div');
                    const imgBut = document.createElement("img")
                    buttonCont.id = 'buttonAddFav';
                    
                    
                    if(receta.recetaxusuario){
                        imgBut.src = "../assets/img/oki.png";
                        
                    }
                    else{ 
                        imgBut.src = "../assets/img/plus.png";
                        buttonCont.addEventListener("click", (e)=>{
                            e.preventDefault()
                            if(addFav(receta.id_receta)){
                                imgBut.src = "../assets/img/oki.png";
                            }
                            else{
                                imgBut.src = "../assets/img/plus.png";
                            }
                        });
                    }
                    buttonCont.appendChild(imgBut);
                    footer.appendChild(buttonCont)
                }
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
        }
    } catch (error) {
        return error;
    }
}




const formRuleta = document.getElementById("formRuleta");

formRuleta.addEventListener("submit", async function(e) {
    e.preventDefault();
    const res = await fetch(`../php/randomRecipe.php`, {
        method: "GET",
        credentials: "include"
    });
    const data = await res.json();

    try {
        if(data.success){
            window.location.href = `recipes.html?id=${data.data[0].id_receta}`;
        }
    }
    catch(err){
        console.log(err);
    }

})

const formFilt = document.getElementById("formFilter");
const input = document.getElementById("filter");


input.addEventListener("input", async function(e) {
    // Evitar el envío del formulario, ya que no estamos usando un botón de submit
    e.preventDefault();
    
    const query = input.value.toLowerCase();

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
        } catch (e) {
            console.log(e)
        }

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
        p.textContent = receta.descripcion || "sin descripcion"; // Puedes ajustar si tienes la cantidad real de pasos
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


const arrow = document.getElementById("arrow");
const mainS = document.getElementById("main-section");
const mainA = document.getElementById("main-aside");
const header = document.getElementById("header");

let isChecked = false;

arrow.addEventListener("mouseenter" ,()=>{
    if(!isChecked){
        mainA.classList.add("asideLeft");
        isChecked = true;
    }

})

// mainA.addEventListener("mouseleave" ,()=>{

//     if (isChecked) {
//         mainA.classList.add("aside--end")
//         mainA.classList.remove("aside--end")
//         mainA.classList.remove("asideLeft");
//         isChecked = false;
//     }
// })

arrow.addEventListener("click", () => {
    if (isChecked) {
        mainA.classList.add("aside--end")
        mainA.classList.remove("aside--end")
        mainA.classList.remove("asideLeft");
        isChecked = false;
    }
});



//filter cont
const formF = document.getElementById("formFilter");
const inputIng = document.getElementById("ingredientes");
const listIng = document.getElementById("ingredienteContainer");
listIng.style.display ="none";
const ulList = document.getElementById("ingredientesList");
const btnAdd = document.getElementById("btnAddIng");
const btnSearch = document.getElementById("btnSearchING");
const btnReset = document.getElementById("btnReset");


btnSearch.addEventListener("click" ,async (e)=>{
    e.preventDefault();


    if(listIng.querySelectorAll("li").length > 0){


        const list = listIng.querySelectorAll("li");
        const ingredientes = []
        list.forEach(Li=>{

            const text = Li.querySelector("p").textContent;
            if(/^\D+$/.test(text)){
                ingredientes.push(text.toLocaleLowerCase());
            }
        })
        try {
            const res = await fetch(`../php/filter.php`, {
                method: "POST",
                body: JSON.stringify({ ingredientes: ingredientes }),
            });
             const data = await res.json();
        

            // Manejo de errores
            if (data.success === false) {
                const listRecipes = document.getElementById("recipeCont");
                listRecipes.innerHTML = `<h2 class="errorRecipe">${data.error}</h2>`;
                return data.error;
            }

            // Mostrar las recetas
            const listRecipes = document.getElementById("recipeCont");
            listRecipes.innerHTML = ""; 

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
                } catch (e) {
                    console.log(e)
                }

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
                p.textContent = receta.descripcion || "sin descripcion"; // Puedes ajustar si tienes la cantidad real de pasos
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
        } catch (error) {
            console.log(error)
        }
       
    }
});


btnReset.addEventListener("click" ,(e)=>{
    e.preventDefault();

    inputIng.value = "";
    ulList.textContent = "";
    listIng.style.display = "none";

});

formF.addEventListener("submit" ,(e)=>{
    e.preventDefault()

    if(inputIng.value !== ""){
        if(/^\D+$/.test(inputIng.value)){
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = inputIng.value;
            const deleteBtn = document.createElement('div');
            const imgDel = document.createElement("img");
            imgDel.src = "../assets/img/close.png";
            deleteBtn.classList.add('deleteLi');
            deleteBtn.appendChild(imgDel);

            li.appendChild(p)
            li.appendChild(deleteBtn)

            deleteBtn.addEventListener("click", ()=>{
                li.remove();
            });

            inputIng.value = "";
            ulList.appendChild(li)
       
        }   
       
    }
    
    if(listIng.querySelectorAll("li").length){
        listIng.style.display = "grid";
    }

})

formF.addEventListener("mouseleave" ,()=>{
    listIng.style.display = "none";

})

