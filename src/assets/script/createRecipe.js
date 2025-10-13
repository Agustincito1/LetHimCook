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
    textarea.name = 'descripcionS';
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


function verifyForm(errors){
    const conE = document.getElementById("contenedorErr")
    conE.innerHTML = ""
    var contador = 0;
   
    conE.style.opacity = 1
    conE.style.flex = "0.3"
    setTimeout(()=>{
        conE.style.opacity = 1
    }, 200)
    conE.style.flex = "0.3"

    setTimeout(()=>{
        conE.style.opacity = 0
        setTimeout(()=>{
            conE.style.flex = "0"
        }, 200)
        
        setTimeout(()=>{
            conE.innerText = ""
        }, 300)
    }, 2000)
    const ul = document.createElement("ul")
    errors.forEach((value) =>{
        if(contador === 5){return}
        const li = document.createElement("li")
        const p = document.createElement("p")
        const img = document.createElement("img")
        img.src = "../assets/img/advertencia.png"
        img.classList.add("errImg")
        p.innerText = value
        li.append(img, p);
        ul.appendChild(li)
        contador++
    })

    conE.appendChild(ul)
}
const form = document.getElementById('formCreate');
form.addEventListener('submit', function(e) {
    e.preventDefault();

   

    let errores = [];
    // Validar nombre de la receta
    const nombreInputVal = form.querySelector('input[name="name"]');
    if (!nombreInputVal.value.trim()) {
        errores.push('El nombre de la receta está vacio.');
    }
     
    // Validar ingredientes
    const ingredientesInputsVal = form.querySelectorAll('#ingredienteslist .ingrediente');
    ingredientesInputsVal.forEach((input, idx) => {
        if (!input.value.trim()) {
            errores.push(`El ingrediente ${idx + 1} está vacío.`);
        }
    });

    // Validar descripción
    const descripcionInputVal = form.querySelector('input[name="recetaDescription"]');
    if (!descripcionInputVal.value.trim()) {
        errores.push('La descripción de la receta está vacio.');
    }

    // Validar imagen principal
    const imagenPrincipalInputVal = form.querySelector('input[name="imagenPrincipal"]');
    if (!imagenPrincipalInputVal.files || !imagenPrincipalInputVal.files[0]) {
        errores.push('La imagen principal vacio.');
    }

    // Validar pasos
    const pasosLisVal = form.querySelectorAll('#steplist li');
    pasosLisVal.forEach((li, idx) => {
        const stepInput = li.querySelector('input[name="step"]');
        const descStep = li.querySelector('textarea[name="descripcionS"]');
        const imgPaso = li.querySelector('input[name="imagenPaso"]');
        if (!stepInput.value.trim()) {
            errores.push(`El título del paso ${idx + 1} está vacio.`);
        }
        if (!descStep.value.trim()) {
            errores.push(`La descripción del paso ${idx + 1} está vacio.`);
        }
        if (!imgPaso.files || !imgPaso.files[0]) {
            errores.push(`La imagen del paso ${idx + 1} está vacio.`);
        }
    });

    if (errores.length > 0) {
        verifyForm(errores)
        return;
    }   
    const formData = new FormData(form);
    const ingredientes = [];
    const pasos = [];
    let nameR = "";
    let descrip = "";
    let imgPri = "";

    // Recorremos todos los campos

    for (let [name, value] of formData) {
        if (name.startsWith("name")){
            nameR = value
        }
        if (name.startsWith("imagenPrincipal")){
            imgPri = value
        }
        if (name.startsWith("recetaDescription")){
            descrip = value
        }
        if (name.startsWith("ingrediente")) {
            ingredientes.push(value);
        }

        else if (name.startsWith("step")) {
            pasos.push({ step: value }); 
        }
    }

    // Ahora añadimos las descripciones e imágenes a cada paso según el orden de aparición
    let descIndex = 0;
    for (let [name, value] of formData) {
        if (name.startsWith("descripcionS")) {
            if (pasos[descIndex]) {
                pasos[descIndex].descripcion = value;
                descIndex++;
            }
        }
    }

    // let imgIndex = 0;
    // for (let [name, value] of formData) {
    //     if (name.startsWith("imagenPaso")) {
    //         if (pasos[imgIndex]) {
    //             pasos[imgIndex].imagen = value;
    //             imgIndex++;
    //         }
    //     }
    // }

    const finalFormData = new FormData();

    // Agregar campos simples
    finalFormData.append('name', nameR);
    finalFormData.append('descripcion', descrip);
    finalFormData.append('ingredientes', JSON.stringify(ingredientes));
    finalFormData.append('pasos', JSON.stringify(pasos));
    // Imagen principal
    const imagenPrincipal = form.querySelector('input[name="imagenPrincipal"]');
    if (imagenPrincipal.files[0]) {
        finalFormData.append('imgPrin', imagenPrincipal.files[0]);
    }

    // Imágenes de los pasos
    const pasosLis = form.querySelectorAll('#steplist li');
    pasosLis.forEach((li, idx) => {
        const imgPasoInput = li.querySelector('input[name="imagenPaso"]');
        if (imgPasoInput && imgPasoInput.files[0]) {
            finalFormData.append(`imagen_paso_${idx}`, imgPasoInput.files[0]);
        }
    });
    
    fetch('../php/createRecipe.php', {
        method: 'POST',
        body: finalFormData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Receta creada correctamente');
            form.reset();
            // Opcional: limpiar previews
            previewPrincipal.innerHTML = '';
            document.querySelectorAll('.previewPaso').forEach(div => div.innerHTML = '');
        } else {
            console.log(data.message)
            alert('Error al crear la receta: ' + (data.message || 'Error desconocido.'));
        }
    })
    .catch(error => {
        console.log(error.message)
        alert('Error en la petición: ' + error);
    });
});