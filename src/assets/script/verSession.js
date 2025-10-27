async function verifySession(){
    try {
        const response = await fetch("../php/session.php", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();
        if(data.success){
            
            return data.dataUser
        }
        else{

            window.location.href = "./sessionAbort.html";
        }

    } catch (error) {
        console.error(error)
        return false
    }
}

verifySession();