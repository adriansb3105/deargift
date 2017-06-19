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
			    data: {'email': email, 'password': password},
			    url: 'https://deargift.herokuapp.com/?login',
			    type: 'post',
			    success: function(result,status,xhr){
			    	let res = JSON.parse(result);
			    	if(res.length != 0){
			    		window.location = 'home.html';
			    	}else{
			    		swal('Login incorrecto', 'Usuario o contrasena incorrectos', "warning");
			    	}
			    },
			    error(xhr, status, error){
			    	swal('Error', 'Se ha producido un error con el inicio de sesion', "error");
			    }
  			});
		}
		

	});
});
