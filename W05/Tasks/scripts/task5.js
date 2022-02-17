/* Lesson 5 */

/* IF/ELSE IF */

// Step 1: Declare and initialize a new variable to hold the current date
let curDate = new Date();
// Step 2: Declare another variable to hold the day of the week
let day;
// Step 3: Using the variable declared in Step 1, assign the value of the variable declared in Step 2 to the day of the week ( hint: getDay() )
day = curDate.getDay();
// Step 4: Declare a variable to hold a message that will be displayed
let message;
// Step 5: Using an if statement, if the day of the week is a weekday (i.e. Monday - Friday), set the message variable to the string 'Hang in there!'
if (day >= 1 && day <= 5) {
    message = "Hang in there!";
}
// Step 6: Using an else statement, set the message variable to 'Woohoo!  It is the weekend!'
else {
    message = "Woohoo!  It is the weekend!";
}

/* SWITCH, CASE, BREAK */

// Step 1: Declare a new variable to hold another message
let newMessage;
// Step 2: Use switch, case and break to set the message variable to the day of the week as a string (e.g. Sunday, Monday, etc.) using the day of week variable declared in Step 2 above
switch (day) {
    case 0:
        newMessage = "Sunday";
        break;
    case 1:a
        newMessage = "Monday";
        break;
    case 2:
        newMessage = "Tuesday";
        break;
    case 3:
        newMessage = "Wednesday";
        break;
    case 4:
        newMessage = "Thursday";
        break;
    case 5:
        newMessage = "Friday";
        break;
    case 6:
        newMessage = "Saturday";
        break;
}

/* OUTPUT */

// Step 1: Assign the value of the first message variable to the HTML element with an ID of message1
document.getElementById("message1").innerHTML = message;
// Step 2: Assign the value of the second message variable to the HTML element with an ID of message2
document.getElementById("message2").innerHTML = newMessage;

/* FETCH */

// Step 1: Declare a global empty array variable to store a list of temples
const listTemple = [];
// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
// - Creates an HTML <article> element
// - Creates an HTML <h3> element and add the temple's templeName property to it
// - Creates an HTML <h4> element and add the temple's location property to it
// - Creates an HTML <h4> element and add the temple's dedicated property to it
// - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's templeName property to the alt attribute
// - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
// - Appends the <article> element to the HTML element with an ID of temples

function output(temples) {
    temples.forEach(temple => {
        const article = document.createElement("article");
        
        const templeName = document.createElement("h3");
        templeName.textContent = temple.templeName;

        const location = document.createElement("h4");
        location.textContent = temple.location;

        const dedicated = document.createElement("h4");
        dedicated.textContent = temple.dedicated;

        const img = document.createElement("img");
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", temple.templeName);

        article.appendChild(templeName);
        article.appendChild(location);
        article.appendChild(dedicated);
        article.appendChild(img);

        document.querySelector("#temples").appendChild(article);
});
}

// Step 3: Using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'
fetch("https://byui-cse.github.io/cse121b-course/week05/temples.json")
// Step 4: Add a .then() method to turn the returned string into a JavaScript object ( hint: .json() )
    .then(response => response.json())
// Step 5: Add another .then() method with a variable name to hold the temples and an empty arrow function
    .then(temples => {
// Step 6: Inside of second .then() method, assign the list of temples (as a JSON object) to the temples variable
        templeList = temples;
       
// Step 7: Finally, call the output function and pass it the list of temples
        output(templeList);
    });
// Step 8: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples
function reset() {
    document.querySelector("#temples").innerHTML = "";
}
// Step 9: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples
function sortBy() {
    reset();
    let filter = document.querySelector("#sortBy").value;
    switch (filter) {
        case "templeNameAscending":
            output(templeList.sort(
                (temple1, temple2) => {
                    let templeName1 = temple1.templeName.toLowerCase();
                    let templeName2 = temple2.templeName.toLowerCase();
                    if (templeName1 < templeName2) return -1;
                    else if (templeName1 > templeName2) return 1;
                    else return 0;
                }));
            break;
        case "templeNameDescending":
            output(templeList.sort(
                (temple1, temple2) => {
                    let templeName1 = temple1.templeName.toLowerCase();
                    let templeName2 = temple2.templeName.toLowerCase();
                    if (templeName1 > templeName2) return -1;
                    else if (templeName1 < templeName2) return 1;
                    else return 0;
                }));
            break;
    }
}
// Step 10: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
document.querySelector("#sortBy").addEventListener("change", sortBy);

/* STRETCH */

// Consider adding a "Filter by" feature that allows users to filter the list of temples
// This will require changes to both the HTML and the JavaScript files
