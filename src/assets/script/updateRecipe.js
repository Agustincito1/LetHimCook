import { alertT } from './alert.js';


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


const titleName = document.getElementById("recetaTitle");
const descripcion = document.getElementById("descripcion");
const pasosCont = document.getElementById("pasosCont");
const buttonAddstep = document.querySelector('#addStep');

const buttonAddIng = document.querySelector('#addIngre');
const list = document.getElementById("ingredienteslist");
const container = document.getElementById("ingredientes");
const filter = document.getElementById("filter");


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
    textarea.placeholder = 'Descripcion del paso';

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
            img.classList.add('imgStep');
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    const deleteBtn = document.createElement('div');
    const imgDel = document.createElement("img");
    imgDel.src = "../assets/img/close.png";
    deleteBtn.classList.add('deleteLi');
    deleteBtn.appendChild(imgDel);


    deleteBtn.addEventListener("click", ()=>{
        stepLi.remove();
        actualizarNumeros("steplist");
    })

    stepLi.appendChild(p);
    stepLi.appendChild(input);
    stepLi.appendChild(textarea);
    stepLi.appendChild(inputFile);
    stepLi.appendChild(previewDiv);
    stepLi.appendChild(deleteBtn);


    listS.appendChild(stepLi);
    return;
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
    if (e.target.classList.contains('deleteLiI')) {
        const li = e.target.closest('li');
        const lista = li.parentElement;
        if (li) li.remove();
        if (lista.id === 'ingredienteslist' || lista.id === 'steplist') {
            actualizarNumeros(lista.id);
        }
    }
});




function addIng(nombre, cantidad, unidad, index, id){
    const cantidadIngredientes = list.getElementsByTagName('li').length;
    const nuevoNumero = cantidadIngredientes + 1;

    const ingredienteLi = document.createElement('li');

    const p = document.createElement('p');
    const pC = document.createElement('p');
    pC.textContent = "Cantidad";
    pC.classList.add("pUnity")
    p.textContent = nuevoNumero;

    const input = document.createElement('input');
    const inputC = document.createElement('input');

    inputC.type = 'text';
    inputC.name = 'cantidadIngrediente';

    input.classList.add(`ingrediente-${nuevoNumero}`);
    input.type = 'text';
    input.name = 'ingrediente';
    input.value = nombre;
    input.classList.add('ingrediente');

    inputC.classList.add('ingredienteC');
    inputC.classList.add(`ingredienteUnity-${nuevoNumero}`);
    inputC.placeholder = unidad;
    inputC.value = cantidad;

    input.placeholder = 'Ingrediente';
    input.setAttribute('list', 'ingredientesDatalist'); 

    const inputH = document.createElement('input');
    inputH.type = 'hidden';
    inputH.value = id;
    inputH.name = 'ingredienteH';
    inputH.classList.add(`ingredienteH-${nuevoNumero}`);    


    const deleteBtn = document.createElement('div');
    const imgDel = document.createElement("img");
    imgDel.src = "../assets/img/close.png";
    deleteBtn.classList.add('deleteLi');
    deleteBtn.appendChild(imgDel);




    input.addEventListener('click', () => {
        mainA.classList.add("asideLeft");
        mainA.dataset.valor = `ingrediente-${nuevoNumero},ingredienteUnity-${nuevoNumero},ingredienteH-${nuevoNumero}`;
    });

    deleteBtn.addEventListener('click', () => {
        ingredienteLi.remove();
        actualizarNumerosI();
    });

    ingredienteLi.appendChild(p);
    ingredienteLi.appendChild(input);
    ingredienteLi.appendChild(inputC);
    ingredienteLi.appendChild(pC);
    ingredienteLi.appendChild(deleteBtn);
    ingredienteLi.appendChild(inputH);
    list.appendChild(ingredienteLi);

    return
}


