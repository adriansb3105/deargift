$(document).ready(function(){

	let page = 'https://deargift.herokuapp.com/?';
	//let page = 'http://localhost/deargift-server/?';

	//let email = window.localStorage.getItem('email');
	let email = 'nela@gmail.com';

	$('#div1').show();
	$('#div2').hide();
	$('#div3').hide();
	$('#div4').hide();

	let tableBody = $('#tbody');
	let numProductos = 0;
	let total = 0;


	$('#nombre').keyup(function(){
		let nombre = $('#nombre').val();
		if ($.trim(nombre) != ''){
			$('#nombre-tarjeta').html(nombre);
		}else{
			$('#nombre-tarjeta').html('Nombre de la persona');
		}
	});

	$('#mensaje').keyup(function(){
		let mensaje = $('#mensaje').val();
		if ($.trim(mensaje) != ''){
			$('#mensaje-tarjeta').html(mensaje);
		}else{
			$('#mensaje-tarjeta').html('Texto de ejemplo para la tarjeta de regalo');
		}
	});



	$.ajax({
	    data: {'email': email},
	    url: page+'getCesta',
	    type: 'post',
	    success: function(result,status,xhr){

	    	let res = JSON.parse(result);
			    	
			    	console.log(res);

			    	if(res.length != 0){

			    		
	
			    		for(let i=0; i < res.length; i++){

			    			tableBody.append(`
								<tr>
						          	<td><p><input type="checkbox" value="`+res[i].id_producto+`" id="`+res[i].id_producto+`"/><label for="`+res[i].id_producto+`"></label></p></td>
						            <td>`+res[i].nombre+`</td>
						            <td>`+res[i].color+`</td>
						            <td>`+res[i].precio+`</td>
					          	</tr>
			    				`);

			    			$(`#`+res[i].id_producto).click(function(){
			    				if(this.checked){
			    					//let total = $('#total').val();
			    					numProductos++;
			    					total += res[i].precio;
			    					$('#total').html(total);
			    				}else{
			    					numProductos--;
			    					total -= res[i].precio;
			    					$('#total').html(total);
			    				}
			    			});


			    		}
			    	}



	    },
	    error(xhr, status, error){
	    	swal('Error', 'No se pudo mostrar los productos', "error");
	    }
		});


	$('#btn-comprar').click(function(){
		if(numProductos === 0){
			swal('Info', 'Debe escojer al menos un producto', "info");
		}else{
			$('#div1').hide();
			$('#div2').show();

			$('.img-caja').click(function(){
				$('#div1').hide();
				$('#div2').hide();
				$('#div3').show();
			});
		}
	});


	$('#btn-listo').click(function(){
		$('#div1').hide();
		$('#div2').hide();
		$('#div3').hide();
		$('#div4').show();
	});


$('#btn-finalizar').click(function(){
	swal({
		title: "Finalizar compra",
		text: "Su total es de "+total+" + 4950 colones por concepto del servicio. Desea confirmar su compra?",
		type: "info",
		showCancelButton: true,
		cancelButtonText: 'No',
		confirmButtonColor: "#81c784",
		confirmButtonText: "Si!",
		closeOnConfirm: false
	}, function(){
		swal('Gracias', 'Felicidades, su compra ha sido finalizada', "info");
		setTimeout(function(){
			window.location = 'home.html';
		}, 2000);
	});
});
							


});