$(document).ready(function(){


$('#mini-clndr').clndr({
  template: $('#calendar-template').html(),
  events: events,
  clickEvents: {
    click: function(target) {
      if(target.events.length) {
        var daysContainer = $('#mini-clndr').find('.days-container');
        daysContainer.toggleClass('show-events', true);
      alert("222");
        swal("Evento "+target.events[0].date, 'Id: '+target.events[0].id +
              '\nHora de inicio: '+target.events[0].start_time +'\nHora de fin: '+target.events[0].end_time + '\nTipo: '+
                target.events[0].kind + '\nDescripcion: '+target.events[0].description)

        $('#mini-clndr').find('.x-button').click( function() {
          daysContainer.toggleClass('show-events', false);
        });

        alert("111");

      }else{
        console.log("hlollaa")
      }
    }
  },
  adjacentDaysChangeMonth: true
});


});