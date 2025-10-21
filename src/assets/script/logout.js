import { alertT } from './alert.js';
const btn = document.getElementById('logOut');

btn.addEventListener('click', async () => {
    const res = await fetch('../php/logout.php', {
        method: 'POST',
        credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
        alertT("Session cerrada correctamente");
        setTimeout(
            ()=>{
                window.location.href = '../../index.html';
            }, 2000
        );

       
    } else {
        alert('Error al cerrar sesión');
    }
});
