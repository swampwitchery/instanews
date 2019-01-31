// Problem: Retrieve content from the NYT API - Top Stories API and add it to our site. 
//If we don't get a successful response, let the user know. About 118 lines of code.

//1A. Listen for the select menu to change (watching value)
//1B. If the select value is "" do nothing and return from the function immediately 
//1C. Show a loader and clear out old stories 
//2. Send a request to the NYT API for data based on the value of the select menu 
//3. If successful, we need to parse the data we get back and decide what parts we want to append to the DOM
//4. Append that stuff to the DOM
//5. If unsuccessful, append and show a helpful error message to the user in the user interface (UI)
//6. Hide the loader again

$(function () {

    $('#menu-select').on('change', function () {
        const section = $(this).val();
        // console.log(section);
        $('.loading').append('<img src="./assets/images/ajax-loader.gif">');
        $('.articles').empty();

        //Ajax request
        $.ajax({
                method: 'GET',
                url: 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=dVfSy4pK8FiCPPKz5OWw9rNW9Ma9dZKq',
                dataType: 'json'
            })
            .done(function (data) {
                const filteredData = data.results.filter(function (data) {
                    return data.multimedia.length > 4;
                }).slice(0, 12);
                $.each(filteredData, function (key, value) {
                    //console.log(value);
                    if (value.multimedia[4] !== undefined) {
                        $('.articles').append("<li><a target=_'blank' href=" + value.url + "><img src=" + value.multimedia[4].url + "><p> " + value.abstract + "</p></a></li>");
                    }

                });

            })
            .fail(function () {
                alert('sorry, try again!');
            })
            .always(function () {
                $('.loading img').remove();
            });
    });
});