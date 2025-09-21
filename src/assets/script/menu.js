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
            return data.data;
        }
        else{
            // const error = document.createElement("h2");
            // error.innerHTML = data.error
            // error.classList.add("errorRecipe")
            // recipeCont.appendChild(error)
            // return data.error;
        }
    } catch (error) {
        return data.error;
    }
}

verify()
const recetas = await getRecipes();