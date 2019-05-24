$(document).ready(function(){
  var template_html = $('#template_giorno').html();
  var template_function = Handlebars.compile(template_html);
  //Dichiaro le variabili min e max per il limite mesi dell'anno 2018
  var min_date = '2018-01-01';
  var max_date = '2018-12-31';

  var initial_date = '2018-01-01';
  var current_date = moment(initial_date);
  disegna_mese(current_date);
  //DaysInMonth calcola quanti giorni ci sono nel mese
  var giorni = current_date.daysInMonth();
  //Intercetto il click del mese successivo
  $('#successivo').click(function(){
    if(current_date.isSameOrAfter(max_date)){
      alert('data oltre il limite massimo');
      $(this).attr('disabled', true);
    } else {
      current_date.add(1, 'months');
      disegna_mese(current_date);
      $(this).attr('disabled', false);
      $('#precedente').attr('disabled', false);
    }
  });

  $('#precedente').click(function(){
    if(current_date.isSameOrBefore(min_date)){
      alert('data oltre il limite minimo');
      $(this).attr('disabled', true);
    } else {
      current_date.subtract(1, 'months');
      disegna_mese(current_date);
      $(this).attr('disabled', false);
      $('#successivo').attr('disabled', false);
    }
  });

  function disegna_mese(current_date){
    //Leggo quanti giorni ci sono nel mese corrente
    var giorni = current_date.daysInMonth();
    var mese = current_date.format('MMMM');
    var anno = current_date.format('YYYY');
    //Inserisco nel titolo il mese corrente
    $('#mese_corrente').text(mese + ' ' + anno);

    for (var i = 1; i <= giorni; i++) {
      var giorno = i + ' ' + mese;
      var variables = {
        'giorno_template': giorno
      }
      $('#calendar').append(template_function(variables));
    }
  }

  function format_day(day){
    if(day < 10) {
      return '0' + day
    }
    return day;
  }
});
