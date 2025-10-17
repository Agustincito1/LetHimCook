async function delfav(id) {
    try {
        const res = await fetch(`../php/delFav.php`, {
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        const data = await res.json();
        return data.success;        
    } catch (error) {
        console.log(error)
    }
}


async function getF() {

    const response = await fetch("../php/getRecipeFav.php",{
        method: "GET",
        credentials: "include"
    })

    const data = await response.json();

    try {
        if(data.success){
            const listRecipes = document.getElementById("recipeFav");
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
                const footer = document.createElement('footer');
                const main = document.createElement('main');
                const h3 = document.createElement('h3');
                h3.textContent = receta.titulo || 'Sin título';
                const p = document.createElement('p');
                p.textContent = 'En 3 pasos'; // Puedes ajustar si tienes la cantidad real de pasos
                main.appendChild(h3);
                main.appendChild(p);

                // Footer con nombre de usuario
                const buttonCont = document.createElement('div');
                const imgBut = document.createElement("img");
                buttonCont.id = 'delFav';
                imgBut.src = "../assets/img/borrar.png";
                buttonCont.addEventListener("click", (e)=>{
                    e.preventDefault()
                    if(delfav(receta.id_receta)){
                        location.reload();
                    }
                });
                footer.textContent = receta.nombreUsuario || 'Desconocido';
                buttonCont.appendChild(imgBut);
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

const recetas = getF();