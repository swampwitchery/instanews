"use strict";

//If we don't get a successful response, let the user know. About 118 lines of code.
//1B. If the select value is "" do nothing and return from the function immediately 
//3. If successful, we need to parse the data we get back and decide what parts we want to append to the DOM
//4. Append that stuff to the DOM
//5. If unsuccessful, append and show a helpful error message to the user in the user interface (UI)
//6. Hide the loader again
//same as document ready
$(function () {
  $('#menu-select').on('change', function () {
    var section = $(this).val(); //if value is empty, return

    $('.loading').append('<img src="./assets/images/ajax-loader.gif">');
    $('.articles').empty();
    $.ajax({
      method: 'GET',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=dVfSy4pK8FiCPPKz5OWw9rNW9Ma9dZKq',
      dataType: 'json'
    }).done(function (data) {
      var filteredData = data.results.filter(function (data) {
        return data.multimedia.length > 4;
      }).slice(0, 12);
      $.each(filteredData, function (key, value) {
        //console.log(value);
        if (value.multimedia[4] !== undefined) {
          $('.articles').append("<li><a target=_'blank' href=" + value.url + "><img src=" + value.multimedia[4].url + "><p> " + value.abstract + "</p></a></li>");
        }
      }); //console log below is an object
      //append all the stuff
      //3. for each article - create constants for img URL, title, and link
      //4. then we can make HTML string for the article, using the constans we just created
      //5. append string to stories section
    }).fail(function () {
      alert('sorry, try again!');
    }).always(function () {
      $('.loading img').remove();
    });
  });
});