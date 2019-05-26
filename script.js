$(document).ready(function(){
  var template_html = $('#template_giorno').html();
  var template_function = Handlebars.compile(template_html);
  //Dichiaro le variabili min e max per il limite mesi dell'anno 2018
  var min_date = '2018-01-01';
  var max_date = '2018-12-01';

  var initial_date = '2018-01-01';
  var current_date = moment(initial_date);
  disegna_mese(current_date);
  //DaysInMonth calcola quanti giorni ci sono nel mese
  var giorni = current_date.daysInMonth();
  //Intercetto il click del mese successivo
  $('#successivo').click(function(){
    if(current_date.isSameOrAfter(max_date)){
      alert('Non puoi andare nel 2019!');
      $(this).attr('disabled', true);
    } else {
      current_date.add(1, 'months');
      disegna_mese(current_date);
      $(this).attr('disabled', false);
      $('#precedente').attr('disabled', false);
    }
  });
  //Intercetto il click del mese precedente
  $('#precedente').click(function(){
    if(current_date.isSameOrBefore(min_date)){
      alert('Non puoi andare nel 2017!');
      $(this).attr('disabled', true);
    } else {
      current_date.subtract(1, 'months');
      disegna_mese(current_date);
      $(this).attr('disabled', false);
      $('#successivo').attr('disabled', false);
    }
  });

  function disegna_mese(current_date){
    //Resetto il contenitore del calendario
    $('#calendar').html('');
    //Leggo quanti giorni ci sono nel mese corrente
    var giorni = current_date.daysInMonth();
    var mese = current_date.format('MMMM');
    var anno = current_date.format('YYYY');
    //Inserisco nel titolo il mese corrente
    $('#mese_corrente').text(mese + ' ' + anno);
    for (var i = 1; i <= giorni; i++) {
      var giorno = i + ' ' + mese;
      var variables = {
        'giorno_template': giorno,
        'single_day': current_date.format('YYYY-MM-') + i
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

  //Chiamata ajax
  function ajaxCall () {

    meseTot = current_date.month();
    mese = current_date.format('MMMM');

    $.ajax ({
      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: 'GET',
      data: {
        year: anno,
        month: meseTot
      },
      success: function (data) {

        var festivita = data.response;

        $('#calendar').each(function (){

          var data_mese = $(this).attr('data_single_day');

          for (var i = 0; i < festivita.length; i++) {

            if (festivita[i].date == data_mese) {
              $(this).addClass('.red');
            }
          }
        });
      },
        'error': function () {
          alert('errore');
        }
    });
  }
});
