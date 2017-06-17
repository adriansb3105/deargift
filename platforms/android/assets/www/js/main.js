$(document).ready(function(){
	
	$('#iniciar').on('click', function(){
		window.location = 'login.html';
	});

	$('.modal').modal();
	$('select').material_select();

	$('#btnAceptoTerminos').on('click', function(){
		$('#terminos').attr('checked', 'checked');
	});

	$('#btn-entrar').on('click', function(e){
		e.preventDefault();

		let email = $('#email-login').val();
		let password = $('#password-login').val();
		let expresion = /\w+@\w+\.+[a-z]/;

		if($.trim(email) === '' || $.trim(password) === ''){//vacios
			swal('Error', 'Debe ingresar todos los campos', "error");
			return false;
		}else if(!expresion.test(email)){
			swal('Error', 'El correo ingresado no es valido', "error");
			return false;
		}else if(!$('#terminos').prop('checked')){
			swal('Terminos y Condiciones', 'Debe aceptar los terminos y condiciones', "info");
			return false;
		}else{
			$.ajax({
				url: 'php/connect.php',
				type: 'POST',
				dataType: 'json',
				cache: false,
				data: {action: 'login', email: email, password: password}
			}).done(function(data){
				if (data.length === 0){
					swal('Login incorrecto', 'Usuario o contrasena incorrectos', "warning");
				}else{
					window.location = 'home.html';
				}
			}).fail(function(data){
				alert("error" + data.toJSON());
			}).always(function(){
				
			});
			
			
		}
		

	});



});
