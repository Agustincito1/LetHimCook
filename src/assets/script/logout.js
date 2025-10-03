
const btn = document.getElementById('logOut');

btn.addEventListener('click', async () => {
    const res = await fetch('../php/logout.php', {
        method: 'POST',
        credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
        window.location.href = '../../index.html';
    } else {
        alert('Error al cerrar sesión');
    }
});
