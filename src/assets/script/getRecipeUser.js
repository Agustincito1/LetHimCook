async function delAdd(id) {
    try {
        const res = await fetch(`../php/delAdd.php`, {
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        const data = await res.json();
        return data.success;        
    } catch (error) {
        console.log(error)
    }
}



async function getR() {

    const response = await fetch("../php/getRecipeUser.php",{
        method: "GET",
        credentials: "include"
    })

    const data = await response.json();

    try {
        if(data.success){
            const listRecipes = document.getElementById("recipeCreate");
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
                p.textContent = receta.descripcion; // Puedes ajustar si tienes la cantidad real de pasos
                main.appendChild(h3);
                main.appendChild(p);



                // Footer con nombre de usuario
                const footer = document.createElement('footer');

                const buttonContE = document.createElement('div');
                const imgButE = document.createElement("img");
                buttonContE.id = 'modAdd';
                imgButE.src = "../assets/img/pencil.png";
                buttonContE.addEventListener("click", (e)=>{
                    e.preventDefault()
                    window.location.href = `./updateRecipe.html?id=${receta.id_receta}`;
                });
              

                const buttonCont = document.createElement('div');
                const imgBut = document.createElement("img");
                buttonCont.id = 'delFav';
                imgBut.src = "../assets/img/borrar.png";
                buttonCont.addEventListener("click", (e)=>{
                    e.preventDefault()
                    if(delAdd(receta.id_receta)){
                        location.reload();
                    }
                });
                footer.textContent = receta.nombreUsuario || 'Desconocido';

                buttonCont.appendChild(imgBut);
                buttonContE.appendChild(imgButE);
                
                footer.appendChild(buttonContE);
                footer.appendChild(buttonCont);

                a.appendChild(header);
                a.appendChild(main);
                a.appendChild(footer);
                li.appendChild(a);
                listRecipes.appendChild(li);
            });
            return data.data;
        }
        else{
            console.log(data.error);
        }

    } catch (error) {
        console.log(error);
    }
}

const recetas = getR();