var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//sesiones para inicio de sesión
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));

//var http = require('http').createServer(app);
//var io = require('socket.io')(http);

//pug
app.set('views', path.join(__dirname, 'Client'));
app.set('view engine', 'pug');


//socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	  });
	  
    
});



//conexión a base datos
var mysql = require('mysql');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tienda'
});


//acceder a carpeta de librerias
app.use('/Advanced_grid_demo_files', express.static('Advanced_grid_demo_files'))
app.use('/node_modules', express.static('node_modules'))

//paginas
app.get('/Tablero', (req, res) => {
	if (req.session.loggedin) {
		res.render('Tablero.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
	
});
app.get('/IndexU1', (req, res) => {
	if (req.session.loggedin) {
		res.render('IndexU1.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});
app.get('/AbarrotesU1', (req, res) => {
	if (req.session.loggedin) {
		res.render('AbarrotesU1.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/BotanasU1', (req, res) => {
	if (req.session.loggedin) {
		res.render('BotanasU1.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/BebidasU1', (req, res) => {
	if (req.session.loggedin) {
		res.render('BebidasU1.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/JarcieriaU1', (req, res) => {
	if (req.session.loggedin) {
		res.render('JarcieriaU1.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/IndexU2', (req, res) => {
	if (req.session.loggedin) {
		res.render('IndexU2.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/AbarrotesU2', (req, res) => {
	if (req.session.loggedin) {
		res.render('AbarrotesU2.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/BotanasU2', (req, res) => {
	if (req.session.loggedin) {
		res.render('BotanasU2.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/BebidasU2', (req, res) => {
	if (req.session.loggedin) {
		res.render('BebidasU2.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/JarcieriaU2', (req, res) => {
	if (req.session.loggedin) {
		res.render('JarcieriaU2.pug');
	}else{
		
		res.render('Login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

app.get('/cerrarSesion', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});
app.get('/Onnera', (req, res) => {
	res.render('Onnera.pug');
});

app.get('/', (req, res) => {
	res.render('Index.pug');
});

app.get('/Login', (req, res) => {
	res.render('Login.pug');
});
app.get('/Datos', (req, res) => {
	if (req.session.loggedin) {
		res.render('Datos.pug');
	}else{
		
		res.render('login.pug',{message: 'No ha iniciado sesión'});
	}
	res.end();
});

//funciones
app.post('/testingAjax', (req, res) => {
	console.log(req.body);
	res.send({'response': 'Hello from server!'});
});

//Abarrotes
app.get('/consultaAbarrotesCantidadProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=1', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesNombreProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=1', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].nombre);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesCantidadVenta', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=1', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesVentasEmpleado1', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE (`id_tipo`=1 AND `vendedor`="Juan Perez")'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesVentasEmpleado2', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=1 AND `vendedor`="Sofia Reyes"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesVentasEmpleado3', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=1 AND `vendedor`="Laura Flores"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesContador1', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador1_abarrotes"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesContador2', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador2_abarrotes"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesContador3', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador3_abarrotes"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaAbarrotesCoordenadas', (req, res) => {
	db.query('SELECT * FROM `coordenadas` WHERE `nombre`="abarrotes"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cadena);
		}
		res.send({'response': sendToClient});
	});
});

app.post('/actualizarAbarrotesContador1', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador1_abarrotes"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarAbarrotesContador2', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador2_abarrotes"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarAbarrotesContador3', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador3_abarrotes"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarAbarrotesCoordenadas', (req, res) => {
	var cadena=req.body.datos;
	db.query("UPDATE `coordenadas` SET `cadena` = '"+cadena+"' WHERE `nombre`= 'abarrotes'", (err, result, fields) => {
		if (err) throw err;
		console.log('added ' +cadena);
        
	});
    res.send({'response': 'success'});
});


//Botanas
app.get('/consultaBotanasCantidadProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=2', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasNombreProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=2', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].nombre);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasCantidadVenta', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=2', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasVentasEmpleado1', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE (`id_tipo`=2 AND `vendedor`="Juan Perez")'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasVentasEmpleado2', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=2 AND `vendedor`="Sofia Reyes"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasVentasEmpleado3', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=2 AND `vendedor`="Laura Flores"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasContador1', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador1_botanas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasContador2', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador2_botanas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasContador3', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador3_botanas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBotanasCoordenadas', (req, res) => {
	db.query('SELECT * FROM `coordenadas` WHERE `nombre`="botanas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cadena);
		}
		res.send({'response': sendToClient});
	});
});

app.post('/actualizarBotanasContador1', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador1_botanas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBotanasContador2', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador2_botanas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBotanasContador3', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador3_botanas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBotanasCoordenadas', (req, res) => {
	var cadena=req.body.datos;
	db.query("UPDATE `coordenadas` SET `cadena` = '"+cadena+"' WHERE `nombre`= 'botanas'", (err, result, fields) => {
		if (err) throw err;
		console.log('added ' +cadena);
        
	});
    res.send({'response': 'success'});
});



//Bebidas
app.get('/consultaBebidasCantidadProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=3', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasNombreProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=3', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].nombre);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasCantidadVenta', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=3', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasVentasEmpleado1', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE (`id_tipo`=3 AND `vendedor`="Juan Perez")'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasVentasEmpleado2', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=3 AND `vendedor`="Sofia Reyes"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasVentasEmpleado3', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=3 AND `vendedor`="Laura Flores"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasContador1', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador1_bebidas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasContador2', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador2_bebidas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasContador3', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador3_bebidas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaBebidasCoordenadas', (req, res) => {
	db.query('SELECT * FROM `coordenadas` WHERE `nombre`="bebidas"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cadena);
		}
		res.send({'response': sendToClient});
	});
});

app.post('/actualizarBebidasContador1', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador1_bebidas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBebidasContador2', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador2_bebidas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBebidasContador3', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador3_bebidas"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarBebidasCoordenadas', (req, res) => {
	var cadena=req.body.datos;
	db.query("UPDATE `coordenadas` SET `cadena` = '"+cadena+"' WHERE `nombre`= 'bebidas'", (err, result, fields) => {
		if (err) throw err;
		console.log('added ' +cadena);
        
	});
    res.send({'response': 'success'});
});



//Jarcieria
app.get('/consultaJarcieriaCantidadProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=4', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaNombreProductos', (req, res) => {
	db.query('SELECT * FROM `productos` WHERE `id_tipo`=4', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].nombre);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaCantidadVenta', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=4', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaVentasEmpleado1', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE (`id_tipo`=4 AND `vendedor`="Juan Perez")'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaVentasEmpleado2', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=4 AND `vendedor`="Sofia Reyes"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaVentasEmpleado3', (req, res) => {
	db.query('SELECT * FROM `ventas` WHERE `id_tipo`=4 AND `vendedor`="Laura Flores"'  , (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cantidad);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaContador1', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador1_jarcieria"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaContador2', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador2_jarcieria"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaContador3', (req, res) => {
	db.query('SELECT * FROM `contadores` WHERE `nombre_contador`="contador3_jarcieria"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].valor);
		}
		res.send({'response': sendToClient});
	});
});

app.get('/consultaJarcieriaCoordenadas', (req, res) => {
	db.query('SELECT * FROM `coordenadas` WHERE `nombre`="jarcieria"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cadena);
		}
		res.send({'response': sendToClient});
	});
});

app.post('/actualizarJarcieriaContador1', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador1_jarcieria"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarJarcieriaContador2', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador2_jarcieria"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarJarcieriaContador3', (req, res) => {
	db.query('UPDATE `contadores` SET `valor` = '+req.body.datos+' WHERE `nombre_contador`= "contador3_jarcieria"', (err, result, fields) => {
		if (err) throw err;
		console.log('added ' + req.body.datos);
        
	});
    res.send({'response': 'success'});
});

app.post('/actualizarJarcieriaCoordenadas', (req, res) => {
	var cadena=req.body.datos;
	db.query("UPDATE `coordenadas` SET `cadena` = '"+cadena+"' WHERE `nombre`= 'jarcieria'", (err, result, fields) => {
		if (err) throw err;
		console.log('added ' +cadena);
        
	});
    res.send({'response': 'success'});
});

//para usuarios normales
app.get('/consultaCoordenadas', (req, res) => {
	db.query('SELECT * FROM `coordenadas` WHERE `nombre`="default"', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].cadena);
		}
		res.send({'response': sendToClient});
	});
});


app.post('/loginUsuario', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				if(results[0].id_tipo==1){
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/IndexU1');
				}else{
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/IndexU2');
				}
				
				
			} else {
				response.render('login.pug',{message: 'Usuario o contraseña incorrecta'});
			}			
			response.end();
		});
	} else {
		//response.send('Please enter Username and Password!');
		response.end();
	}
});



app.get('/getList', (req, res) => {
	db.query('SELECT * FROM `actividades`', (err, result, fields) => {
		var sendToClient = [];
		for (var i = 0; i < result.length; i++) {
			sendToClient.push(result[i].ubicacion);
		}
		res.send({'response': sendToClient});
	});
});

app.post('/addItem', (req, res) => {
	db.query('INSERT INTO `actividades` (`ubicacion`) VALUES ("' + req.body.itemName + '")', (err, result, fields) => {
        console.log('added ' + req.body.itemName);
        
	});
    res.send({'response': 'success'});
});

app.post('/addItem2', (req, res) => {
	db.query('INSERT INTO `actividades` (`ubicacion`) VALUES ("' + req.body.itemName + '")', (err, result, fields) => {
		console.log('added ' + req.body.itemName);
	});
    res.send({'response': 'success'});
});



//servidor
const PORT = 8080;
server.listen(PORT, () => {
	console.log(`App is listening on Port ${PORT}!`);
});





/*app.get('/', (req, res) => {
	res.render('Tablero.html');
});*/