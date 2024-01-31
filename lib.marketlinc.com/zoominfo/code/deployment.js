function loadLiftAI() {
    var e = document.createElement("script");
    e.type = "text/javascript", e.src = "https://lib.marketlinc.com/zoominfo/code/snippet.js?viewId=" + client_view_id, e.id = "vs_snippet_script_id", document.getElementsByTagName("head")[0].appendChild(e)
}

function ML_getUrlParameter(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
        t = n.exec(location.search);
    return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}

function ML_getClientId() {
    try {
        var e = ga.create("UA-12845882-1", "auto", "ML_tracker", {
            transport: "beacon"
        })
    } catch (e) {}
    if (void 0 !== e) return e.get("clientId");
    try {
        var n = "_ga",
            t = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")),
            i = t ? decodeURIComponent(t[1]) : void 0,
            o = i.split("."),
            c = o[2] + "." + o[3];
        if (null !== c | void 0 !== c | "" !== c) return c;
        console.log("ERROR! Can't get clientId.")
    } catch (e) {}
}
if (-1 == document.location.href.indexOf("login")) {
    var client_view_id = "44223219";
    try {
        loadLiftAI()
    } catch (e) {}
    var ML_getCookie = function(e) {
            for (var n = e + "=", t = decodeURIComponent(document.cookie), i = t.split(";"), o = 0; o < i.length; o++) {
                for (var c = i[o];
                    " " == c.charAt(0);) c = c.substring(1);
                if (0 == c.indexOf(n)) return c.substring(n.length, c.length)
            }
            return ""
        },
        ML_setCookie = function(e, n, t) {
            var i = new Date;
            i.setTime(i.getTime() + 24 * t * 60 * 60 * 1e3);
            var o = "expires=" + i.toUTCString();
            document.cookie = e + "=" + n + ";domain=.zoominfo.com;" + o + ";path=/"
        },
        ml_ga_load_count = 0,
        ml_ga_load_Interval = setInterval(function() {
            if ("ga" in window || ml_ga_load_count > 8) {
                clearInterval(ml_ga_load_Interval);
                try {
                    setTimeout(function() {
                        window.ml_tracker = ga.create("UA-12845882-1", "auto", "ml_tracker", {
                            transport: "beacon"
                        });
                        var e = ML_getCookie("vs_conv_ai"),
                            n = parseInt(e.split("-")[1]),
                            t = "";
                        t = n > 60 ? "High Intent" : n > 30 && n <= 60 ? "Mid Intent" : "Low Intent";
                        var i = ML_getCookie("vs_vid");
                        ml_tracker.set("dimension83", e), ml_tracker.set("dimension82", i), ml_tracker.send("event", "Lift AI Score", t, e, {
                            nonInteraction: !0
                        }), ml_tracker.send("event", "Lift AI VID", i, {
                            nonInteraction: !0
                        })
                    }, 3e3)
                } catch (e) {}
                window.insent || (window.insent = {}), window.insent.startConversation = function(e) {
                    window.scoring.tracking.pageEvents({
                        event: "CONVERSATION_STARTED",
                        ga_cl_id: ML_getClientId()
                    })
                }, window.insent.emailCapture = function(e) {
                    window.scoring.tracking.pageEvents({
                        event: "EMAIL_CAPTURED",
                        ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL"
                    })
                }, window.insent.phoneNumberCapture = function(e) {
                    window.scoring.tracking.pageEvents({
                        event: "PHONE_NUMBER_CAPTURED",
                        ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL"
                    })
                }, window.insent.buttonClicked = function(e) {
                    window.scoring.tracking.pageEvents({
                        event: "BUTTON_CLICKED",
                        ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL"
                    })
                }, window.insent.greetingMessageClosed = function(e) {
                    window.scoring.tracking.pageEvents({
                        event: "GREETING_MESSAGE_CLOSED",
                        ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL"
                    })
                };
                try {
                    var e = document.querySelector("#fc-expand > div.ExpandForm_submit_button_container__GDTxo > input[type=submit]");
                    e.addEventListener("click", function() {
                        window.scoring.tracking.pageEvents({
                            event: "BUSINESS_EMAIL_SUBMITTED",
                            ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL",
                            client_url: document.location.href
                        })
                    });
                    document.querySelector("#form > div.GeneralForm_submit_button_container__DVcto > input[type=submit]");
                    e.addEventListener("click", function() {
                        window.scoring.tracking.pageEvents({
                            event: "FREE_TRIAL",
                            ga_cl_id: "undefined" != ML_getClientId() ? ML_getClientId() : "NOTAVBL",
                            client_url: document.location.href
                        })
                    })
                } catch (e) {}
            }
            ml_ga_load_count++
        }, 1e3)
}