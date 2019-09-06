const fs = require('fs');
const pathImp = require('path');
const fileHound = require('filehound');
const marked = require('marked');
const renderer = new marked.Renderer();

let mdLinksErrors = {
	md01: 'No es un archivo ".md" . Solicite un archivo ".md" o un directorio',
	md02:'No hay archivos *.md en esta carpeta',
	path01: 'Path y options vacíos',
	read01: 'No se puede leer el archivo',
	dir01: 'Error inesperado al leer carpeta'
}

// función mdLinks
const mdLinks = (path, options) => {

	// protocolo si es carpeta
	if (fs.lstatSync(path).isDirectory())
	{
		return new Promise((resolve, reject)=> {
			console.log('Resolviendo la promesa...');
			resolve(findMDFiles(path));
			reject(new Error(mdLinksErrors.dir01));
		}).then(
			(fulfilled) => {console.log(options)
		}).catch(
			(error) => {console.log(mdLinksErrors.dir01)}
		)

	}
	// protocolo si es archivo
	else if (fs.lstatSync(path).isFile())
	{
		if ((pathImp.extname(path)) != '.md')
		{
			console.log(mdLinksErrors.md01);
		}
		else {
			console.log('Es un archivo .md');
			return new Promise((resolve, reject) => {
				console.log('Resolviendo la promesa...');
				resolve(readMD(path).then(
						// después de leer, usar renderer para obtener links
						renderer.link = (href, title, text) => {
							console.log(href, title, text);
						}
					)
				);
				reject(new Error(mdLinksErrors.path01));
			}).then(
				(fulfilled) => {console.log(options)
			}).catch(
				(error) => {console.log(mdLinksErrors.read01)}
			)
		}
	}
};

const findMDFiles = (path) => {
	return new Promise((resolve, reject) => {
		fileHound.create()
		.paths(path)
		.ext('md')
		.find((err,files)=> {
			if (files.length == 0)
			{
				reject(new Error(mdLinksErrors.md02));
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
				resolve(console.log(contents.toString()));
			} else {
				reject(error);
			}
		})
	});
}

// función para validar links

// función que revise carpetas con fs.readdir(path[, options], callback)

// función que obtenga href, title, text y line + agregarlos a c/url + pushear a urls

// exportar método
module.exports = mdLinks;
