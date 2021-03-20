const TESTWRAPPER = document.querySelector(".test-wrapper");
const TESTAREA = document.querySelector("#test-area");
const ORIGINTEXT = document.querySelector("#origin-text p").innerHTML;
const RESETBUTTON = document.querySelector("#reset");
const THETIMER = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval; //using a global variable for the interval, so that it can be cleared outside the function start
var timerRunning = false; //global variable created to clear timer--reset interval
var wpm = document.querySelector("#wpm");



// this is a helper function, used to add a zero to single digit numbers for aesthetics
//converts the number to a string for the timer to use
function leadingZero (time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time; //need to return the value of this function to use later
}

//a standard function to run a minute/second/hundreth timer
function runTimer() {
    let currentTimer = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]); //passed the value for timer array to the function leadingZero to get the aesthetic zero in front
    THETIMER.innerHTML = currentTimer;
    timer[3]++;
//the floor method means that we won't get decimals
//timer 3 is the one that is updating in the loop, need to separate with math into min, sec, timer3=thousandths of a sec
    timer[0] = Math.floor((timer[3]/100)/60); //to get minutes
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60)); // seconds
    timer[2] = Math.floor((timer[3] - timer[1] * 100) - (timer[0] * 6000)); //hundreth of a sec
}

//the function that matches the text entered in the TESTAREA with the provided text on the page
function spellCheck(){
    let textEntered = TESTAREA.value;
    let originTextMatch = ORIGINTEXT.substring(0,textEntered.length); //substring treats the text as a string and we are truncating to the length of textEntered

    //testing if the text entered matches the original text and changing box color
    if (textEntered == ORIGINTEXT){
        clearInterval(interval); //clearing the global variable interval
        TESTWRAPPER.style.borderColor = "#429890";
    }else{
        if (textEntered == originTextMatch){
            TESTWRAPPER.style.borderColor = "#65ccf3"
        }else {
            TESTWRAPPER.style.borderColor = "#E95d0f";
        }
    }
    //console.log(textEntered);
   
}

//the function to detect the very first keystroke to start the timer
function start(){
    let textEnteredLength = TESTAREA.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true; //This is so the timer stops and doesn't restart if text is removed from box
        interval = setInterval(runTimer, 10); //putting the value of setInterval method into the global variable interval to work with outside the function
    }
    
}

//the function used by the button to reset everything
function reset() {
    clearInterval(interval); //ensures the browser isn't running an interval in the background
    interval = null; //so we are not setting up a new interval with a new index number
    timer = [0,0,0,0]; //resetting the timer variable to zero
    timerRunning = false; //resetting the timerRunning variable to false as in the beginning

    //this is a visual reset of the elements on the page
    TESTAREA.value = ""; //nothing in the test area--empty string
    THETIMER.innerHTML = "00.00.00"; //resetting the timer value in html to zeros
    TESTWRAPPER.style.borderColor = "grey"; //resetting the text box color to grey
    wpm.innerHTML = "";
    //console.log("The reset button has been clicked.");
}

//creating a function to come up with the words per minute
function wordsPerMin(){
   
    var wordspm = 0;
    var string = TESTAREA.value; //string to be split
    var length = string.split(/[^\s]+/).length - 1; //splitting string to find the words and putting it in the variable length
    //console.log(length);

     if (string == ORIGINTEXT){
        wordspm = Math.floor(length/(timer[3]/6000)); //calculating wpm--lenth(words)/ time elapsed in minutes
        wpm.innerHTML = wordspm;
    }
}





// Event Listeners for the interactive portions of the type tester

//event listener to detect keypress for typing -- start is the function name
TESTAREA.addEventListener("keypress", start, false);
//event listener to check letters--keys pressed with the text in the text to be compared
TESTAREA.addEventListener("keyup", spellCheck, false);
//event listener to detect keypress for word per minutres function
TESTAREA.addEventListener("keyup", wordsPerMin, false);

//event listener to know when reset button is clicked
RESETBUTTON.addEventListener("click", reset, false);


/************************************************************************************************ */
/*  var startTime = Date.now();
    var endTime;
    var totalTime;
    if (string == ORIGINTEXT){
        endTime = Date.now();
    }
    totalTime = ((endTime - startTime)/60000); //the 60000 is to make it in minutes, else it is in milliseconds
    console.log(totalTime);
    wpm = Math.floor(length/totalTime);


    document.getElementById("wpm").innerHTML
    */