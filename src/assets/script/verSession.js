export async function verifySession(){
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
            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}