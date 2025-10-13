const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');       


async function getRecipe(){
    try{
        const response = await fetch("../php/getRecipe.php",{
            method: "POST",
            body: JSON.stringify({ id: id}),
        });
        const data = await response.json();
        if(data.success){
            console.log(data.data);
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