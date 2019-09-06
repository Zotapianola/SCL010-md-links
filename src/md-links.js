const fs = require('fs');
const path = require('path');
const fileHound = require('filehound');

// función mdLinks
const mdLinks = (path, options) => {

	let paths = [];

	if (fs.lstatSync(path).isDirectory())
	{
		console.log("Es un directorio");
		paths = findMDFiles(path);
		console.log(typeof paths);
		// console.log(paths);

	}
	else if (fs.lstatSync(path).isFile())
	{
		console.log("Es un archivo");
		return new Promise((resolve, reject) => {
			console.log("Resolviendo la promesa...");
			resolve(readMD(path));
			reject(new Error("Path y options vacíos"));
		}).then(
			(fulfilled) => {console.log(options)
		}).catch(
			(error) => {console.log("Error en leer texto")}
		)
	}
};

const findMDFiles = (path) => {
	return new Promise((resolve, reject) => {
		fileHound.create()
		.paths(path)
		.ext('md')
		.find((err,files)=> {
			if (files.length === 0)
			{
				reject(new Error("No hay archivos *.md en esta carpeta"));
			}
		}).then(
			files => {
				resolve(files);
			}
		);
	});
}

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
module.exports = mdLinks;
