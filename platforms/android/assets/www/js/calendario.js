$(document).ready(function(){

  let page = 'https://deargift.herokuapp.com/?';
  //let page = 'http://localhost/deargift-server/?';

/*let eventos = [
  {date: "2017-06-14", event: 'Dia de la madre', type: 'default'},
  {date: "2017-06-15", event: 'Dia de la madre', type: 'user'},
  {date: "2017-06-16", event: 'Dia de la madre', type: 'default'},
  {date: "2017-06-17", event: 'Dia de la madre', type: 'user'},
  {date: "2017-06-18", event: 'Dia de la madre', type: 'user'},
];*/


moment.locale('es', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
});


let eventos = [];


$.ajax({
  data: {},
  async: false,
  url: page+'getEvents',
  type: 'post',
  success: function(result,status,xhr){
    eventos = JSON.parse(result);
    
    //console.log(eventos);
    //console.log(eventos.length);
    //console.log(eventos[0].type);


if (eventos.length > 0) {

  //events = events.sort();

  for (let i = 0; i < eventos.length; i++) {
    
    if(eventos[i].type === 'user'){
      let evento = eventos[i].date;

      let dia = evento.substring(8,10);
      let mes = evento.substring(5,7);
      let anio = evento.substring(0,4);

      $('#eventsTable table tbody').append(` <tr>
                                              <td>`+dia+'-'+mes+'-'+anio+`</td>
                                              <td>`+eventos[i].event+`</td>
                                            </tr>`);
    }
  }
}


  },
  error(xhr, status, error){
    swal('Error', 'Se ha producido un error al mostrar los eventos', "error");
  }
});



$('#mini-clndr').clndr({
  template: $('#calendar-template').html(),
  events: eventos,
  daysOfTheWeek: ['D', 'L', 'K', 'M', 'J', 'V', 'S'],
  clickEvents: {
    click: function(target) {
      console.log(target);
      if(target.events.length) {
        var daysContainer = $('#mini-clndr').find('.days-container');
        daysContainer.toggleClass('show-events', true);
        
        let evento = target.events[0].date;

        let dia = evento.substring(8,10);
        let mes = evento.substring(5,7);
        let anio = evento.substring(0,4);

        swal(dia+'-'+mes+'-'+anio, target.events[0].event);


        $('#mini-clndr').find('.x-button').click( function() {
          daysContainer.toggleClass('show-events', false);
        });

      }else{}
    }
  },
  adjacentDaysChangeMonth: true
});

//console.log('hola');


});