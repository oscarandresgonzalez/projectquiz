var path = require('path');

var Sequelize = require('sequelize');


//Cargar modelo ORM


// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

var sequelize = new Sequelize(null, null, null,
						{ dialect: "sqlite", storage: "quiz.sqlite"}
						);
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));


//sequelize.sync() crea e inicializa tabla de preguntas enDB
sequelize
.sync()
.then(function() {
	//succes(..) ejectura el manejador una vez ceadada la tabla
	return
	Quiz
	.count()
	.then(function(c){
		if(c === 0){
			return
			Quiz
			.create({ question: 'Capital de Italia', answer: 'Roma'})
			.then(function(){
				console.log('Base de datos inicializada');
		});
		}
	});
}).catch(function(error){
	console.log("Error Sincronizado las tablas de la BBDD", error);
	process.exit(1);
});

exports.Quiz = Quiz; //exportar definnicion tabla
