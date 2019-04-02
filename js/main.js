var charset;
var uppercb;
var numberscb;
var specialcb;
var owncharset;
var numpw;
var length;
var specialcharbox;

const charset_std = "abcdefghijklmnopqrstuvwxyz";
const charset_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charset_numbers = "123456789";
const charset_special = "!@#$%^&*()-+";

while (true) {
    test();
}

function generatePassword() {
    length = $("#pwlength").val();
    numpw = $("#numberofpw").val();
    uppercb = $("#uppercase:checked").length > 0;
    numberscb = $("#numbers:checked").length > 0;
    specialcb = $("#specialchars:checked").length > 0;
    specialcharbox = $("#specialcharsetcheckbox:checked").length > 0;

    let retVal = "";
    let arr = [];
    let z = 0

    charset = charset_std;

    switch (uppercb) {
        case true:
            charset = charset + charset_upper;
            break;
        case false:
            break;
    }

    switch (numberscb) {
        case true:
            charset = charset + charset_numbers;
            break;

        case false:
            break;
    }

    switch (specialcb) {
        case true:
            charset = charset + charset_special;
            break;
        case false:
            break;
    }

    switch (specialcharbox) {
        case true:
            charset = $("#specialcharset").val();
            document.getElementById("uppercase").setAttribute("checked", false);
            break;
        case false:
        break;
    }

    if (numpw > 50 || length > 100) {
        numpw = 50;
    } else {

        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        } 
    
        $("#output").append(retVal);
        $("#output").append("<br>");
    }
}

function export_pw() {

    let text = $("#output").html();

    let filename = "passwords";
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".html");
}

function exec() {

    length = $("#pwlength").val();
    numpw = $("#numberofpw").val();

    if (length == "" || numpw == "") {
        alert("Bitte alle Felder ausfüllen.");
        $("#output").html("");
    }

    $("#output").html("");

    for (let i = 0; i < numpw; i++) {  
        generatePassword();
    }
}
//This Function was called Test for... testing purposes, however whenever i rename it, it gets broken - so it will keep the Name "Test"
function test() {

    specialcharbox = $("#specialcharsetcheckbox:checked").length > 0;

    if (specialcharbox) {
        document.getElementById("specialcharset").removeAttribute("hidden");
        document.getElementById("checkboxes-02").setAttribute("hidden", true);
    } else {
        document.getElementById("specialcharset").setAttribute("hidden", true);
        document.getElementById("checkboxes-02").removeAttribute("hidden");
    }
}