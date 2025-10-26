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
            
            const stars = document.querySelectorAll(".sectionH--starContainer .star");
            let rating = 0;

            stars.forEach((star, index) => {
                const starValue = index + 1;
                star.dataset.star = starValue;

                star.addEventListener("mouseover", () => {
                    highlightStars(starValue);
                });

                star.addEventListener("click", () => {
                    rating = starValue;
                    saveRaiting(rating);
                });
            });

            document.querySelector(".sectionH--starContainer").addEventListener("mouseleave", () => {
                highlightStars(rating);
            });

            function highlightStars(count) {
                stars.forEach(star => {
                    star.classList.toggle("active", star.dataset.star <= count);
                });
            }
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