// Vista previa de imagen principal
const inputImagenPrincipal = document.getElementById('imagenPrincipal');
const previewPrincipal = document.getElementById('previewPrincipal');

inputImagenPrincipal.addEventListener('change', function(e) {
    const file = e.target.files[0];
    previewPrincipal.innerHTML = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        const error = document.createElement('p');
        error.textContent = 'El archivo no es una imagen.';
        error.style.color = 'red';
        previewPrincipal.appendChild(error);
        inputImagenPrincipal.value = ''; 
        return;
    }
    const reader = new FileReader();
    reader.onload = function(ev) {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.classList.add('imgPrincipalPreview');
        previewPrincipal.appendChild(img);
    };
    reader.readAsDataURL(file);
});

// imagene pasos preview metodo

document.querySelectorAll('#steplist li').forEach(function(li) {
    const inputFile = li.querySelector('.imgPaso');
    const previewDiv = li.querySelector('.previewPaso');
    if (inputFile && previewDiv) {
        inputFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            previewDiv.innerHTML = '';
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                const error = document.createElement('p');
                error.textContent = 'El archivo no es una imagen.';
                error.style.color = 'red';
                previewDiv.appendChild(error);
                inputFile.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(ev) {
                const img = document.createElement('img');
                img.src = ev.target.result;
            img.classList.add('imgPrincipalPreview');
                previewDiv.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
});




const buttonAddIng = document.querySelector('#addIngre');
console.log("s")
buttonAddIng.addEventListener('click', function() {
    const list = document.getElementById("ingredienteslist");
    const cantidadIngredientes = list.getElementsByTagName('li').length;
    const nuevoNumero = cantidadIngredientes + 1;

    const ingrediente = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingrediente';
    input.classList.add('ingrediente');
    input.placeholder = 'Ingrediente';
    const p = document.createElement('p');
    p.textContent = nuevoNumero;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('deleteLi');
    deleteBtn.textContent = '🗑️';

    ingrediente.appendChild(p);
    ingrediente.appendChild(input);
    ingrediente.appendChild(deleteBtn);

    list.appendChild(ingrediente);
});


const buttonAddstep = document.querySelector('#addStep');
buttonAddstep.addEventListener('click', function() {
    const listS = document.getElementById("steplist");
    const cantidadSteps = listS.getElementsByTagName('li').length;
    const nuevoNumero = cantidadSteps + 1;

    const stepLi = document.createElement('li');

    const input = document.createElement('input');
    input.placeholder = 'Titulo paso';
    input.type = 'text';
    input.name = 'step';

    const textarea = document.createElement('textarea');
    textarea.name = 'descripcion';
    textarea.placeholder = 'descripcion';

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.name = 'imagenPaso';
    inputFile.placeholder = 'Add image';

    input.classList.add('step');
    textarea.classList.add('descripcionStep');
    inputFile.classList.add('imgPaso');

    const p = document.createElement('p');
    p.textContent = nuevoNumero;

    const previewDiv = document.createElement('div');
    previewDiv.classList.add('previewPaso');

    inputFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        previewDiv.innerHTML = '';
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            const error = document.createElement('p');
            error.textContent = 'El archivo no es una imagen.';
            error.style.color = 'red';
            previewDiv.appendChild(error);
            inputFile.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(ev) {
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '120px';
            img.style.borderRadius = '8px';
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('deleteLi');
    deleteBtn.textContent = '🗑️';

    stepLi.appendChild(p);
    stepLi.appendChild(input);
    stepLi.appendChild(textarea);
    stepLi.appendChild(inputFile);
    stepLi.appendChild(previewDiv);
    stepLi.appendChild(deleteBtn);


    listS.appendChild(stepLi);
  
});


function actualizarNumeros(listaId) {
    const lista = document.getElementById(listaId);
    const items = lista.querySelectorAll('li');
    items.forEach((li, idx) => {
        const p = li.querySelector('p');
        if (p) p.textContent = idx + 1;
    });
}

// Actualiza números después de borrar
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteLi')) {
        const li = e.target.closest('li');
        const lista = li.parentElement;
        if (li) li.remove();
        if (lista.id === 'ingredienteslist' || lista.id === 'steplist') {
            actualizarNumeros(lista.id);
        }
    }
});


