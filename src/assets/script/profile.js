const btn = document.getElementById('cambiar');

const gmailX = document.getElementById("inpGmail");
const nameI = document.getElementById("inpName");

btn.addEventListener('click', () => {
    const gmail = document.getElementById('gmail');
    const name = document.getElementById('name');

    nameI.disabled = false;
    // Solo agrega la imagen si no existe ya en gmail
    // if (!gmail.querySelector('.configContainer__img')) {
    //     const img2 = document.createElement('img');
    //     img2.src = "../assets/img/lapiz.png";
    //     img2.classList.add('configContainer__img');
    //     gmail.appendChild(img2);
    // }

    // Solo agrega la imagen si no existe ya en name
    if (!name.querySelector('.configContainer__img')) {
        const img = document.createElement('img');
        img.src = "../assets/img/lapiz.png";
        img.classList.add('configContainer__img');
        name.appendChild(img);
    }
});