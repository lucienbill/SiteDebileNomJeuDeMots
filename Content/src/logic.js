// --- Global variables ---
// set timer identifier for the thing that handles how the copy button looks
let timerID = null;
// save the previous names in an array
const nameHistory = [];
// paging stuff for history
let historyPage = 1;
const historyPageSize = 10;
// Stuff for the thing that handles how the copy button looks
const copyButtonLooks = {
    "copy"   : "📄",
    "copied" : "☑️"
}
const copyButtonTitle = {
    "copy"   : "copier le nom dans votre presse-papier",
    "copied" : "copié !"
}
let nameIndex = -1
let firstNameShown = ""
// --- Functions ---
function printFirstRandomName() {
    // Usage: on page load, select a random name from the list and write it
    const fname = document.getElementById("fname");
    
    let newName = ""
    if (document.getElementById("allowNSFW").checked){ //NSFW
        newName = allnames[Math.floor(Math.random() * allnames.length)];
    } else { //SFW
        newName = namesSFW[Math.floor(Math.random() * namesSFW.length)];
    }
    fname.value = newName
    firstNameShown = newName

    // Add the name at the start of the history then redraw it
    nameHistory.unshift(fname.value);
    drawHistory();
}

function printARandomName() {
    // usage: when the user clicks the button to get an other name, they get a
    // new random name: the next item from the list, but the list has been
    // shuffled. Goal: avoid repetitions
    const fname = document.getElementById("fname");
    
    let newName = ""
    let doLoop = false
    do {
        nameIndex = (nameIndex + 1) % allnames.length
        newName = allnames[nameIndex];
        doLoop = (newName == firstNameShown)
        if (doLoop){
            // if the name is the very first name shown on page load,
            // then choose another one. Do this only once
            firstNameShown = ""
        } else {
            // if allowNSFW is not checked, make sure the picked name is SFW
            if (!document.getElementById("allowNSFW").checked){ //not NSFW
                doLoop = namesNSFW.includes(newName)
            }
        }
    } while (doLoop);
    fname.value = newName

    // Add the name at the start of the history then redraw it
    nameHistory.unshift(fname.value);
    drawHistory();

}

async function shuffleNames(activateNewNameButton=false) {
    let currentIndex = allnames.length;
    
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [allnames[currentIndex], allnames[randomIndex]] = [
        allnames[randomIndex], allnames[currentIndex]];
    }

    if (activateNewNameButton) {
        document.getElementById("chooseName").disabled = false 
    }
}

function drawHistory() {

    // Get DOM els
    const history = document.getElementById("history");
    const historyCount = document.getElementById("historyCount");
    const historyNav = document.getElementById("historyNav");

    // Reset els
    historyCount.innerHTML = nameHistory.length;
    history.innerHTML = "";
    historyNav.innerHTML = "";

    // Get names depending on current page
    const [start, end] = [(historyPage - 1) * historyPageSize, historyPage * historyPageSize];
    const names = nameHistory.slice(start, end)

    // Map the content
    history.innerHTML = names.map(name => "<li>" + name + "</li>").join('');
    const pagesCount = Math.ceil(nameHistory.length / historyPageSize);
    for (p = 1; p <= pagesCount; p++) {
        historyNav.innerHTML += "<li" + (p === historyPage ? " class=\"current\"" : "") + " onclick=\"showHistoryPage(" + p + ")\">" + p + "<li>"
    }
}
function showHistoryPage(page) {
    if (page === historyPage) { return; }
    const pagesCount = Math.ceil(nameHistory.length / historyPageSize);
    historyPage = page <= pagesCount ? page : pagesCount;
    drawHistory();
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
if (window.location.search.split("&").includes("nsfw")) {
    document.getElementById("allowNSFW").checked = true;
}

// print a random name on page landing
printFirstRandomName();
shuffleNames(activateNewNameButton=true)