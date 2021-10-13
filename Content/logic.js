// --- Global variables ---
// set timer identifier for the thing that handles how the copy button looks
timerID = null;
// Stuff for the thing that handles how the copy button looks
copyButtonLooks = {
    "copy"   : "Copier",
    "copied" : "Copié ✔"
}

// --- Functions ---
function printARandomName(list) {
    document.getElementById("fname").value = list[Math.floor(Math.random() * list.length)];
}

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("fname");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Notify the user that "copy" is done */
    cpButton = document.getElementById("copyToClipboard")
    cpButton.innerHTML = copyButtonLooks.copied;
    // Cancel the timer if it exists
    if (timerID !== null)
    {
        clearTimeout(timerID);
    }
    // Set a timer to reset the button to "copy" after a while
    timerID = setTimeout(
        function(){
            cpButton.innerHTML = copyButtonLooks.copy;
        }
        , 2000
    )
}

// --- Do stuff ---

// print a random name on page landing
printARandomName(names);