function addStep(values, index, ingUrl){

    const listS = document.getElementById("steplist");
    const cantidadSteps = listS.getElementsByTagName('li').length;
    const nuevoNumero = cantidadSteps + 1;
    const stepLi = document.createElement('li');

    const input = document.createElement('input');
    input.placeholder = 'Titulo paso';
    input.type = 'text';
    input.name = 'step';
    input.value = values.paso;
    const textarea = document.createElement('textarea');
    textarea.name = 'descripcionS';
    textarea.placeholder = 'Descripcion del paso';
    textarea.value = values.description;
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.name = 'imagenPaso';
    inputFile.dataset.existe = 'true';
    inputFile.placeholder = 'Add image';

    input.classList.add('step');
    textarea.classList.add('descripcionStep');
    inputFile.classList.add('imgPaso');

    const p = document.createElement('p');
    p.textContent = nuevoNumero;

    const previewDiv = document.createElement('div');
    previewDiv.classList.add('previewPaso');
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '120px';
    img.style.borderRadius = '8px';
    img.src = ingUrl;
    previewDiv.appendChild(img);

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
            inputFile.dataset.existe = 'false';
            const img = document.createElement('img');
            img.src = ev.target.result;
             img.classList.add('imgStep');
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    const deleteBtn = document.createElement('div');
    const imgDel = document.createElement("img");
    imgDel.src = "../assets/img/close.png";
    deleteBtn.classList.add('deleteLi');
    deleteBtn.appendChild(imgDel);


    deleteBtn.addEventListener("click", ()=>{
        stepLi.remove();
        actualizarNumeros("steplist");
    })

    stepLi.appendChild(p);
    stepLi.appendChild(input);
    stepLi.appendChild(textarea);
    stepLi.appendChild(inputFile);
    stepLi.appendChild(previewDiv);
    stepLi.appendChild(deleteBtn);


    listS.appendChild(stepLi);

    return
}

