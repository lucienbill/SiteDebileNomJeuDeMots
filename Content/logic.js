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

    // FIXME : remplacer l'alerte par un truc façon Imgur
    oldButtonInnerHTML = document.getElementById("copyToClipboard").innerHTML ;
    document.getElementById("copyToClipboard").innerHTML = "Copié ✔";
    // attendre 5 secondes
    setTimeout(
        function(){
            document.getElementById("copyToClipboard").innerHTML = oldButtonInnerHTML
        }
        , 2000
    )
}

printARandomName(names);