var webAddress = location.hostname;
var UrlPri = webAddress.match(/^dev/) ? "dev-" : (webAddress.match(/^stg/)) ? "stg-" : "";
var UrlPri2 = webAddress.match(/^dev/) ? "stg-" : (webAddress.match(/^stg/)) ? "stg-" : "";
var UrlPri1 = webAddress.match(/^dev/) ? "stg-" : (webAddress.match(/^stg/)) ? "stg-" : "";
var loginCSSElement = document.createElement("link");
loginCSSElement.rel = "stylesheet";
loginCSSElement.href = "//" + UrlPri + "utils.imimg.com/header/css/imloginv1-v43.css";
loginCSSElement.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(loginCSSElement);
if (typeof (cimjsv) === "undefined") {
    cimjsv = new Object()
}
cimjsv["//utils.imimg.com/header/js/.foreign_login/imlogin.js?v="] = 26;
var modid = "MY";
var modid1 = "MY";
var iso_by_ip = "IN";
var updateUsing = "";
var gaFormIdentify;
var step = 1;
var country_nm = "";
var newUser = "";
var cookieDelete = "";
var country_ip = "";
var iploc_country_name = "";
var textStatus = "";
var errorThrown = "";
var globalVariable = {
    example_attribute: ""
};
var _gaq = _gaq || [];
var ispns = "";
var dis_ckies = "";
isWrongCityEntered = 0;
redirectURL = document.URL;
otpPlusOTPOnCallCount = 0;
LoginwithOTPcount = 0;
verifytype = 0;
if (typeof (glmodid) != "undefined") {
    modid = glmodid
}
var dropdownHtml = "";

var getPopCookie = function (param) {
    var loginRelCookie = document.cookie;
    loginRelCookie = loginRelCookie.split('; ');
    var pop_mthd = '';
    loginRelCookie = loginRelCookie.map(function(value){
        var localValue = value.split('=');
        var key = localValue[0], localValue = localValue[1];
        if (key == 'pop_mthd') {
            localValue = decodeURIComponentSafe(localValue);
            localValue = localValue.split('|');
            pop_mthd = localValue;
        }
    })
    if(pop_mthd === ''){
        return undefined;
    }
    pop_mthd = pop_mthd.map((value) => value.split('='))
    var localPop = {};
    for (let a in pop_mthd) {
        localPop[pop_mthd[a][0]] = pop_mthd[a][1]
    }
    return localPop[param];
}

var setPopCookie = function (key, val) {
    var pop_mthd = { FL: getPopCookie('FL') || '0', DTy: getPopCookie('DTy') || '1' };
    if(key && val){
        pop_mthd[key] = val;
    }
    var pop_mthd_str = '';
    for (let a of Object.keys(pop_mthd)) {
        pop_mthd_str += a + '=' + pop_mthd[a] + '|';
    }
    pop_mthd_str = pop_mthd_str.slice(0, pop_mthd_str.length - 1);
    pop_mthd_str = encodeURIComponent(pop_mthd_str);
    var dt = new Date();
    dt.setMonth(dt.getMonth() + 1);
    dt = dt.toUTCString();
    document.cookie = 'pop_mthd=' + pop_mthd_str + ';domain=.indiamart.com;expires=' + dt+';path=/;';
    return;
}

var gaTrackingInitialize = function () {
    if (window.imgtm) {
        window.loginGATrack = function (eventName, eventValue, eventLabel, eventAction) {
            imgtm.push({
                "event": eventName,
                "eventCategory": "Login",
                "eventAction": eventAction,
                "eventLabel": eventLabel,
                "eventValue": eventValue
            });
        }

        return;
    } else {
        gaTrackingInitialize();
    }
}
gaTrackingInitialize();

var timerClass = function(evTimer, evResend){
    const duration = 30;
    
    this.timerStartState = false;
    this.timerDiv = evTimer;
    this.resendDiv  = evResend;
    this.timerValue = "00:30";

    this.setTimerValue = function(value){
        this.timerValue = value;
        return;
    }
    this.clearTimer = function(){
        resendDiv.disabled = false;
        timerDiv.style["visibility"] = "hidden";
        return ;
    }

    this.decreaseTimer = function(){
        let localTimer = this.timerValue.split(':');
        localTimer = localTimer[1];
        localTimer = parseInt(localTimer) -1;
        localTimer = '00:' + Math.floor(localTimer/10).toString()+ Math.floor(localTimer%10).toString();
        
        this.setTimerValue(localTimer);
        timerDiv.textContent = this.timerValue;

        return;
    }


    this.startTimer = function(){
        if(!this.timerStartState){
            resendDiv.diabled = true;
            timerDiv.style["visibility"] = "visible";
        }
        if(this.timerValue === "00:00"){
            this.clearTimer();
        }else{
            setTimeout(function(){
                this.decreaseTimer();
                this.startTimer();
            }.bind(this),1000);
        }
    }

    return this;
} // variable for timer fucntions

