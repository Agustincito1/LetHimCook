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
            console.log(data.error);
        }

    } catch (error) {
        console.log(error);
    }
}

const recetas = getR();