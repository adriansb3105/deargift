$(document).ready(function(){

let events = [
  {date: "2017-06-14", event: 'Dia de la madre'}
];

moment.locale('es', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
});



$('#mini-clndr').clndr({
  template: $('#calendar-template').html(),
  events: events,
  daysOfTheWeek: ['D', 'L', 'K', 'M', 'J', 'V', 'S'],
  clickEvents: {
    click: function(target) {
      if(target.events.length) {
        var daysContainer = $('#mini-clndr').find('.days-container');
        daysContainer.toggleClass('show-events', true);
      
        swal(target.events[0].date, 'Evento: '+target.events[0].event);

        $('#mini-clndr').find('.x-button').click( function() {
          daysContainer.toggleClass('show-events', false);
        });

      }else{}
    }
  },
  adjacentDaysChangeMonth: true
});

if (events.length > 0) {

  //events = events.sort();

  for (let i = 0; i < events.length; i++) {
    $('#eventsTable table tbody').append(` <tr>
                                            <td>`+events[i].date+`</td>
                                            <td>`+events[i].event+`</td>
                                          </tr>`);
  }
}


});