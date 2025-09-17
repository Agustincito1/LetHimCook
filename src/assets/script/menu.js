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
            return data.error;
        }
    } catch (error) {
        return data.error;
    }
}

verify()
const recetas = await getRecipes();