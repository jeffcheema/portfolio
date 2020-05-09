var path = window.location.hash;
var path = path.replace("#!/", "");
console.log(path);
var route = function(s, callback) {
    if (callback === undefined) {
        window.location.hash = "#!/" + s;
    } else {
        t = window.location.hash;
        t = t.replace("#!/", "")
        if (s === t) {

            callback();
        } else {}
    }
}

var pg = document.querySelectorAll(".page")




function s(a, title) {

    var pg = document.querySelectorAll(".page")
    console.log("fade out")
    $(".page").fadeOut(0);
    var pg = document.querySelectorAll(".page")
    $(".page:eq(" + a + ")").fadeIn(800);

    current = a;
    console.log(a);
}
startroutes = function() {
    route("home", function() {
        s(0, "Jeff Cheema");
        $(".selected").removeClass("selected");
        $(".item:eq(0)").addClass("selected")
    });
    route("/", function() {
        s(0, "Jeff Cheema");
        $(".selected").removeClass("selected");
        $(".item:eq(0)").addClass("selected");
    });
    route("", function() {
        s(0, "Jeff Cheema");
        $(".selected").removeClass("selected");
        $(".item:eq(0)").addClass("selected")
    });
    route("aboutme", function() {
        s(1, 'About Me');
        $(".selected").removeClass("selected");
        $(".item:eq(1)").addClass("selected")
    });
    route("resume", function() {
        s(2, 'Resume');
        $(".selected").removeClass("selected");
        $(".item:eq(2)").addClass("selected")
    });
    route("projects", function() {
        s(3, 'Projects');
        $(".selected").removeClass("selected");
        $(".item:eq(3)").addClass("selected")
    });
    route("clients", function() {
        s(4, "Clients");
        $(".selected").removeClass("selected");
        $(".item:eq(4)").addClass("selected")

    });
    route("experience", function() {
        s(5, "Work Experience");
        $(".selected").removeClass("selected");
        $(".item:eq(4)").addClass("selected")

    });
    route("contact", function() {
        s(6, "Contact Me");
        $(".selected").removeClass("selected");
        $(".item:eq(5)").addClass("selected")
    });
    route("github", function() {
        window.location = "https://github.com/jeffcheema"
    });
};

startroutes();
window.onhashchange = startroutes;
getURLquery = function() {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");

            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);

            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;

            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }
    // const academy = getURLquery().academy == "true"
    // if (academy) {
    //     document.querySelector("#projects_3").style.display = "inline-flex";
    //     document.querySelector("#experience_5").style.display = "inline-flex";
    // } else {
    //     document.querySelector("#projects_3").style.display = "none";
    //     document.querySelector("#experience_5").style.display = "none";

// }
var check = function(i) {
    if (i == undefined || i == "" || i == "null") {
        return true;
    }
    return false;
}

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
document.querySelector("#submit").addEventListener("click", () => {
    var name = document.querySelector("#formName").value;
    var contact = document.querySelector("#formContact").value;
    var message = document.querySelector("#formMessage").value;
    var response = document.querySelector("#response")
    if (check(name) || check(contact) || check(message)) {
        response.style.color = "red";

        $("#response").fadeOut(0);
        document.querySelector("#response").innerHTML = "Please ensure all fields are filled correctly";
        $("#response").fadeIn(400);

        return false;
    }
    if (validateEmail(contact) == false) {
        response.style.color = "red";

        $("#response").fadeOut(0);
        document.querySelector("#response").innerHTML = "Please enter a valid email.";
        $("#response").fadeIn(400);

        return false;
    }
    var endpoint = atob("aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvNzA4NzQ1MDM1MzYxMDI2MTQ5L3ZWcDNKa3ZwT2duazVBSTg4d1ZKMEtDMERGdVlqbTNMSTdKTk1oTmxCblBUaXh6V0xlTWk0Z2RyTEZmVTd3eEgxQmFa")
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 204) {
            response.style.color = "green";

            $("#response").fadeOut(0);
            document.querySelector("#response").innerHTML = "Form submitted! I get back to you as soon as possible";
            document.querySelector("#formName").value = "";
            document.querySelector("#formContact").value = "";
            document.querySelector("#formMessage").value = "";
            $("#response").fadeIn(400);

        }
        if (this.status == 400) {
            response.style.color = "red";

            $("#response").fadeOut(0);
            document.querySelector("#response").innerHTML = "An unkown error has occured";
            $("#response").fadeIn(400);
        }
    };
    request.open("POST", endpoint);
    request.setRequestHeader('Content-type', 'application/json');
    var myEmbed = {
        author: {
            name: "Contact Form"
        },
        title: "Contact Form",
        fields: [{
                name: "Name",
                value: name
            },
            {
                name: "Contact",
                value: contact
            },
            {
                name: "Message",
                value: message
            },
        ]
    }
    var params = {
        username: "My Webhook Name",
        avatar_url: "",
        content: "<@146811110673088512>",
        embeds: [myEmbed]

    }
    request.send(JSON.stringify(params));

})