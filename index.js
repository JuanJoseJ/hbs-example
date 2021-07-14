const express = require('express');
const server = express();
const exphbs = require('express-handlebars');
const fetch = require("node-fetch");

//configuro para usar handlebars
server.engine('hbs', exphbs({extname: '.hbs', defaultLayout: false}));
server.set('view engine', 'hbs');

//inicio el servidor
server.listen(8000, 
    console.log("Escuchando en el puerto 8000")    
);

//Manejo el llamado a la rireccion /
server.get("/", async function(req, res){
    console.log("GET /")

    //primero traigo los datos de una api
    var response = await fetch("https://api.github.com/users/github", {method: "GET"})
        .catch(function(err) {
            console.log(err)
        });

    //los convierto de formato
    let objeto = await response.json();
    console.log(objeto)

    //defino la vista a renderizar y paso datos
    res.render('home.hbs', {info:objeto}) 
})