function addEvent(){

    const inputImagenPrincipal = document.getElementById('imagenPrincipal');
    inputImagenPrincipal.addEventListener('change', function(e) {
        const file = e.target.files[0];
        previewPrincipal.innerHTML = '';
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            const error = document.createElement('p');
            error.textContent = 'El archivo no es una imagen.';
            error.style.color = 'red';
            previewPrincipal.appendChild(error);
            inputImagenPrincipal.dataset.existe = false;
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

}



async function getRecipe(){
    try{
        const response = await fetch("../php/getRecipe.php",{
            method: "POST",
            body: JSON.stringify({ id: id}),
        });
        const data = await response.json();
        if(data.success){


            window.urlImgS = [];
            const imgP = document.getElementById("previewPrincipal");

            const receta = data.data.receta[0];
            const ingredientes = data.data.ingrediente;

            titleName.value = receta.titulo;

            ingredientes.forEach((value, index) => {
                addIng(value.nombre,value.cantidad, value.unidad, index, value.id_ingrediente)
            });
            
            descripcion.value = receta.descripcion;
            const imgInput = document.getElementById("imagenPrincipal");
            imgInput.dataset.existe = 'true';
            const imagenes = JSON.parse(receta.imagenes);
            const imagenPrincipal = imagenes.principal;
            const img = document.createElement('img');
            img.src = imagenPrincipal;
            img.classList.add('imgPrincipalPreview');
            imgP.appendChild(img)

            const imgPasos = imagenes.pasos;   
            const listStep = JSON.parse(receta.pasos);
            
            
            listStep.forEach((value, index) => {
                addStep(value, index, imgPasos[index]);
                window.urlImgS.push((index,imgPasos[index]));
            });
            
            addEvent();
            
            window.urlImgP = imagenPrincipal;
            
        } 
        else{
            console.log(data.error);
        }
    }
    catch(err){
        console.log(err)
    }

}

    
getRecipe();

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




fetch('../php/getIngredientes.php') 
.then(response => response.json())
.then(data => {
    window.listIng = data;
    mostrarResultados();
})
.catch(err => console.error('Error cargando ingredientes:', err));


const mainA = document.getElementById("main-aside");


function mostrarResultados(filtro = '') {
  container.innerHTML = ''; // limpiar resultados
  let encontrado = false;

  window.listIng.forEach((item, index) => {
    if (item.nombre.toLowerCase().includes(filtro.toLowerCase())) {
      const p = document.createElement('p');
      p.textContent = item.nombre;
      p.classList.add('ingrediente-item');

      // Si es la primera coincidencia, podemos "seleccionarla"
      if (!encontrado) {
        p.classList.add('seleccionado'); 
        encontrado = true;
      }

      // Click para completar input
    p.addEventListener('click', () => {



        const copyInput = mainA.dataset.valor.split(',');
        const input = document.querySelectorAll(`.${copyInput[0]}`)
        const inputC = document.querySelectorAll(`.${copyInput[1]}`)
        const inputH = document.querySelectorAll(`.${copyInput[2]}`)
        input[0].value = item.nombre;
        inputC[0].placeholder = item.unidad;
        inputH[0].value = item.id_ingrediente;

        mainA.classList.remove("asideLeft");
        mainA.dataset.valor = "";
        container.innerHTML = '';
        filter.value = "";

      });

      container.appendChild(p);
    }
  });
}


filter.addEventListener('input', () => {
    mostrarResultados(filter.value);
});


buttonAddIng.addEventListener('click', function() {
    const cantidadIngredientes = list.getElementsByTagName('li').length;
    const nuevoNumero = cantidadIngredientes + 1;

    const ingredienteLi = document.createElement('li');

    const p = document.createElement('p');
    const pC = document.createElement('p');
    pC.textContent = "Cantidad";
    pC.classList.add("pUnity")
    p.textContent = nuevoNumero;

    const input = document.createElement('input');
    const inputC = document.createElement('input');

    inputC.type = 'text';
    inputC.name = 'cantidadIngrediente';

    input.classList.add(`ingrediente-${nuevoNumero}`);
    input.type = 'text';
    input.name = 'ingrediente';
    input.classList.add('ingrediente');

    inputC.classList.add('ingredienteC');
    inputC.classList.add(`ingredienteUnity-${nuevoNumero}`);
    inputC.placeholder = "";

    input.placeholder = 'Ingrediente';
    input.setAttribute('list', 'ingredientesDatalist'); 

    const inputH = document.createElement('input');
    inputH.type = 'hidden';
    inputH.name = 'ingredienteH';
    inputH.classList.add(`ingredienteH-${nuevoNumero}`);    


    const deleteBtn = document.createElement('div');
    const imgDel = document.createElement("img");
    imgDel.src = "../assets/img/close.png";
    deleteBtn.classList.add('deleteLi');
    deleteBtn.appendChild(imgDel);




    input.addEventListener('click', () => {
        mainA.classList.add("asideLeft");
        mainA.dataset.valor = `ingrediente-${nuevoNumero},ingredienteUnity-${nuevoNumero},ingredienteH-${nuevoNumero}`;
    });

    deleteBtn.addEventListener('click', () => {
        ingredienteLi.remove();
        actualizarNumerosI();
    });

    ingredienteLi.appendChild(p);
    ingredienteLi.appendChild(input);
    ingredienteLi.appendChild(inputC);
    ingredienteLi.appendChild(pC);
    ingredienteLi.appendChild(deleteBtn);
    ingredienteLi.appendChild(inputH);
    list.appendChild(ingredienteLi);
});


function actualizarNumerosI() {
    const items = list.querySelectorAll('li');
    items.forEach((li, idx) => {
        const p = li.querySelector('p');
        if (p) p.textContent = idx + 1;
    });
}



const form = document.getElementById('formUpdate');
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
    
    if ((!imagenPrincipalInputVal.files || !imagenPrincipalInputVal.files[0]) && imagenPrincipalInputVal.dataset.existe !== 'true') {
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
        if ((!imgPaso.files || !imgPaso.files[0]) && imgPaso.dataset.existe !== 'true') {
            errores.push(`La imagen del paso ${idx + 1} está vacio.`);
        }
    });

    if (errores.length > 0) {
        verifyForm(errores)
        return;
    }   

    const formData = new FormData(form);
    const ingredientes = [];
    const cantidadIng = [];
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
        if (name.startsWith("ingredienteH")) {
            ingredientes.push(value);
        }
        if (name.startsWith("cantidadIngrediente")) {
            cantidadIng.push(value);
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

    const finalFormData = new FormData();


    // Agregar campos simples
    finalFormData.append('name', nameR);
    finalFormData.append('descripcion', descrip);
    finalFormData.append('ingredientesID', JSON.stringify(ingredientes));
    finalFormData.append('ingredientesCantidad', JSON.stringify(cantidadIng));
    finalFormData.append('pasos', JSON.stringify(pasos));
    // Imagen principal
    const imagenPrincipal = form.querySelector('input[name="imagenPrincipal"]');

    if(imagenPrincipal.dataset.existe){
        if (imagenPrincipal.files[0]) {
            finalFormData.append('imgPrin', imagenPrincipal.files[0]);
        }
        else{
            finalFormData.append("imgPrincipalE", window.urlImgP)
        }
        
    }
    else{
        if (imagenPrincipal.files[0]) {
            finalFormData.append('imgPrin', imagenPrincipal.files[0]);
        }
    }
  
    const pasosLis = form.querySelectorAll('#steplist li');
    pasosLis.forEach((li, idx) => {
        const imgPasoInput = li.querySelector('input[name="imagenPaso"]');
        if (imgPasoInput && imgPasoInput.files[0] || imgPasoInput.dataset.existe) {
            if(imgPasoInput.dataset.existe){
                if(imgPasoInput && imgPasoInput.files[0]){
                    finalFormData.append(`imagen_paso_${idx}`, imgPasoInput.files[0]);
                }
                else{
                    finalFormData.append(`imagen_paso_${idx}`, window.urlImgS[idx]);
                }
            }
            else{
                finalFormData.append(`imagen_paso_${idx}`, imgPasoInput.files[0]);
            }
           
        }
    });

    finalFormData.append('id', id);


    fetch('../php/updateRecipe.php', {
        method: 'POST',
        body: finalFormData
        
        
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Receta actualizada correctamente');
            window.location.href = `./recipes.html?id=${id}`;

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


