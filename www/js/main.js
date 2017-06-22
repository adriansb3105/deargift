$(document).ready(function(){

	$("#div2").hide();
	//$("#div1").hide();
	//$("#div2").show();

	$('#btn-return').on('click', function(){
		window.location = 'form.html';
	});

	
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
			    url: 'http://localhost/deargift-server/?login',
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

	$('#btn-home').on('click', function(e){
		window.location = 'form.html';
	});

	$('#btn-form').on('click', function(e){
		e.preventDefault();
		
		let sexo = $('#sexo').val();
		let etapa = $('#etapa').val();
		let pasatiempo = $('#pasatiempo').val();
		let color = $('#color').val();
		
		
		console.log(sexo);
		console.log(etapa);
		console.log(pasatiempo);
		console.log(color);
		console.log('-----------------------');

		if($.trim(sexo) === '' || $.trim(etapa) === '' || pasatiempo.length === 0 || color.length === 0){//vacios
			swal('Faltan filtros', 'Debe completar todos los campos', "warning");
			return false;
		}else{
			$.ajax({
			    data: {'sexo': sexo, 'etapa': etapa, 'pasatiempo': pasatiempo, 'color': color},
			    url: 'http://localhost/deargift-server/?getProducts',
			    type: 'post',
			    success: function(result,status,xhr){
			    	console.log('result: '+result);
			    	let res = JSON.parse(result);
			    	if(res.length != 0){

			    		let productsList = $("#products-list");

			    		console.log(res);

			    		for(let i=0; i < res.length; i++){
			    			//if (res[i].length != 0) {
			    				//for (let j=0; j < res[i].length; j++) {
			    					//if (res[i][j].length != 0) {

			    						$('#mensaje').html('Se han encontrado las siguientes coincidencias');

			    						productsList.append(`
														<a href="#">
															<div class="col s6 m4 l4 xl3 gallery">										
																	<img src="`+res[i][8]+`" class="img-responsive">										
																<div class="desc">
																	<h5>`+res[i][1]+`</h5>
																	<p>`+res[i][2]+`</p>
																	<p class="bold">Precio: `+res[i][3]+` colones</p>
																</div>
															</div>
														</a>
									    			`);
			    					//}else{
			    					//	$('#mensaje').html('No se han encontrado resultados');
			    					//}
			    				//}
			    			//}else{
			    			//	$('#mensaje').html('No se han encontrado resultados');
			    			//}
			    		}
			    	}else{
			    		$('#mensaje').html('No se han encontrado resultados');
			    	}

			    	$("#div1").hide();
			    	$("#div2").show();
			    },
			    error(xhr, status, error){
			    	swal('Error', 'Se ha producido un error al mostrar los productos', "error");
			    }
  			});
		}
	});
});
