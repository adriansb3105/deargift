$(document).ready(function(){

	$("#div2").hide();
	$("#div3").hide();
	$("#div1").show();
	//$("#div2").show();

 $(".button-collapse").sideNav();

 

	$('#btn-return').on('click', function(){
		window.location = 'form.html';
	});

	$('#btn-return2').on('click', function(){
		$("#div3").hide();
		$("#div2").show();
	});

	$(document).ready(function(){
      $('.carousel').carousel({
      	duration: 500
      });
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

		if($.trim(sexo) === '' || $.trim(etapa) === '' || pasatiempo.length === 0 || $.trim(color) === ''){//vacios
			swal('Faltan filtros', 'Debe completar todos los campos', "warning");
			return false;
		}else{
			$.ajax({
			    data: {'sexo': sexo, 'etapa': etapa, 'pasatiempo': pasatiempo, 'color': color},
			    url: 'http://localhost/deargift-server/?getProducts',
			    //dataType: 'json',
			    type: 'post',
			    success: function(result,status,xhr){

			    	//console.log(result);
			    	//console.log(result.length);
			    	//console.log(JSON.parse(result));

			    	let res = JSON.parse(result);
			    	//let res = result;
			    	
			    	console.log(res);


			    	if(res.length != 0){

			    		let productsList = $("#products-list");

			    		
			    		for(let i=0; i < res.length; i++){

			    			
							$('#mensaje').html('Se han encontrado las siguientes coincidencias');

							productsList.append(`
											<a id="img`+i+`" href="#">
												<div class="col s6 m4 l4 xl3 gallery">										
														<img src="`+res[i].url+`" class="img-responsive">										
													<div class="desc">
														<h5>`+res[i].nombre+`</h5>
														<p>Precio: `+res[i].precio+` colones</p>
													</div>
												</div>
											</a>
						    			`);
							let imgId = "#img"+i;
							$(imgId).on("click", function(){
								//alert(res[i].id +": "+ res[i].nombre);
							$("#div3 #contenido").html(`
								<div class="wish">
									<a href="#!" id="wish" class="tooltipped" data-position="bottom" data-tooltip="Deseo!"><img src="img/wish3.png" class="img-responsive circle wish-img" alt="wish"></a>
									<a href="#!" id="buy" class="tooltipped" data-position="bottom" data-tooltip="Comprar"><img src="img/buy.png" class="img-responsive circle wish-img" alt="comprar"></a>
								</div>

								<div class="white-font">
									<center><h5 class="bold">`+res[i].nombre+`</h5></center>
								</div>
								
								<center>
									<div id="img-product" class="col s6 m4 l4 xl3 margin-top-10">
										<img src="`+res[i].url+`" class="img-responsive">
									</div>
									<span class="flow-text white-font">Precio: `+res[i].precio+` colones</span>
								</center>
								
								<div class="margin-top-10">
									<span class="flow-text white-font">Color `+res[i].color+`</span><br>
									<span class="flow-text white-font">`+res[i].descripcion+`</span>
								</div>`);

								$('.tooltipped').tooltip({delay: 50});	

								$('#wish').on('click', function(){
									Materialize.toast('Agregado a la lista de deseos!', 2000, 'rounded');
								});

								$('#buy').on('click', function(){
									swal({
										title: "Comprar",
										text: "Confirma que desea agregar este producto a la cesta?",
										type: "info",
										showCancelButton: true,
										cancelButtonText: 'No',
										confirmButtonColor: "#81c784",
										confirmButtonText: "Si!",
										closeOnConfirm: false
									}, function(){
										swal({title: "Agregado!", text: "Se ha agregado este producto a tu cesta de compras!", timer: 2000, showConfirmButton: false});
									});
								});
	
								$("#div2").hide();
								$("#div3").show();			
							});
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






/*
			    			let name = res[i].nombre;
			    			name = name.replace("á", "\u00E1");
			    			name = name.replace("é", "\u00E9");
			    			name = name.replace("í", "\u00ED");
			    			name = name.replace("ó", "\u00F3");
			    			name = name.replace("ú", "\u00FA");
			    			name = name.replace("Á", "\u00C1");
			    			name = name.replace("É", "\u00C9");
			    			name = name.replace("Í", "\u00CD");
			    			name = name.replace("Ó", "\u00D3");
							name = name.replace("Ú", "\u00DA");

							let description = res[i].descripcion;
			    			description = description.replace("á", "\u00E1");
			    			description = description.replace("é", "\u00E9");
			    			description = description.replace("í", "\u00ED");
			    			description = description.replace("ó", "\u00F3");
			    			description = description.replace("ú", "\u00FA");
			    			description = description.replace("Á", "\u00C1");
			    			description = description.replace("É", "\u00C9");
			    			description = description.replace("Í", "\u00CD");
			    			description = description.replace("Ó", "\u00D3");
							description = description.replace("Ú", "\u00DA");
*/