$(document).ready(function () {
    var iploc = readCookie("iploc");
    var pdpReact = typeof pdpReactPage !== "undefined" ? pdpReactPage : 0;
    if (iploc != "undefined" && iploc != "") {
        iso_by_ip = getparamVal(iploc, "gcniso");
        country_ip = getparamVal(iploc, "gip");
        country_nm = getparamVal(iploc, "gcnnm");
        iploc_country_name = country_nm;
        if (iso_by_ip == "UK") {
            iso_by_ip = "GB"
        }
    } else {
        var ULTAparams = {
            "modid": modid,
            "token": "imobile@15061981"
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            data: ULTAparams,
            url: "https://geoip.imimg.com/api/location",
            crossDomain: true,
            success: function (data) {
                if (data.Response.Code == 200) {
                    iso_by_ip = data.Response.Data.geoip_countryiso;
                    country_ip = data.Response.Data.geoip_ipaddress;
                    country_nm = data.Response.Data.geoip_countryname;
                    var Response = data.Response.Data;
                    var str = JSON.stringify(Response);
                    str = str.replace(/geoip_countryiso/g, "gcniso");
                    str = str.replace(/geoip_countryname/g, "gcnnm");
                    str = str.replace(/geoip_cityname/g, "gctnm");
                    str = str.replace(/geoip_cityid/g, "gctid");
                    str = str.replace(/geoip_accuracy/g, "gacrcy");
                    str = str.replace(/geoip_ipaddress/g, "gip");
                    str = str.replace(/geoip_statename/g, "gstnm");
                    object = JSON.parse(str);
                    iploc_country_name = country_nm;
                    if (typeof userDataCookie != "undefined") {
                        var iploc_cook = new userDataCookie();
                        iploc_cook.set(object, "iploc")
                    } else {
                        setTimeout(function () {
                            var iploc_cook = new userDataCookie();
                            iploc_cook.set(object, "iploc")
                        }, 1000)
                    }
                    if (iso_by_ip == "UK") {
                        iso_by_ip = "GB"
                    }
                } else {
                    country_ip = "35.184.248.141";
                    iso_by_ip = "IN";
                    country_nm = "India"
                }
            }
        })
    }
    var val_imesh = readCookie("ImeshVisitor");
    redirectURL = decodeURIComponentSafe(document.URL, 1);
    if (redirectURL.indexOf("autoLoginconflict") != -1 && val_imesh != "") {
        signIn("", "", "", "", "", "")
    }
    var glmod = (typeof (glmodid) != "undefined") ? glmodid : "DIR";
    if ((typeof InstallTrigger == "undefined") && (glmod != "ETO" && glmod != "TDR" && glmod != "MY") && (typeof (window.performance.navigation) != "undefined") && (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") < 0)) {
        var ref = document.referrer;
        var homeurl = webAddress.match(/dev/) ? "https://dev.indiamart.com/new/gamma/?back=1" : webAddress.match(/stg/) ? "https://stg.indiamart.com/new/gamma/?back=1" : "https://www.indiamart.com/?back=1";
        var myurl = webAddress.match(/dev/) ? "https://dev-my.indiamart.com/?back=1" : webAddress.match(/stg/) ? "https://stg-my.indiamart.com/?back=1" : "https://my.indiamart.com/?back=1";
        var utype = (val_imesh != "") ? getparamVal(val_imesh, "utyp") : "";
        var url = (utype == "F" || utype == "N") ? myurl : homeurl;
        var trck = (url == myurl) ? "Clicks-MY" : "Clicks-Home";
        var loc = window.location.href;
        if (cookiesEnabled() && typeof (sessionStorage) != "undefined") {
            var bflg = sessionStorage.getItem("bckurl")
        }
        if (loc.match(/proddetail/)) {
            if (ref.match(/dir.indiamart.com/)) {
                url = ref
            }
        }
        if (((ref == "") || (ref.split("/")[2].slice(ref.split("/")[2].indexOf(".") + 1) != "indiamart.com") || (history.length == 1) || (bflg == loc) || (ref == loc)) && (loc != myurl) && (loc != homeurl)) {
            if (history.length == 1) {
                sessionStorage.setItem("bckurl", loc);
                sessionStorage.setItem("f", "0")
            }
            if (cookiesEnabled() && typeof (sessionStorage) != "undefined") {
                var flg = sessionStorage.getItem("f")
            }
            if (((window.performance.navigation.type == 0) || (window.performance.navigation.type == 255)) && (flg == undefined || flg != 1) && location.href.indexOf("#") == -1) {
                history.pushState("", "", window.location.href);
                if (cookiesEnabled() && typeof (sessionStorage) != "undefined") {
                    sessionStorage.setItem("f", "1")
                }
            }
            window.onpopstate = function () {
                if (history.state != "" && location.href.indexOf("#") == -1 && pdpReact === 0 && location.href.indexOf("search4.mp") === -1 && location.href.indexOf("search.mp") === -1) {
                    sessionStorage.setItem("f", "0"),
                        sessionStorage.setItem("bckurl", "0"),
                        window.location.replace(url)
                }
            }
        }
    }
});
function callVerOnReady() {
    if (typeof (jQuery) === "function") {
        pop_imesh = readCookie("ImeshVisitor");
        pop_xnhist = readCookie("xnHist");
        var ipv = getparamVal(pop_xnhist, "ipv");
        var fpv = getparamVal(pop_xnhist, "fpv");
        var glUserId = getparamVal(pop_imesh, "glid");
        var name = getparamVal(pop_imesh, "mb1");
        if (typeof (glmodid) != "undefined") {
            modid = glmodid
        }
        var email = getparamVal(pop_imesh, "em");
        var city = getparamVal(pop_imesh, "ct");
        var ph_country = getparamVal(pop_imesh, "phcc");
        var cn_iso = getparamVal(pop_imesh, "iso");
        if (typeof (pop_imesh) !== "undefined" && pop_imesh != "") {
            if (modid != "MY" && modid != "FCP") {
                if (((ipv == 3) || (ipv == 5))) {
                    if (name != "" && getparamVal(pop_imesh, "phcc") == "91" && getparamVal(pop_imesh, "uv") != "V") {
                        showmobverifyScreen(glUserId, modid, name, ph_country, "121", cn_iso, "2", "4", "VER")
                    }
                }
                if (modid == "DIR" || modid == "PRODDTL") {
                    var iss = readCookie("im_iss");
                    if (typeof iss != "undefined" && iss != "") {
                        if (((fpv == 3) || (fpv == 5))) {
                            if (email != "" && getparamVal(pop_imesh, "uv") == "V" && getparamVal(pop_imesh, "ev") != "V") {
                                send_otp(glUserId, modid, email, ph_country, "109", cn_iso, "2", "4", "EMAILVER")
                            }
                        }
                    } else {
                        if (typeof iss == "undefined" || iss == "") {
                            if (((ipv == 3) || (ipv == 5))) {
                                if (email != "" && getparamVal(pop_imesh, "uv") == "V" && getparamVal(pop_imesh, "ev") != "V") {
                                    send_otp(glUserId, modid, email, ph_country, "109", cn_iso, "2", "4", "EMAILVER")
                                }
                            }
                        }
                    }
                } else {
                    if (((fpv == 3) || (fpv == 5))) {
                        if (email != "" && getparamVal(pop_imesh, "uv") == "V" && getparamVal(pop_imesh, "ev") != "V") {
                            send_otp(glUserId, modid, email, ph_country, "109", cn_iso, "2", "4", "EMAILVER")
                        }
                    }
                }
            } else {
                if (redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                    if (getparamVal(pop_imesh, "uv") != "V" && cn_iso == "IN") {
                        showmobverifyScreen(glUserId, modid, name, ph_country, "121", cn_iso, "2", "4", "VER")
                    }
                }
            }
        }
    } else {
        setTimeout(function () {
            callVerOnReady()
        }, 1000)
    }
}
if (document.readyState !== "complete" && typeof jQuery === "function") {
    $(document).ready(function () {
        setTimeout(function () {
            callVerOnReady()
        }, 1000)
    })
} else {
    setTimeout(function () {
        callVerOnReady()
    }, 1000)
}
function decodeURIComponentSafe(uri, mod) {
    var out = new String(), arr, i = 0, l, x;
    typeof mod === "undefined" ? mod = 0 : 0;
    arr = uri.split(/(%(?:d0|d1)%.{2})/);
    for (l = arr.length; i < l; i++) {
        try {
            x = decodeURIComponent(arr[i])
        } catch (e) {
            x = mod ? arr[i].replace(/%(?!\d+)/g, "%25") : arr[i]
        }
        out += x
    }
    return out
}
$(function () {
    $(document).unbind("keypress").bind("keypress", function (e) {
        if (e.keyCode == 27) {
            if ($("#step1").val() == 1) {
                gATracking("step1_close")
            } else {
                if ($("#step1").val() == 2) {
                    gATracking("VerificationFormClose")
                }
            }
            closeMe1()
        }
        if (e.keyCode == 13 && ((document.getElementById("logintoidentify")) || (document.getElementById("check_verify1")))) {
            if ($("#identifiedForm").length) {
                if ($("#countryIso").val() == "IN") {
                    $("#logintoidentify").click()
                } else {
                    if (document.getElementById("myCheckbox")) {
                        if (document.getElementById("myCheckbox").checked) {
                            $("#logintoidentify").click()
                        } else {
                            var mob_box = document.getElementById("mbl_idn");
                            var err_div = document.getElementById("err-msg-mbl-ctl");
                            invalidmsg_ctl(mob_box, "Please accept the terms and privacy policy.", err_div)
                        }
                    }
                }
            } else {
                if ($("#iso").val() == "IN") {
                    if (dis_ckies == "") {
                        $("#logintoidentify").click()
                    }
                } else {
                    if (document.getElementById("myCheckbox")) {
                        if (document.getElementById("myCheckbox").checked) {
                            if (dis_ckies == "") {
                                $("#logintoidentify").click()
                            }
                        } else {
                            invalidMsgLogin("Please accept the terms and privacy policy.")
                        }
                    }
                }
            }
            $("#check_verify1").click();
            return false
        }
    })
});
$(function () {
    if (window.history && window.history.pushState) {
        $(window).on("popstate", function () {
            if (typeof window.perWidget != "undefined") {
                syncDataCheck()
            }
        })
    }
});
function callImloginv1(dirsearch, msg) {
    if (typeof (isImloginV1Open) !== "undefined" && isImloginV1Open == 1) {
        if (dirsearch == "R") {
            fullLoginForm("", "", "", "R")
        } else {
            fullLoginForm("", "", "", "B")
        }
    } else {
        $.ajaxSetup({
            cache: !0
        });
        $.getScript("//" + UrlPri + "utils.imimg.com/header/js/.foreign/imloginv1.js?v=26", function () {
            if (dirsearch == "R") {
                fullLoginForm("", "", "", "R")
            } else {
                fullLoginForm("", "", "", "B")
            }
        })
    }
}
function invalidMsgLogin(err_msg) {
    $("#mobile").css("border-color", "red");
    $("#mobile_err").html(err_msg);
    $("#mobile_err").css("display", "block")
}
function callidentifiedJ() {
    $("html").css("overflow", "auto");
    $("#IdentifiedPopUpHTML").html("");
    return true
}
function closeMe1(sfFlag) {
    $(".as_arrow").css("display", "block");
    $("#mob_val").remove();
    var iso = $("#iso").val();
    var gemail = $("#g_sub_head").text();
    var LWG_call = $("#LWG").val();
    var err_msg_val = $("#mobile_err").text();
    if (err_msg_val == "") {
        if (typeof LWG_call != undefined && LWG_call == 1) {
            if (iso != "IN") {
                if (typeof gemail != undefined && gemail != "") {
                    callForeignSubmit(iso);
                    return
                }
            }
        }
    }
    LoginwithOTPcount = 0;
    getLoginStringv1();
    var xread = readCookie("xnHist");
    var ipv_val = (xread != "") ? getparamVal(xread, "ipv") : "";
    if (sfFlag == "IDEN" && dispflag == 1) {
        _gaq.push(["_trackEvent", "Identification_login_popup", "impression", "Verification_close_" + modid]);
        if (modid == "DIR" || modid == "PRODDTL" || modid == "IMHOME") {
            var val_imesh = readCookie("ImeshVisitor");
            var em = (val_imesh != "") ? getparamVal(val_imesh, "em") : "";
            if (em == "") {
                globalVariable = {
                    example_attribute: "100"
                }
            }
        }
        callidentifiedJ()
    } else {
        if (sfFlag == "IDEN") {
            _gaq.push(["_trackEvent", "Identification_login_popup", "impression", "Verification_close_" + modid]);
            globalVariable = {
                example_attribute: "1"
            };
            if ((dispflag == 1) && (modid == "DIR" || modid == "PRODDTL" || modid == "IMHOME")) {
                globalVariable = {
                    example_attribute: "100"
                }
            }
            callidentifiedJ()
        } else {
            if (sfFlag == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                _gaq.push(["_trackEvent", "Identification_login_popup", "impression", "Verification_close_buyermy_" + modid]);
                $("#IdentifiedPopUpHTML").html("");
                return true
            } else {
                if (sfFlag == "VER") {
                    if (ipv_val == 4 || ipv_val == 5) {
                        _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_close_5th_" + modid])
                    } else {
                        _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_close_3rd_" + modid])
                    }
                    $("#IdentifiedPopUpHTML").html("");
                    return true
                } else {
                    if (sfFlag == "EMAILVER") {
                        if (ipv_val == 5 || ipv_val == 4) {
                            _gaq.push(["_trackEvent", "Verification_popup", "impression", "EMAIL_Verification_close_5th_" + modid])
                        } else {
                            _gaq.push(["_trackEvent", "Verification_popup", "impression", "EMAIL_Verification_close_3rd_" + modid])
                        }
                        $("#IdentifiedPopUpHTML").html("");
                        return true
                    } else {
                        if (sfFlag == "HDR") {
                            _gaq.push(["_trackEvent", "IM_Global_Header", "impression", "Verification_close_" + modid]);
                            window.location.reload();
                            return true
                        } else {
                            if (sfFlag == "BUYERMY") {
                                _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Buyermy_Verification_MYcontact_close_" + modid]);
                                $("#IdentifiedPopUpHTML").html("");
                                return true
                            } else {
                                if (sfFlag == "BUYERMY_NAV") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Buyermy_Verification_MYNav_close_" + modid]);
                                    $("#IdentifiedPopUpHTML").html("");
                                    return true
                                } else {
                                    if (sfFlag == "SELLER_DASHBOARD") {
                                        $("#IdentifiedPopUpHTML").html("");
                                        return true
                                    } else {
                                        if (sfFlag == "HDR_STRP") {
                                            $("#IdentifiedPopUpHTML").html("");
                                            return true
                                        } else {
                                            if (sfFlag == "SCROLLVER" || sfFlag == "SCROLLVER1") {
                                                if (sfFlag == "SCROLLVER1") {
                                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Verification_scroll_close_" + modid])
                                                }
                                                if (sfFlag == "SCROLLVER") {
                                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Verification_scrollver_close_" + modid])
                                                }
                                                if (typeof (sessionStorage) != "undefined") {
                                                    sessionStorage.setItem("scrollverclosed", "1")
                                                }
                                                $("#IdentifiedPopUpHTML").hide();
                                                scrollverclosed = 1;
                                                $("#IdentifiedPopUpHTML").html("");
                                                return true
                                            } else {
                                                gATracking("VerificationFormClose")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (sfFlag == "FCP" || sfFlag == "si" || sfFlag == "MDC" || sfFlag == "PNS") {
        $("#sign_in").html("");
        return true
    }
    var urlmatch = document.URL;
    if (((step == 2 || step == 3) && (modid == "MY" || modid == "SELLERMY" || modid == "SELLERS" || modid == "PAYWIM" || modid == "IMHOME" || urlmatch == "https://trade.indiamart.com/"))) {
        window.location.reload()
    } else {
        if (redirectURL.indexOf("autoLoginconflict") != -1) {
            _gaq.push(["_trackEvent", "SignIn_popup_ConflictCases", "impression", "Conflict_popup_close_" + modid1]);
            var indexOfAutoLoginConflictParam = redirectURL.indexOf("autologin");
            urlWithOutConflictParam = redirectURL.substring(0, indexOfAutoLoginConflictParam - 1);
            history.pushState(null, null, urlWithOutConflictParam);
            $("#sign_in").html("")
        } else {
            $("#sign_in").html("")
        }
    }
}
function redirect_SB() {
    var url = webAddress.match(/my/) ? "MY" : webAddress.match(/seller/) ? "SELLER" : "";
    if (url == "MY") {
        window.location = "//" + UrlPri + "my.indiamart.com";
        _gaq.push(["_trackEvent", "Redirection_on_signout", "Redirection_to_MY", modid, 0, true])
    } else {
        if (url == "SELLER") {
            window.location = "//" + UrlPri + "seller.indiamart.com";
            _gaq.push(["_trackEvent", "Redirection_on_signout", "Redirection_to_SELLER", modid, 0, true])
        } else {
            window.location.reload()
        }
    }
}
function readCookie(name) {
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(offset, end))
        }
    }
    return ""
}
function getparamVal(cookieStr, key) {
    if (cookieStr > "") {
        var val = "|" + cookieStr + "|";
        var pattern = new RegExp(".*?\\|" + key + "=([^|]*).*|.*");
        return val.replace(pattern, "$1")
    } else {
        return ""
    }
}
function validmsg() {
    $("#mobile").css("border-color", "#999");
    $("#mobile_err").html("");
    $("#mobile_err").css("display", "none")
}
function signIn(a, b, c, lgtemp, dirsearch, dirmsg) {
    var iploc = readCookie("iploc");
    if (iploc != "undefined" && iploc != "") {
        iso_by_ip = getparamVal(iploc, "gcniso");
        country_ip = getparamVal(iploc, "gip");
        country_nm = getparamVal(iploc, "gcnnm");
        iploc_country_name = country_nm;
        if (iso_by_ip == "UK") {
            iso_by_ip = "GB"
        }
    }
    redirectURL = decodeURIComponentSafe(document.URL, 1);
    if (redirectURL.indexOf("autoLoginconflict") != -1) {
        var indexOfRequestType = redirectURL.indexOf("requestType");
        var typeOfRequest = redirectURL.substring(indexOfRequestType + 12, indexOfRequestType + 13);
        if ((typeOfRequest == "I" && lgtemp != "B") || (typeOfRequest == "F" && lgtemp != "B")) {
            register("s", lgtemp, dirsearch, dirmsg, a)
        } else {
            callImloginv1()
        }
    } else {
        cookieDelete = lgtemp;
        if (lgtemp == "B") {
            callImloginv1()
        } else {
            register("s", lgtemp, dirsearch, dirmsg, a)
        }
    }
}
function register(pi, lgtemp, dirsearch, dirmsg, a) {
    var meta = document.createElement("link");
    meta.href = "https://fonts.googleapis.com/css?family=Roboto";
    meta.rel = "stylesheet";
    meta.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(meta);
    var meta2 = document.createElement("script");
    meta2.src = "https://apis.google.com/js/platform.js";
    document.getElementsByTagName("head")[0].appendChild(meta2);
    var popUp = "Join IndiaMART for Free"
        , toSignIN = "Already a member:"
        , popUpSignIn = "Sign In";
    var submitButton = "Create Your Account";
    if (typeof userDataCookie != "undefined") {
        // GA tracking for Login Display Impression addition
        loginGATrack('Desktop_Login_impression');
        var usrDatCook = new userDataCookie().get();
        var mb = usrDatCook.mb1;
        if (pi == "s") {
            gaFormIdentify = "signIn";
            updateUsing = "Sign IN Form Desktop";
            popUp = "Sign In";
            if (lgtemp == "C") {
                gATracking("step1_display_notme");
                var fname = usrDatCook.fn;
                var ename = usrDatCook.em;
                if (typeof (mb) == "undefined") {
                    mb = ""
                }
                if (typeof (fname) == "undefined") {
                    fname = ""
                }
                if (typeof (ename) == "undefined") {
                    ename = ""
                }
                if (fname == "") {
                    popUp = "Not " + mb + "? Sign In as a different user"
                } else {
                    popUp = "Not " + fname + "? Sign In as a different user"
                }
                if (fname == "" && mb == "") {
                    popUp = "Not " + ename + "? Sign In as a different user"
                }
            } else {
                if (dirsearch == "si" || dirsearch == "FCP" || dirsearch == "MDC" || dirsearch == "PNS" || dirsearch == "PRODDTL") {
                    gATracking("step1_display_" + dirsearch + "");
                    popUp = dirmsg
                }
            }
            submitButton = "Submit";
            toSignIN = "";
            popUpSignIn = ""
        } else {
            gaFormIdentify = "joinFree";
            updateUsing = "Join Free Form Desktop"
        }
        redirectURL = decodeURIComponentSafe(document.URL, 1);
        if (redirectURL.indexOf("autoLoginconflict") != -1) {
            var indexOfUserName = redirectURL.indexOf("username");
            var indexOfISO = redirectURL.indexOf("ISO");
            var indexOfname = redirectURL.indexOf("&fn");
            var indexOfRequestType = redirectURL.indexOf("requestType");
            var indexofscreen = redirectURL.indexOf("&screen");
            var typeOfRequest = redirectURL.substring(indexOfRequestType + 12, indexOfRequestType + 13);
            name1 = redirectURL.substring(indexOfname + 4, indexOfISO - 1);
            userNameFromParam = redirectURL.substring(indexOfUserName + 9, indexOfname - 1);
            screen = redirectURL.substring(indexofscreen + 8, indexOfRequestType - 1);
            if (typeOfRequest == "I") {
                isoFromParam = redirectURL.substring(indexOfISO + 4, indexofscreen - 0);
                iso_by_ip = isoFromParam
            } else {
                var indexOfGlid = redirectURL.indexOf("kp");
                isoFromParam = redirectURL.substring(indexOfISO + 4, indexOfGlid - 1);
                iso_by_ip = isoFromParam
            }
            var name = usrDatCook.fn;
            if (name == "") {
                popUp = "Not " + mb + " ? Sign In as " + name1 + ""
            } else {
                popUp = "Not " + name + " ? Sign In as " + name1 + ""
            }
            modid1 = "vc=" + screen + "||imesh_user=" + usrDatCook.glid + "||mail_user=" + userNameFromParam + ""
        }
        if (lgtemp != "C" && dirsearch != "si" && dirsearch != "PNS" && dirsearch != "FCP" && dirsearch != "MDC" && dirsearch != "PRODDTL") {
            gATracking("step1_display")
        }
        if (redirectURL.indexOf("autoLoginconflict") != -1 && isoFromParam == "IN") {
            _gaq.push(["_trackEvent", "SignIn_popup_ConflictCases", "Conflict_popup_display(IN)", modid1, 0, true])
        }
        if (redirectURL.indexOf("autoLoginconflict") != -1 && isoFromParam != "IN") {
            _gaq.push(["_trackEvent", "SignIn_popup_ConflictCases", "Conflict_popup_display(FN)", modid1, 0, true])
        }
        var lwg_html_btn = "";
        if (!cookiesEnabled()) {
            gATracking("CookiesNotEnabled");
            dis_ckies = '<div id="cookiesetmsg" style="padding: 8px;border: 1.5px solid #f4c608;border-radius: 5px;margin-bottom: 15px;"><img id="alertImage" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDk3LjQ3MiA0OTcuNDcyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTcuNDcyIDQ5Ny40NzI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMjUgMCAwIC0xLjI1IDAgNDUpIj4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZDQzREOyIgZD0iTTI0LjM3NC0zNTcuODU3Yy0yMC45NTgsMC0zMC4xOTcsMTUuMjIzLTIwLjU0OCwzMy44MjZMMTgxLjQyMSwxNy45MjgNCgkJCQljOS42NDgsMTguNjAzLDI1LjQ2MywxOC42MDMsMzUuMTIzLDBMMzk0LjE0LTMyNC4wMzFjOS42NzEtMTguNjAzLDAuNDIxLTMzLjgyNi0yMC41NDgtMzMuODI2SDI0LjM3NHoiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBkPSJNMTczLjYwNS04MC45MjJjMCwxNC44MTQsMTAuOTM0LDIzLjk4NCwyNS4zOTUsMjMuOTg0YzE0LjEyLDAsMjUuNDA3LTkuNTEyLDI1LjQwNy0yMy45ODQNCgkJCQlWLTIxNi43NWMwLTE0LjQ2MS0xMS4yODctMjMuOTg0LTI1LjQwNy0yMy45ODRjLTE0LjQ2MSwwLTI1LjM5NSw5LjE4Mi0yNS4zOTUsMjMuOTg0Vi04MC45MjJ6IE0xNzEuNDg5LTI4OS4wNTYNCgkJCQljMCwxNS4xNjcsMTIuMzQ1LDI3LjUxMSwyNy41MTEsMjcuNTExYzE1LjE2NywwLDI3LjUyMy0xMi4zNDUsMjcuNTIzLTI3LjUxMWMwLTE1LjE3OC0xMi4zNTYtMjcuNTIzLTI3LjUyMy0yNy41MjMNCgkJCQlDMTgzLjgzNC0zMTYuNTc5LDE3MS40ODktMzA0LjIzNCwxNzEuNDg5LTI4OS4wNTYiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" style="width:  28px;height:  28px;margin-right: 7px;    margin-top: -4px;"><span style=" color:  grey;font-weight:  800;">Please Enable Cookies to Continue</span></div>'
        }
        lwg_html_btn = '<div id="lwg_wrpr" onclick = "loginGATrack(\'Desktop_Login_GoogleSubmit\')"><p style="margin-top:-10px;font-size:14px;font-weight:600;">OR</p><div id="gSignInWrapper" style="margin: 10px 0px 15px 0px;text-align:center;"> <div id="signinBtn" class="customGPlusSignIn"> <span class="Gicon"> </span> <span class="buttonText"> Continue with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
        var registerHTML = '<style>.dropdown dd ul{top:32px!important;}.dropdown dt {height: 20px!important;}</style><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="im-pop_s"> <!-- Popup div starts here --><div id="popupContact_s"> <!-- contact us form --><div id="form_s" ><a href="javascript:" onclick="closeMe1();gATracking(\'step1_close\');"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><div class="one_s"><div class="c3"></div><div id="form_bxx"><div class="step-1"><h2 class="f1_s" id="ghead" style="margin-bottom:10px;">' + popUp + '</h2><p style="padding-right:25px;text-align:right;margin-top:3px;" class="f12_s">' + toSignIN + '&nbsp;<a style="font-weight:bold; color:#ffffff;" href="javascript:" onclick="signIn();">' + popUpSignIn + '</a></p><span id="g_sub_head" style="padding-left:10px;font-size: 15px;font-weight: 600;display:none;">You are just one step away from verified suppliers</span></div><div><div class="frm-1"><div class="frm_right-1 f1_s" id="gsubhead"><form name="userregistration" id="reg-form"><a name="etop"></a><input type="hidden" value="' + modid + '" name="modid"><input type="hidden" value="' + updateUsing + '" name="updatedusing" id="updatedusing"><i class="enbgg nvTg" id="gemal_icn" style="display:none;"></i><div class="labeljn_s c3_s" id="gemail" style="margin-bottom: 20px;margin-left: 20px;font-size: 14px;font-weight: bold;display:none;"></div><div class="labeljn_s c3_s" id="g_sub1_head" style="margin-left: 5px;font-size: 14px;font-weight: bold;display:none;margin-top:0px;"></div><div id="g_sub2_head" class="labeljn_s c3_s" style="margin-bottom: 10px;font-size: 14px;display: none;width:390px;line-height:1.8;margin-top:0px;"></div>' + dis_ckies + '<div class="labeljn_s c3_s" id = "formLabel">Mobile Number</div><div class="f1 cont_drpdown" id=""><dl class="dropdown cont_mob" id="country-dropdown" > </dl></div><div id="frmGglCntryChusr"></div><input type="text" value="" maxlength="60" placeholder="Enter Your Mobile Number" class="fw_fn-1 un2_s" id="mobile" onkeypress="return isNumberKey1(event)" name="mobile" style="background-color:#fff;outline: none;box-sizing: content-box;"><span id="mobile_err" class="em-1" style="display:none"></span><div id ="trm1" style="line-height: 21px;font-size: 14px;"><label><input type="checkbox" id="myCheckbox" style="vertical-align:-2px;" onchange="activateButton1(this)"> I agree to the&nbsp;</label><a href="https://www.indiamart.com/terms-of-use.html" target="_blank">terms </a> and <a href="https://www.indiamart.com/privacy-policy.html" target="_blank" ">privacy policy</a></div><input type="hidden" value="" name="country" id="country"><input type="hidden" value="" name="iso" id="iso"><input type="hidden" value="" id="country_name" name="country_name"><input type="hidden" value="1" id="step" name="step"><input type="hidden" value="" id="ph_country" name="ph_country"><input type="hidden" value="1" id="step1" name="step1"><input type="hidden" value="' + dirsearch + '" id="srch1" name="srch1"><input type="hidden" value="" id="multi_mob_numbers_lwg"><div class="mt10_s"><p><button tabindex="5" style="padding: 8px 0px; width: 260px" onclick="validateForm_userName1(\'' + dirsearch + '\');loginGATrack(\'Desktop_Login_Submit\')" type="button" class="continue_s" name="start" id="logintoidentify">' + submitButton + "</button></p>" + lwg_html_btn + '<span id="loading_s" style="display:none; text-align:left !important;padding-top:24px;font-size:12px;top:10px;"><img style="text-align:left;" src="//' + UrlPri + 'utils.imimg.com/header/gifs/indicator.gif" alt="loading" height="16" width="16"><b style="color:#000;">&nbsp;Signing In...</b></span></div></form></div></div></div></div></div></div> </div>  <!-- Popup div ends here --> </div><div id="loadingmessage" style="display:none;width: 100%;height: 100%;position:fixed;z-index: 1001;text-align: center;"><img src="//' + UrlPri + 'utils.imimg.com/header/imgs/loader1.gif"/></div>';
        $("#sign_in").html(registerHTML);
        if (redirectURL.indexOf("autoLoginconflict") != -1) {
            $("#lwg_wrpr").hide()
        }
        $("#overlay_s").css("display", "block");
        document.getElementById("mobile").focus();
        if (iso_by_ip == "UK") {
            iso_by_ip = "GB"
        }
        if (typeof (Suggester) != "undefined" && Suggester != "") {
            var isd_suggestor = new Suggester({
                "type": "isd",
                "element": "country-dropdown",
                "onSelect": selectCountry,
                fields: "cname,iso,icon_order",
                displayFields: "cname,value",
                autocompleteClass: "isd_class",
                displaySeparator: "  +",
                "defaultValue": iso_by_ip
            })
        } else {
            $.getScript("//" + UrlPri + "utils.imimg.com/suggest/js/suggest.js", function () {
                var isd_suggestor = new Suggester({
                    "type": "isd",
                    "element": "country-dropdown",
                    "onSelect": selectCountry,
                    fields: "cname,iso,icon_order",
                    displayFields: "cname,value",
                    autocompleteClass: "isd_class",
                    displaySeparator: "  +",
                    "defaultValue": iso_by_ip
                })
            })
        }
        clc_cookies();
        var clientID = "";
        if (UrlPri == "dev-" || UrlPri == "stg-") {
            clientID = "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com"
        } else {
            clientID = "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com"
        }
        meta2.onload = function () {
            gapi.load("auth2", function () {
                auth2 = gapi.auth2.init({
                    client_id: clientID
                });
                googleSignin(document.getElementById("signinBtn"))
            })
        }
    } else {
        setTimeout(function () {
            register(pi, lgtemp, dirsearch, dirmsg, a)
        }, 50)
    }
}
function googleSignin(element) {
    auth2.attachClickHandler(element, {}, function (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        gusrname = googleUser.getBasicProfile().getName();
        gusremail = googleUser.getBasicProfile().getEmail();
        if (gusremail != "") {
            checkEmailExistOrNot(gusremail, id_token)
        }
        if (gusrname != "") { }
        if (gusremail != "") {
            _gaq.push(["_trackEvent", "Login_With_Google", "Step1", modid, 0, 0]);
            // $("#formLabel").html('Mobile Number <span style="color:red;">*</span>');
            // if (($("#iso").val() != "IN" && $("#step").val() == "1")) {
            //     $("#mobile").attr("placeholder", "Enter your Mobile Number");
            //     $("#formLabel").html('Mobile Number <span style="color:blue;font-size:11px;">(Optional)</span>')
            // }
            $("#lwg_wrpr").hide();
            $("#logintoidentify").css("margin", "15px 0 0px");
            $("#LWG").val(1)
        }
    }, function (error) { })
}
function cookiesEnabled() {
    var cookiesEnabled = (navigator.cookieEnabled) ? true : false;
    return cookiesEnabled
}
function verifyEmailViaLWG(email, glid) {
    var iso = $("#iso").val();
    var ph_country = $("#ph_country").val();
    var mid = glmodid;
    if (typeof mid == undefined || mid == "") {
        mid = "DIR"
    }
    var screen_name = "Email Verification via login with google - desktop";
    var url = "//" + UrlPri2 + "utils.imimg.com/header/js/login.php";
    var verparams = {
        "token": "imobile@15061981",
        "format": "JSON",
        "glusr_id": glid,
        "glusrid": glid,
        "em": email,
        "mid": mid,
        "countIP": country_ip,
        "IPcount": ph_country,
        "lwg_screen": screen_name,
        "service_code": 1
    };
    $.ajax({
        url: url,
        data: verparams,
        type: "POST",
        crossDomain: true,
        success: function (resultJson) {
            setEmailCookieLogin(email, 1)
        }
    })
}
function setEmailCookieLogin(email, marked) {
    var imeshval = readCookie("ImeshVisitor");
    var b = "";
    var offset;
    var offset1;
    var end = email.indexOf("@");
    var len = end - 2;
    var str = "";
    for (var i = 0; i <= end; i++) {
        str += "*"
    }
    var ends = email.substring(end);
    email = email.charAt(0) + str + ends;
    if (imeshval.length > 0) {
        if (offset = imeshval.indexOf("em"),
            -1 != offset) {
            b = strToObj(imeshval);
            b.em = email;
            imesh_obj.set(b);
            imeshval = readCookie("ImeshVisitor")
        }
    }
    if (marked == 1) {
        if (offset1 = imeshval.indexOf("ev")) {
            b = strToObj(imeshval);
            b.ev = "V";
            imesh_obj.set(b)
        }
    }
}
function checkEmailExistOrNot(gusremail, id_token) {
    var iso = $("#iso").val();
    var ph_country = $("#ph_country").val();
    var updated = $("#updatedusing").val();
    if (!$("#iso").val()) {
        $("#iso").val(iso_by_ip)
    }
    $("#logintoidentify").css("display", "none");
    $("#loading_s").css("display", "block");
    var url = "//" + UrlPri2 + "utils.imimg.com/header/js/login.php";
    var params_request = {
        "username": gusremail,
        "iso": iso,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": iso,
        "ip": country_ip,
        "screen_name": updateUsing,
        "id_token": id_token,
        "gusername": gusrname,
        "guseremail": gusremail,
        "ph_country": ph_country,
        "service_code": 7
    };
    $.ajax({
        url: url,
        type: "POST",
        data: params_request,
        jsonpCallback: "create_callback",
        crossDomain: true,
        success: function (jsonResult) {
            var jsonResult = $.parseJSON(jsonResult);
            if (jsonResult["code"] == 200) {
                var access = jsonResult.access;
                if (access != undefined && access == "2") {
                    document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.reload();
                    return
                }
                var msg = jsonResult["msg"];
                var fndb = jsonResult["fn"];
                if (msg == "Unique Email found in Primary Email") {
                    var glid = jsonResult["GLID"];
                    $("#gemail").html(gusremail);
                    $("#gemal_icn").css({
                        "display": "inline-block",
                        "background-position": "-72px -9px"
                    });
                    $("#sign_in").html("");
                    $("#loadingmessage").hide();
                    var data1 = jsonResult.DataCookie;
                    verifyEmailViaLWG(gusremail, glid);
                    var loginSet = jsonResult.LoginCookie;
                    var tokenSet = jsonResult.im_iss;
                    imesh_obj.set(data1, "ImeshVisitor");
                    // v4iilex_obj.set(loginSet, "v4iilex");
                    im_iss_obj.set(tokenSet, "im_iss");
                    getLoginStringv1();
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    if (modid == "MY") {
                        window.location.reload()
                    }
                    return
                }
            } else {
                if (jsonResult["code"] == "204") {
                    var err_msg = jsonResult["msg"];
                    if (jsonResult["message"] == "ISO MisMatch") {
                        invalidMsgLogin(err_msg);
                        $("#country-dropdown").css("pointer-events", "auto")
                    } else {
                        if (jsonResult["message"].match(/suspicious/g)) {
                            var msg = jsonResult["message"];
                            invalidMsgLogin(err_msg)
                        } else {
                            if (jsonResult["message"] == "We have multiple account linked with this Email ID") {
                                var msg = jsonResult["message"];
                                $("#gemail").html(gusremail);
                                $("#gemal_icn").hide();
                                $("#gemail").hide();
                                $("#ghead").html("Sign in to continue as " + gusrname);
                                $("#g_sub_head").text(gusremail);
                                $("#g_sub_head").show();
                                $("#g_sub2_head").text(err_msg);
                                $("#g_sub1_head").css("display", "inline-block");
                                $("#g_sub2_head").css("display", "inline-block");
                                var mobile_numbers = jsonResult["data_num"];
                                $("#multi_mob_numbers_lwg").val(mobile_numbers);
                                $("#country-dropdown").css("pointer-events", "none")
                            } else {
                                if (jsonResult["message"] == "No Email found in Primary Email") {
                                    $("#ghead").html("Sign in to continue as " + gusrname);
                                    $("#g_sub_head").text(gusremail);
                                    $("#g_sub_head").show();
                                    $("#country-dropdown").css("pointer-events", "none")
                                } else {
                                    if (jsonResult["message"] == "Invalid Token ID") {
                                        invalidMsgLogin("Invalid token request")
                                    } else {
                                        invalidMsgLogin(err_msg)
                                    }
                                }
                            }
                        }
                    }
                }
                $("#logintoidentify").css("display", "inline-block");
                $("#loading_s").css("display", "none")
            }
        }
    })
}
function identifyViaLoginWithGoogle(username, multi_flag) {
    _gaq.push(["_trackEvent", "Login_With_Google", "Step2", modid, 0, 0]);
    var iso = $("#iso").val();
    var ph_country = $("#ph_country").val();
    var updated = $("#updatedusing").val();
    if (!$("#iso").val()) {
        $("#iso").val(iso_by_ip)
    }
    $("#logintoidentify").css("display", "none");
    $("#loading_s").css("display", "block");
    var url = "//" + UrlPri2 + "utils.imimg.com/header/js/login.php";
    var params_request = {
        "username": username,
        "iso": iso,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": iso,
        "ip": country_ip,
        "ph_country": ph_country,
        "screen_name": updateUsing,
        "gusername": gusrname,
        "gemail": gusremail,
        "service_code": 6
    };
    var mobVal = $("#mobile").val();
    if (typeof mobVal != undefined && mobVal != "") {
        if (($("#iso").val() == "IN" && $("#step").val() == "1") || ($("#iso").val() != "IN" && $("#step").val() == "2")) {
            params_request["username"] = mobVal
        } else {
            if ($("#iso").val() != "IN") {
                params_request["username"] = username;
                params_request["mobile"] = mobVal
            }
        }
    }
    $.ajax({
        url: url,
        type: "POST",
        data: params_request,
        jsonpCallback: "create_callback",
        crossDomain: true,
        success: function (jsonResult) {
            var jsonResult = $.parseJSON(jsonResult);
            if (jsonResult["code"] == 200) {
                var msg = jsonResult["msg"];
                var resultSet = jsonResult.DataCookie;
                var access = jsonResult.access;
                var glid = jsonResult.DataCookie.glid;
                if (access != undefined && access == "2") {
                    document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.reload();
                    return
                }
                if ((resultSet != undefined) && (resultSet != "")) {
                    document.cookie = "ImeshVisitor" + "=;expires=;domain=.indiamart.com;path=/;";
                    imesh_obj.set(resultSet, "ImeshVisitor");
                    getLoginStringv1();
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    var imesh = new userDataCookie().get();
                    var glUserId = imesh.glid;
                    var name = imesh.fn;
                    var email = imesh.em;
                    var city = imesh.ct;
                    iso = imesh.iso;
                    ph_country = imesh.phcc;
                    if (multi_flag == 1) {
                        verifyEmailViaLWG(gusremail, glid);
                        if (name != "" && email != "") {
                            var flag = 4
                        } else {
                            var flag = 3
                        }
                        if (ph_country == "91" && imesh.uv != "V" && iso == "IN") {
                            if (typeof isBLFormOpen != "undefined") {
                                callToIdentifiedQ()
                            }
                            if (document.URL == "https://" + UrlPri + "seller.indiamart.com/sbl") {
                                fullLoginForm("", "", "", "B")
                            } else {
                                truecaller_Ver(glUserId, modid, username, ph_country, "121", iso, "2", flag);
                                $("#loading_s").hide();
                                getLoginStringv1();
                                return true
                            }
                        }
                    } else {
                        if (msg == "New User created via User creation service") {
                            verifyEmailViaLWG(gusremail, glid);
                            if (name != "" && email != "") {
                                var flag = 4
                            } else {
                                var flag = 3
                            }
                            if (ph_country == "91" && imesh.uv != "V" && iso == "IN") {
                                if (typeof isBLFormOpen != "undefined") {
                                    callToIdentifiedQ()
                                }
                                if (document.URL == "https://" + UrlPri + "seller.indiamart.com/sbl") {
                                    fullLoginForm("", "", "", "B")
                                } else {
                                    truecaller_Ver(glUserId, modid, username, ph_country, "121", iso, "2", flag);
                                    $("#loading_s").hide();
                                    getLoginStringv1();
                                    return true
                                }
                            }
                        } else {
                            if (msg == "Mobile Number found in Primary Mobile") {
                                verifyEmailViaLWG(gusremail, glid);
                                if (name != "" && email != "") {
                                    var flag = 4
                                } else {
                                    var flag = 3
                                }
                                if (ph_country == "91" && imesh.uv != "V" && iso == "IN") {
                                    if (typeof isBLFormOpen != "undefined") {
                                        callToIdentifiedQ()
                                    }
                                    if (document.URL == "https://" + UrlPri + "seller.indiamart.com/sbl") {
                                        fullLoginForm("", "", "", "B")
                                    } else {
                                        truecaller_Ver(glUserId, modid, username, ph_country, "121", iso, "2", flag);
                                        $("#loading_s").hide();
                                        getLoginStringv1();
                                        return true
                                    }
                                }
                            }
                        }
                    }
                    $("#loading_s").hide();
                    $("#sign_in").html("");
                    getLoginStringv1();
                    if (modid == "MY") {
                        window.location.reload()
                    }
                    return true
                }
            } else {
                if (jsonResult["code"] == "204") {
                    var err_msg = jsonResult["msg"];
                    invalidMsgLogin(err_msg)
                }
                $("#logintoidentify").css("display", "inline-block");
                $("#loading_s").css("display", "none")
            }
        }
    })
}
function callForeignSubmit(iso) {
    if (iso != "IN") {
        var frn_eml = $("#g_sub_head").text();
        if (typeof frn_eml != undefined && frn_eml != "") {
            identifyViaLoginWithGoogle(frn_eml)
        }
    }
}
function activateButton1(element) {
    if (dis_ckies == "") {
        if (element.checked) {
            document.getElementById("logintoidentify").disabled = false;
            $("#logintoidentify").css("background-color", "#00a699");
            $("#mobile_err").html("");
            $("#mobile_err").css("display", "none")
        } else {
            document.getElementById("logintoidentify").disabled = true;
            $("#logintoidentify").css("background-color", "#b2b2b2")
        }
    } else {
        document.getElementById("logintoidentify").disabled = true;
        $("#logintoidentify").css("background-color", "#b2b2b2")
    }
}
var fieldFlag = 1;
function isNumberKey1(evt) {
    if (fieldFlag == 1) {
        var charCode = (evt.which);
        if (charCode == 118 && evt.ctrlKey === true) {
            return true
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false
        }
        return true
    }
    return true
}
function selectCountry(event, ob) {
    var LWG_call = $("#LWG").val();
    $("#mobile").css("border-color", "");
    $("#trm1").css("display", "none");
    $("#mobile_err").html("");
    $("#country-dropdown dt a span").attr("style", "background-position:0px -" + ob.data.icon_order * 11 + "px");
    $("#country-dropdown dt span.value").html("+" + ob.value);
    $("#country_name").val(ob.data.cname);
    $("#iso").val(ob.data.iso);
    $("#ph_country").val(ob.value);
    if ($("#iso").val() != "IN") {
        document.getElementById("lwg_wrpr").style.display = "block"
        setPopCookie('FL', JSON.stringify(1));// 0 for indian
    } else {
        setPopCookie('FL', JSON.stringify(0));// 0 for indian
        document.getElementById("lwg_wrpr").style.display = "none" // login with google for forein enable
    }
    if (($("#iso").val() != "IN" && $("#step").val() == "1") || ($("#iso").val() == "IN" && $("#step").val() == "2")) {
        fieldFlag = 2;
        var iso = $("#iso").val();
        $("#trm1").css("display", "inline-block");
        document.getElementById("logintoidentify").disabled = true;
        $("#logintoidentify").css("background-color", "#b2b2b2");
        $("#myCheckbox").attr("checked", false);
        $("#mobile").attr("maxlength", "100");
        $("#country-dropdown dt span.value").css("display", "inline-block");
        $("#country-dropdown dt a").css("margin-top", "10px");
        // if (typeof LWG_call != undefined && LWG_call == 1) {
        //     $("#mobile").attr("placeholder", "Enter your Mobile Number or Email"); // if login with google fails use mobile number
        //     $("#formLabel").html('Mobile Number or Email ID ')// omiting mobile number optional 
        // } else {
        // commenting redundant code
        $("#mobile").attr("placeholder", "Enter your Email or Mobile");
        $("#formLabel").html("Email or Mobile")
        // }
        if ($("#step").val() != "2") { // what is #step?
            $("#mobile").css({
                "padding-left": "119px",
                "width": "318px"
            })
        }
        $("#mobile").val("")
    } else {
        fieldFlag = 1;
        document.getElementById("logintoidentify").disabled = false;
        $("#logintoidentify").css("background-color", "#00a699");
        $("#trm1").css("display", "none");
        $("#mobile").attr("maxlength", "10");
        $("#country-dropdown dt span.value").css("display", "inline-block");
        $("#formLabel").html("Mobile Number");
        $("#mobile").css({
            "padding-left": "119px",
            "width": "318px"
        }).attr("placeholder", "Enter Your Mobile Number");
        if ($("#step").val() != "2") {
            if (typeof LWG_call != undefined && LWG_call == 1) {
                $("#formLabel").html('Mobile Number <span style="color:red;">*</span>')
            }
        }
        $("#mobile").val("")
    }
    clc_cookies()
}
function validateForm_userName1(dirsearch) {
    var LWG_call = $("#LWG").val();
    var mobVal = $("#mobile").val();
    if (!$("#iso").val()) {
        $("#iso").val(iso_by_ip)
    }
    if (($("#iso").val() == "IN" && $("#step").val() == "1") || ($("#iso").val() != "IN" && $("#step").val() == "2")) {
        setPopCookie('FL', JSON.stringify(0));// 0 for indian

        $("#mobile").attr('is_F', '0');
        if ((mobVal == "") || (mobVal.length == 0)) {
            invalidMsgLogin("Please enter mobile number.");
            return false
        } else {
            mobVal = mobVal.replace(/\-|\s|\[|\]|\(|\)/ig, "");
            mobVal = mobVal.replace(/\+/g, "");
            var cnt = (mobVal.match(/[0-9]/g) || []).length;
            if (cnt > 10) {
                mobVal = mobVal.replace(/^((91){0,1}0{0,})/g, "")
            }
            if ($("#iso").val() != "IN" && $("#step").val() == "2") {
                if (mobVal.length > 16 || mobVal.length < 7) {
                    invalidMsgLogin("Please enter valid number.");
                    return false
                }
                validmsg();
                return true
            } else {
                if (!(/^[16789]/.test(mobVal))) {
                    invalidMsgLogin("Mobile Number should start with 6,7,8 or 9");
                    return false
                } else {
                    if (mobVal.length != 10) {
                        invalidMsgLogin("Please enter 10 digit mobile number.");
                        return false
                    } else {
                        validmsg();
                        if (dirsearch == "PNS") {
                            gATrackingAb("step1_submit")
                        }
                        if (typeof LWG_call != undefined && LWG_call == 1) {
                            // var multiple_mob_numbers = $("#multi_mob_numbers_lwg").val();
                            // if (typeof multiple_mob_numbers != undefined && multiple_mob_numbers != "") {
                            //     var multi_mobs = multiple_mob_numbers.split(",");
                            //     if (jQuery.inArray(mobVal, multi_mobs) == -1) {
                            //         identifyViaLoginWithGoogle(mobVal, 0)
                            //     } else {
                            //         identifyViaLoginWithGoogle(mobVal, 1)
                            //     }
                            // }
                            //  else {
                            //     identifyViaLoginWithGoogle(mobVal)
                            // }
                            userDetailsAutoFetchforidentify(mobVal, dirsearch)
                        } else {
                            userDetailsAutoFetchforidentify(mobVal, dirsearch)
                        }
                        return true
                    }
                }
            }
        }
    } else {
        setPopCookie('FL', JSON.stringify(1)); // 1 for foreign

        if (typeof LWG_call != undefined && LWG_call == 1) {
            if ($("#g_sub_head").text() === $("#mobile").val())
                mobVal = $("#g_sub_head").text()
            else
                mobVal = $("#mobile").val()
        }
        mobVal = mobVal.replace(/^\s+|\s+$/gm, "");

        if (isValidDataType($("#mobile"), mobVal, $("#iso").val())) {
            userDetailsAutoFetchforidentify(mobVal, dirsearch);
            return true;
        } else {
            return false;
        }
        // if ((mobVal == "") || (mobVal.length == 0)) {
        //     invalidMsgLogin("Please enter your Email ID");
        //     return false
        // } else {
        //     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mobVal))) {
        //         invalidMsgLogin("Invalid Email ID. Please enter the correct Email ID.");
        //         return false
        //     } else {
        //         validmsg();
        //         if (dirsearch == "PNS") {
        //             gATrackingAb("step1_submit")
        //         }
        //         if ($("#step").val() != "2") {
        //             // if (typeof LWG_call != undefined && LWG_call == 1) {
        //             //     identifyViaLoginWithGoogle(mobVal)
        //             // } else {
        //                 userDetailsAutoFetchforidentify(mobVal, dirsearch)
        //             // }
        //         }

        // }
    }
}
function userDetailsAutoFetchforidentify(username, dirsearch) {
    redirectURL = decodeURIComponentSafe(document.URL, 1);
    var iso = $("#iso").val();
    var iploc = readCookie("iploc");
    var lat_val = (iploc != "") ? getparamVal(iploc, "GeoLoc_lt") : "";
    var long_val = (iploc != "") ? getparamVal(iploc, "lg") : "";
    if (iploc != "undefined" && iploc != "") {
        iso_by_ip = getparamVal(iploc, "gcniso");
        country_ip = getparamVal(iploc, "gip");
        country_nm = getparamVal(iploc, "gcnnm");
        if (iso_by_ip == "UK") {
            iso_by_ip = "GB"
        }
    } else {
        var ULTAparams = {
            "modid": modid,
            "token": "imobile@15061981"
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            data: ULTAparams,
            url: "https://" + UrlPri + "geoip.imimg.com/api/location",
            crossDomain: true,
            success: function (data) {
                if (data.Response.Code == 200) {
                    iso_by_ip = data.Response.Data.geoip_countryiso;
                    country_ip = data.Response.Data.geoip_ipaddress;
                    country_nm = data.Response.Data.geoip_countryname;
                    if (iso_by_ip == "UK") {
                        iso_by_ip = "GB"
                    }
                } else {
                    country_ip = "35.184.248.141";
                    iso_by_ip = "IN";
                    country_nm = "India"
                }
            }
        })
    }
    var ph_country = $("#ph_country").val();
    var updated = $("#updatedusing").val();
    if (!$("#iso").val()) {
        $("#iso").val(iso_by_ip)
    }
    $("#logintoidentify").css("display", "none");
    $("#lwg_wrpr").css("display", "none");
    $("#loading_s").css("display", "block");
    var url = "//" + UrlPri2 + "utils.imimg.com/header/js/evaluate.php";
    var params_request = {
        "username": username,
        "iso": iso,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": iso,
        "ip": country_ip,
        "screen_name": updateUsing,
        "Lat_val": lat_val,
        "Long_val": long_val,
        "country": country_nm,
        "service_code": 5
    };

    $.ajax({
        url: url,
        type: "POST",
        data: params_request,
        jsonpCallback: "create_callback",
        crossDomain: true,
        success: function (jsonResult) {
            var jsonResult = $.parseJSON(jsonResult);
            imeshUserData = jsonResult.DataCookie;
            var attributeId = 121;
            isRestricted = 0;
            if (imeshUserData && imeshUserData.usts && imeshUserData.usts == 2) {
                isRestricted = 1
            }
            if (jsonResult != undefined && jsonResult["code"] == "200") {
                loginGATrack('Desktop_Login_identify_success', iso, jsonResult["code"], iso == 'IN' ? 'mobile' : 'email');// addition of mobil check for foreign users remaining

                var msg = jsonResult["msg"];
                if (msg == "New User created via User creation service") {
                    newUser = 1
                }
                var resultSet = jsonResult.DataCookie;
                var access = jsonResult.access;
                if (access != undefined && access == "2") {
                    document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.reload();
                    return
                }
                if ((resultSet != undefined) && (resultSet != "")) {
                    document.cookie = "ImeshVisitor" + "=;expires=;domain=.indiamart.com;path=/;";
                    imesh_obj.set(resultSet, "ImeshVisitor");
                    if (window.location.href.includes('seller')) {
                        window.location.reload();
                    }
                    if (modid && modid != undefined && modid != "MY") {
                        window.location.reload();
                    }
                }
            } else {
                if (jsonResult["code"] == "204") {
                    loginGATrack('Desktop_Login_identify_success', iso, jsonResult["code"], iso == 'IN' ? 'mobile' : 'email');// addition of mobil check for foreign users remaining

                    if (isRestricted) {
                        $("#mob_val").remove();
                        $("body").append('<input type="hidden" id="mob_val">');
                        document.getElementById("mob_val").value = $("#mobile").val();
                        $("body").append('<input type="hidden" id="iso_restricted">');
                        document.getElementById("iso_restricted").value = $("#iso").val();
                        $("body").append('<input type="hidden" id="phcc_restricted">');
                        document.getElementById("phcc_restricted").value = $(".value").html();
                        dropdownHtml = $("#country-dropdown").html();
                        callImloginv1("R")
                    } else {
                        var err_msg = jsonResult["msg"];
                        invalidMsgLogin(err_msg)
                    }
                }
                $("#logintoidentify").css("display", "inline-block");
                $("#loading_s").css("display", "none");
                return
            }
            if (modid == "PRODDTL") {
                if (parent.document.getElementById("buttonid") && parent.document.getElementById("buttonid").value != "") {
                    var btnid = parent.document.getElementById("buttonid").value;
                    if (btnid) {
                        $("#" + btnid).click();
                        $("#sign_in").html("");
                        parent.document.getElementById("buttonid").value = "";
                        getLoginStringv1();
                        return true
                    }
                }
            }
            var imesh = new userDataCookie().get();
            var glUserId = imesh.glid;
            var name = imesh.fn;
            var email = imesh.em;
            var city = imesh.ct;
            iso = imesh.iso;
            ph_country = imesh.phcc;
            if (document.getElementById("myCheckbox") && document.getElementById("myCheckbox").checked) {
                var params = {
                    "r": "Newreqform/TermNCondition",
                    "s_glusrid": glUserId,
                    "s_user_agent": navigator.userAgent,
                    "modid": modid,
                    "format": "JSON",
                    "s_ip": country_ip,
                    "s_ip_country": country_nm,
                    "s_ip_country_iso": iso_by_ip,
                    "curr_page_url": window.location.href,
                    "reference_text": "Desktop Signin/Joinfree form"
                };
                $.ajax({
                    url: "//" + UrlPri + "apps.imimg.com/index.php?",
                    type: "POST",
                    data: params,
                    crossDomain: true,
                    success: function (jsonResult1) { }
                })
            }
            if (name != "" && email != "") {
                var flag = 4
            } else {
                var flag = 3
            }
            if (newUser == "1") {
                if (ph_country == "91" && iso == "IN") {
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    if (dirsearch == "PNS" || dirsearch == "PRODDTL") {
                        $("#sign_in").html("");
                        return true
                    }
                    if (document.URL == "https://" + UrlPri + "seller.indiamart.com/sbl") {
                        fullLoginForm("", "", "", "B")
                    } else {
                        truecaller_Ver(glUserId, modid, username, ph_country, attributeId, iso, "2", flag)
                    }
                } else {
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    thankyou_popup(modid, flag)
                }
                if (cookieDelete == "C") {
                    document.cookie = "imEqGl" + "=;expires=;domain=.indiamart.com;path=/;"
                }
                if (dirsearch == "FCP" || dirsearch == "MDC" || dirsearch == "PNS" || dirsearch == "si") {
                    gATracking("step1_submit_" + dirsearch + "")
                } else {
                    if (redirectURL.indexOf("autoLoginconflict") != -1) {
                        _gaq.push(["_trackEvent", "SignIn_popup_ConflictCases", "Conflict_popup_submit", modid1, 0, true])
                    } else {
                        gATracking("step1_submit")
                    }
                }
            } else {
                if (imesh == "" || imesh == null) {
                    var resultSet = jsonResult.DataCookie;
                    imesh_obj.set(resultSet, "ImeshVisitor")
                }
                if (ph_country == "91" && imesh.uv != "V" && iso == "IN") {
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    if (document.URL == "https://" + UrlPri + "seller.indiamart.com/sbl") {
                        fullLoginForm("", "", "", "B")
                    } else {
                        truecaller_Ver(glUserId, modid, imesh.mb1, ph_country, attributeId, iso, "2", flag)
                    }
                } else {
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    getLoginStringv1();
                    var urlmatch = document.URL;
                    if ((modid == "MY" || modid == "SELLERMY" || modid == "SELLERS" || modid == "PAYWIM" || modid == "IMHOME" || modid == "ETO") && (redirectURL.indexOf("autoLoginconflict") == -1)) {
                        window.location.reload()
                    } else {
                        if (modid == "DIR") {
                            if (typeof showCntNumber !== "undefined" && $.isFunction(showCntNumber)) {
                                showCntNumber()
                            }
                            closeMe1();
                            gATracking("step1_close");
                            return true
                        } else {
                            $("#sign_in").html("")
                        }
                    }
                }
                if (cookieDelete == "C") {
                    document.cookie = "imEqGl" + "=;expires=;domain=.indiamart.com;path=/;"
                }
                if (dirsearch == "FCP" || dirsearch == "MDC" || dirsearch == "PNS" || dirsearch == "PRODDTL" || dirsearch == "si") {
                    gATracking("step1_submit_" + dirsearch + "")
                } else {
                    gATracking("step1_submit")
                }
            }
            if (redirectURL.indexOf("autoLoginconflict") != -1) {
                var indexOfAutoLoginConflictParam = redirectURL.indexOf("autologin");
                urlWithOutConflictParam = redirectURL.substring(0, indexOfAutoLoginConflictParam - 1);
                history.pushState(null, document.title, urlWithOutConflictParam);
                if (modid == "MY" || modid == "SELLERMY" || modid == "SELLERS" || modid == "PAYWIM" || modid == "IMHOME" || modid == "ETO") {
                    window.location.reload()
                }
            }
        },
        error: function (message) {
            loginGATrack('Desktop_Login_identify_failure', iso, "", iso == 'IN' ? 'mobile' : 'email');// addition of email check for foreign users remaining

            $("#logintoidentify").css("display", "inline-block");
            $("#loading_s").css("display", "none");
            invalidMsgLogin("Something went wrong. Please try again in sometime!");
            _gaq.push(["_trackEvent", "SignIn_Error", username, modid, 0, true])
        }
    })
}
function thankyou_popup(modid, cDflag, sfFlag, src1) {
    var val_imesh = readCookie("ImeshVisitor");
    var em = (val_imesh != "") ? getparamVal(val_imesh, "em") : "";
    var crossDisplay = 'style="display: block;"';
    var verifyBoxHTML = '<div id="im-pop_s"> <!-- Popup div starts here --><div id="popupContact_s" style="display: block;"><!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" style="min-width: 540px;"><div class="step-1" id="bs_hdng1"><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display: block;"><img src="//dev-utils.imimg.com/header/gifs/3.png" id="close_s"></a><h2 class="f1_s otp-pl18">Verification mail sent</h2></div><div><p class="email-message" style="margin: 19px 0px 20px 14px;">We have sent you a mail on <b> ' + em + " </b> with a verification link.Please click on the link to verify that it belongs to you.</p></div></div><!-- Popup div ends here --></div>  <!-- Popup div ends here --> </div>";
    if (src1 != "HDR_STRP") {
        document.getElementById("popupContact_s").innerHTML = verifyBoxHTML;
        document.getElementById("popupContact_s").style.display = "block"
    } else {
        $("#IdentifiedPopUpHTML").html(verifyBoxHTML);
        $("#overlay_s").css("display", "block");
        $("#IdentifiedPopUpHTML").css({
            "display": "block",
            "position": "fixed",
            "top": "200px",
            "left": "50%",
            "z-index": "1001",
            "margin-left": "-247px"
        })
    }
    setTimeout(function () {
        if (cDflag == 3 || cDflag == 4) {
            closeMe1();
            if (modid == "MY") {
                window.location.reload()
            }
        } else {
            if (modid == "FCP" || sfFlag == "si" || modid == "MDC") {
                if (typeof isBLFormOpen != "undefined") {
                    callToIdentifiedQ()
                }
                $("#sign_in").html("")
            } else {
                window.location = "//" + UrlPri + "my.indiamart.com"
            }
        }
        return true
    }, 5000)
}
function truecaller_Ver(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, resend, cDflag, src1) {
    var imesh = new userDataCookie().get();
    var ph_c = imesh.phcc;
    var mobile = imesh.mb1;
    var src1 = "TRUE";
    var mob = ph_c.concat(mobile);
    showmobverifyScreen(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, "2", cDflag, "HDR")
}
var sendOTPCount = 0;
function send_otp(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, resend, cDflag, src1) {
    LoginwithOTPcount = 0;
    if (resend == 3) {
        showmobverifyform(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, cDflag, "TRUE", "");
        return
    }
    if (!(document.getElementById("otp-message") === null)) {
        document.getElementById("otp-message").innerHTML = "4 digit OTP sent on your mobile <b>+91-" + mobile_num + "</b>"
    }
    if (dispflag == 1 && src1 == "IDEN") {
        document.getElementById("resendMsg").style.display = "block"
    }
    if (src1 == "SCROLLVER1") {
        _gaq.push(["_trackEvent", "Verification_popup", "Verification_scroll_click", modid, 0, true])
    }
    var xread = readCookie("xnHist");
    var ipv_val = (xread != "") ? getparamVal(xread, "ipv") : "";
    $("#verify_error1").html("");
    if (displayVerificationOptions == 1) {
        $("#mwrp").css("display", "none")
    }
    var imesh = new userDataCookie().get();
    var mobNoFromCookie1 = imesh.mb1;
    var glidFromCookie1 = imesh.glid;
    var im_issval;
    var AK;
    var miss_num = "081-8181-8181";
    if (att_id != "109") {
        if (!mobile_num || !mobNoFromCookie1) {
            var gATracking1 = glidFromCookie1 + "_" + modid + "_" + mobile_num + "_" + mobNoFromCookie1;
            _gaq.push(["_trackEvent", gaFormIdentify, "mobileTrackingInSend", gATracking1, 0, true])
        }
    } else {
        im_issval = readCookie("im_iss");
        AK = (im_issval != "") ? getparamVal(im_issval, "t") : ""
    }
    if (mob_cont_code != "91" && phCountry != "IN") {
        return false
    }
    username = imesh.mb1;
    $("#check_verify1").attr("disabled", true);
    $("#check_verify1").css("background-color", "lightgrey");
    var processName = "";
    if (cDflag == 1) {
        processName = "OTP_JoinFreeForm_Desktop";
        updateUsing = "Join Free Form Desktop"
    } else {
        if (src1 == "BUYERMY" || src1 == "BUYERMY_NAV") {
            processName = "OTP_BuyerMYContactProfile_Desktop";
            updateUsing = "BUYER MY CONTACT PROFILE PAGE"
        } else {
            if (src1 == "SELLER_DASHBOARD") {
                processName = "OTP_SellerMY_Desktop";
                updateUsing = "SELLER MY DASHBOARD"
            } else {
                processName = "OTP_SignInForm_Desktop";
                updateUsing = "Sign IN Form Desktop"
            }
        }
    }
    if ((sendOTPCount > 2 && displayVerificationOptions != 1)) {
        $("#re_auth1, #resendMsg, #mwrp").css("display", "none");
        $("#check_verify1").attr("disabled", false);
        $("#verify_error1").html("Please Wait for the OTP");
        $("#check_verify1").css("background-color", "#00a699");
        if (dispflag == 1 && src1 == "IDEN") {
            document.getElementById("resendA").style.display = "none";
            document.getElementById("resendMsg").style.display = "none"
        }
        return false
    }
    if (resend == 2 && redirectURL.indexOf("autoLoginconflict") == -1) {
        showmobverifyform(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, cDflag, src1, miss_num)
    }
    if (resend == "1") {
        if (cDflag == 1) {
            if (src1 == "IDEN") {
                _gaq.push(["_trackEvent", "Identification_login_popup", "impression", "Verification_resend_" + modid])
            } else {
                if (displayVerificationOptions == 1) {
                    gATracking("NewUser_ResendOTP_Clicked_" + (sendOTPCount + 1))
                } else {
                    gATracking("NewUser_ResendOTP")
                }
            }
            document.getElementById("resendMsg").style.display = "none"
        } else {
            if (cDflag == 3 || cDflag == 4) {
                if (src1 == "IDEN") {
                    _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_resend", modid, 0, true])
                } else {
                    if (src1 == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                        _gaq.push(["_trackEvent", "Verification_popup", "Verification_resend_buyermy", modid, 0, true])
                    } else {
                        if (src1 == "VER") {
                            if (ipv_val == "4" || ipv_val == "5") {
                                _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_resend_5th_" + modid])
                            } else {
                                _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_resend_3rd_" + modid])
                            }
                        } else {
                            if (src1 == "EMAILVER") {
                                if (ipv_val == "5" || ipv_val == "4") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_EMAIL_resend_5th_" + modid])
                                } else {
                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_EMAIL_resend_3rd_" + modid])
                                }
                            } else {
                                if (src1 == "SCROLLVER") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_scrollver_resend_" + modid])
                                } else {
                                    if (src1 == "BUYERMY") {
                                        _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Buyermy_Verification_MYcontact_resend_" + modid])
                                    } else {
                                        if (src1 == "HDR") {
                                            _gaq.push(["_trackEvent", "IM_Global_Header", "impression", "Verification_resend_" + modid])
                                        } else {
                                            if (src1 == "HDR_STRP") {
                                                _gaq.push(["_trackEvent", "IM_Header_Strip", "impression", "Verification_resend_" + modid])
                                            } else {
                                                if (src1 == "BUYERMY_NAV") {
                                                    _gaq.push(["_trackEvent", "Verification_popup", "impression", "Verification_popup_Buyermy_Verification_MYNav_resend" + modid])
                                                } else {
                                                    if (displayVerificationOptions == 1) {
                                                        gATracking("ExistingUser_ResendOTP_Clicked_" + (sendOTPCount + 1))
                                                    } else {
                                                        gATracking("ExistingUser_ResendOTP")
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                document.getElementById("resendMsg").style.display = "none"
            }
        }
        if (displayVerificationOptions != 1) {
            document.getElementById("load-send1").style.display = "inline-block"
        }
        $("#re_auth1").css("display", "none");
        document.getElementById("verify_error1").innerHTML = "";
        sendOTPCount++
    }
    var mobContCodeFromCookie1 = imesh.phcc;
    var phCountryFromCookie1 = imesh.iso;
    var emFromCookie1 = imesh.em;
    if (iso_by_ip == "IN" || phCountryFromCookie1 == "IN") {
        mobContCodeFromCookie1 = "91"
    }
    if (country_ip == "") {
        var ULTAparams = {
            "modid": modid,
            "token": "imobile@15061981"
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            data: ULTAparams,
            url: "https://geoip.imimg.com/api/location",
            crossDomain: true,
            success: function (data) {
                if (data.Response.Code == 200) {
                    iso_by_ip = data.Response.Data.geoip_countryiso;
                    country_ip = data.Response.Data.geoip_ipaddress;
                    country_nm = data.Response.Data.geoip_countryname;
                    if (iso_by_ip == "UK") {
                        iso_by_ip = "GB"
                    }
                } else {
                    country_ip = "35.184.248.141";
                    iso_by_ip = "IN";
                    country_nm = "India"
                }
            }
        })
    }
    if (country_ip == "") {
        country_ip = "35.184.248.141"
    }
    if (resend == 1 && src1 == "EMAILVER") {
        params = {
            "token": "imobile@15061981",
            "glusrid": glidFromCookie1,
            "modid": modid,
            "user_mobile_country_code": mobContCodeFromCookie1,
            "flag": "OTPGen",
            "user_ip": country_ip,
            "user_country": phCountryFromCookie1,
            "process": "OTP_EmailVerificationForm_Desktop",
            "user_updatedusing": "Verification Form Desktop",
            "OTPResend": "1",
            "attribute_id": att_id
        };
        send_otp_email(params, resend, emFromCookie1)
    } else {
        if (resend == 1) {
            params = {
                "token": "imobile@15061981",
                "mobile_num": mobNoFromCookie1,
                "glusrid": glidFromCookie1,
                "modid": modid,
                "user_mobile_country_code": mobContCodeFromCookie1,
                "flag": "OTPGen",
                "user_ip": country_ip,
                "user_country": phCountryFromCookie1,
                "process": processName,
                "user_updatedusing": updateUsing,
                "OTPResend": "1"
            }
        } else {
            params = {
                "token": "imobile@15061981",
                "mobile_num": mobNoFromCookie1,
                "glusrid": glidFromCookie1,
                "modid": modid,
                "user_mobile_country_code": mobContCodeFromCookie1,
                "flag": "OTPGen",
                "user_ip": country_ip,
                "user_country": phCountryFromCookie1,
                "process": processName,
                "user_updatedusing": updateUsing
            }
        }
    }
    params['service_code'] = 3;
    if (src1 != "EMAILVER") {
        $.ajax({
            type: "POST",
            url: "//" + UrlPri2 + "utils.imimg.com/header/js/login.php",
            data: params,
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                $("#check_verify1").attr("disabled", false);
                $("#check_verify1").css("background-color", "#00a699");
                var stat = response.Response.Status;
                var message = response.Response.Message;
                var serviceCode = response.Response.Code;
                var vendorErrorResponse = response.Response.VENDOR_ERROR_RESPONSE;
                if (message == "We have already sent an OTP on your mobile" && stat == "Success") {
                    loginGATrack('Desktop_Login_OTPSent_success', imesh.iso, response.code, 'mobile');// addition of mobil check for foreign users remaining,
                    if (resend == "1") {
                        $(".otp-message").html("We have already sent an OTP on <b>+91-" + mobile_num + "</b>")
                    }
                    if (dispflag == 1 && src1 == "IDEN") {
                        $(".otp-messages .italic").html("We have sent an One Time Password on your mobile <b>+91-" + mobile_num + "</b>")
                    }
                }
                if (resend == "1") {
                    $(".otp-message").html("We have sent an One Time Password on your mobile <b>+91-" + mobile_num + "</b>");
                    if (displayVerificationOptions != 1) {
                        document.getElementById("load-send1").style.display = "none"
                    }
                    document.getElementById("resendMsg").style.display = "block";
                    $("#verify_error1").hide();
                    $("#re_auth1").css("display", "inline-block");
                    if (dispflag == 1 && src1 == "IDEN") {
                        document.getElementById("resendMsg").innerHTML = "OTP has been sent again."
                    }
                    $("#main_div").css("width", "93%")
                }
                if (displayVerificationOptions == 1 && resend == "1") {
                    $("#mwrp").css("display", "none");
                    if (!(document.getElementById("resendMsg") === null)) {
                        document.getElementById("resendMsg").innerHTML = "OTP  sent";
                        $("#resendMsg").css("display", "block")
                    }
                }
                if (serviceCode == "204" && stat == "Failure" && vendorErrorResponse != "") {
                    document.getElementById("verify_error1").innerHTML = vendorErrorResponse;
                    $("#verify_error1").show();
                    $("#resendMsg").hide();
                    $("#tmrBL").css("visibility", "hidden");
                    $("#mwrp").css("display", "block")
                }
            }
        })
    } else {
        var params;
        if (resend == 2) {
            if (src1 == "EMAILVER") {
                params = {
                    "token": "imobile@15061981",
                    "glusrid": glidFromCookie1,
                    "modid": modid,
                    "user_mobile_country_code": mobContCodeFromCookie1,
                    "flag": "OTPGen",
                    "user_ip": country_ip,
                    "user_country": phCountryFromCookie1,
                    "process": "OTP_EmailVerificationForm_Desktop",
                    "user_updatedusing": "Verification Form Desktop",
                    "OTPResend": "1",
                    "attribute_id": att_id
                };
                send_otp_email(params, resend, emFromCookie1)
            } else {
                params = {
                    "token": "imobile@15061981",
                    "mobile_num": mobNoFromCookie1,
                    "glusrid": glidFromCookie1,
                    "modid": modid,
                    "user_mobile_country_code": mobContCodeFromCookie1,
                    "flag": "OTPGen",
                    "user_ip": country_ip,
                    "user_country": phCountryFromCookie1,
                    "process": processName,
                    "user_updatedusing": updateUsing,
                    "OTPResend": "1"
                }
            }
        } else {
            params = {
                "token": "imobile@15061981",
                "mobile_num": mobNoFromCookie1,
                "glusrid": glidFromCookie1,
                "modid": modid,
                "user_mobile_country_code": mobContCodeFromCookie1,
                "flag": "OTPGen",
                "user_ip": country_ip,
                "user_country": phCountryFromCookie1,
                "process": processName,
                "user_updatedusing": updateUsing
            }
        }
        params['service_code'] = 3;
        if (src1 != "EMAILVER") {
            $.ajax({
                type: "POST",
                url: "//" + UrlPri2 + "utils.imimg.com/header/js/login.php",
                data: params,
                dataType: "json",
                crossDomain: true,
                success: function (response) {
                    $("#check_verify1").attr("disabled", false);
                    $("#check_verify1").css("background-color", "#00a699");
                    var stat = response.Response.Status;
                    var message = response.Response.Message;
                    var serviceCode = response.Response.Code;
                    var vendorErrorResponse = response.Response.VENDOR_ERROR_RESPONSE;
                    if (message == "We have already sent an OTP on your mobile" && stat == "Success") {
                        loginGATrack('Desktop_Login_OTPSent_success', imesh.iso, response.code, 'mobile');// addition of mobil check for foreign users remaining,
                        $(".otp-message").html("We have already sent an OTP on <b>+91-" + mobile_num + "</b>");
                        if (dispflag == 1 && src1 == "IDEN") {
                            $(".otp-messages .italic").html("We have sent an One Time Password on your mobile <b>+91-" + mobile_num + "</b>")
                        }
                    }
                    if (resend == "1") {
                        $(".otp-message").html("We have sent an One Time Password on your mobile <b>+91-" + mobile_num + "</b>");
                        if (displayVerificationOptions != 1) {
                            document.getElementById("load-send1").style.display = "none"
                        }
                        document.getElementById("resendMsg").style.display = "block";
                        $("#verify_error1").hide();
                        $("#re_auth1").css("display", "inline-block");
                        if (dispflag == 1 && src1 == "IDEN") {
                            document.getElementById("resendMsg").innerHTML = "OTP has been sent again."
                        }
                        $("#main_div").css("width", "93%")
                    }
                    if (displayVerificationOptions == 1 && resend == "1") {
                        $("#mwrp").css("display", "none");
                        if (!(document.getElementById("resendMsg") === null)) {
                            document.getElementById("resendMsg").innerHTML = "OTP  sent";
                            $("#resendMsg").css("display", "block")
                        }
                    }
                    if (serviceCode == "204" && stat == "Failure" && vendorErrorResponse != "") {
                        document.getElementById("verify_error1").innerHTML = vendorErrorResponse;
                        $("#verify_error1").show();
                        $("#resendMsg").hide();
                        $("#tmrBL").css("visibility", "hidden");
                        $("#mwrp").css("display", "block")
                    }
                }
            })
        }
    }
}
function send_otp_email(params, resend, emFromCookie1) {
    params['service_code'] = 3;
    let tempCookieObj = new userDataCookie()
    let im_iss = tempCookieObj.get('im_iss'), ak;
    if(im_iss === '' || im_iss === 'undefined'){
        window.location.reload();
        return ;
    }
    else{
        ak = decodeURIComponent(im_iss).split('=')[1];
        params['AK'] = ak;
    }
    $.ajax({
        type: "POST",
        url: "//" + UrlPri2 + "utils.imimg.com/header/js/login.php",
        data: params,
        dataType: "json",
        crossDomain: true,
        success: function (response) {
            loginGATrack('Desktop_Login_OTPSent_success', "", "", 'email');// addition of mobil check for foreign users remaining,

            $("#check_verify1").attr("disabled", false);
            $("#check_verify1").css("background-color", "#00a699");
            var stat = response.Response.Status;
            var message = response.Response.Message;
            loginGATrack('Desktop_Login_OTPSent_success', iso, message, iso == 'IN' ? 'mobile' : 'email');// addition of mobil check for foreign users remaining,

            if (stat == "Success" && resend == "1") {
                $(".otp-message").html("Please check your email <b>" + emFromCookie1 + "</b> for a 4 digit OTP");
                document.getElementById("load-send1").style.display = "none";
                document.getElementById("resendMsg").style.display = "block";
                $("#resendMsg").show();
                $("#re_auth1").css("display", "block")
            }
            if (stat == "Success" && resend == "2") {
                $("#re_auth1").css("display", "block")
            }
        },
        failure: function (e) {
            loginGATrack('Desktop_Login_OTPSent_failure', "", "", 'email');// addition of mobil check for foreign users remaining,
        }
    })
}
function movetoNext1(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus()
    }
}
function movetoNextNewVerPOP(previousFieldID, current, nextFieldID, event) {
    if (current.value.length >= current.maxLength && nextFieldID != "") {
        document.getElementById(nextFieldID).focus()
    } else {
        if (event.keyCode == 8 && previousFieldID != "") {
            document.getElementById(previousFieldID).focus()
        } else {
            current.focus()
        }
    }
}
var scrollverclosed;
var xread = readCookie("xnHist");
var ipv_val = (xread != "") ? getparamVal(xread, "ipv") : "";
var fpv_val = (xread != "") ? getparamVal(xread, "fpv") : "";
var displayVerificationOptions = 0;
var missCallHits;
var truecallerHits;
var waitMessage;
var dispflag = 0;
function showmobverifyform(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, cDflag, src1, miss_num) {
    var skipDisplay = 'style="display: none;"';
    var crossDisplay = 'style="display: block;"';
    var MsgDisplay = 'style="display: block;"';
    var sfFlag = $("#srch1").val();
    var redurl = "";
    var xread = readCookie("xnHist");
    var ipv_val = (xread != "") ? getparamVal(xread, "ipv") : "";
    var fpv_val = (xread != "") ? getparamVal(xread, "fpv") : "";
    if (src1 != "HDR_STRP") {
        var emsg = '<p class = "cm-msg" style = "text-align: center;color:#2e3192;font-size:22px;font-family:Open Sans,arial;margin-top:10px;margin-bottom:10px;">Get Connected to Verified Sellers</p>'
    } else {
        emsg = ""
    }
    step = 2;
    if (src1 == "VER" || src1 == "BUYERMY" || src1 == "BUYERMY_NAV" || src1 == "HDR" || src1 == "SELLER_DASHBOARD" || src1 == "HDR_STRP") {
        MsgDisplay = 'style="display: none;"';
        var box = "<style>.otp-mb10{margin-bottom:10px;margin-left:61px}.lkotp{color:#2e3192;cursor:pointer;text-decoration:none;margin-left:61px;}.step-1 h2{font-size: 24px!important}.otp-pl18{padding-left:82px!important;padding-top:12px;height: 41px}.otp-message{color:#2a2a2a;margin:20px 22px}.wrper-txt{padding:3px 18px 36px;color:#2a2a2a;text-align:left;font-family:Open Sans,arial}.resendMsg{padding-left:59px}</style>" + emsg + '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:93%;" id="main_div"><p class="otp-message" style="text-align: center;line-height:25px;width:350px;margin:0 auto;">Enter the 4 digit One Time Password (OTP) sent<br>to your Mobile Number <b>+91-' + mobile_num + '</b> </p><div class="vfn-code1 fs141 c31"><p class="otp-mb10" id = "testing" style="position:relative;" ><i class="mbl-otp"></i><input type="text" maxlength="4" class="nptotp" id="authKey" onkeypress="return isNumberKey1(event);" autocomplete="off"><input type="button"  id="check_verify1" class="vrfy-otp" alt="" value="Submit" onclick="verify_mobile(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','" + cDflag + "','" + sfFlag + "','" + src1 + '\');"><img id="loadingImage" src="//utils.imimg.com/header/gifs/indicator.gif" width="16" height="16" style="display: none; position: absolute; top: 15px; left: 200px;" margin-left="10"><input type="hidden" value="2" id="step1" name="step1"><span class="verify_doneNew" id="after_verified" style="display:none">Verification done</span><span class="err-otp2" id="verify_error1"></span></p><p class="f11_s"><span id="resendMsg" class="resendMsg" style="display: none;">The OTP has been sent again.</span><span id="resendA">Did not recieve OTP? <span onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','1','" + cDflag + "','" + src1 + '\');" class="lkotp" id="re_auth1">Resend</span></span><span id="load-send1" style="display: none;padding-left:60px;">Please wait &nbsp;&nbsp; <img width="10" height="10" border="0" alt="" src="//utils.imimg.com/header/gifs/indicator.gif" style="position:relative;top:-2px"></span></p><div class="ic-btm" style="height:0px;"><div class="im_logoN" style="right:35px;"></div></div></div></div>'
    } else {
        if (src1 == "IDEN") {
            dispflag = 1;
            var box = '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:94%;margin-left:auto!important;margin-top:auto!important;" id="main_div"><p class="otp-messages Head"><b>Please enter 4 digit One Time Password</b> </p><p class="otp-messages italic">Sent on your mobile <b>+91-' + mobile_num + '</b></p><div class="vfn-code1 fs141 c31"><div class="otp-mb10" id="testing" style="position:relative;text-align: center;"><div class="otp-con" style="padding-left: 0px;"><input class="mobbox1 f1 border_black1" type="text" id="first" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'\',this, \'second\',event)" maxlength="1"><input class="mobbox1 f1 border_black1" type="text" id="second" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'first\',this, \'third\',event)" maxlength="1"><input class="mobbox1 f1 border_black1" type="text" id="third" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'second\',this, \'fourth\',event)" maxlength="1"><input class="mobbox1 f1 border_black1" type="text" id="fourth" maxlength="1" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'third\',this,\'\',event)" style="border: 0;" autocomplete="off"><input type="hidden" id="authKey" value=""></div><span class="err-otp2" id="verify_error1" style="text-align:center;"></span><input type="button" id="check_verify1" class="vrfy-otp" alt="" value="Submit" onclick="verify_mobile(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','" + cDflag + "','" + sfFlag + "','" + src1 + '\');" style="background-color: rgb(0, 166, 153);"><img id="loadingImage" src="//utils.imimg.com/header/gifs/indicator.gif" width="16" height="16" style="display: none; position: absolute; bottom: 11px; right: 223px;"><input type="hidden" value="2" id="step1" name="step1"><span class="verify_doneNew" id="after_verified" style="display:none; ">Verification done</span></div><p class="f11_s" style="text-align: center;"><span id="resendMsg" class="resendMsg" style="display: none;">OTP  has been sent again.</span><span id="resendA"> Did not receive OTP? <span onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','1','" + cDflag + "','" + src1 + '\');" class="lkotp" id="re_auth1">Resend</span></span><span id="load-send1" style="display: none;">Please wait &nbsp;&nbsp; <img width="10" height="10" border="0" alt="" src="//utils.imimg.com/header/gifs/indicator.gif" style="position:relative;top:-2px"></span></p><p class="c3 skip" style="display: none;"></p></div>';
            $("#first").focus()
        } else {
            if (src1 == "EMAILVER") {
                MsgDisplay = 'style="display: none;"';
                var box = "<style>.otp-mb10{margin-bottom:10px;margin-left:61px}.lkotp{color:#2e3192;cursor:pointer;text-decoration:none;margin-left:61px;}.step-1 h2{font-size: 24px!important}.otp-pl18{padding-left:82px!important;padding-top:12px;height: 41px}.otp-message{color:#2a2a2a;margin:20px 22px}.wrper-txt{padding:3px 18px 36px;color:#2a2a2a;text-align:left;font-family:Open Sans,arial}.resendMsg{padding-left:59px}</style>" + emsg + '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:100%;padding: 0px 0px 36px;" id="main_div"><p class="otp-message" style="text-align: center;">Check your email <b>' + mobile_num + '</b> for a 4 digit OTP</p><div class="vfn-code1 fs141 c31"><div class="otp-mb10" id = "testing" style="position:relative;display:inline-block;" ><div class="otp-con" style="padding-left: 0px;"><img src="//' + UrlPri1 + 'utils.imimg.com/header/gifs/emailSymbol.png" alt="Email OTP" class="eml-otp" style="padding-top: 3px;float:left;"><input class="mobbox1 f1 " type="text" id="first" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'\',this, \'second\',event)" maxlength="1"><input class="mobbox1 f1 " type="text" id="second" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'first\',this, \'third\',event)" maxlength="1"><input class="mobbox1 f1 " type="text" id="third" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'second\',this, \'fourth\',event)" maxlength="1"><input class="mobbox1 f1 " type="text" id="fourth" maxlength="1" autocomplete="off" onkeypress="return isNumberKey1(event)" onkeyup="movetoNextNewVerPOP(\'third\',this,\'\',event)" style="" autocomplete="off"><input type="hidden" id="authKey" value=""></div></div><input type="button"  id="check_verify1" class="vrfy-otp" alt="" value="Submit" onclick="verify_email(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','" + cDflag + "','" + sfFlag + "','" + src1 + '\');" style="margin-top:6px;"><img id="loadingImage" src="//utils.imimg.com/header/gifs/indicator.gif" width="16" height="16" style="display: none; position: absolute; top: 15px; left: 220px;" margin-left="10"><input type="hidden" value="2" id="step1" name="step1"><span class="verify_doneNew" id="after_verified" style="display:none;margin-left:160px;margin-top:0px;">Verification done</span><span class="err-otp2" id="verify_error1" style="margin-left:160px;"></span></p><p class="f11_s"><span id="resendMsg" class="resendMsg" style="display: none;">The OTP has been sent again.</span><span onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','1','" + cDflag + "','" + src1 + '\');" class="lkotp" id="re_auth1" style="width:100px;">Resend OTP</span><span id="load-send1" style="display: none;padding-left:60px;">Please wait &nbsp;&nbsp; <img width="10" height="10" border="0" alt="" src="//utils.imimg.com/header/gifs/indicator.gif" style="position:relative;top:-2px"></span></p><div class="ic-btm" style="height:0px;"><div class="im_logoN" style="right:18px;"></div></div></div></div>';
                $("#first").focus()
            } else {
                if (src1 == "SCROLLVER") {
                    sessionStorage.setItem("clickToVerif", "1");
                    MsgDisplay = 'style="display: none;"';
                    var box = "<style>.otp-mb10{margin-bottom:10px;margin-left:61px}.lkotp{color:#2e3192;cursor:pointer;text-decoration:none;margin-left:61px;}.step-1 h2{font-size: 24px!important}.otp-pl18{padding-left:82px!important;padding-top:12px;height: 41px}.otp-message{color:#2a2a2a;margin:20px 22px}.wrper-txt{padding:3px 18px 36px;color:#2a2a2a;text-align:left;font-family:Open Sans,arial}.resendMsg{padding-left:59px}</style>" + emsg + '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:93%;" id="main_div"><p class="otp-message">Enter the 4 digit One Time Password (OTP) sent<br>to your Mobile Number <b>+91-' + mobile_num + '</b> </p><div class="vfn-code1 fs141 c31"><p class="otp-mb10" id = "testing" style="position:relative;" ><i class="mbl-otp"></i><input type="text" maxlength="4" onkeypress="return isNumberKey1(event);" class="nptotp" id="authKey"><input type="button"  id="check_verify1" class="vrfy-otp" alt="" value="Submit" onclick="verify_mobile(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','" + cDflag + "','" + sfFlag + "','" + src1 + '\');"><img id="loadingImage" src="//utils.imimg.com/header/gifs/indicator.gif" width="16" height="16" style="display: none; position: absolute; top: 15px; left: 200px;" margin-left="10"><input type="hidden" value="2" id="step1" name="step1"><span class="verify_doneNew" id="after_verified" style="display:none">Verification done</span><span class="err-otp2" id="verify_error1"></span></p><p class="f11_s"><span id="resendMsg" class="resendMsg" style="display: none;">The OTP has been sent again.</span><span id="resendA">Did not recieve OTP? <span onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','1','" + cDflag + "','" + src1 + '\');" class="lkotp" id="re_auth1">Resend</span></span><span id="load-send1" style="display: none;padding-left:60px;">Please wait &nbsp;&nbsp; <img width="10" height="10" border="0" alt="" src="//utils.imimg.com/header/gifs/indicator.gif" style="position:relative;top:-2px"></span></p><div class="ic-btm" style="height:0px;"><div class="im_logoN" style="right:35px;"></div></div></div></div>'
                } else {
                    if (src1 == "SCROLLVER1") {
                        MsgDisplay = 'style="display: none;"';
                        sessionStorage.setItem("scrolldisplay", "1");
                        var box = "<style>.otp-mb10{margin-bottom:10px;margin-left:61px}.lkotp{color:#2e3192;cursor:pointer;text-decoration:none;margin-left:61px;}.step-1 h2{font-size: 24px!important}.otp-pl18{padding-left:82px!important;padding-top:12px;height: 41px}.wrper-txt{padding:3px 18px 36px;color:#2a2a2a;text-align:left;font-family:Open Sans,arial}</style>" + emsg + '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:97%;" id="main_div"><div class="vfn-code1 fs141 c31"><p class="otp-mb10" id = "testing" style="position:relative;" ><input type="button"  id="check_verify1" class="vrfy-otp" alt="" value="Click here to Verify" onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','2','" + cDflag + '\',\'SCROLLVER\');" style="width:248px;margin-left:36px;" ></p><div class="ic-btm" style="height:0px;"><div class="im_logoN" style="right:35px;"></div></div></div></div>'
                    } else {
                        var box = '<div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:93%;margin-left:auto!important;margin-top:auto!important;padding-top:15px;" id="main_div"><p class="otp-message" id="otp-message">4 digit One Time Password sent on your mobile <b>+91-' + mobile_num + '</b></p><div class="vfn-code1 fs141 c31"><p class="otp-mb10 tc" style="height:60px;position: relative;margin-bottom:0px;" id = "testing"><span class="icLg"><i class="mbl-otp"></i></span><input type="text" maxlength="4" class="nptotp vttxt" onkeypress="return isNumberKey1(event);" autocomplete="off" id="authKey"><input type="button"  id="check_verify1" class="vrfy-otp" style="padding:10px 0 10px 0" alt="" value="Submit" onclick="verify_mobile(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','" + cDflag + "','" + sfFlag + "','" + src1 + '\');"><span class="tmrBL" id="tmrBL"><b>00:10</b></span><img id="loadingImage" src="//utils.imimg.com/header/gifs/indicator.gif" width="16" height="16" style="display: none;position: absolute;top: 18px;right: 102px;"><input type="hidden" value="2" id="step1" name="step1"><span class="verify_doneNew" id="after_verified" style="display:none">Verification done</span><span class="err-otp2" style="text-align:center;" id="verify_error1"></span></p><p class="f11_s tc"><span id="resendMsg" class="resendMsg" style="display: none;">OTP sent</span></p><div class="mwrp" id="mwrp" style="margin-bottom: -15px;"><p class="mstxt"><span class="smLg" onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','1','" + cDflag + "','" + src1 + '\');" class="lkotp" id="re_auth1">Resend OTP</span><span class="smLnum" style="width:260px;line-height:32px;margin-left:12px;">Give a missed call on  <span class="msnbr">' + miss_num + '</span></span></p><p class="mnxt" id="mnxt1" style="color:#2e3192;"></p></div><p class="c3 skip" ' + skipDisplay + "></p></div></div>";
                        displayVerificationOptions = 1
                    }
                }
            }
        }
    }
    if (cDflag == 3 || cDflag == 4) {
        if (src1 == "IDEN") {
            _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_display", modid, 0, true])
        } else {
            if (src1 == "VER" && (redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY")) {
                _gaq.push(["_trackEvent", "Verification_popup", "Verification_display_buyermy", modid, 0, true])
            } else {
                if (src1 == "VER") {
                    if (ipv_val == "4" || ipv_val == "5") {
                        _gaq.push(["_trackEvent", "Verification_popup", "Verification_display_5th_" + modid])
                    } else {
                        _gaq.push(["_trackEvent", "Verification_popup", "Verification_display_3rd", modid, 0, true])
                    }
                } else {
                    if (src1 == "EMAILVER") {
                        if (fpv_val == "5" || fpv_val == "4") {
                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_EMAIL_display_5th_" + modid])
                        } else {
                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_EMAIL_display_3rd_" + modid])
                        }
                    } else {
                        if (src1 == "SCROLLVER1") {
                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_scroll_display", modid, 0, true])
                        } else {
                            if (src1 == "SCROLLVER") {
                                _gaq.push(["_trackEvent", "Verification_popup", "Verification_scrollver_display", modid, 0, true])
                            } else {
                                if (src1 == "BUYERMY") {
                                    _gaq.push(["_trackEvent", "Verification_popup_Buyermy", "Verification_MYcontact_display", modid, 0, true])
                                } else {
                                    if (src1 == "BUYERMY_NAV") {
                                        _gaq.push(["_trackEvent", "Verification_popup_Buyermy", "Verification_MYNav_display", modid, 0, true])
                                    } else {
                                        if (src1 == "HDR") {
                                            _gaq.push(["_trackEvent", "IM Global Header", "Verification_display", modid, 0, true])
                                        } else {
                                            if (src1 == "HDR_STRP") {
                                                _gaq.push(["_trackEvent", "IM Header Strip", "Verification_display", modid, 0, true])
                                            } else {
                                                gATracking("ExistingUser_VerificationForm");
                                                redurl = document.URL
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (src1 == "IDEN") {
            _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_display", modid, 0, true])
        } else {
            gATracking("NewUser_VerificationForm");
            redurl = "//" + UrlPri + "my.indiamart.com"
        }
    }
    var verifyBoxHTML;
    redurl = redurl.replace(/[#]+$/, "");
    if (dispflag == 1 && src1 == "IDEN") {
        verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1 new_vrf"><div class="step-1" id="bs_hdng1"><span class="close_imlogin" id="close_s" onclick="closeMe1(\'' + src1 + '\');">X</span><h2 class="f1_s otp-pl18">Verify Your Mobile Number<span>for a better and secure experience</span></h2><span class="mob_icon_login"></span></div><div>' + box + "</div></div><!-- Popup div ends here -->"
    } else {
        if (src1 == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
            verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><h2 class="f1_s otp-pl18">Verify Your Mobile Number</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
        } else {
            if ((src1 == "VER" && ipv_val == "4") || (src1 == "VER" && ipv_val == "5")) {
                verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display:none;"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s" style="display:none;"/></a><h2 class="f1_s otp-pl18">Verify Your Mobile Number</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
            } else {
                if (src1 == "EMAILVER") {
                    var iss = readCookie("im_iss");
                    if (typeof iss != "undefined" && iss != "") {
                        if (fpv == 5) {
                            verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display:none;"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s" style="display:none;"/></a><h2 class="f1_s" style="padding-top:12px;height: 30px;padding-left:117px;">Verify Your Email ID</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
                        } else {
                            if (fpv == 3) {
                                verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display:block;"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><h2 class="f1_s" style="padding-top:12px;height: 30px;padding-left:117px;">Verify Your Email ID</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
                            }
                        }
                    } else {
                        if (typeof iss == "undefined" || iss == "") {
                            if (ipv == 5) {
                                verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display:none;"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><h2 class="f1_s" style="padding-top:12px;height: 30px;padding-left:117px;">Verify Your Email ID</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
                            } else {
                                if (ipv == 3) {
                                    verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1" ><a href="javascript:" onclick="closeMe1(\'' + src1 + '\');" style="display:block;"><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><h2 class="f1_s" style="padding-top:12px;height: 30px;padding-left:117px;">Verify Your Email ID</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
                                }
                            }
                        }
                    }
                } else {
                    verifyBoxHTML = '<!-- contact us form --><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1"><a href="javascript:" onclick="closeMe1(\'' + src1 + "');\"" + crossDisplay + '><img src="//' + UrlPri + 'utils.imimg.com/header/gifs/3.png" id="close_s"/></a><h2 class="f1_s otp-pl18">Verify Your Mobile Number</h2></div><div>' + box + "</div></div><!-- Popup div ends here -->"
                }
            }
        }
    }
    if (src1 == "VER" || src1 == "BUYERMY" || src1 == "BUYERMY_NAV" || src1 == "HDR" || src1 == "SELLER_DASHBOARD" || src1 == "HDR_STRP" || src1 == "EMAILVER" || src1 == "SCROLLVER" || src1 == "SCROLLVER1") {
        $("#IdentifiedPopUpHTML").html(verifyBoxHTML);
        $("#overlay_s").css("display", "block");
        $("#IdentifiedPopUpHTML").css({
            "display": "block",
            "position": "fixed",
            "top": "200px",
            "left": "50%",
            "z-index": "1001",
            "margin-left": "-247px"
        })
    } else {
        document.getElementById("popupContact_s").innerHTML = verifyBoxHTML;
        document.getElementById("popupContact_s").style.display = "block"
    }
    if ($("#authKey").val() == "" && dispflag == 1 && src1 == "IDEN") {
        $("#authKey").val($("#first").val() + $("#second").val() + $("#third").val() + $("#fourth").val())
    }
    $("#authKey").focus()
}
function verify_email(glid, modid, prim_email, mob_cont_code, att_id, iso, cDFlag, sfFlag, src1) {
    var imesh = new userDataCookie().get();
    var mobNoFromCookie = imesh.mb1;
    var emFromCookie = imesh.em;
    var evStat = imesh.ev;
    var uvStat = imesh.uv;
    var xread = readCookie("xnHist");
    var fpv_val = (xread != "") ? getparamVal(xread, "fpv") : "";
    if (!prim_email || !emFromCookie) {
        var gaTracking = modid + "_" + prim_email + "_" + emFromCookie;
        _gaq.push(["_trackEvent", gaFormIdentify, "emailTrackingInVerify", gaTracking, 0, true])
    }
    $("#re_auth1").css("display", "none");
    document.getElementById("check_verify1").style.visibility = "hidden";
    document.getElementById("check_verify1").style.cursor = "wait";
    document.getElementById("loadingImage").style.display = "inline-block";
    $("#verify_error1,#mnxt1").hide();
    $("#check_verify1").addClass("load_s");
    $("#resendMsg").css("display", "none");
    var screen = "";
    var processName = "";
    if (cDFlag == 1 || cDFlag == 3 || cDFlag == 4) {
        if (src1 == "EMAILVER") {
            processName = "OTP_SignInForm_Desktop";
            updateUsing = "Verification Form Desktop";
            if (fpv_val == 5 || fpv_val == 4) {
                _gaq.push(["_trackEvent", "Verification_popup", "Verification_Email_click_5th", modid, 0, true]);
                screen = "EMAIL VERIFICATION VIA DESKTOP ON 5PV"
            } else {
                _gaq.push(["_trackEvent", "Verification_popup", "Verification_Email_click_3rd", modid, 0, true]);
                screen = "EMAIL VERIFICATION VIA DESKTOP ON 3PV"
            }
        }
    }
    var x = document.getElementsByClassName("mobbox1 f1 ");
    auth_key = "";
    auth = new Array();
    for (i = 0; i < x.length; i++) {
        auth[i] = x[i].value;
        auth_key = auth_key + auth[i]
    }
    auth_key = auth_key.replace(/^\s+|\s+$/g, "");
    if (!(/\d{4}/.test(auth_key))) {
        document.getElementById("authKey").value = "";
        $("#check_verify1").removeClass("load_s");
        document.getElementById("check_verify1").style.visibility = "visible";
        document.getElementById("check_verify1").style.cursor = "pointer";
        document.getElementById("loadingImage").style.display = "none";
        $("#resendMsg").css("display", "none");
        $("#verify_error1").html("Please enter 4-digit OTP");
        $("#verify_error1").show();
        if (!(sendOTPCount > 2 && displayVerificationOptions != 1)) {
            $("#re_auth1").css("display", "block")
        }
        return false
    }
    if (LoginwithOTPcount > 5) {
        $("#re_auth1").css("display", "inline-none");
        $("#verify_error1").html("Oops ! You have reached OTP limit, please try after sometime.");
        otpmsg();
        clearTimeout(waitMessage);
        return
    }
    if (typeof country_ip == "undefined" || country_ip == "") {
        var iploc = readCookie("iploc");
        if (iploc != "undefined" && iploc != "") {
            country_ip = getparamVal(iploc, "gip");
            iploc_country_name = getparamVal(iploc, "gcnnm")
        }
    }
    params = {
        "token": "imobile@15061981",
        "modid": modid,
        "user_mobile_country_code": mob_cont_code,
        "flag": "OTPVer",
        "user_ip": country_ip,
        "user_country": imesh.iso,
        "country_name": iploc_country_name,
        "auth_key": auth_key,
        "glusrid": glid,
        "verify_process": "Email",
        "attribute_id": att_id,
        "verify_screen": screen,
        "process": processName,
        'service_code': 3
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true,
        url: "//" + UrlPri2 + "utils.imimg.com/header/js/login.php",
        data: params,
        success: function (response) {
            var stat = response.Response.Status;
            var message = response.Response.Message;
            var errmsg = response.Response.Error;
            loginGATrack('Desktop_Login_OTPVerify_success', imesh.iso, message ? message : errmsg, 'email');// addition of mobil check for foreign users remaining,

            if (stat == "Failure" || (message.match("OTP not Verified"))) {
                $("#mwrp").css("display", "block");
                document.getElementById("authKey").value = "";
                document.getElementById("check_verify1").style.visibility = "visible";
                document.getElementById("check_verify1").style.cursor = "pointer";
                document.getElementById("loadingImage").style.display = "none";
                $("#verify_error1").show();
                $("#check_verify1").removeClass("load_s");
                $("#resendMsg").css("display", "none");
                if (!(sendOTPCount > 2 && displayVerificationOptions != 1)) {
                    $("#re_auth1").css("display", "inline-block")
                }
                if (errmsg.match("Pending OTP record not found")) {
                    $("#verify_error1").html("Your OTP has expired. Please click on Resend for new OTP.")
                } else {
                    $("#verify_error1").html("Please enter correct OTP")
                }
                LoginwithOTPcount++;
                return false
            } else {
                if (message != "" && message.match("Email Verified")) {
                    document.getElementById("check_verify1").style.cursor = "pointer";
                    document.getElementById("loadingImage").style.display = "none";
                    $("#verify_error1").html("");
                    $("#mnxt1").hide();
                    $("#after_verified").css("display", "inline-block");
                    if (cDFlag == 3 || cDFlag == 4) {
                        if (src1 == "EMAILVER") {
                            if (fpv_val == 4 || fpv_val == 5) {
                                _gaq.push(["_trackEvent", "Verification_popup", "Verification_email_success_5th_" + modid])
                            } else {
                                _gaq.push(["_trackEvent", "Verification_popup", "Verification_email_success_3rd_" + modid])
                            }
                        }
                        if (typeof isBLFormOpen != "undefined") {
                            callToIdentifiedQ()
                        }
                        setTimeout(function () {
                            closeMe1(src1)
                        }, 1000);
                        var imeshval = readCookie("ImeshVisitor");
                        var b = "";
                        var offset;
                        var offset1;
                        if (offset1 = imeshval.indexOf("ev")) {
                            b = strToObj(imeshval);
                            b.ev = "V";
                            imesh_obj.set(b)
                        }
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            loginGATrack('Desktop_Login_OTPVerify_failure', imesh.iso, "", 'email');// addition of mobil check for foreign users remaining,

            console.log("Error")
        }
    })
}
function verify_mobile(glid, modid, mobile_num, mob_cont_code, att_id, iso, cDFlag, sfFlag, src1) {
    verifytype = 2;
    seconds_left = 0;
    if (!(document.getElementById("tmrBL") === null)) {
        document.getElementById("tmrBL").innerHTML = "<b>00:15</b>"
    }
    $("#tmrBL").css("visibility", "hidden");
    $("#mwrp").css("display", "none");
    var xread = readCookie("xnHist");
    var ipv_val = (xread != "") ? getparamVal(xread, "ipv") : "";
    var imesh = new userDataCookie().get();
    var mobNoFromCookie = imesh.mb1;
    var emFromCookie = imesh.em;
    var evStat = imesh.ev;
    if (!mobile_num || !mobNoFromCookie) {
        var gaTracking = modid + "_" + mobile_num + "_" + mobNoFromCookie;
        _gaq.push(["_trackEvent", gaFormIdentify, "mobileTrackingInVerify", gaTracking, 0, true])
    }
    $("#re_auth1").css("display", "none");
    $("#resendA").css("display", "none");
    document.getElementById("check_verify1").style.visibility = "hidden";
    document.getElementById("check_verify1").style.cursor = "wait";
    document.getElementById("loadingImage").style.display = "inline-block";
    $("#verify_error1,#mnxt1").hide();
    $("#check_verify1").addClass("load_s");
    $("#resendMsg").css("display", "none");
    var screen = "";
    var processName = "";
    if (cDFlag == 1) {
        processName = "OTP_JoinFreeForm_Desktop";
        updateUsing = "Join Free Form Desktop"
    } else {
        if (src1 == "BUYERMY" || src1 == "BUYERMY_NAV") {
            processName = "OTP_BuyerMYContactProfile_Desktop";
            updateUsing = "BUYER MY CONTACT PROFILE PAGE"
        } else {
            if (src1 == "SELLER_DASHBOARD") {
                processName = "OTP_SellerMY_Desktop";
                updateUsing = "SELLER MY DASHBOARD"
            } else {
                processName = "OTP_SignInForm_Desktop";
                updateUsing = "Sign IN Form Desktop"
            }
        }
    }
    if (cDFlag == 1) {
        if (src1 == "IDEN") {
            _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_click", modid, 0, true]);
            screen = "VERIFICATION VIA DESKTOP IDENTIFICATION POPUP"
        } else {
            if (displayVerificationOptions == 1) {
                if (!(document.getElementById("otp-message") === null)) {
                    var otpMessageIDValue = document.getElementById("otp-message").innerHTML;
                    if (otpMessageIDValue.includes("You will soon receive a call with OTP")) {
                        screen = "VERIFICATION VIA OTP_ON_CALL ON DESKTOP";
                        gATracking("NewUser_VerificationAttempt_Via_OTPOnCall")
                    } else {
                        screen = "VERIFICATION FROM JOINFREE DESKTOP POPUP";
                        gATracking("NewUser_VerificationAttempt")
                    }
                }
            } else {
                screen = "VERIFICATION FROM JOINFREE DESKTOP POPUP";
                gATracking("NewUser_VerificationAttempt")
            }
        }
    } else {
        if (cDFlag == 3 || cDFlag == 4) {
            if (src1 == "IDEN") {
                _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_click", modid, 0, true]);
                screen = "VERIFICATION VIA DESKTOP IDENTIFICATION POPUP"
            } else {
                if (src1 == "BUYERMY" || src1 == "BUYERMY_NAV") {
                    screen = "Buyer ContactDetails Verification Popup"
                } else {
                    if (src1 == "SELLER_DASHBOARD") {
                        screen = "VERIFICATION VIA SELLER DASHBOARD POPUP"
                    } else {
                        if (src1 == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_click_buyermy", modid, 0, true]);
                            screen = "VERIFICATION VIA NEW REGISTRATION MAILER ON BUYER MY";
                            processName = "ONLINE"
                        } else {
                            if (src1 == "VER") {
                                if (ipv_val == 4 || ipv_val == 5) {
                                    _gaq.push(["_trackEvent", "Verification_popup", "Verification_click_5th", modid, 0, true]);
                                    screen = "VERIFICATION VIA DESKTOP ON 5PV"
                                } else {
                                    _gaq.push(["_trackEvent", "Verification_popup", "Verification_click_3rd", modid, 0, true]);
                                    screen = "VERIFICATION VIA DESKTOP ON 3PV"
                                }
                            } else {
                                if (src1 == "SCROLLVER") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "Verification_scrollver_click", modid, 0, true]);
                                    screen = "VERIFICATION VIA DESKTOP SCROLLBASED"
                                } else {
                                    if (src1 == "HDR") {
                                        _gaq.push(["_trackEvent", "IM Global Header", "Verification_click", modid, 0, true]);
                                        screen = "VERIFICATION FROM SIGNIN DESKTOP POPUP"
                                    } else {
                                        if (src1 == "HDR_STRP") {
                                            _gaq.push(["_trackEvent", "IM Header Strip", "Verification_click", modid, 0, true]);
                                            screen = "VERIFICATION FROM IM_HEADER STRIP"
                                        } else {
                                            if (displayVerificationOptions == 1) {
                                                if (!(document.getElementById("otp-message") === null)) {
                                                    var otpMessageIDValue = document.getElementById("otp-message").innerHTML;
                                                    if (otpMessageIDValue.includes("You will soon receive a call with OTP")) {
                                                        screen = "VERIFICATION VIA OTP_ON_CALL ON DESKTOP";
                                                        gATracking("ExistingUser_VerificationAttempt_Via_OTPOnCall")
                                                    } else {
                                                        screen = "VERIFICATION FROM SIGNIN DESKTOP POPUP";
                                                        gATracking("ExistingUser_VerificationAttempt")
                                                    }
                                                }
                                            } else {
                                                screen = "VERIFICATION FROM SIGNIN DESKTOP POPUP";
                                                gATracking("ExistingUser_VerificationAttempt")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if ($("#authKey").val() == "" && dispflag == 1 && src1 == "IDEN") {
        $("#authKey").val($("#first").val() + $("#second").val() + $("#third").val() + $("#fourth").val())
    }
    if (!(/\d{4}/.test($("#authKey").val()))) {
        $("#verify_error1").html("Please enter 4-digit OTP");
        $("#re_auth1").css("display", "inline-block");
        $("#resendA").css("display", "inline-block");
        if (dispflag == 1 && src1 == "IDEN") {
            document.getElementById("first").value = "";
            document.getElementById("second").value = "";
            document.getElementById("third").value = "";
            document.getElementById("fourth").value = "";
            $("#first").focus()
        }
        if (otpPlusOTPOnCallCount > 6) {
            $("#mwrp").css("display", "none")
        } else {
            otpmsg()
        }
        return false
    }
    if (LoginwithOTPcount > 5) {
        $("#re_auth1").css("display", "inline-none");
        $("#verify_error1").html("Oops ! You have reached OTP limit, please try after sometime.");
        otpmsg();
        clearTimeout(waitMessage);
        return
    }
    if ($("#authKey").val() == "" && dispflag == 1 && src1 == "IDEN") {
        $("#authKey").val($("#first").val() + $("#second").val() + $("#third").val() + $("#fourth").val())
    }
    var authVal = $("#authKey").val();
    if (typeof country_ip == "undefined" || country_ip == "") {
        var iploc = readCookie("iploc");
        if (iploc != "undefined" && iploc != "") {
            country_ip = getparamVal(iploc, "gip");
            iploc_country_name = getparamVal(iploc, "gcnnm")
        }
    }
    var params = {
        "token": "imobile@15061981",
        "mobile_num": mobNoFromCookie,
        "modid": modid,
        "user_mobile_country_code": mob_cont_code,
        "flag": "OTPVer",
        "user_ip": country_ip,
        "country_name": iploc_country_name,
        "auth_key": $("#authKey").val(),
        "glusrid": glid,
        "verify_process": "ONLINE",
        "verify_screen": screen,
        "process": processName,
        'service_code': 3,
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true,
        url: "//" + UrlPri2 + "utils.imimg.com/header/js/login.php",
        data: params,
        success: function (response) {
            var stat = response.Response.Status;
            var message = response.Response.Message;
            var errmsg = response.Response.Error;
            loginGATrack('Desktop_Login_OTPVerify_success', imesh.iso, message ? message : errmsg, 'mobile');// addition of mobil check for foreign users remaining,

            if ((stat == "Failure" || (message.match("OTP not Verified") || message.match("Mobile Number not Verified"))) && (dispflag == 1 && src1 == "IDEN")) {
                $("#re_auth1").css("display", "inline-block");
                $("#resendA").css("display", "inline-block");
                if (errmsg.match("Pending OTP record not found")) {
                    $("#verify_error1").html("Your OTP has expired. Please click on Resend for new OTP.")
                } else {
                    $("#verify_error1").html("Please enter correct OTP")
                }
                if (dispflag == 1 && src1 == "IDEN") {
                    document.getElementById("first").value = "";
                    document.getElementById("second").value = "";
                    document.getElementById("third").value = "";
                    document.getElementById("fourth").value = "";
                    $("#first").focus()
                }
                LoginwithOTPcount++;
                if (otpPlusOTPOnCallCount > 6) {
                    $("#mwrp").css("display", "none")
                } else {
                    otpmsg()
                }
            } else {
                if (stat == "Failure" || (message.match("OTP not Verified") || message.match("Mobile Number not Verified"))) {
                    $("#re_auth1").css("display", "inline-block");
                    $("#resendA").css("display", "inline-block");
                    if (errmsg.match("Pending OTP record not found")) {
                        $("#verify_error1").html("Your OTP has expired. Please click on Resend for new OTP.")
                    } else {
                        $("#verify_error1").html("Please enter correct OTP")
                    }
                    LoginwithOTPcount++;
                    if (otpPlusOTPOnCallCount > 6) {
                        $("#mwrp").css("display", "none")
                    } else {
                        otpmsg()
                    }
                } else {
                    if (message != "" && message.match("Mobile Number Verified")) {
                        var data1 = response.Response.LOGIN_DATA.DataCookie;
                        var loginSet = response.Response.LOGIN_DATA.LoginCookie;
                        var tokenSet = response.Response.LOGIN_DATA.im_iss;
                        imesh_obj.set(data1, "ImeshVisitor");
                        // v4iilex_obj.set(loginSet, "v4iilex");
                        im_iss_obj.set(tokenSet, "im_iss");
                        document.getElementById("check_verify1").style.cursor = "pointer";
                        document.getElementById("loadingImage").style.display = "none";
                        $("#verify_error1").html("");
                        $("#mnxt1").hide();
                        if (dispflag == 1 && src1 == "IDEN") {
                            $("#after_verified").css("display", "block")
                        } else {
                            $("#after_verified").css("display", "inline-block")
                        }
                        if (cDFlag == "1") {
                            setCookieUv1();
                            if (typeof isBLFormOpen != "undefined") {
                                callToIdentifiedQ()
                            }
                            if (src1 == "IDEN" && dispflag == 1) {
                                _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_success", modid, 0, true]);
                                if (emFromCookie != "") {
                                    globalVariable = {
                                        example_attribute: "1"
                                    }
                                } else {
                                    if (modid == "DIR" || modid == "PRODDTL" || modid == "IMHOME") {
                                        globalVariable = {
                                            example_attribute: "100"
                                        }
                                    } else {
                                        globalVariable = {
                                            example_attribute: "1"
                                        }
                                    }
                                }
                                callidentifiedJ()
                            } else {
                                if (src1 == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_buyermy", modid, 0, true]);
                                    callidentifiedJ();
                                    window.location = "//my.indiamart.com";
                                    return true
                                } else {
                                    if (src1 == "VER") {
                                        if (ipv_val == 4 || ipv_val == 5) {
                                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_5th", modid, 0, true])
                                        } else {
                                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_3rd", modid, 0, true])
                                        }
                                        globalVariable = {
                                            example_attribute: "0"
                                        };
                                        callidentifiedJ()
                                    } else {
                                        if (displayVerificationOptions == 1) {
                                            if (!(document.getElementById("otp-message") === null)) {
                                                var otpMessageIDValue = document.getElementById("otp-message").innerHTML;
                                                if (otpMessageIDValue.includes("You will soon receive a call with OTP")) {
                                                    _gaq.push(["_trackEvent", gaFormIdentify, "Verified_From_OTP_On_Call", modid, 0, true])
                                                } else {
                                                    _gaq.push(["_trackEvent", gaFormIdentify, "Verified_From_OTP_On_SMS", modid, 0, true])
                                                }
                                            }
                                        } else {
                                            gATracking("NewUser_VerificationSuccessful")
                                        }
                                    }
                                }
                            }
                            setTimeout(function () {
                                closeMe1(src1)
                            }, 1000);
                            return true
                        }
                        if (cDFlag == 3 || cDFlag == 4) {
                            if (src1 == "IDEN") {
                                _gaq.push(["_trackEvent", "Identification_login_popup", "Verification_success", modid, 0, true])
                            } else {
                                if (src1 == "VER" && redirectURL.indexOf("utm_campaign=IN-newreg-SEARCH") != -1 && modid == "MY") {
                                    _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_buyermy", modid, 0, true]);
                                    window.location = "//my.indiamart.com";
                                    return true
                                } else {
                                    if (src1 == "VER") {
                                        if (ipv_val == 4 || ipv_val == 5) {
                                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_5th", modid, 0, true])
                                        }
                                        _gaq.push(["_trackEvent", "Verification_popup", "Verification_success_3rd", modid, 0, true])
                                    } else {
                                        if (src1 == "SCROLLVER") {
                                            _gaq.push(["_trackEvent", "Verification_popup", "Verification_scrollver_success", modid, 0, true])
                                        } else {
                                            if (src1 == "HDR") {
                                                _gaq.push(["_trackEvent", "IM Global Header", "Verification_success", modid, 0, true])
                                            } else {
                                                if (src1 == "HDR_STRP") {
                                                    _gaq.push(["_trackEvent", "IM Header Strip", "Verification_success", modid, 0, true])
                                                } else {
                                                    if (src1 == "BUYERMY") {
                                                        _gaq.push(["_trackEvent", "Verification_popup_Buyermy", "Verification_MYcontact_success", modid, 0, true])
                                                    } else {
                                                        if (src1 == "BUYERMY_NAV") {
                                                            _gaq.push(["_trackEvent", "Verification_popup_Buyermy", "Verification_MYNav_success", modid, 0, true])
                                                        } else {
                                                            if (displayVerificationOptions == 1) {
                                                                if (!(document.getElementById("otp-message") === null)) {
                                                                    var otpMessageIDValue = document.getElementById("otp-message").innerHTML;
                                                                    if (otpMessageIDValue.includes("You will soon receive a call with OTP")) {
                                                                        _gaq.push(["_trackEvent", gaFormIdentify, "Verified_From_OTP_On_Call", modid, 0, true])
                                                                    } else {
                                                                        _gaq.push(["_trackEvent", gaFormIdentify, "Verified_From_OTP_On_SMS", modid, 0, true])
                                                                    }
                                                                }
                                                            } else {
                                                                gATracking("ExistingUser_VerificationSuccessful")
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (typeof isBLFormOpen != "undefined") {
                                callToIdentifiedQ()
                            }
                            if (src1 == "IDEN") {
                                if (emFromCookie != "") {
                                    globalVariable = {
                                        example_attribute: "1"
                                    }
                                } else {
                                    globalVariable = {
                                        example_attribute: "100"
                                    }
                                }
                                callidentifiedJ();
                                return
                            }
                            if (src1 == "VER") {
                                globalVariable = {
                                    example_attribute: "0"
                                };
                                callidentifiedJ()
                            }
                            if (src1 == "HDR_STRP" && emFromCookie != "" && evStat != "V") {
                                thankyou_popup(modid, cDFlag, sfFlag, src1);
                                return
                            }
                            if (src1 == "BUYERMY" || src1 == "BUYERMY_NAV") {
                                window.location.reload()
                            } else {
                                setTimeout(function () {
                                    closeMe1(src1)
                                }, 1000)
                            }
                        }
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            loginGATrack('Desktop_Login_OTPVerify_failure', imesh.iso, "", 'mobile');// addition of mobil check for foreign users remaining,

        }
    })
}
function send_email(type, src_from, first_name, glusrId, mobile, email, modid) {
    http_request = false;
    var response;
    cDflag = 3;
    sfFlag = "";
    if (src_from == "HDR_STRP") {
        _gaq.push(["_trackEvent", "IM Header Strip", "Email_Verification_Clicked", modid, 0, true])
    }
    var sid = Math.random();
    var url = "//" + UrlPri + "my.indiamart.com/userprofile/contactprofile/verification/?action=email_verification&type=" + type + "&sid=" + sid + "&email=" + email + "&first_name=" + first_name + "&glusrId=" + glusrId + "&mobile=" + mobile;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest()
    } else {
        if (window.ActiveXObject) {
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) { }
            }
        }
    }
    http_request.open("GET", url, true);
    http_request.send(null);
    thankyou_popup(modid, cDflag, sfFlag, src_from);
    return http_request.responseText
}
function otpmsg() {
    $("#mwrp").css("display", "block");
    document.getElementById("authKey").value = "";
    document.getElementById("check_verify1").style.visibility = "visible";
    document.getElementById("check_verify1").style.cursor = "pointer";
    document.getElementById("loadingImage").style.display = "none";
    $("#verify_error1").show();
    $("#check_verify1").removeClass("load_s");
    $("#resendMsg").html("");
    return false
}
var interval;
var seconds_left;
function setCookieUv1() {
    var a = readCookie("ImeshVisitor")
        , b = "";
    if (a.length > 0) {
        if (offset = a.indexOf("uv"),
            -1 != offset) {
            b = strToObj(a),
                b.uv = "V",
                imesh_obj.set(b)
        } else {
            var c = a.charAt(a.length - 1);
            a += "|" == c ? "uv=V" : "|uv=V",
                b = strToObj(a),
                imesh_obj.set(b)
        }
    }
}
function gATracking(msg) {
    _gaq.push(["_trackEvent", gaFormIdentify, msg, modid, 0, true])
}
function gATrackingAb(msg) {
    if (modid == "DIR" && location.href.indexOf("-all.html") == -1) {
        _gaq.push(["_trackEvent", "signIn", msg, modid, 0, true])
    }
}
function clc_cookies() {
    if (dis_ckies != "") {
        document.getElementById("logintoidentify").disabled = true;
        $("#logintoidentify").css("background-color", "#b2b2b2");
        $("#lwg_wrpr").css("display", "none")
    }
}
function showmobverifyScreen(glid, modid, mobile_num, mob_cont_code, att_id, phCountry, resend, cDflag, src1) {
    _gaq.push(["_trackEvent", "Identification_login_popup", "SendOTPScreenDisplay", modid, 0, true]);
    verifyBoxHTML = '<div class="overlay_s" id="overlay_s" style="display: block;"></div><div id="form_otp1" class="one_s1"><div class="step-1" id="bs_hdng1"><a href="javascript:" onclick="closeMe1(\'HDR\');" style="display: block;"><img src="//utils.imimg.com/header/gifs/3.png" id="close_s"></a><h2 class="f1_s otp-pl18">Verify Your Mobile Number</h2></div><div><style>.otp-mb10{margin: 10px 0px; text-align: center;}.lkotp{color:#2e3192;cursor:pointer;text-decoration:none;margin-left:61px;}.step-1 h2{font-size: 24px!important}.otp-pl18{padding-left:82px!important;padding-top:12px;height: 41px}.otp-message{color:#2a2a2a;margin:20px 22px}.wrper-txt{padding:3px 18px 36px;color:#2a2a2a;text-align:left;font-family:Open Sans,arial}.resendMsg{padding-left:59px}</style><p class="cm-msg" style="text-align: center;color:#2e3192;font-size:22px;font-family:Open Sans,arial;margin-top:10px;margin-bottom:10px;">Get Connected to Verified Sellers</p><div class=" c31 ds_in1 wrper-txt" style="display:inline-block;width:93%;" id="main_div"><p class="otp-message" style="text-align: center;line-height:25px;width:350px;margin:0 auto;">Click below to get 4 digit One Time Password (OTP)<br>on your Mobile Number <b>+' + mob_cont_code + "-" + mobile_num + '</b></p><div class="vfn-code1 fs141 c31" style="text-align:center"><p class="otp-mb10" id="testing" style="position:relative;/* text-align: center; */"><input type="button" id="check_verify1" class="vrfy-otp" alt="" value="Request OTP" onclick="send_otp(\'' + glid + "','" + modid + "','" + mobile_num + "','" + mob_cont_code + "','" + att_id + "','" + phCountry + "','2','" + cDflag + "','" + src1 + "');_gaq.push(['_trackEvent', 'Identification_login_popup','SendOTPScreenSubmit',modid, 0, true])\" style=\"background-color: rgb(0, 166, 153);text-align: center;/* visibility: hidden; */cursor: pointer;font-size: 16px;\"><span class=\"err-otp2\" id=\"verify_error1\"></span></p></div></div></div></div>";
    $("#sign_in").html("");
    $("#IdentifiedPopUpHTML").html(verifyBoxHTML);
    $("#IdentifiedPopUpHTML").css({
        "display": "block",
        "position": "fixed",
        "top": "200px",
        "left": "50%",
        "z-index": "1001",
        "margin-left": "-247px"
    })
}
;

// foreign login Start
// making this numbe rvar as to accomodate same declaration in identfication file
var phNumberRange = {
    "SH": { _MIN: 4, _MAX: 4 },
    "NU": { _MIN: 4, _MAX: 4 },
    "FK": { _MIN: 5, _MAX: 5 },
    "CK": { _MIN: 5, _MAX: 5 },
    "TK": { _MIN: 5, _MAX: 5 },
    "GS": { _MIN: 5, _MAX: 5 },
    "NC": { _MIN: 6, _MAX: 6 },
    "PM": { _MIN: 6, _MAX: 6 },
    "WF": { _MIN: 6, _MAX: 6 },
    "NF": { _MIN: 6, _MAX: 6 },
    "BZ": { _MIN: 7, _MAX: 7 },
    "CV": { _MIN: 7, _MAX: 7 },
    "KM": { _MIN: 7, _MAX: 7 },
    "ER": { _MIN: 7, _MAX: 7 },
    "FJ": { _MIN: 7, _MAX: 7 },
    "GW": { _MIN: 7, _MAX: 7 },
    "GY": { _MIN: 7, _MAX: 7 },
    "IS": { _MIN: 7, _MAX: 7 },
    "MV": { _MIN: 7, _MAX: 7 },
    "MH": { _MIN: 7, _MAX: 7 },
    "FM": { _MIN: 7, _MAX: 7 },
    "NR": { _MIN: 7, _MAX: 7 },
    "PW": { _MIN: 7, _MAX: 7 },
    "PG": { _MIN: 7, _MAX: 7 },
    "WS": { _MIN: 7, _MAX: 7 },
    "SC": { _MIN: 7, _MAX: 7 },
    "SB": { _MIN: 7, _MAX: 7 },
    "SR": { _MIN: 7, _MAX: 7 },
    "TO": { _MIN: 7, _MAX: 7 },
    "TV": { _MIN: 7, _MAX: 7 },
    "VU": { _MIN: 7, _MAX: 7 },
    "AN": { _MIN: 7, _MAX: 7 },
    "TL": { _MIN: 7, _MAX: 7 },
    "FO": { _MIN: 6, _MAX: 7 },
    "PN": { _MIN: 7, _MAX: 7 },
    "AW": { _MIN: 7, _MAX: 7 },
    "PF": { _MIN: 6, _MAX: 7 },
    "BH": { _MIN: 8, _MAX: 8 },
    "BJ": { _MIN: 8, _MAX: 8 },
    "BT": { _MIN: 8, _MAX: 8 },
    "BO": { _MIN: 8, _MAX: 8 },
    "BN": { _MIN: 7, _MAX: 8 },
    "BF": { _MIN: 8, _MAX: 8 },
    "BI": { _MIN: 8, _MAX: 8 },
    "CF": { _MIN: 8, _MAX: 8 },
    "TD": { _MIN: 8, _MAX: 8 },
    "CR": { _MIN: 8, _MAX: 8 },
    "CU": { _MIN: 8, _MAX: 8 },
    "CY": { _MIN: 8, _MAX: 8 },
    "DK": { _MIN: 8, _MAX: 8 },
    "DJ": { _MIN: 8, _MAX: 8 },
    "SV": { _MIN: 8, _MAX: 8 },
    "GQ": { _MIN: 8, _MAX: 8 },
    "EE": { _MIN: 7, _MAX: 8 },
    "GA": { _MIN: 8, _MAX: 8 },
    "GM": { _MIN: 7, _MAX: 8 },
    "GT": { _MIN: 8, _MAX: 8 },
    "GN": { _MIN: 8, _MAX: 8 },
    "HT": { _MIN: 8, _MAX: 8 },
    "HN": { _MIN: 8, _MAX: 8 },
    "KI": { _MIN: 8, _MAX: 8 },
    "KW": { _MIN: 8, _MAX: 8 },
    "LV": { _MIN: 8, _MAX: 8 },
    "LS": { _MIN: 8, _MAX: 8 },
    "LR": { _MIN: 8, _MAX: 8 },
    "LT": { _MIN: 7, _MAX: 8 },
    "ML": { _MIN: 8, _MAX: 8 },
    "MT": { _MIN: 8, _MAX: 8 },
    "MR": { _MIN: 8, _MAX: 8 },
    "MU": { _MIN: 8, _MAX: 8 },
    "MC": { _MIN: 8, _MAX: 8 },
    "NI": { _MIN: 8, _MAX: 8 },
    "NE": { _MIN: 8, _MAX: 8 },
    "NO": { _MIN: 8, _MAX: 8 },
    "OM": { _MIN: 8, _MAX: 8 },
    "PA": { _MIN: 8, _MAX: 8 },
    "QA": { _MIN: 8, _MAX: 8 },
    "SL": { _MIN: 8, _MAX: 8 },
    "SG": { _MIN: 8, _MAX: 8 },
    "SZ": { _MIN: 8, _MAX: 8 },
    "TG": { _MIN: 8, _MAX: 8 },
    "TN": { _MIN: 8, _MAX: 8 },
    "CC": { _MIN: 8, _MAX: 8 },
    "HK": { _MIN: 8, _MAX: 8 },
    "MO": { _MIN: 8, _MAX: 8 },
    "GI": { _MIN: 8, _MAX: 8 },
    "CX": { _MIN: 8, _MAX: 8 },
    "CI": { _MIN: 8, _MAX: 8 },
    "GL": { _MIN: 8, _MAX: 8 },
    "IO": { _MIN: 8, _MAX: 8 },
    "SJ": { _MIN: 8, _MAX: 8 },
    "AF": { _MIN: 9, _MAX: 9 },
    "AL": { _MIN: 9, _MAX: 9 },
    "DZ": { _MIN: 9, _MAX: 9 },
    "AD": { _MIN: 6, _MAX: 9 },
    "AO": { _MIN: 9, _MAX: 9 },
    "AM": { _MIN: 8, _MAX: 9 },
    "AZ": { _MIN: 9, _MAX: 9 },
    "BE": { _MIN: 8, _MAX: 9 },
    "BA": { _MIN: 8, _MAX: 9 },
    "BW": { _MIN: 8, _MAX: 9 },
    "BG": { _MIN: 8, _MAX: 9 },
    "KH": { _MIN: 9, _MAX: 9 },
    "CM": { _MIN: 9, _MAX: 9 },
    "CL": { _MIN: 8, _MAX: 9 },
    "CG": { _MIN: 9, _MAX: 9 },
    "CD": { _MIN: 9, _MAX: 9 },
    "HR": { _MIN: 8, _MAX: 9 },
    "CZ": { _MIN: 9, _MAX: 9 },
    "EC": { _MIN: 9, _MAX: 9 },
    "ET": { _MIN: 9, _MAX: 9 },
    "FR": { _MIN: 9, _MAX: 9 },
    "GE": { _MIN: 9, _MAX: 9 },
    "GH": { _MIN: 9, _MAX: 9 },
    "HU": { _MIN: 9, _MAX: 9 },
    "KG": { _MIN: 8, _MAX: 9 },
    "LB": { _MIN: 7, _MAX: 9 },
    "LY": { _MIN: 8, _MAX: 9 },
    "LI": { _MIN: 8, _MAX: 9 },
    "LU": { _MIN: 9, _MAX: 9 },
    "MG": { _MIN: 9, _MAX: 9 },
    "MW": { _MIN: 9, _MAX: 9 },
    "MD": { _MIN: 8, _MAX: 9 },
    "MN": { _MIN: 8, _MAX: 9 },
    "ME": { _MIN: 9, _MAX: 9 },
    "MA": { _MIN: 9, _MAX: 9 },
    "MZ": { _MIN: 9, _MAX: 9 },
    "MM": { _MIN: 9, _MAX: 9 },
    "NA": { _MIN: 8, _MAX: 9 },
    "MK": { _MIN: 9, _MAX: 9 },
    "PY": { _MIN: 9, _MAX: 9 },
    "PE": { _MIN: 9, _MAX: 9 },
    "PL": { _MIN: 9, _MAX: 9 },
    "PT": { _MIN: 9, _MAX: 9 },
    "RW": { _MIN: 9, _MAX: 9 },
    "ST": { _MIN: 9, _MAX: 9 },
    "SA": { _MIN: 9, _MAX: 9 },
    "SN": { _MIN: 9, _MAX: 9 },
    "RS": { _MIN: 9, _MAX: 9 },
    "SK": { _MIN: 9, _MAX: 9 },
    "SI": { _MIN: 8, _MAX: 9 },
    "SO": { _MIN: 9, _MAX: 9 },
    "SS": { _MIN: 9, _MAX: 9 },
    "ES": { _MIN: 9, _MAX: 9 },
    "LK": { _MIN: 9, _MAX: 9 },
    "SD": { _MIN: 9, _MAX: 9 },
    "SE": { _MIN: 8, _MAX: 9 },
    "CH": { _MIN: 9, _MAX: 9 },
    "SY": { _MIN: 9, _MAX: 9 },
    "TJ": { _MIN: 9, _MAX: 9 },
    "TZ": { _MIN: 9, _MAX: 9 },
    "TM": { _MIN: 9, _MAX: 9 },
    "UG": { _MIN: 9, _MAX: 9 },
    "AE": { _MIN: 9, _MAX: 9 },
    "UY": { _MIN: 9, _MAX: 9 },
    "UZ": { _MIN: 9, _MAX: 9 },
    "YE": { _MIN: 9, _MAX: 9 },
    "ZM": { _MIN: 9, _MAX: 9 },
    "PS": { _MIN: 9, _MAX: 9 },
    "XK": { _MIN: 8, _MAX: 9 },
    "RE": { _MIN: 9, _MAX: 9 },
    "MQ": { _MIN: 9, _MAX: 9 },
    "EH": { _MIN: 9, _MAX: 9 },
    "GP": { _MIN: 9, _MAX: 9 },
    "YT": { _MIN: 9, _MAX: 9 },
    "GF": { _MIN: 9, _MAX: 9 },
    "AG": { _MIN: 10, _MAX: 10 },
    "AU": { _MIN: 9, _MAX: 10 },
    "BS": { _MIN: 10, _MAX: 10 },
    "BB": { _MIN: 10, _MAX: 10 },
    "CA": { _MIN: 10, _MAX: 10 },
    "CO": { _MIN: 10, _MAX: 10 },
    "DM": { _MIN: 10, _MAX: 10 },
    "DO": { _MIN: 10, _MAX: 10 },
    "GR": { _MIN: 10, _MAX: 10 },
    "GD": { _MIN: 10, _MAX: 10 },
    "IN": { _MIN: 10, _MAX: 10 },
    "IE": { _MIN: 9, _MAX: 10 },
    "IL": { _MIN: 9, _MAX: 10 },
    "JM": { _MIN: 10, _MAX: 10 },
    "JO": { _MIN: 9, _MAX: 10 },
    "KZ": { _MIN: 10, _MAX: 10 },
    "KE": { _MIN: 9, _MAX: 10 },
    "MX": { _MIN: 10, _MAX: 10 },
    "NP": { _MIN: 9, _MAX: 10 },
    "NL": { _MIN: 9, _MAX: 10 },
    "NZ": { _MIN: 8, _MAX: 10 },
    "NG": { _MIN: 10, _MAX: 10 },
    "KP": { _MIN: 10, _MAX: 10 },
    "PH": { _MIN: 10, _MAX: 10 },
    "RO": { _MIN: 9, _MAX: 10 },
    "RU": { _MIN: 10, _MAX: 10 },
    "KN": { _MIN: 10, _MAX: 10 },
    "LC": { _MIN: 10, _MAX: 10 },
    "VC": { _MIN: 10, _MAX: 10 },
    "SM": { _MIN: 10, _MAX: 10 },
    "ZA": { _MIN: 10, _MAX: 10 },
    "KR": { _MIN: 9, _MAX: 10 },
    "TW": { _MIN: 9, _MAX: 10 },
    "TH": { _MIN: 9, _MAX: 10 },
    "TT": { _MIN: 10, _MAX: 10 },
    "UA": { _MIN: 10, _MAX: 10 },
    "US": { _MIN: 10, _MAX: 10 },
    "VN": { _MIN: 9, _MAX: 10 },
    "ZW": { _MIN: 9, _MAX: 10 },
    "VA": { _MIN: 10, _MAX: 10 },
    "YU": { _MIN: 8, _MAX: 10 },
    "UM": { _MIN: 10, _MAX: 10 },
    "VI": { _MIN: 10, _MAX: 10 },
    "MP": { _MIN: 10, _MAX: 10 },
    "TC": { _MIN: 10, _MAX: 10 },
    "VG": { _MIN: 10, _MAX: 10 },
    "KY": { _MIN: 10, _MAX: 10 },
    "AS": { _MIN: 10, _MAX: 10 },
    "GU": { _MIN: 10, _MAX: 10 },
    "BM": { _MIN: 10, _MAX: 10 },
    "MS": { _MIN: 10, _MAX: 10 },
    "PR": { _MIN: 10, _MAX: 10 },
    "AI": { _MIN: 10, _MAX: 10 },
    "AR": { _MIN: 10, _MAX: 11 },
    "BD": { _MIN: 10, _MAX: 11 },
    "BR": { _MIN: 10, _MAX: 11 },
    "CN": { _MIN: 11, _MAX: 11 },
    "EG": { _MIN: 10, _MAX: 11 },
    "FI": { _MIN: 8, _MAX: 11 },
    "IR": { _MIN: 10, _MAX: 11 },
    "IQ": { _MIN: 10, _MAX: 11 },
    "IT": { _MIN: 10, _MAX: 11 },
    "JP": { _MIN: 10, _MAX: 11 },
    "LA": { _MIN: 9, _MAX: 11 },
    "MY": { _MIN: 9, _MAX: 11 },
    "PK": { _MIN: 10, _MAX: 11 },
    "TR": { _MIN: 10, _MAX: 11 },
    "GB": { _MIN: 10, _MAX: 11 },
    "VE": { _MIN: 10, _MAX: 11 },
    "AT": { _MIN: 10, _MAX: 12 },
    "BY": { _MIN: 9, _MAX: 12 },
    "ID": { _MIN: 9, _MAX: 12 },
    "DE": { _MIN: 10, _MAX: 15 },
}

function fetchMinMax(iso) {
    if (phNumberRange[iso.toUpperCase()]) {
        return phNumberRange[iso.toUpperCase()];
    }
    return { _MIN: 10, _MAX: 10 }; // default value
}



function isValidDataType(e, value, iso) {
    let type = inputType(value);
    if (type) {
        setPopCookie('DTy', JSON.stringify(0)); // 0 for mail
        return checkValidMail(value);
    }
    else {
        setPopCookie('DTy', JSON.stringify(1)); // 1 for number
        return checkValidNumber(value, iso);
    }
}
function inputType(value) {
    let alphabetRegExp = new RegExp(/([a-zA-Z])/)
    let specialRegExp = new RegExp(/[./%&-@<>{}[]\\"":;!@#\$\^&\*\(\)\+]/)

    if (value.match(alphabetRegExp)) return 1;
    if (value.match(specialRegExp)) return 1;
    return 0;
}

function checkValidMail(value) {
    let emailRegExp = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    let checkValue = value.match(emailRegExp);
    if (checkValue) {
        let validRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);
        let spamRegEx = new RegExp(/<[^>]*>/g);
        if (!value.match(validRegEx) || value.match(spamRegEx)) {
            return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
        }
        return 1;
    } else {
        return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
    };
}

function checkValidNumber(value, iso) {
    let { _MIN, _MAX } = fetchMinMax(iso);
    if (Number.isInteger(value)) {
        value = value.toString();
    }
    value = value.replace(/\-|\s|\[|\]|\(|\)/ig, "");
    value = value.replace(/\+/g, "");

    if (!(value.length <= _MAX && value.length >= _MIN)) {
        if (value.length == 0 || value == "") return invalidMsgLogin("Please enter mobile number.") || 0;
        else {
            if (value.length > _MAX) return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
            else if (value.length < _MIN) return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
        }
    }

    return 1;
}


