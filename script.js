/*Calendario festività: Creare un calendario dinamico con le festività.
Partiamo dal gennaio2018 dando la possibilità di cambiare mese,
gestendo il caso in cui l’APInon possa ritornare festività.
Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
(unici dati disponibili sull’API).
Ogni volta che cambio mese dovrò:
1.Controllare se il mese è valido (per ovviare al problema che l’APInon carichi holiday non del 2018)
2.Controllare quanti giorni ha il mese scelto formando così una lista*/

$(document).ready(function(){
  var date= '2018-01-01';
  var moment_date = moment(date);
  //DaysInMonth calcola quanti giorni ci sono nel mese
  var giorni = moment_date.daysInMonth();

  var mese = moment_date.format('MMMM');
  var anno = moment_date.format('YYYY');

  $('#mese_corrente').text(mese + ' ' + anno);
  //Ciclo for, per far partire i numeri da uno fino ai giorni del mese
  for (var i = 1; i <= giorni; i++) {

    var giorno= i + ' ' + mese;

    $('#calendar').append('<li>' + giorno + '</li>');

  }
 //Creo una funzione moveMonth per far scorrere i mesi includendo il bottone successivo
 //e precedente
  function moveMonth(button) {
    if (button.includes('successivo') && monthCount < december) {
      monthCount++;
    } else if (button.includes('precedente') && monthCount > january) {
      monthCount--;
    }
  };

});
