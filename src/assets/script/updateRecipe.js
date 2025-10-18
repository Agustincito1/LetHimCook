const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const titleName = document.getElementById("recetaTitle");
const descripcion = document.getElementById("descripcion");
const pasosCont = document.getElementById("pasosCont");



function addIng(value, index){
    const ingredienteCont = document.getElementById("ingredienteslist");
    const cantidadIngredientes = ingredienteCont.getElementsByTagName('li').length;
    const nuevoNumero = cantidadIngredientes + 1;

    const ingrediente = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
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

    ingredienteCont.appendChild(ingrediente);
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
    textarea.placeholder = 'descripcion';
    textarea.value = values.description;

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
  

}


async function getRecipeUpd(){
    try{
        const response = await fetch("../php/getRecipe.php",{
            method: "POST",
            body: JSON.stringify({ id: id}),
        });
        const data = await response.json();
        if(data.success){
            const imgP = document.getElementById("previewPrincipal");
            
            const dataU = data.data[0];
            titleName.value = dataU.titulo;

            const ingList = JSON.parse(dataU.ingredientes);
            
            ingList.forEach((value, index) => {
                addIng(value, index)
            });
            
            descripcion.value = dataU.descripcion;

            const imagenes = JSON.parse(dataU.imagenes);
            imagenPrincipal = imagenes.principal;
            const img = document.createElement('img');
            img.src = imagenPrincipal;
            imgP.appendChild(img)

            imgPasos = imagenes.pasos;   
            const listStep = JSON.parse(dataU.pasos);

            listStep.forEach((value, index) => {
                addStep(value, index, imgPasos[index])
            });

            console.log(data);
        } 
        else{
            console.log(data.error);
        }
    }
    catch(err){
        console.log(err)
    }
}

getRecipeUpd();