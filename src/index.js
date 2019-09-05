#!/usr/bin/env node
const mdLinks = require('./md-links.js');
const path = require('path');
const fs = require('fs');

// designar canales argv
let userPath = process.argv[2];
let argv3 = process.argv[3];
let argv4 = process.argv[4];

let userOptions = {
    validate: false,
    stats: false
}

let youShallNotPass = false;

let indexErrors = {
    path01: `¿Escribió bien la ruta de archivo o carpeta?
    Sintaxis correcta:
    * md-links /carpeta/archivo.md
    * md-links /carpeta
    * md-links /carpeta/otracarpeta/archivo.md --validate
    * md-links /carpeta/otracarpeta/otracarpetamas --validate --stats`,
    path02: "No es un archivo válido",
    path03: "No es una carpeta válida",
    valStats01: 'Los parámetros "--validate" o "--stats" se escriben después de la ruta o archivo',
    valStats02: 'Para validar links, escriba "--validate". De otra forma, no escriba aquí.',
    valStats03: 'Para stats de sus links, escriba "--stats". De otra forma, no escriba aquí'
}

// si usuario ingresa 3er argumento, debe ser "--validate"
if (argv3 != undefined)
{
    if (argv3 === '--validate')
    {
        userOptions.validate = true;
    }
    // argumento indefinido
    else
    {
        youShallNotPass = true;
        console.log(indexErrors.valStats02);
    }

}

// si usuario ingresa 4º argumento, debe ser "--stats"
if (argv4 != undefined)
{
    if (argv4 === '--stats')
    {
        userOptions.stats = true;
    }
    // argumento indefinido
    else
    {
        youShallNotPass = true;
        console.log(indexErrors.valStats03);
    }
}

// si usuario ingresa archivo inválido
try {
    fs.lstatSync(userPath).isFile()
} catch (e) {
  // Handle error
  if (e.code == 'ENOENT') {
    youShallNotPass = true;
    console.log(indexErrors.path02);
    }
}

// si usuario ingresa carpeta inválida
try {
    fs.lstatSync(userPath).isDirectory()
} catch (e) {
  // Handle error
  if (e.code == 'ENOENT') {
    youShallNotPass = true;
    console.log(indexErrors.path03);
    }
}

// si usuario no ingresa ruta o archivo
if (userPath == undefined || userPath == null)
{
    console.log(indexErrors.path01);
}
else
{
    // Gandalf el Gris detiene todo si usuario escribió mal --validate o --stats
    if (!youShallNotPass)
    {
        // si usuario ingresa "--validate" o "--stats" antes que la ruta
        if (userPath == '--validate' || userPath == '--stats')
        {
            console.log(indexErrors.valStats01);
        }
        
        // si usuario ingresó path de manera adecuada
        else {
            // normalizar y resolver a ruta absoluta
            userPath = path.resolve(userPath);
            userPath = path.normalize(userPath);

            // ingresar a función mdLinks
            mdLinks(userPath, userOptions);

        }        
    }
}