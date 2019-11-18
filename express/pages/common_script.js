window.addEventListener('scroll', function (event) {
    console.log(document.body.scrollTop);
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
        var topBar = document.getElementById("topbar");
        topBar.style.position = "fixed";
        topbar.style.background = "#fff";
        topBar.style.width = "100%";
        topBar.style.marginTop = "-150px";
        topBar.style.boxShadow = "5px 5px 25px 1px #888";
        document.getElementById("topnav").style.marginBottom = "20px";
    } else {
        var topBar = document.getElementById("topbar");
        topBar.style.position = "relative";
        topbar.style.background = "#fff";
        topBar.style.width = "100%";
        topBar.style.marginTop = "25px";
        topBar.style.boxShadow = "0px 0px 0px 0px #888";
        document.getElementById("topnav").style.marginBottom = "80px";
    }
});

window.onload = function () {



    document.getElementById("home").addEventListener('click', function (ev) {
        window.open("home", "_self");
    });
    var signedIn = getCookie("signedIn");


    if (signedIn.startsWith("true")) {
        document.getElementById("signin").innerHTML = "Sign Out";

        this.console.log(signedIn);
        document.getElementById("signin").addEventListener('click', function (ev) {
            setCookie("signedIn", "false");
            alert("You have been signed out successfully!");
            document.location.reload();
        });
    } else {
        document.getElementById("signin").innerHTML = "Sign In";
        document.getElementById("signin").addEventListener('click', function (ev) {
            window.open("login", "_self");
        });
    }

    $('[data-toggle="popover"]').popover();

    documentReady();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}