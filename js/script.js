$(function () {
    console.log("Welcome to Instanews");
});

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

//same as document ready
$(function () {
    $('#menu-select').on('change', function () {
        const section = $(this).val();
        // console.log(menu);

        //if value is empty, return
        //show loader
        //clear stories

        //make our ajax request

        // https://api.nytimes.com/svc/topstories/v2/{section}.json

        $.ajax({
            method: 'GET'
            url: 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=dVfSy4pK8FiCPPKz5OWw9rNW9Ma9dZKq'
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            //steps 3+4 are in 'done'
            console.log(data.results);
        }).fail(function () {
            //do stuff here if it doesn't work
        }).always(function () {
            //hide the loader
        });
    });
});