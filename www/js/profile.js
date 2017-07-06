$(document).ready(function(){

	
	let nombre = window.localStorage.getItem('nombre');
	let email = window.localStorage.getItem('email');
	



	$('#nombre').html(nombre);
	$('#email').html(email);
	
});