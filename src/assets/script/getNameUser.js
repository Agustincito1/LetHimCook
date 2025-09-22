
const gmail = document.getElementById("gmail");
const nameX = document.getElementById("name");
async function getData(){


    try {
        const response = await fetch("../php/getDataUser.php", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();
        if(data.success){
            // data.data[0].nombreUsuario
            document.title = `LetHimCook - ${data.data[0].nombreUsuario}`;
            gmail.textContent = data.data[0].gmail;
            nameX.textContent = data.data[0].nombreUsuario;
            return data.data
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