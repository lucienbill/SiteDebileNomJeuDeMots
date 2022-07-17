// --- Global variables ---
// set timer identifier for the thing that handles how the copy button looks
let timerID = null;
// Stuff for the thing that handles how the copy button looks
const copyButtonLooks = {
    "copy"   : "📄",
    "copied" : "☑️"
}
const copyButtonTitle = {
    "copy"   : "copier le nom dans votre presse-papier",
    "copied" : "copié !"
}
// --- Functions ---
function printARandomName() {
    const fname = document.getElementById("fname")
    
    if (document.getElementById("allowNSFW").checked){ //NSFW
        fname.value = allnames[Math.floor(Math.random() * allnames.length)];
    } else { //SFW
        fname.value = namesSFW[Math.floor(Math.random() * namesSFW.length)];
    }
}

function copyToClipboard() {
    // Get the text field
    const copyText = document.getElementById("fname");

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Notify the user that "copy" is done
    cpButton = document.getElementById("copyToClipboard")
    cpButton.innerText = copyButtonLooks.copied;
    cpButton.title     = copyButtonTitle.copied;

    // Cancel the timer if it exists
    if (timerID !== null)
    {
        clearTimeout(timerID);
    }
    
    // Set a timer to reset the button to "copy" after a while
    timerID = setTimeout(
        function(){
            cpButton.innerText = copyButtonLooks.copy;
            cpButton.title     = copyButtonTitle.copy;
        }
        , 2000
    )
}

// --- Do stuff ---
// adding "nsfw" as a get parameter checks the checkbox (example: mysite.dev/?nsfw)
if (window.location.search.substr(1).split("&").includes("nsfw")) {
    document.getElementById("allowNSFW").checked = true;
}

// print a random name on page landing
printARandomName();
