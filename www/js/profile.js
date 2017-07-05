$(document).ready(function(){

	
	let nombre = window.localStorage.getItem('nombre');
	let correo = window.localStorage.getItem('correo');
	let tr_tarjeta = window.localStorage.getItem('tr_tarjeta');
	let tr_codigo = window.localStorage.getItem('tr_codigo');
	let tr_fecha = window.localStorage.getItem('tr_fecha');



	$('#nombre').html(nombre);
	$('#correo').html(correo);
	$('#tr_tarjeta').html(tr_tarjeta);
	$('#tr_codigo').html(tr_codigo);
	$('#tr_fecha').html(tr_fecha);
});