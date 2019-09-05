const fs = require('fs');
// const path = require('path');


// función mdLinks
const mdLinks = (path, options) => {
	return new Promise((resolve, reject) => {
		console.log("Resolviendo la promesa...");
		resolve(readMD(path));
		reject(new Error("Path y options vacíos"));
	}).then(
		(fulfilled) => {console.log(options)
	}).catch(
		(error) => {console.log("Error en leer texto")}
	)
};

// leer archivos md
const readMD = (fileName) => {
	return new Promise ((resolve, reject) => {
		fs.readFile(fileName, 'utf-8', (error, contents) => 
		{
			// Array vacío de links
			// let urls = [];
			if(fileName != null){
				resolve(console.log("Obtuvimos MD"));
				// esto iba en resolve: console.log(contents.toString())
			} else {
				reject(error);
			}
		})
	});
}

// función para validar links

// función que chequee si es archivo o carpeta

// función que con path.extname chequee extensión

// función que revise carpetas con fs.readdir(path[, options], callback)

// función que obtenga href, title, text y line + agregarlos a c/url + pushear a urls

// exportar método

/*

1. Ingresar a función con credencial y elegir si me validan y datos trivia.
2. Al entrar, siento que me abren.
3. Cuando me abren, buscando mis ojos, manos y dientes.
4. Los dientes son capturados y almacenados en cajas llamadas objetos.
5. Las cajas deben volver

*/

module.exports = mdLinks;
