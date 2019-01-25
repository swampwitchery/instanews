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
        // console.log(section);

        //if value is empty, return
        //show loader
        //clear stories

        //make our ajax request

        // https://api.nytimes.com/svc/topstories/v2/{section}.json

        $.ajax({
                method: 'GET',
                url: 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=dVfSy4pK8FiCPPKz5OWw9rNW9Ma9dZKq',
                dataType: 'json'
            })
            .done(function (data) {
                //steps 3+4 are in 'done'
                //console log below is an object
                console.log(data.results);
                //append all the stuff
                //1. filter the data to only include 12 articles with images
                //2. create .each to run a function for each article in response.results
                //3. for each article - create constants for img URL, title, and link
                //4. then we can make HTML string for the article, using the constans we just created
                //5. append string to stories section
            })
            .fail(function () {
                //do stuff here if it doesn't work
            })
            .always(function () {
                //hide the loader
            });
    });
});