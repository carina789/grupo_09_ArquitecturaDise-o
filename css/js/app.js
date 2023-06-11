let formularioPCIAS = document.getElementById('formulario');
let submit = document.getElementById('submit');

let fetchProvincias = (provincia) => {

    return fetch(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${provincia}`) //hacemos la petición a la api
        .then(response => response.json()) //convertimos la respuesta a json
        .catch(error => console.log(error)) //si hay un error lo mostramos por consola
}


formulario.addEventListener('submit', async function (e) {
    //Scope de la función 
    e.preventDefault(); //evita que se recargue la página

    let provincia = document.getElementById('provincia').value;
    let resultado = document.getElementById('resultado');

    if (!provincia) {
        resultado.innerHTML = "Provincia inexistente";
        
    }

    submit.setAttribute('disabled', '');
    submit.setAttribute('aria-busy', 'true');

    const infoProvincia = await fetchProvincias(provincia.trim());
    let nombreProvincia = infoProvincia.provincias[0].nombre;
    let idProvincia = infoProvincia.provincias[0].id;


    if (infoProvincia) {
        resultado.innerHTML = `Provincia seleccionada: ${nombreProvincia} y su id es: ${idProvincia}`;
    }

    submit.removeAttribute('disabled');
    submit.removeAttribute('aria-busy');

});