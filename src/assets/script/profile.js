// Vista previa de imagen principal
import { alertT } from './alert.js';

const btn = document.getElementById('cambiar');

const gmailX = document.getElementById("inpGmail");
const nameI = document.getElementById("inpName");

btn.addEventListener('click', () => {
    const gmail = document.getElementById('gmail');
    const name = document.getElementById('name');

    nameI.disabled = false;

    if (!name.querySelector('.configContainer__img')) {
        const img = document.createElement('img');
        img.src = "../assets/img/lapiz.png";
        img.classList.add('configContainer__img');
        name.classList.add('activated');
        name.appendChild(img);

        img.addEventListener("click", ()=>{
            saveName(nameI.value.trim());
        })
    }




});


async function saveName(name){
    fetch("../php/saveProfile.php",{
        method: "POST",
        body:JSON.stringify({
            name: name,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success === true){
            alertT("Nombre guardado");
             setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
        else{
            errors.push(data.message)
            verifyForm(errors)
        }
        
    })
    .catch(error => console.log("error:", error))
}