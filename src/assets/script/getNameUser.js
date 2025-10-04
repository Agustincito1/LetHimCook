
const gmail = document.getElementById("inpGmail");
const nameX = document.getElementById("inpName");


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
            gmail.value = data.data[0].gmail;
            gmail.disabled = true;
            nameX.value = data.data[0].nombreUsuario;
            nameX.disabled = true;
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