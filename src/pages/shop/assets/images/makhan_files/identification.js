webAddressLocation = location.hostname;
var isIdentifiedPopupOpen = 1;
var webAddress = location.hostname;
var country_code;
var country_ip = "";
var ip_country = "";
var UrlPri2 = webAddress.match(/^dev/) ? "stg-" : (webAddress.match(/^stg/)) ? "stg-" : "";
var UrlPri = webAddress.match(/^dev/) ? "dev-" : (webAddress.match(/^stg/)) ? "stg-" : "";
var UrlPri3=webAddress.match(/^dev/)?"dev-":webAddress.match(/^stg/)?"dev-":"";
var country_ip_iden = "";
var country_iso_iden = "";
var country_nm_iden = "";
var identification_currect_version = 29;
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
    document.cookie = 'pop_mthd=' + pop_mthd_str + ';domain=.indiamart.com;expires=' + dt + ';path=/;';
    return;
}

var gaTrackingInitialize = function(){
    if (window.imgtm) {
        window.loginGATrack = function(eventName, eventValue, eventLabel, eventAction) {
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

$(document).ready(function() {
    setTimeout(function() {
        callIdentificationPopup();
    }, 3000)
});

if(document.querySelector('div#t0901_cls')!= null){
    document.querySelector('div#t0901_cls').addEventListener('click',function(event){
        $("html").css("overflow", "auto");
    })
};

function callIdentificationPopup() {
    if (typeof (rspv) !== "undefined") {
        if (rspv == 2 || rspv == 4 || rspv == 6) {
            var c_imesh = (typeof (readCookie("ImeshVisitor")) !== "undefined") ? readCookie("ImeshVisitor") : "";
            if (c_imesh == "" || c_imesh == null) {
                getIdentifiedPopUpHTMLForm1();
                setTimeout(function() {
                    identify_Banner()
                }, 1000);
                $("#IdentifiedPopUpHTML").on("click", "#countrySuggesterIdenPop", function() {
                    changePopUpInput(identifiedPopName, 1)
                });
                is_form_open = 0;
            }
        }
    }
}
// resend ! button . resend Timer.
function invalidmsg_ctl(mob_num, err_msg, err) {
    if (typeof (mob_num) !== "undefined" && mob_num != "" && err) {
        mob_num.style.borderColor = "red";
        err.innerHTML = err_msg;
        err.style.display = "block";
    }
}
function invalidmsg_ctl1(mob_num, err_msg, err) {
    mob_num.style.borderColor = "red";
    err.innerHTML = err_msg;
    err.style.display = "block";
    err.style.width = "354px";
    err.style.marginLeft = "0";
    err.style.textAlign = "center"
}
function validmsg_ctl(mob_num, err, flag) {
    if (1 == flag) {
        mob_num.style.borderColor = "#999";
        err.innerHTML = "";
        err.style.display = "none"
    }
}
function checkSuggester() {
    var utilsUrl = webAddressLocation.match(/^dev/) ? "//dev-utils.imimg.com/" : (webAddressLocation.match(/^stg/)) ? "//stg-utils.imimg.com/" : "//utils.imimg.com/";
    if (typeof (Suggester) == "undefined") {
        jselement_mcatname = document.createElement("script");
        if (typeof sugg_ver != "undefined" && sugg_ver != null && sugg_ver != "") {
            jselement_mcatname.src = utilsUrl + "suggest/js/" + sugg_ver
        } else {
            jselement_mcatname.src = utilsUrl + "suggest/js/jq-ac-ui.js"
        }
        jselement_mcatname.setAttribute("crossorigin", "anonymous");
        document.getElementsByTagName("head")[0].appendChild(jselement_mcatname)
    } else {
        countryFlagSuggesterIdentifiedPopup()
    }
}
function createCookieforidenty(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else {
        var expires = ""
    }
    document.cookie = name + "=" + value + expires + "; domain=.indiamart.com;path=/"
}
function get_DomainURL() {
    var mapi_domain = "mapi.indiamart.com";
    if (window.location.hostname.match(/dev-|dev\./ig)) {
        mapi_domain = "stg-mapi.indiamart.com"
    } else {
        if (window.location.hostname.match(/stg-|stg\./ig)) {
            mapi_domain = "stg-mapi.indiamart.com"
        }
    }
    return mapi_domain
}
function userDetailsAutoFetchforidenty(user_name) {
    // mbl_idn
    var cn_iso = $("#countryIso").val();
    var iploc = readCookie("iploc");
    var lat_val = (iploc != "") ? getparamVal(iploc, "GeoLoc_lt") : "";
    var long_val = (iploc != "") ? getparamVal(iploc, "lg") : "";
    var mapi_domain = get_DomainURL();
    var modid = "IMHOME";
    if (typeof (glmodid) != "undefined") {
        modid = glmodid
    }
    var params_request = {
        "username": user_name,
        "iso": cn_iso,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": cn_iso,
        "ip": country_ip_iden,
        "screen_name": "Identified Pop-Up",
        "Lat_val": lat_val,
        "Long_val": long_val,
        "country": ip_country
    };
    if (country_ip_iden == "" || country_ip_iden == "undefined") {
        callIdentifyAfterGettingIP(user_name, params_request)
    } else {
        callIdentify(user_name, params_request)
    }
}
function callIdentifyAfterGettingIP(user_name, params_request) {
    var iplocread = readCookie("iploc");
    country_code = (iplocread != "") ? getparamValIden(iplocread, "gcniso") : "";
    country_ip = (iplocread != "") ? getparamValIden(iplocread, "gip") : "";
    ip_country = (iplocread != "") ? getparamValIden(iplocread, "gcnnm") : "";
    if (typeof (country_code) != "undefined" && country_code != "") {
        $("#countryIso").val(country_code)
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
            success: function(data) {
                if(data.Response && data.Response.Data) {
                    iso_by_ip = data.Response.Data.geoip_countryiso;
                    country_ip = data.Response.Data.geoip_ipaddress;
                    ip_country = data.Response.Data.geoip_countryname;
                    if (iso_by_ip == "UK") {
                        iso_by_ip = "GB"
                    }
                    country_code = iso_by_ip;
                    if (country_ip != "" && country_ip != "undefined") {
                        params_request["ip"] = country_ip;
                        callIdentify(user_name, params_request)
                    }
                }
            }
        })
    }
}

function callToIdentifiedQ () {
    // $("#IdentifiedPopUpHTML").html("");
    return;
}

function callIdentify(user_name, params_request) {
    params_request ["service_code"] = 5;
    var cn_iso = $("#countryIso").val();
    document.getElementById("logintoidentify").disabled = true;
    $.ajax({
        url: "//"+UrlPri3+"utils.imimg.com/header/js/login.php",
        data: params_request,
        type: "POST",
        jsonpCallback: "create_callback",
        success: function(jsonResult) {
            var jsonResult = $.parseJSON(jsonResult);
            imeshUserData = jsonResult.DataCookie;
            var attributeId = 121;
            if (jsonResult != undefined && jsonResult["code"] == "200") {
                var access = jsonResult.access;
                if (access != undefined && access == "2") {
                    document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.reload();
                    return
                }
                var resultSet = jsonResult.DataCookie;
                var v4iilFlag = 0;
                var imeshVisrFlag = 0;
                if ((resultSet != undefined) && (resultSet != "")) {
                    imeshVisrFlag = 1;
                    var imesh_obj = {};
                    imesh_obj = new userDataCookie();
                    imesh_obj.set(resultSet);
                    getLoginStringv1();
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    var imesh = new userDataCookie().get();
                    var v4iil = readCookie(/*v4iilex*/"im_iss"); // will be renaming the instances to im_iss | removal of v4iilex
                    var glUserId = imesh.glid;
                    var name = imesh.fn;
                    var email = imesh.em;
                    var city = imesh.ct;
                    var ph_country = imesh.phcc;
                    var screen = "IDEN";
                    if (document.getElementById("myCheckbox").checked) {
                        var params = {
                            "r": "Newreqform/TermNCondition",
                            "s_glusrid": glUserId,
                            "s_user_agent": navigator.userAgent,
                            "modid": modid,
                            "s_ip": country_ip,
                            "s_ip_country": country_nm,
                            "s_ip_country_iso": iso_by_ip,
                            "curr_page_url": window.location.href,
                            "reference_text": "Identified Popup"
                        };
                        $.ajax({
                            url: "//" + UrlPri + "apps.imimg.com/index.php?",
                            type: "POST",
                            data: params,
                            crossDomain: true,
                            success: function(jsonResult1) {}
                        })
                    }
                    if (name != "" && email != "" && city != "") {
                        var flag = 4
                    } else {
                        var flag = 3
                    }
                    if (!(v4iil == "" || v4iil == null)) {
                        if (imesh.mb1) {
                            $("#overlay_s").css("display", "block");
                            send_otp(glUserId, modid, user_name, ph_country, attributeId, cn_iso, "2", 1, screen)
                        } else {
                            $("html").css("overflow", "auto");
                            callToIdentifiedQ();
                            $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp").hide();
                            $("#maskctl").hide();
                            $("#identyfy_usr_ctl").hide();
                            $("#overlay_s").css("display", "none");
                            $("html").css("overflow", "auto");
                            $("#IdentifiedPopUpHTML").html("")
                        }
                    } else {
                        if (imesh.mb1 && imesh.uv != "V") {
                            $("#overlay_s").css("display", "block");
                            $("#idn").css({
                                "width": "100%",
                                "height": "100%"
                            });
                            send_otp(glUserId, modid, user_name, ph_country, attributeId, cn_iso, "2", flag, screen)
                            $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp").hide();
                            $("#maskctl").hide();
                            $("#identyfy_usr_ctl").hide();
                            $("#overlay_s").css("display", "none");
                            $("html").css("overflow", "auto");
                            $("#IdentifiedPopUpHTML").html("");
                            if (modid == "IMHOME") {
                                window.location.reload();
                                return
                            }
                        } else {
                            $("html").css("overflow", "auto");
                            callToIdentifiedQ();
                            $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp").hide();
                            $("#maskctl").hide();
                            $("#identyfy_usr_ctl").hide();
                            $("#overlay_s").css("display", "none");
                            $("html").css("overflow", "auto");
                            $("#IdentifiedPopUpHTML").html("");
                            if (modid == "IMHOME") {
                                window.location.reload();
                                return
                            }
                        }
                    }
                    var pv_count = getparamValIden(readCookie("xnHist"), "pv");
                    var spv1 = getparamValIden(readCookie("sessid"), "spv");
                    if (typeof (glmodid) != "undefined") {
                        modid = glmodid
                    }
                    if (spv1 == 2) {
                        if (iso_by_ip == "IN") {
                            // yandex_impression_identification("Identification_login_popup_submit_2nd_Desktop_Indian")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_2nd_Indian'+modid]);
                        } else {
                            // yandex_impression_identification("Identification_login_popup_submit_2nd_Desktop_Foreign")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_2nd_Foreign'+modid]);
                        }
                    }
                    if (spv1 == 4) {
                        if (iso_by_ip == "IN") {
                            // yandex_impression_identification("Identification_login_popup_submit_4th_Desktop_Indian")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_4th_Indian'+modid]);
                        } else {
                            // yandex_impression_identification("Identification_login_popup_submit_4th_Desktop_Foreign")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_4th_Foreign'+modid]);
                        }
                    }
                    if (spv1 == 6) {
                        if (iso_by_ip == "IN") {
                            // yandex_impression_identification("Identification_login_popup_submit_6th_Desktop_Indian")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_6th_Indian'+modid]);
                        } else {
                            // yandex_impression_identification("Identification_login_popup_submit_6th_Desktop_Foreign")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_6th_Foreign'+modid]);
                        }
                    }
                    if (spv1 == 7) {
                        if (iso_by_ip == "IN") {
                            // yandex_impression_identification("Identification_login_popup_submit_7th_Desktop_Indian")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_7th_Indian'+modid]);
                        } else {
                            // yandex_impression_identification("Identification_login_popup_submit_7th_Desktop_Foreign")
                            _gaq.push(['_trackEvent', 'Identification', 'Submit_7th_Foreign'+modid]);
                        }
                    }
                }
            }
            if (jsonResult["code"] == "204") {
                var err_msg = jsonResult["msg"];
                if (jsonResult["message"] == "ISO MisMatch") {
                    var mob_box = document.getElementById("mbl_idn");
                    var err_div = document.getElementById("err-msg-mbl-ctl");
                    invalidmsg_ctl(mob_box, err_msg, err_div);
                    $("#logintoidentify").removeClass("load_s bgnn");
                    $("#logintoidentify").show();
                    $("#err-msg-mbl-ctl").css({
                        "text-align": "center",
                        "margin-left": "0px",
                        "width": "auto"
                    });
                    $("#spn").css("top", "8px");
                    document.getElementById("logintoidentify").disabled = false;
                    return false
                }
                if (err_msg == "User blocked for Identification") {
                    $("#mob_val").remove();
                    $("body").append('<input type="hidden" id="mob_val">');
                    document.getElementById("mob_val").value = $("#mbl_idn").val();
                    $("body").append('<input type="hidden" id="iso_restricted">');
                    document.getElementById("iso_restricted").value = $("#countryIso").val();
                    $("body").append('<input type="hidden" id="phcc_restricted">');
                    document.getElementById("phcc_restricted").value = $("#countrySuggesterIdenPop .value").html();
                    dropdownHtml = $("#countrySuggesterIdenPop").html();
                    $("html").css("overflow", "auto");
                    $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp").hide();
                    $("#maskctl").hide();
                    $("#identyfy_usr_ctl").hide();
                    $("#overlay_s").css("display", "none");
                    $("html").css("overflow", "auto");
                    $("#IdentifiedPopUpHTML").html("");
                    callImloginv1("R");
                    $("#logintoidentify").css("display", "inline-block");
                    $("#loading_s").css("display", "none");
                    return
                } else {
                    var mob_box = document.getElementById("mbl_idn");
                    var err_div = document.getElementById("err-msg-mbl-ctl");
                    if (jsonResult["msg"] && jsonResult["msg"].match("observed suspicious activity in your")) {
                        $("#logintoidentify").css("margin", "55px auto 0px")
                    }
                    invalidmsg_ctl(mob_box, err_msg, err_div);
                    err_div.style.width = "354px";
                    err_div.style.marginLeft = "0";
                    err_div.style.textAlign = "center";
                    $("#logintoidentify").removeClass("load_s bgnn");
                    $("#spn").css("display", "none");
                    $("#logintoidentify").show();
                    $(".loader").css("display", "none");
                    document.getElementById("logintoidentify").disabled = false;
                    return false
                }
            }
        },
        error: function(message) {
            var mob_box = document.getElementById("mbl_idn");
            var err_div = document.getElementById("err-msg-mbl-ctl");
            invalidmsg_ctl(mob_box, "Some error occurred. Please try after some time.", err_div)
        }
    })
}
function googThanks(ver_val) {
    $("html").css("overflow", "auto");
    callToIdentifiedQ();
    var PopUpHTML = '<div class="overlay_s" id="overlay_s"></div><div id="popupContact_s"><div id="maskctl"></div> <div id="identyfy_usr_ctl" style="display:no ne"  class="iden_bg wd_box1 ht-box" ><div class="ht50 pb10" style="height:80px;background:#2e3192;"><div class="pr-id pt10"> <p class="font_17" id="welcomeMsg" style="color:#dfe0fb!important;"><br><span class="font_34" id = "msg-id">Kaam Yahin Banta Hai </span></p> </div> </div> <div class="m_pop"> <div id="thankuMsg" class="tnkmsg wel-txt" style="display:no ne;margin:81px 0 -30px 0px;font-size:40px;text-align: center;"> Thank You !</div> <form id="identifiedForm" onsubmit="validateForm_userName(document.getElementById(\'mbl_idn\'),\'err-msg-mbl-ctl\');return false;"><div class="porl pr-id mt20"> <dl id="countrySuggesterIdenPop1" class="dropdown cntry_drpdwn2 tli" style="left: 91px;top:-1px" autocomplete="off"></dl> <input type="hidden" value="+91" id="MobCCode" name="MobCCode"> <input type="text" id="mbl_idn" class="input_pop flot_n" placeholder="Enter Your mobile number" style="margin-right:0px;"> <input type="hidden" value="" id="countryIso" name="countryIso"> <div id="err-msg-mbl-ctl" style="left:0px"></div> <div class="pr-id"> <div class="numbr" id ="spn" style="left:0; top:15px;position:absolute"><span class="check_icon"></span> Your Mobile Number is safe with us</div> <input type="submit" id="logintoidentify" class="submit_pop1 flot_n cp fll" value="CONTINUE" style="position:absolute; right:88px;"> </div> <div style="display:no ne" class="loader-container arc-rotate2 mloder2" id="indicatorLoader"> <div class="loader"> <div class="arc"></div> </div> </div> </div></div> </form> <div class="ic-btm"><div class="logoN" style="right:10px;"></div><a class="skptxt idfpclose" id="idfpclose" onclick="impTrack()">Skip</a></div></div></div>';
    $("#IdentifiedPopUpHTML").html(PopUpHTML);
    $("#err-msg-mbl-ctl").hide();
    $("#thankuMsg").show();
    $("#logintoidentify").css({
        "visibility": "hidden"
    });
    if (ver_val == 0) {
        $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp, #msg-id ").hide();
        setTimeout(function() {
            $("#maskctl").hide();
            $("#identyfy_usr_ctl").hide();
            $("#overlay_s").css("display", "none")
        }, 2000)
    } else {
        $("#idfpclose, #identifiedForm,  #indicatorLoader, #welComp").hide();
        setTimeout(function() {
            $("#maskctl").hide();
            $("#identyfy_usr_ctl").hide();
            $("#overlay_s").css("display", "none")
        }, 2000)
    }
}
var useremail = "";
var username = "";
var GLogo = "//" + UrlPri + "utils.imimg.com/globalhf/Glogo.png";
var googuser = 0;
var link1 = "//" + UrlPri + "my.indiamart.com/userprofile/contactprofile";
function showgoogleverify() {
    $("html").css("overflow", "auto");
    $("#IdentifiedPopUpHTML").html("");
    return true
}
function setEmailCookie(email, marked, fn) {
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
            imesh_obj.set(b)
        }
    }
    if (marked == 1) {
        if (offset1 = imeshval.indexOf("ev")) {
            b = strToObj(imeshval);
            b.ev = "V";
            imesh_obj.set(b)
        }
        if (offset1 = imeshval.indexOf("fn"),
        -1 != offset) {
            b = strToObj(imeshval);
            b.fn = fn;
            imesh_obj.set(b)
        }
    }
}
function emailProper(useremail1) {
    if ((useremail1 == "") || (useremail1.length == 0)) {
        $("#starMandatory").css("display", "block");
        $("#starMandatory").html("Please enter your Email ID.");
        return false
    } else {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(useremail1))) {
            $("#starMandatory").css("display", "block");
            $("#starMandatory").html("Invalid Email ID. Please enter the correct Email ID.");
            return false
        } else {
            return true
        }
    }
}
function anchorClick() {
    // yandex_impression_identification("Click_to_verify_IM_details_NoGoogle_" + modid);
    _gaq.push(['_trackEvent', 'Click_to_verify_IM_details', 'NoGoogle_' + modid]);
    myWindow = window.open(link1, "_self")
}
function attachSignin(element) {
    auth2.attachClickHandler(element, {}, function(googleUser) {
        // yandex_impression_identification("Click_On_Connect_With_Google_Button_" + modid);
        googuser = 1;
        username = googleUser.getBasicProfile().getName();
        useremail = googleUser.getBasicProfile().getEmail();
        $("#namename").css("display", "block");
        $("#gSignInWrapper").css("display", "none");
        $("#lineline").css("display", "none");
        $("#oror").css("display", "none");
        var val_imesh = readCookie("ImeshVisitor");
        var fn = (val_imesh != "") ? getparamValIden(val_imesh, "fn") : "";
        if (fn == "") {
            document.getElementById("nametext").value = username
        } else {
            document.getElementById("nametext").value = fn
        }
        document.getElementById("emailtext").value = useremail;
        $("#mm_pop").css("margin-top", "35px");
        $("#starMandatory").css("display", "none")
    }, function(error) {
        // yandex_impression_identification("Google_login_closed_" + modid)
        _gaq.push(['_trackEvent', 'Google', 'login_closed_' + modid]);
    })
}
function closePop() {
    if (googuser == 1) {
        // yandex_impression_identification("Google_IM_Email_Duplicate_Close_" + modid)
    } else {
        // yandex_impression_identification("Continue_With_Google_Close_" + modid)
    }
    $("html").css("overflow", "auto");
    callToIdentifiedQ();
    $("#maskctl").hide();
    $("#identyfy_usr_ctl").hide();
    $("#overlay_s").css("display", "none")
}
function validateForm_userName(mob_box, errdiv) {
    var LWG_call = $("#LWG").val();
    var mobVal = mob_box.value;
    var err_div = document.getElementById(errdiv);
    $("#logintoidentify").addClass("load_s bgnn");
    if ($("#countryIso").val() == "IN") {
        setPopCookie('FL',JSON.stringify(0)); // 1 for foreign

        if ((mobVal == "") || (mobVal.length == 0)) {
            invalidmsg_ctl(mob_box, "Please enter mobile number.", err_div);
            $("#logintoidentify").removeClass("load_s bgnn");
            return false
        } else {
            if ((/^[0-9-()\[\]\s]{0,30}$/).test(mobVal)) {
                var rmSpeChar = mobVal.replace(/\-|\s|\[|\]|\(|\)/ig, "");
                var mobValFilter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;
                var validMob = mobValFilter.test(mobVal);
                var cnt = rmSpeChar.length;
                if (cnt > 10) {
                    rmSpeChar = mobVal.replace(/^((91){0,1}0{0,})/g, "")
                }
                if (($("#MobCCode").val() == "+91" || $("#MobCCode").val() == "91" || $("#countryIso").val() == "IN") && (rmSpeChar.length != 10)) {
                    invalidmsg_ctl(mob_box, "Please enter 10 digit mobile number.", err_div);
                    $("#logintoidentify").removeClass("load_s bgnn");
                    return false
                } else {
                    if (($("#MobCCode").val() == "+91" || $("#MobCCode").val() == "91" || $("#countryIso").val() == "IN") && (validMob == false)) {
                        invalidmsg_ctl(mob_box, "Mobile Number should start with 1,6,7,8 or 9", err_div);
                        $("#logintoidentify").removeClass("load_s bgnn");
                        return false
                    } else {
                        if (rmSpeChar.length > 20) {
                            invalidmsg_ctl(mob_box, "Please enter correct mobile number.", err_div);
                            $("#logintoidentify").removeClass("load_s bgnn");
                            return false
                        } else {
                            validmsg_ctl(mob_box, err_div, 1);
                            if (typeof LWG_call != undefined && LWG_call == 1) {
                                var multiple_mob_numbers = $("#multi_mob_numbers_lwg").val();
                                // if (typeof multiple_mob_numbers != undefined && multiple_mob_numbers != "") {
                                //     var multi_mobs = multiple_mob_numbers.split(",");
                                //     if (jQuery.inArray(mobVal, multi_mobs) == -1) {
                                //         identifyViaLoginWithGoogleIden(mobVal, 0)
                                //     } else {
                                //         identifyViaLoginWithGoogleIden(mobVal, 1)
                                //     }
                                // } else {
                                //     identifyViaLoginWithGoogleIden(mobVal)
                                // }
                                userDetailsAutoFetchforidenty(document.getElementById("mbl_idn").value)

                            } else {
                                userDetailsAutoFetchforidenty(document.getElementById("mbl_idn").value)
                            }
                            $("#" + errdiv).html("");
                            $("#logintoidentify").css({
                                "visibility": "show"
                            });
                            $("#indicatorLoader").show();
                            return true
                        }
                    }
                }
            } else {
                invalidmsg_ctl(mob_box, "Please enter correct mobile number.", err_div);
                $("#logintoidentify").removeClass("load_s bgnn");
                return false
            }
        }
    } else {
        setPopCookie('FL',JSON.stringify(1)); // 1 for foreign

        if (typeof LWG_call != undefined && LWG_call == 1) {
            if(document.getElementById("mbl_idn").value == $("#gemail").text() )
                mobVal = $("#gemail").text()
            else mobVal = document.getElementById("mbl_idn").value;
        }
        if (isValidDataType(mob_box,mobVal,$("#countryIso").val()) ){
            userDetailsAutoFetchforidenty(mobVal);
            return true;
        }else{
            return false;
        }
        // if ((mobVal == "") || (mobVal.length == 0)) {
        //     invalidmsg_ctl(mob_box, "Please enter your Email ", err_div);
        //     $("#logintoidentify").removeClass("load_s bgnn");
        //     return false
        // } else {
        //     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mobVal))) {
        //         invalidmsg_ctl(mob_box, "Invalid Email ID. Please enter the correct Email ID.", err_div);
        //         $("#logintoidentify").removeClass("load_s bgnn");
        //         return false
        //     } else {
        //         validmsg_ctl(mob_box, err_div, 1);
        //         if (typeof LWG_call != undefined && LWG_call == 1) {
        //             // identifyViaLoginWithGoogleIden(mobVal)
        //             userDetailsAutoFetchforidenty(mobVal)

        //         } else {
        //             userDetailsAutoFetchforidenty(mobVal)
        //         }
        //     }
        // }
    }
}
function identifyViaLoginWithGoogleIden(username, multi_flag) {
    var mob_box = document.getElementById("mbl_idn");
    var err_div = document.getElementById("err-msg-mbl-ctl");
    _gaq.push(["_trackEvent", "Login_With_Google_identification", "Step2", modid, 0, 0]);
    var iso_by_ip = $("#countryIso").val();
    var iplocread = readCookie("iploc");
    if (typeof iso_by_ip == undefined || iso_by_ip == "") {
        iso_by_ip = (iplocread != "") ? getparamValIden(iplocread, "gcniso") : ""
    }
    country_ip = (iplocread != "") ? getparamValIden(iplocread, "gip") : "";
    country_nm = (iplocread != "") ? getparamValIden(iplocread, "gcnnm") : "";
    var ph_country = $("#MobCCode").val();
    var updated = $("#updatedusing").val();
    ph_country = ph_country.replace("+", "");
    $("#loading_s").css("display", "block");
    var url = "//"+UrlPri3+"utils.imimg.com/header/js/login.php";
    var params_request = {
        "username": username,
        "iso": iso_by_ip,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": iso_by_ip,
        "ip": country_ip,
        "ph_country": ph_country,
        "screen_name": "Identified Pop-Up",
        "gusername": gusrname,
        "gemail": gusremail,
        "service_code":6
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
        success: function(jsonResult) {
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
                        verifyEmailViaLWGIden(gusremail, glid);
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
                                send_otp(glUserId, modid, username, ph_country, "121", iso, "2", 1, "IDEN");
                                $("#loading_s").hide();
                                getLoginStringv1();
                                $("#overlay_s").show();
                                return true
                            }
                        } else {
                            if (modid == "IMHOME") {
                                window.location.reload()
                            }
                        }
                    } else {
                        if (msg == "New User created via User creation service") {
                            verifyEmailViaLWGIden(gusremail, glid);
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
                                    send_otp(glUserId, modid, username, ph_country, "121", iso, "2", 1, "IDEN");
                                    $("#loadinglwg").hide();
                                    getLoginStringv1();
                                    $("#overlay_s").show();
                                    return true
                                }
                            } else {
                                if (modid == "IMHOME") {
                                    window.location.reload()
                                }
                            }
                        } else {
                            if (msg == "Mobile Number found in Primary Mobile") {
                                verifyEmailViaLWGIden(gusremail, glid);
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
                                        send_otp(glUserId, modid, username, ph_country, "121", iso, "2", 1, "IDEN");
                                        $("#loadinglwg").hide();
                                        getLoginStringv1();
                                        $("#overlay_s").show();
                                        return true
                                    }
                                } else {
                                    if (modid == "IMHOME") {
                                        window.location.reload()
                                    }
                                }
                            }
                        }
                    }
                    $("#loadinglwg").hide();
                    $("#IdentifiedPopUpHTML").html("");
                    getLoginStringv1();
                    $("html").css("overflow", "auto");
                    return true
                }
            } else {
                if (jsonResult["code"] == "204") {
                    if (jsonResult["message"] == "ISO MisMatch") {
                        invalidmsg_ctl(mob_box, "You seem to be from India. Select India as Country.", err_div);
                        $("#countrySuggesterIdenPop").css("pointer-events", "auto");
                        $("#trm1").css("margin-left", "-55px");
                        $("#logintoidentify").removeClass("load_s bgnn")
                    } else {
                        if (jsonResult["message"].match(/suspicious/g)) {
                            var msg = jsonResult["message"];
                            invalidmsg_ctl(mob_box, msg, err_div);
                            $("#logintoidentify").removeClass("load_s bgnn");
                            $("#spn").css("display", "none");
                            $("#err-msg-mbl-ctl").css({
                                "text-align": "center",
                                "margin-left": "0px",
                                "width": "auto"
                            })
                        } else {
                            invalidmsg_ctl(mob_box, "Something went wrong. Please try again in sometime!", err_div);
                            $("#logintoidentify").removeClass("load_s bgnn")
                        }
                    }
                }
                $("#logintoidentify").css("display", "inline-block");
                $("#loading_s").css("display", "none")
            }
        }
    })
}
var identifiedPopName = "";
function getIdentifiedPopUpHTMLForm1() {
    var meta = document.createElement("link");
    meta.href = "https://fonts.googleapis.com/css?family=Roboto";
    meta.rel = "stylesheet";
    meta.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(meta);
    var meta2 = document.createElement("script");
    meta2.src = "https://apis.google.com/js/platform.js";
    document.getElementsByTagName("head")[0].appendChild(meta2);
    var modid = "IMHOME";
    if (typeof (glmodid) != "undefined") {
        modid = glmodid
    }
    if (country_ip == "" || country_ip == "undefined") {
        var iplocread = readCookie("iploc");
        iso_by_ip = (iplocread != "") ? getparamValIden(iplocread, "gcniso") : "";
        country_ip = (iplocread != "") ? getparamValIden(iplocread, "gip") : "";
        country_nm = (iplocread != "") ? getparamValIden(iplocread, "gcnnm") : "";
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
                success: function(data) {
                    if(data.Response && data.Response.Data) {
                        iso_by_ip = data.Response.Data.geoip_countryiso;
                        country_ip = data.Response.Data.geoip_ipaddress;
                        country_nm = data.Response.Data.geoip_countryname;
                        if (iso_by_ip == "UK") {
                            iso_by_ip = "GB"
                        }
                    }
                }
            })
        }
        if (iso_by_ip == "UK") {
            iso_by_ip = "GB"
        }
        if (typeof (iso_by_ip) == "undefined" || iso_by_ip == "") {
            iso_by_ip = "IN"
        }
        country_ip_iden = country_ip;
        country_iso_iden = country_code;
        country_nm_iden = ip_country
    }
    if (glmodid != "MDC") {
        setTimeout(function() {
            if (($("#enquiry").length) && (($("#enquiry").css("display")) == "block") || ((typeof (isBLFormOpen) != "undefined") && (isBLFormOpen == true)) || (($("#im-pop_s").length) && (($("#im-pop_s").css("display")) == "block"))) {
                $("#IdentifiedPopUpHTML").html("");
                identifiedPopName = "";
                is_form_open = 0
            }
        }, 2000)
    }
    var p_type = window.prod_serv;
    var webAddress = window.location.pathname;
    if (glmodid == "MY" || glmodid == "SELLERMY" || glmodid == "TDR" || glmodid == "BIGBUYER" || glmodid == "CTL" || webAddress == "/seller/") {
        $("#IdentifiedPopUpHTML").html("");
        identifiedPopName = "";
        is_form_open = 0;
        return
    } else {
        if (glmodid == "DIR") {
            var w_msg = '<span class="lookingfor">Looking for <br></span>';
            var spv1 = getparamValIden(readCookie("sessid"), "spv");
            if (location.href.match(/search.mp/)) {
                var p_nm = window.cat_name;
                var p_cnt = window.ims.r;
                var p_city = window.ims.cq_all
            } else {
                if (location.href.match(/impcat/)) {
                    if (typeof (window.cat_name) != "undefined") {
                        var p_nm = window.cat_name
                    } else {
                        p_nm = window.page.mcatName
                    }
                    if (typeof (window.ims.unq_list_count) != "undefined") {
                        var p_cnt = window.ims.unq_list_count
                    } else {
                        p_cnt = window.imd.unq_list_count
                    }
                    var p_city = window.ims.cq_all
                } else {
                    if (typeof (window.cat_name) != "undefined") {
                        var p_nm = window.cat_name
                    } else {
                        p_nm = window.page.mcatName
                    }
                    var p_city = window.city_nm;
                    if (typeof (p_city) != "undefined") {
                        p_city = p_city.charAt(0).toUpperCase() + p_city.slice(1)
                    }
                }
            }
            if (typeof (p_city) == "undefined") {
                p_city = "";
                p_cnt = "";
                var p_nm = "New Suppliers";
                w_msg = '<span class="lookingfor">Looking for <br></span>'
            } else {
                if (p_city == "") {
                    if (p_type == "P") {
                        if (spv1 == 4) {
                            var p_new_msg = "View supplier mobile no. for " + p_cnt + " products"
                        } else {
                            p_new_msg = "Login to connect with " + p_cnt + " verified suppliers"
                        }
                    } else {
                        if (spv1 == 4) {
                            var p_new_msg = "View supplier mobile no. for " + p_cnt + " services"
                        } else {
                            p_new_msg = "Login to connect with " + p_cnt + " verified suppliers"
                        }
                    }
                } else {
                    p_nm = "" + p_nm + " in " + p_city + "";
                    p_new_msg = "Choose from over 67 lakh suppliers "
                }
            }
            if (p_nm == "" || p_nm == "undefined") {
                var p_nm = "New Suppliers";
                p_new_msg = "Login to connect with verified suppliers ";
                w_msg = '<span class="lookingfor">Looking for <br></span>'
            }
            if (p_cnt == 0) {
                p_new_msg = "Login to connect with  verified suppliers "
            }
            var lwg_html_btn = '<div id="lwg_wrpr" style="margin-top:25px;"><p style="margin-top:-10px;font-size:14px;font-weight:600;">OR</p><div id="gSignInWrapper" style="margin: 10px 0px 15px 0px;text-align:center;"> <div id="signinBtn" class="customGPlusSignIn"> <span class="Gicon" style="height:39px;"> </span> <span class="buttonText"> Continue with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
            var PopUpHTML = '<style>#countrySuggesterIdenPop dt span.value{display:none}</style><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id ="idn" style="top: 100px;left: 0;position: fixed;z-index: 1001;width: 100%;background: transparent;"><div id="popupContact_s"><div id="maskctl"></div> <div id="identyfy_usr_ctl" style="display:none;"  class="iden_bg wd_box1 ht-box" ><div class="pb10" style="background:#2e3192;padding-bottom:5px"><div class="pr-id pt10"> <p class="font_26" id="welcomeMsg" style="color:#fff!important;padding:0 5px;">' + w_msg + ' <b class="pt5 diblk" id="ghead">' + p_nm + '?</b> <br> <span class="font_17" id="gemail"><i>' + p_new_msg + '</i></span> </p> </div></div><div><div><span class="f1_s" id="ghead1" style="padding-left:30px;font-size:16px;font-weight:600;margin-top:10px;margin-bottom:5px;display:none;"></span><span id="gemail1" style="padding-left:8px;font-size: 16px;font-weight: 600;display:none;"></span><div class="m_pop"><div id="thankuMsg" class="tnkmsg wel-txt" style="display:none;font-size:40px;text-align: center;"> Thank You !</div> <form id="identifiedForm" onsubmit="validateForm_userName(document.getElementById(\'mbl_idn\'),\'err-msg-mbl-ctl\');return false;"><div class="porl pr-id mt20" style="height:229px;"> <dl id="countrySuggesterIdenPop" class="dropdown cntry_drpdwn2 tli" style="left: 91px;top:-3px" autocomplete="off"></dl> <input type="hidden" value="+91" id="MobCCode" name="MobCCode"> <input type="text" id="mbl_idn" class="input_pop flot_n" onkeypress="return isNumberValid1(event)" style="margin-right:0px;" placeholder="Enter your mobile number"> <input type="hidden" value="" id="countryIso" name="countryIso"> <div id="err-msg-mbl-ctl" style="left:0px"></div> <div class="pr-id"> <div class="numbr" id ="spn" style="left:0; top:5px;position:inherit;margin-left: -150px;display: inline-block;margin-top:10px;"><span class="check_icon" style="display:inline-block;float:none;"></span> Your mobile number is safe with us</div><div id="trm1" style="line-height: 21px;font-size: 14px;top: 30px;position: absolute;"><label><input type="checkbox" id="myCheckbox" style="vertical-align:-2px;" onchange="activateButton1(this)"> I agree to the </label><a href="https://www.indiamart.com/terms-of-use.html" target="_blank">terms </a> and <a href="https://www.indiamart.com/privacy-policy.html" target="_blank"">privacy policy</a></div><input type="submit" id="logintoidentify" class="submit_pop2 flot_n cp fll" value="CONTINUE" style="right:54px !important;text-align:center;padding-left:0px;background-position:173px 11px;width:245px;margin:0 auto;margin-top:33px;"> </div><input type="hidden" value="" id="multi_mob_numbers_lwg">' + lwg_html_btn + '<div class="loaderlwg" style="display:none;margin:0 auto;margin-top:20px;"> <img style="vertical-align:bottom; text-align:left;" src="//utils.imimg.com/header/gifs/indicator.gif" alt="loading" height="32" width="32"></div><div style="display:none;" class="loader-container arc-rotate2 mloder2" id="indicatorLoader"> <div class="loader"><div class="arc"></div> </div> </div> </div></div> </form><div class="ic-btm1"><div class="c3"></div><div class="logoN" style="right:10px;"></div><a class="skptxt idfpclose" id="idfpclose" onclick="impTrack()">Skip</a> </div> </div></div></div>';
            $("#IdentifiedPopUpHTML").html(PopUpHTML);
            identifiedPopName = "-Form1";
            is_form_open = 0;
            var spv1 = getparamValIden(readCookie("sessid"), "spv");
            if (spv1 == 4 || spv1 == 6 || spv1 == 7) {
                $("#idfpclose").hide()
            }
            if (p_nm.length > 32 && p_nm.length < 52) {
                $("#identyfy_usr_ctl").css({
                    "width": "520px"
                });
                $("#identyfy_usr_ctl").css({
                    "height": "420px"
                });
                $("#lbl1").css({
                    "padding-left": "182px"
                });
                $(".lookingfor").css({
                    "font-size": "20px"
                });
                $("#ghead").css({
                    "font-size": "20px"
                });
                $("#countrySuggesterIdenPop dt span.value").css({
                    "height": "30px"
                })
            } else {
                if (p_nm.length > 52) {
                    $("#identyfy_usr_ctl").css({
                        "width": "520px"
                    });
                    $("#identyfy_usr_ctl").css({
                        "height": "420px"
                    });
                    $("#lbl1").css({
                        "padding-left": "182px"
                    });
                    $(".lookingfor").css({
                        "font-size": "20px"
                    });
                    $("#ghead").css({
                        "font-size": "20px"
                    });
                    $("#countrySuggesterIdenPop dt span.value").css({
                        "height": "30px"
                    })
                } else {
                    $("#identyfy_usr_ctl").css({
                        "height": "400px"
                    })
                }
            }
        } else {
            if ((glmodid == "ETO" && location.href.match(/buyersearch.mp/))) {
                if (document.getElementById("SearchBuyerCount") != null) {
                    var div = document.getElementById("SearchBuyerCount").innerText
                }
                if (!(document.getElementById("titlesearch") === null)) {
                    var mcat = document.getElementById("titlesearch").value
                }
                var p_msg = "Buy Leads to choose from !";
                if (typeof mcat != "undefined") {
                    var mcat_nm = "Buyers of " + mcat + "";
                    if (typeof div != undefined && div != "") {
                        var mcat_cnt = div.match(/\d+/g)
                    }
                    p_msgng = "" + mcat_cnt + " " + p_msg + ""
                } else {
                    mcat_nm = "New Buyers";
                    p_msgng = "Various " + p_msg + ""
                }
                var lwg_html_btn = '<div id="lwg_wrpr" style="margin-top:25px;"><p style="margin-top:-10px;font-size:14px;font-weight:600;">OR</p><div id="gSignInWrapper" style="margin: 10px 0px 15px 0px;text-align:center;"> <div id="signinBtn" class="customGPlusSignIn"> <span class="Gicon" style="height:39px;"> </span> <span class="buttonText"> Continue with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
                var PopUpHTML = '<style>#countrySuggesterIdenPop dt span.value{display:none}</style><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id ="idn" style="top: 100px;left: 0;position: fixed;z-index: 1001;width: 100%;background: transparent;"><div id="popupContact_s"><div id="maskctl"></div> <div id="identyfy_usr_ctl" style="display:none"  class="iden_bg wd_box1 ht-box" ><div class="pb10" style="background:#2e3192;padding-bottom:5px"><div class="pr-id pt10"> <p class="font_26 lookingfor" id="welcomeMsg" style="color:#fff!important;">Looking For <br> <b class="pt5 diblk" id="ghead"> ' + mcat_nm + '?</b> <br> <span class="font_10"><i id="gemail">' + p_msgng + '</i></span> </p> </div> </div> <div class="m_pop"> <div id="thankuMsg" class="tnkmsg wel-txt" style="display:none;font-size:40px;text-align: center;"> Thank You !</div> <form id="identifiedForm" onsubmit="validateForm_userName(document.getElementById(\'mbl_idn\'),\'err-msg-mbl-ctl\');return false;"><div class="porl pr-id mt20"> <dl id="countrySuggesterIdenPop" class="dropdown cntry_drpdwn2 tli" style="left: 91px;top:0px" autocomplete="off"></dl> <input type="hidden" value="+91" id="MobCCode" name="MobCCode"> <input type="text" id="mbl_idn" class="input_pop flot_n" onkeypress="return isNumberValid1(event)" placeholder="Enter Your mobile number" style="margin-right:0px;"> <input type="hidden" value="" id="countryIso" name="countryIso"> <div id="err-msg-mbl-ctl" style="left:0px"></div> <div class="pr-id"> <div class="numbr" id ="spn" style="left:0; top:5px;position:inherit;display:inline-block;margin-left:-150px;margin-top:10px;"><span class="check_icon"></span> Your mobile number is safe with us</div> <div id="trm1" style="line-height: 21px;font-size: 14px;position: absolute;top: 30px; "><label><input type="checkbox" id="myCheckbox" style="vertical-align:-2px;" onchange="activateButton1(this)"> I agree to the </label><a href="https://www.indiamart.com/terms-of-use.html" target="_blank">terms </a> and <a href="https://www.indiamart.com/privacy-policy.html" target="_blank"">privacy policy</a></div><input type="submit" id="logintoidentify" class="submit_pop2 flot_n cp fll" value="CONTINUE" style="right:54px !important;background-position:173px 11px;width:245px;margin:33px auto 0px;text-align:center;padding-left:0px;"> </div><input type="hidden" value="" id="multi_mob_numbers_lwg">' + lwg_html_btn + '<div class="loaderlwg" style="display:none;margin:0 auto;margin-top:20px;"> <img style="vertical-align:bottom; text-align:left;" src="//utils.imimg.com/header/gifs/indicator.gif" alt="loading" height="32" width="32"></div> <div style="display:none" class="loader-container arc-rotate2 mloder2" id="indicatorLoader"> <div class="loader"> <div class="arc"></div> </div> </div> </div></div> </form> <div class="ic-btm1"><div class="c3"></div><div class="logoN" style="right:10px;"></div><a class="skptxt idfpclose" id="idfpclose" onclick="impTrack()">Skip</a> </div> </div></div></div>';
                $("#IdentifiedPopUpHTML").html(PopUpHTML);
                identifiedPopName = "-Form1";
                is_form_open = 0;
                var spv1 = getparamValIden(readCookie("sessid"), "spv");
                if (spv1 == 4 || spv1 == 6 || spv1 == 7) {
                    $("#idfpclose").hide()
                }
                if (mcat_nm.length > 32 && mcat_nm.length <= 52) {
                    $("#identyfy_usr_ctl").css({
                        "width": "520px"
                    });
                    $("#identyfy_usr_ctl").css({
                        "height": "420px"
                    });
                    $(".lookingfor").css({
                        "font-size": "20px"
                    });
                    $("#ghead").css({
                        "font-size": "20px"
                    });
                    $("#countrySuggesterIdenPop dt span.value").css({
                        "height": "30px"
                    })
                } else {
                    if (mcat_nm.length > 52) {
                        $("#identyfy_usr_ctl").css({
                            "width": "520px"
                        });
                        $("#identyfy_usr_ctl").css({
                            "height": "400px"
                        });
                        $(".lookingfor").css({
                            "font-size": "20px"
                        });
                        $("#ghead").css({
                            "font-size": "20px"
                        });
                        $("#countrySuggesterIdenPop dt span.value").css({
                            "height": "30px"
                        })
                    } else {
                        $("#identyfy_usr_ctl").css({
                            "height": "400px"
                        })
                    }
                }
            } else {
                var spv1 = getparamValIden(readCookie("sessid"), "spv");
                if (glmodid == "ETO") {
                    var gen_msg1 = "Looking for new buyers?";
                    var gen_msg2 = "Expand your network with a click !";
                    var logo_im = '<div class="logoN" style="right:10px;"></div>'
                } else {
                    if (glmodid == "MDC") {
                        var gen_msg1 = "Help us know you better";
                        var gen_msg2 = "";
                        var logo_im = ""
                    } else {
                        if (glmodid == "FCP") {
                            var gen_msg1 = "Looking for best deals?";
                            var gen_msg2 = "";
                            var logo_im = ""
                        } else {
                            if (glmodid == "PRODDTL") {
                                var tmp = readCookie("sessid");
                                var spv1 = tmp.substr(tmp.indexOf("=") + 1);
                                if (spv1 == 3 || spv1 == 2) {
                                    var gen_msg1 = "Unlock the best of IndiaMART";
                                    var gen_msg2 = "Connect to top suppliers instantly"
                                } else {
                                    var gen_msg1 = "Help us serve you better";
                                    var gen_msg2 = "Get product & seller details instantly"
                                }
                                var logo_im = '<div class="logoN" style="right:10px;"></div>'
                            } else {
                                if (spv1 == 3 || spv1 == 2) {
                                    var gen_msg1 = "Find Buyers & Suppliers Online";
                                    var gen_msg2 = "Save Time,Money and Effort"
                                } else {
                                    var gen_msg1 = "You're Missing Out !!";
                                    var gen_msg2 = "Connect with Buyers and Sellers Anytime"
                                }
                                var logo_im = '<div class="logoN" style="right:10px;"></div>'
                            }
                        }
                    }
                }
                var lwg_html_btn = '<div id="lwg_wrpr" style="margin-top:25px;"><p style="margin-top:-10px;font-size:14px;font-weight:600;">OR</p><div id="gSignInWrapper" style="margin: 10px 0px 15px 0px;text-align:center;"> <div id="signinBtn" class="customGPlusSignIn"> <span class="Gicon" style="height:39px;"> </span> <span class="buttonText"> Continue with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
                var PopUpHTML = '<style>#countrySuggesterIdenPop dt span.value{display:none}</style><div class="overlay_s" id="overlay_s" style="display: none;"></div><div id ="idn" style="top: 100px;left: 0;position: fixed;z-index: 1001;width: 100%;background: transparent;"><div id="popupContact_s"><div id="maskctl"></div> <div id="identyfy_usr_ctl" style="display:none;height:400px;"  class="iden_bg wd_box1 ht-box" ><div class="ht50 pb10" style="height:80px;background:#2e3192;"><div class="pr-id pt10"> <div class="font_17" id="welcomeMsg" style="color:#dfe0fb!important;"><span class="font_34" id ="ghead">' + gen_msg1 + ' </span><br><i id="gemail"> ' + gen_msg2 + ' </i></div> </div> </div><span class="f1_s" id="ghead1" style="padding-left:30px;font-size:16px;font-weight:600;margin-top:10px;margin-bottom:5px;display:none;"></span><span id="gemail1" style="padding-left:8px;font-size: 16px;font-weight: 600;display:none;"></span> <div class="m_pop"> <div id="thankuMsg" class="tnkmsg wel-txt" style="display:none;margin:78px 0 -30px 0px;font-size:40px;text-align: center;"> Thank You !</div> <form id="identifiedForm" onsubmit="validateForm_userName(document.getElementById(\'mbl_idn\'),\'err-msg-mbl-ctl\');return false;"><div class="porl pr-id mt20"> <dl id="countrySuggesterIdenPop" class="dropdown cntry_drpdwn2 tli" style="left: 91px;top:-3px" autocomplete="off"></dl> <input type="hidden" value="+91" id="MobCCode" name="MobCCode"> <input type="text" id="mbl_idn" class="input_pop flot_n" onkeypress="return isNumberValid1(event)" placeholder="Enter your mobile number" style="margin-right: 0px; width: 253px; padding-left: 119px;"> <input type="hidden" value="" id="countryIso" name="countryIso"> <div id="err-msg-mbl-ctl" style="left:0px"></div> <div class="pr-id"> <div class="numbr" id ="spn" style="left:0; top:5px;position:inherit;display:inline-block;margin-left:-150px;margin-top:10px;"><span class="check_icon"></span> Your mobile number is safe with us</div><div id="trm1" style="line-height: 21px;font-size: 14px;position: absolute;top: 30px; "><label><input type="checkbox" id="myCheckbox" style="vertical-align:-2px;" onchange="activateButton1(this)"> I agree to the </label><a href="https://www.indiamart.com/terms-of-use.html" target="_blank">terms </a> and <a href="https://www.indiamart.com/privacy-policy.html" target="_blank"">privacy policy</a></div> <input type="submit" id="logintoidentify" class="submit_pop2 flot_n cp fll" value="CONTINUE" style="right:54px !important;background-position:173px 11px;width:245px;margin:33px auto 0px;text-align:center;padding-left:0px;"> </div><input type="hidden" value="" id="multi_mob_numbers_lwg">' + lwg_html_btn + '<div class="loaderlwg" style="display:none;margin:0 auto;margin-top:20px;"> <img style="vertical-align:bottom; text-align:left;" src="//utils.imimg.com/header/gifs/indicator.gif" alt="loading" height="32" width="32"></div> <div style="display:none" class="loader-container arc-rotate2 mloder2" id="indicatorLoader"> <div class="loader"> <div class="arc"></div> </div> </div> </div></div> </form> <div class="ic-btm1"><div class="c3"></div>' + logo_im + '<a class="skptxt idfpclose" id="idfpclose" onclick="impTrack()">Skip</a></div></div></div></div>';
                if (glmodid == "PRODDTL") {
                    var Prod_var = window.enq_dsbl;
                    if (typeof (Prod_var) != "undefined" && Prod_var == 1) {
                        $("#IdentifiedPopUpHTML").html(PopUpHTML);
                        identifiedPopName = "-Form1";
                        $("#f34").css({
                            "font-size": "31px"
                        });
                        is_form_open = 0
                    } else {
                        $("#IdentifiedPopUpHTML").html("");
                        identifiedPopName = "";
                        is_form_open = 0;
                        return
                    }
                } else {
                    $("#IdentifiedPopUpHTML").html(PopUpHTML);
                    identifiedPopName = "-Form1";
                    is_form_open = 0
                }
                if (glmodid == "IMHOME" && spv1 == 2) {
                    $("#identyfy_usr_ctl").css({
                        "width": "540px"
                    })
                }
                if (spv1 == 4 || spv1 == 6 || spv1 == 7) {
                    $("#idfpclose").hide()
                }
                if (glmodid == "MDC" || glmodid == "FCP") {
                    $("#welcomeMsg").css({
                        "line-height": "56px"
                    })
                }
                0
            }
        }
    }
    if (glmodid == "ETO") {
        if (glmodid == "ETO") {
            $("#countrySuggesterIdenPop dt span.value").css({
                "bottom": "2px !important",
                "font-size": "14px !important"
            })
        }
    }
    if (!(($("#enquiry").length) && (($("#enquiry").css("display")) == "block") || ((typeof (isBLFormOpen) != "undefined") && (isBLFormOpen == true)) || (($("#im-pop_s").length) && (($("#im-pop_s").css("display")) == "block")))) {
        $("html").css("overflow", "hidden")
    }
    var clientID = "";
    if (UrlPri == "dev-" || UrlPri == "stg-") {
        clientID = "335658149809-o25hpstdu2tdo43j8ppg8l6n6i0dtfl0.apps.googleusercontent.com"
    } else {
        clientID = "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com"
    }
    meta2.onload = function() {
        gapi.load("auth2", function() {
            auth2 = gapi.auth2.init({
                client_id: clientID
            });
            googleSigninIden(document.getElementById("signinBtn"))
        })
    }
}
// 
function googleSigninIden(element) {
    auth2.attachClickHandler(element, {}, function(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        gusrname = googleUser.getBasicProfile().getName();
        gusremail = googleUser.getBasicProfile().getEmail();
        if (gusremail != "") {
            checkEmailExistOrNotIden(gusremail, id_token)
        }
        if (gusrname != "") {}
        if (gusremail != "") {
            _gaq.push(["_trackEvent", "Login_With_Google_identification", "Step1", modid, 0, 0]);
            // $(".mobile_label").html('Mobile Number <span style="color:red;">*</span>');
            $("#gemail").css("display", "inline-block");
            // if (($("#countryIso").val() != "IN")) {
            //     $("#mbl_idn").attr("placeholder", "Enter your Mobile Number");
            //     $(".mobile_label").html('Mobile Number <span style="color:blue;font-size:11px;">(Optional)</span>')
            // }
            $("#lwg_wrpr").hide();
            $("#LWG").val(1)
        }
    }, function(error) {})
}
function checkEmailExistOrNotIden(gusremail, id_token) {
    var iso = $("#iso").val();
    var ph_country = $("#MobCCode").val();
    var updated = $("#updatedusing").val();
    if (!$("#iso").val()) {
        $("#iso").val(iso_by_ip)
    }
    var mob_box = document.getElementById("mbl_idn");
    var err_div = document.getElementById("err-msg-mbl-ctl");
    $(".loaderlwg").css("display", "block");
    var url = "//"+UrlPri3+"utils.imimg.com/header/js/login.php";
    var params_request = {
        "username": gusremail,
        "iso": iso,
        "modid": modid,
        "format": "JSON",
        "create_user": 1,
        "originalreferer": window.location.href,
        "GEOIP_COUNTRY_ISO": iso,
        "ip": country_ip,
        "screen_name": "Identified Pop-Up",
        "id_token": id_token,
        "gusername": gusrname,
        "guseremail": gusremail,
        "ph_country": ph_country,
        "service_code":7
    };
    $.ajax({
        url: url,
        type: "POST",
        data: params_request,
        jsonpCallback: "create_callback",
        crossDomain: true,
        success: function(jsonResult) {
            var jsonResult = $.parseJSON(jsonResult);
            if (jsonResult["code"] == 200) {
                var access = jsonResult["access"];
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
                    verifyEmailViaLWGIden(gusremail, glid);
                    var loginSet = jsonResult.LoginCookie;
                    var tokenSet = jsonResult.im_iss;
                    imesh_obj.set(data1, "ImeshVisitor");
                    // v4iilex_obj.set(loginSet, "v4iilex");
                    im_iss_obj.set(tokenSet, "im_iss");
                    getLoginStringv1();
                    if (typeof isBLFormOpen != "undefined") {
                        callToIdentifiedQ()
                    }
                    $("#IdentifiedPopUpHTML").html("");
                    $("html").css("overflow", "auto");
                    if (modid == "IMHOME") {
                        window.location.reload();
                        return
                    }
                    return
                }
            } else {
                if (jsonResult["code"] == "204") {
                    var err_msg = jsonResult["msg"];
                    if (jsonResult["message"] == "ISO MisMatch") {
                        invalidmsg_ctl(mob_box, err_msg, err_div);
                        $("#countrySuggesterIdenPop").css("pointer-events", "auto");
                        $("#trm1").css("margin-left", "-55px")
                    } else {
                        if (jsonResult["message"].match(/suspicious/g)) {
                            var msg = jsonResult["message"];
                            $("#logintoidentify").removeClass("load_s bgnn");
                            $("#spn").css("display", "none");
                            $("#err-msg-mbl-ctl").css({
                                "text-align": "center",
                                "margin-left": "0px",
                                "width": "auto"
                            });
                            $(".loaderlwg").css("display", "none");
                            invalidmsg_ctl(mob_box, err_msg, err_div)
                        } else {
                            if (jsonResult["message"] == "We have multiple account linked with this Email ID") {
                                $("#ghead").html("Sign in to continue as " + gusrname);
                                $("#ghead").css("font-size", "22px");
                                $("#gemail").html(gusremail);
                                $(".lookingfor").hide();
                                $(".loaderlwg").css("display", "none");
                                $("#countrySuggesterIdenPop").css("pointer-events", "none");
                                var msg = jsonResult["message"];
                                $("#ghead1").text("We have found multiple accounts linked with this Email ID.");
                                $("#gemail1").text("Please enter your registered mobile number to continue");
                                $("#gemail1").css("display", "inline-block");
                                $("#ghead1").show();
                                var mobile_numbers = jsonResult["data_num"];
                                $("#multi_mob_numbers_lwg").val(mobile_numbers)
                            } else {
                                if (jsonResult["message"] == "No Email found in Primary Email") {
                                    $("#ghead").html("Sign in to continue as " + gusrname);
                                    $("#ghead").css("font-size", "22px");
                                    $("#gemail").html(gusremail);
                                    $("#gemal_icn").css({
                                        "display": "inline-block",
                                        "background-position": "-72px -9px"
                                    });
                                    $(".lookingfor").hide();
                                    $(".loaderlwg").css("display", "none");
                                    $("#countrySuggesterIdenPop").css("pointer-events", "none")
                                } else {
                                    if (jsonResult["message"] == "Invalid Token ID") {
                                        invalidmsg_ctl(mob_box, "Invalid token request", err_div)
                                    } else {
                                        invalidmsg_ctl(mob_box, err_msg, err_div)
                                    }
                                }
                            }
                        }
                    }
                }
                $("#logintoidentify").css("display", "block");
                $("#loading_s").css("display", "none")
            }
        }
    })
}
function verifyEmailViaLWGIden(email, glid) {
    var iso = $("#iso").val();
    var ph_country = $("#MobCCode").val();
    var mid = glmodid;
    if (typeof mid == undefined || mid == "") {
        mid = "DIR"
    }
    var screen_name = "Email Verification via login with google - desktop";
    var verparams = {
        "token": "imobile@15061981",
        "format": "JSON",
        "glusr_id": glid,
        "em": email,
        "mid": mid,
        "countIP": country_ip,
        "IPcount": ph_country,
        "lwg_screen": screen_name,
        'service_code': 8
    };
    $.ajax({
        url: "//"+UrlPri3+"utils.imimg.com/header/js/login.php",
        data: verparams,
        type: "POST",
        crossDomain: true,
        success: function(resultJson) {
            setEmailCookieLoginIden(email, 1)
        }
    })
}
function setEmailCookieLoginIden(email, marked) {
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
var fieldFlag = 1;
function isNumberValid1(evt) {
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
function impTrack() {
    $("html").css("overflow", "auto");
    var modid = "IMHOME";
    var xnh = readCookie("xnHist");
    var pv_count = getparamValIden(readCookie("xnHist"), "pv");
    var spv1 = getparamValIden(readCookie("sessid"), "spv");
    if (typeof (glmodid) != "undefined") {
        modid = glmodid
    }
    if (spv1 == 2) {
        // yandex_impression_identification("Identification_login_popup_close_2nd_" + modid)
        _gaq.push(['_trackEvent', 'Identification', 'login_popup_close_2nd_' + modid]);
    }
    if (spv1 == 4) {
        // yandex_impression_identification("Identification_login_popup_close_4th_" + modid)
        _gaq.push(['_trackEvent', 'Identification', 'login_popup_close_4th_' + modid]);
    }
    if (spv1 == 6) {
        // yandex_impression_identification("Identification_login_popup_close_6th_" + modid)
        _gaq.push(['_trackEvent', 'Identification', 'login_popup_close_6th_' + modid]);
    }
    if (spv1 == 7) {
        // yandex_impression_identification("Identification_login_popup_close_7th_" + modid)
        _gaq.push(['_trackEvent', 'Identification', 'login_popup_close_7th_' + modid]);
    }
}
var isTermsAndConditionChecked = false;
function activateButton(element) {
    if (element && element.checked) {
        isTermsAndConditionChecked = true;
        $("#err-msg-mbl-ctl").hide()
    } else {
        isTermsAndConditionChecked = false
    }
}
var arr = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB"];
function changePopUpInput(identifiedPopName, flag) {
    var LWG_call = $("#LWG").val();
    var alrdy_pop_len_sinin = $("#im-pop_s").length;
    if (alrdy_pop_len_sinin != 1) {
        var mob_box = document.getElementById("mbl_idn");
        var err_div = document.getElementById("err-msg-mbl-ctl");
        $("#trm1").css("display", "none");
        if (glmodid == "FCP" || glmodid == "MDC") {
            var validnE = '<span class="check_icon" style="display:inline-block;float:none; margin-left: -50px;"></span>Your Email is safe with us';
            var validnM = '<span class="check_icon" style="display:inline-block;float:none;margin-left:30px;"></span>A 4-digit OTP will be sent on this number';
            $("#spn").css("display", "flex");
            $("#spn").css("justify-content", "center");
            $("#spn").css("align-items", "center")
        } else {
            var validnM = '<span class="check_icon" style="display:inline-block;float:none;"></span>Your mobile number is safe with us';
            var validnE = '<span class="check_icon" style="display:inline-block;float:none; margin-left:-50px;"></span>Your Email or moble is safe with us';
            $("#spn").css("display", "flex");
            $("#spn").css("justify-content", "center");
            $("#spn").css("align-items", "center")
        }
        if ($("#countryIso").val() == "") {
            var iplocread = readCookie("iploc");
            country_code = (iplocread != "") ? getparamValIden(iplocread, "gcniso") : "";
            country_ip = (iplocread != "") ? getparamValIden(iplocread, "gip") : "";
            ip_country = (iplocread != "") ? getparamValIden(iplocread, "gcnnm") : "";
            if (typeof (country_code) != "undefined" && country_code != "") {
                $("#countryIso").val(country_code)
            }
        }
        // 
        if ($("#countryIso").val() != "IN") {
            $("#mbl_idn").attr("maxlength", "100");
            fieldFlag = 2;
            var iso = $("#countryIso").val();
            if (iso == "" || typeof (iso) == "undefined") {
                iso = country_code
            }
            var isEuroCountry = false;
            if ($("#countryIso").val() != "IN") {
                isEuroCountry = true
            }
            if (isEuroCountry && $("#IdentifiedPopUpHTML").html() != "") {
                $("#trm1").css("display", "block");
                document.getElementById("logintoidentify").disabled = true;
                $("#logintoidentify").css("background-color", "#b2b2b2");
                $("#myCheckbox").attr("checked", false);
                if (glmodid == "DIR") {
                    $("#identyfy_usr_ctl").css({
                        "height": "400px"
                    })
                }
            } else {
                if ($("#IdentifiedPopUpHTML").html() != "") {
                    document.getElementById("logintoidentify").disabled = false;
                    $("#logintoidentify").css("background-color", "#00a699")
                }
            }
            $("#countrySuggesterIdenPop dt span.value").css({
                "display": "inline-block",
                "height": "32px",
                "padding": "7px 4px 2px 3px"
            });
            validmsg_ctl(mob_box, err_div, flag);
            $("#identifiedForm #mbl_idn").css({
                "width": "306px"
            });
            $("#identifiedForm #mbl_idn").css({
                "padding-left": "100px"
            });
            $("#identifiedForm #mbl_idn").attr("placeholder", "Enter your Email or Mobile");
            if (typeof LWG_call != undefined && LWG_call == 1) {
                $("#mbl_idn").attr("placeholder", "Enter your Mobile Number")
            }
            $("#identifiedForm #spn").html(validnE);
            $("#identifiedForm #mbl_idn").val("")
        } else {
            $("#mbl_idn").attr("maxlength", "10");
            fieldFlag = 1;
            document.getElementById("logintoidentify").disabled = false;
            $("#logintoidentify").css("background-color", "#00a699");
            validmsg_ctl(mob_box, err_div, flag);
            $("#countrySuggesterIdenPop dt span.value").css({
                "display": "inline-block",
                "height": "32px",
                "padding": "7px 4px 2px 3px"
            });
            if (glmodid == "ETO") {
                $("#countrySuggesterIdenPop dt span.value").css({
                    "display": "inline-block",
                    "height": "32px",
                    "padding": "7px 4px 2px 3px",
                    "box-sizing": "unset",
                    "bottom": "2px !important",
                    "left": "10px",
                    "font-size": "14px !important"
                });
                $(".cntry_drpdwn2 .value").css({
                    "bottom": "2px !important",
                    "font-size": "14px !important"
                })
            }
            if (glmodid == "PRODDTL") {
                $("#countrySuggesterIdenPop dt span.value").css("height", "28px")
            }
            $("#identifiedForm #mbl_idn").css({
                "width": "253px"
            });
            $("#identifiedForm #mbl_idn").css({
                "padding-left": "100px"
            });
            $("#identifiedForm #mbl_idn").attr("placeholder", "Enter your mobile number");
            $("#identifiedForm #spn").html(validnM);
            if (glmodid == "ETO") {
                $(".cntry_drpdwn2 .value").css({
                    "bottom": "2px !important",
                    "font-size": "14px !important"
                })
            }
        }
    } else {
        $("#IdentifiedPopUpHTML").html("")
    }
}
function selectCountry1Pop(event, ob) {
    $("#countrySuggesterIdenPop dt a span").attr("style", "background-position:0px -" + ob.data.icon_order * 11 + "px");
    $("#countrySuggesterIdenPop dt span.value").html("+" + ob.value);
    $("#usrCountry").val(ob.data.cname);
    $("#countryIso").val(ob.data.iso);
    $("#MobCCode").val("+" + ob.value);
    var LWG_call = $("#LWG").val();
    if ($("#countryIso").val() != "IN") {
        setPopCookie('FL',JSON.stringify(1));// 0 for indian
        document.getElementById("lwg_wrpr").style.display = "block";
        document.getElementById("identyfy_usr_ctl").style.height = "400px";
        document.getElementById("logintoidentify").style.marginTop = "50px"
    } else {
        setPopCookie('FL',JSON.stringify(0));// 0 for indian
        document.getElementById("lwg_wrpr").style.display = "none";
        document.getElementById("identyfy_usr_ctl").style.height = "350px"
    }
    if ($("#countryIso").val() != "IN") {
        if (typeof LWG_call != undefined && LWG_call == 1) {
            $("#mbl_idn").attr("placeholder", "Enter your Mobile Number");
            $("#lbl1").html('Mobile Number <span style="color:blue;font-size:11px;">(Optional)</span>')
        }
    } else {
        if (typeof LWG_call != undefined && LWG_call == 1) {
            $("#lbl1").html('Mobile Number <span style="color:red;">*</span>')
        }
    }
}
function countryFlagSuggesterIdentifiedPopup() {
    var iplocread = readCookie("iploc");
    country_code = (iplocread != "") ? getparamValIden(iplocread, "gcniso") : "";
    country_ip = (iplocread != "") ? getparamValIden(iplocread, "gip") : "";
    ip_country = (iplocread != "") ? getparamValIden(iplocread, "gcnnm") : "";
    if (typeof (glmodid) != "undefined") {
        modid = glmodid
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
            success: function(data) {
                if(data.Response && data.Response.Data){
                    iso_by_ip = data.Response.Data.geoip_countryiso;
                    country_ip = data.Response.Data.geoip_ipaddress;
                    ip_country = data.Response.Data.geoip_countryname;
                    if (iso_by_ip == "UK") {
                        iso_by_ip = "GB"
                    }
                    country_code = iso_by_ip
                }
            }
        })
    }
    if (country_code == "UK") {
        country_code = "GB"
    }
    if (typeof (country_code) == "undefined" || country_code == "") {
        country_code = "IN"
    }
    country_ip_iden = country_ip;
    country_iso_iden = country_code;
    country_nm_iden = ip_country;
    var country_sugg = new Suggester({
        "type": "isd",
        "element": "countrySuggesterIdenPop",
        "onSelect": selectCountry1Pop,
        fields: "cname,iso,icon_order",
        autocompleteClass: "isd_class",
        displayFields: "cname,value",
        displaySeparator: "  +",
        "defaultValue": country_code
    })
}
function identify_Banner() {
    if (($("#enquiry").length) && (($("#enquiry").css("display")) == "block") || ((typeof (isBLFormOpen) != "undefined") && (isBLFormOpen == true)) || (($("#im-pop_s").length) && (($("#im-pop_s").css("display")) == "block"))) {
        $("#IdentifiedPopUpHTML").html("");
        identifiedPopName = "";
        is_form_open = 0;
        return
    }
    var alrdy_pop_len_sinin = $("#im-pop_s").length;
    if (alrdy_pop_len_sinin != 1) {
        $("#identyfy_usr_ctl").fadeIn();
        checkSuggester();
        var modid = "IMHOME";
        var webAddress = window.location.pathname;
        var pv_count = getparamValIden(readCookie("xnHist"), "pv");
        var spv1 = getparamValIden(readCookie("sessid"), "spv");
        if (typeof (glmodid) != "undefined") {
            modid = glmodid
        }
        if (modid == "PRODDTL") {
            var Prod_var = window.enq_dsbl
        }
        if (!(modid == "MY" || modid == "SELLERMY" || modid == "TDR" || modid == "BIGBUYER" || modid == "CTL" || webAddress == "/seller/" || iso_by_ip != "IN") && !(modid == "PRODDTL" && typeof (Prod_var) == "undefined" && Prod_var != 1)) {
            if (spv1 == 2) {
                if (iso_by_ip == "IN") {
                    // yandex_impression_identification("Identification_login_popup_displayed_2nd_Desktop_Indian")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_2nd_Indian'+modid]);
                } else {
                    // yandex_impression_identification("Identification_login_popup_displayed_2nd_Desktop_Foreign")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_2nd_Foreign'+modid]);
                }
            }
            if (spv1 == 4) {
                if (iso_by_ip == "IN") {
                    // yandex_impression_identification("Identification_login_popup_displayed_4th_Desktop_Indian")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_4th_Indian'+modid]);
                } else {
                    // yandex_impression_identification("Identification_login_popup_displayed_4th_Desktop_Foreign")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_4th_Foreign'+modid]);
                }
            }
            if (spv1 == 6) {
                if (iso_by_ip == "IN") {
                    // yandex_impression_identification("Identification_login_popup_displayed_6th_Desktop_Indian")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_6th_Indian'+modid]);
                } else {
                    // yandex_impression_identification("Identification_login_popup_displayed_6th_Desktop_Foreign")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_6th_Foreign'+modid]);
                }
            }
            if (spv1 == 7) {
                if (iso_by_ip == "IN") {
                    // yandex_impression_identification("Identification_login_popup_displayed_7th_Desktop_Indian")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_7th_Indian'+modid]);
                } else {
                    // yandex_impression_identification("Identification_login_popup_displayed_7th_Desktop_Foreign")
                    _gaq.push(['_trackEvent', 'Identification', 'Displayed_7th_Foreign'+modid]);
                }
            }
        }
        $(".idfpclose").click(function() {
            $("#IdentifiedPopUpHTML").html("");
            is_form_open = 0
        });
        if ($("#identyfy_usr_ctl").css("display") == "block") {
            $("#maskctl").css("display", "block")
        } else {
            $("#maskctl").css("display", "none")
        }
        changePopUpInput(identifiedPopName, 0);
        $("#mbl_idn").focus();
        is_form_open = 1
    } else {
        $("#IdentifiedPopUpHTML").html("")
    }
}
if ($("#maskctl").length > 0) {
    if ($("#maskctl").css("display") == "block") {
        $("#maskctl").hide();
        $("#identyfy_usr_ctl").hide()
    }
}
function getparamValIden(cookieStr, key) {
    if (cookieStr > "") {
        var val = "|" + cookieStr + "|";
        var pattern = new RegExp(".*?\\|" + key + "=([^|]*).*|.*");
        return val.replace(pattern, "$1")
    } else {
        return ""
    }
}
$('<style> .bgnn{background:none!important;text-align:center!important;padding:0px!important;}.submit_pop2 {height: 40px;line-height: 36px;border: 1px solid #00a699;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAMAAAAxmgQeAAAAbFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+T+BWAAAAI3RSTlMApPnqfEvdy5ozJxsNvI4tD+HGwrOgnoBuYVlGFQYD2JBbB/cmzKkAAABxSURBVBjThZBHDoAgEAABwQLYe8HG///omogRODjHyWRhF2VdciKHVpNmWmwXayCkueuAALPidVgbIsof15eBkRDP6+2k4GykGU6rKCSa1ENiZqhCCH6k0JKNQZdDt3866c3z3vX+J709/vaFuyhkcwEy7A21sG9XYAAAAABJRU5ErkJggg==) no-repeat scroll 135px 11px;background-color:#00a699;color: #fff;float:left;display:block;width:180px;text-align:left;padding-left:25px;margin:50px 0px;font-size:15px!important;letter-spacing:2px;font-weight:bold;right:88px!important}.identi-wrap,.identi-wrap1{border-top:3px solid #e8eaeb;position:absolute;top:15px;width:97%;height:1px;z-index:-2;left:0px;right:0px;margin:0px auto;}.tipbdr{border:1px solid #00a699!important;}.identi-wrap1{border-top:3px solid #00a699;}.wrpicons{background: url(//utils.imimg.com/globalhf/icon-iden.png) no-repeat;width:40px;height:40px;}.lgic{background-position:0 0; float:left;}.lgic1{background-position:0px -81px; float:left;margin-left:6px;}.lgic2{background-position:0px -161px; float:left;}.icbx{width:40px;float:left;}.icbx2{width:44px;float:left;}.icbx1{width:100px;float:left;margin-top:-3px;}.icbxdr{border:1px solid #dfe1e2; padding:0px 12px;background:#fff;position:absolute;top:4px;z-index:-1;font-size:14px;height:24px;line-height:25px;}.iclfps{left:32px;}.iclrps{right:4px;}.bxpsi{position:relative;margin:25px 70px 5px 70px;color:#909090;font-family:arial;font-size:14px;}.bxpsi1{position:relative;margin:18px 70px 0px 70px;color:#909090;font-family:arial;font-size:14px;}.icsl{color:#00a699;font-weight:700;}.mobi-txt-ctl {border:1px solid #999;border-radius:4px;font-size:13px;margin:0 auto 0 8px;padding: 13px 17px 13px 106px;width:194px; }.btn-pop-ctl {color: #fff;border:medium none;border-radius: 5px;cursor: pointer;font-size: 17px;font-weight: 700;margin-left: 2px;padding: 0 15px;height: 44px;background-Color: #00f}#maskctl {background: #000;position:fixed;opacity: .7;filter: alpha(opacity=50); -ms-filter: alpha(Opacity=50); top: 0; bottom: 0; left: 0; right: 0; z-index: 8; display: none;} .iden-pop {z-index: 999;height: 400px; width: 800px; position: fixed; left: 50%; margin-left: -400px; top: 50%; margin-top: -200px; background: #fff; background-repeat: no-repeat; background-position: 485px 0 } #err-msg-mbl-ctl { background: rgba(0, 0, 0, 0) none repeat scroll 0 0; border-radius: 4px; color: red; font-size: 13px; left: 24px; margin-top: 1px; position: absolute; text-align: right; width: 304px; } .cntry_drpdwn2 { clear: both; float: left; height: 31px; margin: 4px -92px 0; position: absolute; } .cntry_drpdwn2 dt a { display: inline-block; height: 22px!important; padding: 9px 3px 6px 6px; width: 35px; background: none!important; } .cntry_drpdwn2 .value { border-left: 1px solid #bdc7d8 !important; /*bottom: 13px!important;*/ height: 28px; } .mloder { margin: -65px 0 0 320px } .mloder1 { margin: -28px 0 0 287px } .mloder2 { margin: 15px 0 0 160px } .mloder3 { margin: -25px 0 0 320px } .tnkmsg { margin: 80px 69px; color: #000; }.font_26 { font-size: 26px; color:#fff!important;} .wel-txt { font-size: 28px; line-height: 35px } .wel-msg { font-size: 20px; line-height: 30px; margin: -9px 9px 24px 9px; color: #000; } .wel-comny { width: 520px; font-size: 24px; color: #000; margin: 15px 0 0 75px; }.cltop{cursor: pointer;font-size: 20px;position: absolute;right: 8px;top: 1px;line-height: 20px;z-index: 1;color: #9396f4;}.cltop:hover{color:#fff;} .wel-logo { background-position: -7px -400px; height: 75px; width: 300px; margin: -30px 0 10px 62px; }@-moz-document url-prefix() { .cntry_drpdwn2 .value { border-bottom: 1px solid #f1f1f1 } }.fll { float: left } .wbx-50{width:250px; height:80px;  float:left} .iden_bg { background: #fff; position: fixed; margin: 0 auto; left: 0; right: 0; text-align: center; top: 200px; z-index: 8 } .mb55{margin-bottom:55px} .clos-1 { color: #fff; cursor: pointer; font-size: 12px; padding: 4px; position: absolute; right: 0; top: 0px; } .font_20 { font-size: 20px; } .font_20, .font_30{ color: #fff; text-align: center;}.font_26 { font-size: 26px;color:#fff!important;}.font_34 { font-size: 32px; color:#fff!important;font-weight: bold; } .font_30 { font-size: 24px; line-height:40px } .pt30{padding-top:20px;} .input_pop {border:1px solid #b0b0b0; float: left; height: 41px; line-height: 42px; margin: 0 5px 0 0; padding-left: 100px; width: 200px; } .input_pop:focus{box-shadow:rgb(204, 204, 204) 0px 0px 2px 2px}.submit_pop { width: 110px; height: 40px; line-height: 40px; border: 1px solid #000099; background: #000099; font-size: 20px; color: #fff; float: left; }.mt20{margin-top:20px} .submit_pop1 {height: 40px;line-height: 36px;border: 1px solid #00a699;background:#00a699;color: #fff;float:left;display:block;width:247px;margin:50px 0px;font-size:15px;letter-spacing:2px;font-weight:bold;} .pop_image_bg { background-image: url(//utils.imimg.com/globalhf/run-bg.png); background-repeat: no-repeat; background-position:30px 0 } .pop_image_bg { width: 165px; height: 90px; float: left; }.image_arr { width: 60px; height: 60px; background-position: -15px 0; top: -42px; left: -65px } .porl { display: inline-block } .poab { position: absolute } .dropdown dd ul {width: 300px !important;z-index: 99;text-align:left} .dropdown dt {height: 27px !important}.wd_sum { display: block; margin: 40px 0; font-size:15px; width:180px } .flot_n { float: inherit } .bg_bl{background:#2e3192} .wd_box1 { width: 500px; }.m_pop { margin-top: 10px } .ht50 { height: 120px;} #em_field { position: relative } .emicon { background-position: -273px -177px !important; width: 25px; height: 25px; display: block; position: absolute; top: 5px; left: 100px; }.im_logo_cn{background:url(//utils.imimg.com/globalhf/im-logo-icon.png) ; background-repeat:no-repeat} .im_logo_cn { width: 100px; height: 30px; margin: 0 auto; background-size: contain; position: absolute; bottom: 0; left: 0; right: 0; }.logoN{background:url(//utils.imimg.com/globalhf/im-logo-icon.png) ; background-repeat:no-repeat;width: 100px; height: 30px; margin: 0 auto; background-size: contain; position: absolute;bottom:0px;}.ic-btm{position:absolute;bottom:0px;width:100%;height:75px;}.ic-btm1{position:absolute;bottom:0px;width:100%;}.check_icon{width:16px; height:16px; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAppkAppkAppkAppkAppkAppkAppkAppmA08z///9gyL9AvLOVx4i8AAAACHRSTlMA8seNjEYgowheDX8AAABlSURBVAjXY2BgCFYUMmUAghSJjo5GNwYGtooOIGhPYGDpAAMHhkAIQ5TBAkR1nmhm0AAxZu1oYpAACazsaAQyZnbMmgFkaHTMmrmyo6MJqLhz1YyOjmaQ9pkg7XAD4VbALYU7AwB/pzO39MCMDAAAAABJRU5ErkJggg==); display:block; float:left;margin-right: 4px;}.numbr{ left: 47px; position: absolute; font-style:italic;top:235px;color:#999}.ht-box{height: 300px;font-family: arial;font-sizE: 12px;}.font_35 { font-size: 35px; color:#000099!important;line-height:45px;margin-right:-9px;text-transform:uppercase; font-weight: bold; }.font_15 {font-size: 15px; font-weight: bold;}.font_17 {font-size: 17px!important;line-height:31px; color: white; }.font_10{font-size: 17px!important;line-height:34px;} .bl-arrow{ width: 130px; height: 80px; background: #2e3192; position:absolute; right:-10px; -webkit-transform: skew(-30deg); -moz-transform: skew(-30deg); -o-transform: skew(-30deg); transform: skew(-30deg); } .bl-arrow::after{    border-color: #fff; border-style: solid; border-width: 30px; content: ""; height: 40px; position: absolute; right: -59px; width: 0;}.lnh44 { line-height: 44px;height:44px; }.f30 { font-size: 30px }.pr-id{position:relative}#countrySuggester .value,#countrySuggesterIdenPop .value{background:#f1f1f1;display:inline-block;width:45px;text-align:center;left:0px;bottom:13px;line-height:24px}.pt10{padding-top:10px}.pt5{padding-top:5px;}.diblk{display:inline-block}input,input::-webkit-input-placeholder{font-size:inherit}input,input::-moz-placeholder{font-size:inherit}input,input:-moz-placeholder{font-size:inherit}input,input:-ms-input-placeholder{font-size:inherit}#mbl_idn{box-sizing:content-box; font-size:17px;}#err-msg-mbl-ctl{border:none;padding:0;margin-left: 55px;}.skptxt{color:#999;cursor: pointer;font-size: 14px; line-height:28px;margin-left: 10px;float: left;}.load_s{box-shadow:0 0 3px 3px orange!important;background-color:#ffd29a!important;background-image:-webkit-linear-gradient(-45deg,rgba(255,154,26,1) 25%,transparent 25%,transparent 50%,rgba(255,154,26,1) 50%,rgba(255,154,26,1) 75%,transparent 75%,transparent)!important;background-image:-moz-linear-gradient(-45deg,rgba(255,154,26,1) 25%,transparent 25%,transparent 50%,rgba(255,154,26,1) 50%,rgba(255,154,26,1) 75%,transparent 75%,transparent)!important;background-image:-ms-linear-gradient(-45deg,rgba(255,154,26,1) 25%,transparent 25%,transparent 50%,rgba(255,154,26,1) 50%,rgba(255,154,26,1) 75%,transparent 75%,transparent)!important;background-image:linear-gradient(-45deg,rgba(255,154,26,1) 25%,transparent 25%,transparent 50%,rgba(255,154,26,1) 50%,rgba(255,154,26,1) 75%,transparent 75%,transparent)!important;-webkit-background-size:50px 50px!important;-moz-background-size:50px 50px!important;-ms-background-size:50px 50px!important;background-size:50px 50px!important;-webkit-animation:move 2s linear infinite!important;-moz-animation:move 2s linear infinite!important;-ms-animation:move 2s linear infinite!important;animation:move 2s linear infinite!important;overflow:auto;-webkit-box-shadow:inset 0 10px 0 rgba(255,255,255,.2)!important;-moz-box-shadow:inset 0 10px 0 rgba(255,255,255,.2)!important;-ms-box-shadow:inset 0 10px 0 rgba(255,255,255,.2)!important;box-shadow:0 0 3px 3px orange!important;opacity:.7;filter:alpha(opacity=70)}@-webkit-keyframes move {0%{background-position:0 0} 100%{background-position:50px 50px} } @-moz-keyframes move {0%{background-position:0 0} 100%{background-position:50px 50px} } @-ms-keyframes move {0%{background-position:0 0} 100%{background-position:50px 50px} } @keyframes move {0%{background-position:0 0} 100%{background-position:50px 50px} }}</style>').appendTo("head");
// function yandex_impression_identification(a) {
//     if (typeof ym != "function") {
//         (function(b, o, j, n, h, g, f) {
//             b[h] = b[h] || function() {
//                 (b[h].a = b[h].a || []).push(arguments)
//             }
//             ;
//             b[h].l = 1 * new Date();
//             g = o.createElement(j),
//             f = o.getElementsByTagName(j)[0],
//             g.async = 1,
//             g.src = n,
//             f.parentNode.insertBefore(g, f)
//         }
//         )(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
//         ym(51115208, "init", {
//             id: 51115208,
//             clickmap: true,
//             trackLinks: true,
//             accurateTrackBounce: true,
//             webvisor: true
//         })
//     }
//     window.yaParams = {
//         Identification_login_popup: a
//     };
//     ym(51115208, "params", window.yaParams || {})
// }
;


// foreign login Start
// making this numbe rvar as to accomodate same declaration in imlogin file
var phNumberRange = {
    "SH":{ _MIN: 4,  _MAX : 4 },
    "NU":{ _MIN: 4,  _MAX : 4 },
    "FK":{ _MIN: 5,  _MAX : 5 },
    "CK":{ _MIN: 5,  _MAX : 5 },
    "TK":{ _MIN: 5,  _MAX : 5 },
    "GS":{ _MIN: 5,  _MAX : 5 },
    "NC":{ _MIN: 6,  _MAX : 6 },
    "PM":{ _MIN: 6,  _MAX : 6 },
    "WF":{ _MIN: 6,  _MAX : 6 },
    "NF":{ _MIN: 6,  _MAX : 6 },
    "BZ":{ _MIN: 7,  _MAX : 7 },
    "CV":{ _MIN: 7,  _MAX : 7 },
    "KM":{ _MIN: 7,  _MAX : 7 },
    "ER":{ _MIN: 7,  _MAX : 7 },
    "FJ":{ _MIN: 7,  _MAX : 7 },
    "GW":{ _MIN: 7,  _MAX : 7 },
    "GY":{ _MIN: 7,  _MAX : 7 },
    "IS":{ _MIN: 7,  _MAX : 7 },
    "MV":{ _MIN: 7,  _MAX : 7 },
    "MH":{ _MIN: 7,  _MAX : 7 },
    "FM":{ _MIN: 7,  _MAX : 7 },
    "NR":{ _MIN: 7,  _MAX : 7 },
    "PW":{ _MIN: 7,  _MAX : 7 },
    "PG":{ _MIN: 7,  _MAX : 7 },
    "WS":{ _MIN: 7,  _MAX : 7 },
    "SC":{ _MIN: 7,  _MAX : 7 },
    "SB":{ _MIN: 7,  _MAX : 7 },
    "SR":{ _MIN: 7,  _MAX : 7 },
    "TO":{ _MIN: 7,  _MAX : 7 },
    "TV":{ _MIN: 7,  _MAX : 7 },
    "VU":{ _MIN: 7,  _MAX : 7 },
    "AN":{ _MIN: 7,  _MAX : 7 },
    "TL":{ _MIN: 7,  _MAX : 7 },
    "FO":{ _MIN: 6,  _MAX : 7 },
    "PN":{ _MIN: 7,  _MAX : 7 },
    "AW":{ _MIN: 7,  _MAX : 7 },
    "PF":{ _MIN: 6,  _MAX : 7 },
    "BH":{ _MIN: 8,  _MAX : 8 },
    "BJ":{ _MIN: 8,  _MAX : 8 },
    "BT":{ _MIN: 8,  _MAX : 8 },
    "BO":{ _MIN: 8,  _MAX : 8 },
    "BN":{ _MIN: 7,  _MAX : 8 },
    "BF":{ _MIN: 8,  _MAX : 8 },
    "BI":{ _MIN: 8,  _MAX : 8 },
    "CF":{ _MIN: 8,  _MAX : 8 },
    "TD":{ _MIN: 8,  _MAX : 8 },
    "CR":{ _MIN: 8,  _MAX : 8 },
    "CU":{ _MIN: 8,  _MAX : 8 },
    "CY":{ _MIN: 8,  _MAX : 8 },
    "DK":{ _MIN: 8,  _MAX : 8 },
    "DJ":{ _MIN: 8,  _MAX : 8 },
    "SV":{ _MIN: 8,  _MAX : 8 },
    "GQ":{ _MIN: 8,  _MAX : 8 },
    "EE":{ _MIN: 7,  _MAX : 8 },
    "GA":{ _MIN: 8,  _MAX : 8 },
    "GM":{ _MIN: 7,  _MAX : 8 },
    "GT":{ _MIN: 8,  _MAX : 8 },
    "GN":{ _MIN: 8,  _MAX : 8 },
    "HT":{ _MIN: 8,  _MAX : 8 },
    "HN":{ _MIN: 8,  _MAX : 8 },
    "KI":{ _MIN: 8,  _MAX : 8 },
    "KW":{ _MIN: 8,  _MAX : 8 },
    "LV":{ _MIN: 8,  _MAX : 8 },
    "LS":{ _MIN: 8,  _MAX : 8 },
    "LR":{ _MIN: 8,  _MAX : 8 },
    "LT":{ _MIN: 7,  _MAX : 8 },
    "ML":{ _MIN: 8,  _MAX : 8 },
    "MT":{ _MIN: 8,  _MAX : 8 },
    "MR":{ _MIN: 8,  _MAX : 8 },
    "MU":{ _MIN: 8,  _MAX : 8 },
    "MC":{ _MIN: 8,  _MAX : 8 },
    "NI":{ _MIN: 8,  _MAX : 8 },
    "NE":{ _MIN: 8,  _MAX : 8 },
    "NO":{ _MIN: 8,  _MAX : 8 },
    "OM":{ _MIN: 8,  _MAX : 8 },
    "PA":{ _MIN: 8,  _MAX : 8 },
    "QA":{ _MIN: 8,  _MAX : 8 },
    "SL":{ _MIN: 8,  _MAX : 8 },
    "SG":{ _MIN: 8,  _MAX : 8 },
    "SZ":{ _MIN: 8,  _MAX : 8 },
    "TG":{ _MIN: 8,  _MAX : 8 },
    "TN":{ _MIN: 8,  _MAX : 8 },
    "CC":{ _MIN: 8,  _MAX : 8 },
    "HK":{ _MIN: 8,  _MAX : 8 },
    "MO":{ _MIN: 8,  _MAX : 8 },
    "GI":{ _MIN: 8,  _MAX : 8 },
    "CX":{ _MIN: 8,  _MAX : 8 },
    "CI":{ _MIN: 8,  _MAX : 8 },
    "GL":{ _MIN: 8,  _MAX : 8 },
    "IO":{ _MIN: 8,  _MAX : 8 },
    "SJ":{ _MIN: 8,  _MAX : 8 },
    "AF":{ _MIN: 9,  _MAX : 9 },
    "AL":{ _MIN: 9,  _MAX : 9 },
    "DZ":{ _MIN: 9,  _MAX : 9 },
    "AD":{ _MIN: 6,  _MAX : 9 },
    "AO":{ _MIN: 9,  _MAX : 9 },
    "AM":{ _MIN: 8,  _MAX : 9 },
    "AZ":{ _MIN: 9,  _MAX : 9 },
    "BE":{ _MIN: 8,  _MAX : 9 },
    "BA":{ _MIN: 8,  _MAX : 9 },
    "BW":{ _MIN: 8,  _MAX : 9 },
    "BG":{ _MIN: 8,  _MAX : 9 },
    "KH":{ _MIN: 9,  _MAX : 9 },
    "CM":{ _MIN: 9,  _MAX : 9 },
    "CL":{ _MIN: 8,  _MAX : 9 },
    "CG":{ _MIN: 9,  _MAX : 9 },
    "CD":{ _MIN: 9,  _MAX : 9 },
    "HR":{ _MIN: 8,  _MAX : 9 },
    "CZ":{ _MIN: 9,  _MAX : 9 },
    "EC":{ _MIN: 9,  _MAX : 9 },
    "ET":{ _MIN: 9,  _MAX : 9 },
    "FR":{ _MIN: 9,  _MAX : 9 },
    "GE":{ _MIN: 9,  _MAX : 9 },
    "GH":{ _MIN: 9,  _MAX : 9 },
    "HU":{ _MIN: 9,  _MAX : 9 },
    "KG":{ _MIN: 8,  _MAX : 9 },
    "LB":{ _MIN: 7,  _MAX : 9 },
    "LY":{ _MIN: 8,  _MAX : 9 },
    "LI":{ _MIN: 8,  _MAX : 9 },
    "LU":{ _MIN: 9,  _MAX : 9 },
    "MG":{ _MIN: 9,  _MAX : 9 },
    "MW":{ _MIN: 9,  _MAX : 9 },
    "MD":{ _MIN: 8,  _MAX : 9 },
    "MN":{ _MIN: 8,  _MAX : 9 },
    "ME":{ _MIN: 9,  _MAX : 9 },
    "MA":{ _MIN: 9,  _MAX : 9 },
    "MZ":{ _MIN: 9,  _MAX : 9 },
    "MM":{ _MIN: 9,  _MAX : 9 },
    "NA":{ _MIN: 8,  _MAX : 9 },
    "MK":{ _MIN: 9,  _MAX : 9 },
    "PY":{ _MIN: 9,  _MAX : 9 },
    "PE":{ _MIN: 9,  _MAX : 9 },
    "PL":{ _MIN: 9,  _MAX : 9 },
    "PT":{ _MIN: 9,  _MAX : 9 },
    "RW":{ _MIN: 9,  _MAX : 9 },
    "ST":{ _MIN: 9,  _MAX : 9 },
    "SA":{ _MIN: 9,  _MAX : 9 },
    "SN":{ _MIN: 9,  _MAX : 9 },
    "RS":{ _MIN: 9,  _MAX : 9 },
    "SK":{ _MIN: 9,  _MAX : 9 },
    "SI":{ _MIN: 8,  _MAX : 9 },
    "SO":{ _MIN: 9,  _MAX : 9 },
    "SS":{ _MIN: 9,  _MAX : 9 },
    "ES":{ _MIN: 9,  _MAX : 9 },
    "LK":{ _MIN: 9,  _MAX : 9 },
    "SD":{ _MIN: 9,  _MAX : 9 },
    "SE":{ _MIN: 8,  _MAX : 9 },
    "CH":{ _MIN: 9,  _MAX : 9 },
    "SY":{ _MIN: 9,  _MAX : 9 },
    "TJ":{ _MIN: 9,  _MAX : 9 },
    "TZ":{ _MIN: 9,  _MAX : 9 },
    "TM":{ _MIN: 9,  _MAX : 9 },
    "UG":{ _MIN: 9,  _MAX : 9 },
    "AE":{ _MIN: 9,  _MAX : 9 },
    "UY":{ _MIN: 9,  _MAX : 9 },
    "UZ":{ _MIN: 9,  _MAX : 9 },
    "YE":{ _MIN: 9,  _MAX : 9 },
    "ZM":{ _MIN: 9,  _MAX : 9 },
    "PS":{ _MIN: 9,  _MAX : 9 },
    "XK":{ _MIN: 8,  _MAX : 9 },
    "RE":{ _MIN: 9,  _MAX : 9 },
    "MQ":{ _MIN: 9,  _MAX : 9 },
    "EH":{ _MIN: 9,  _MAX : 9 },
    "GP":{ _MIN: 9,  _MAX : 9 },
    "YT":{ _MIN: 9,  _MAX : 9 },
    "GF":{ _MIN: 9,  _MAX : 9 },
    "AG":{ _MIN: 10,  _MAX : 10 },
    "AU":{ _MIN: 9,  _MAX : 10 },
    "BS":{ _MIN: 10,  _MAX : 10 },
    "BB":{ _MIN: 10,  _MAX : 10 },
    "CA":{ _MIN: 10,  _MAX : 10 },
    "CO":{ _MIN: 10,  _MAX : 10 },
    "DM":{ _MIN: 10,  _MAX : 10 },
    "DO":{ _MIN: 10,  _MAX : 10 },
    "GR":{ _MIN: 10,  _MAX : 10 },
    "GD":{ _MIN: 10,  _MAX : 10 },
    "IN":{ _MIN: 10,  _MAX : 10 },
    "IE":{ _MIN: 9,  _MAX : 10 },
    "IL":{ _MIN: 9,  _MAX : 10 },
    "JM":{ _MIN: 10,  _MAX : 10 },
    "JO":{ _MIN: 9,  _MAX : 10 },
    "KZ":{ _MIN: 10,  _MAX : 10 },
    "KE":{ _MIN: 9,  _MAX : 10 },
    "MX":{ _MIN: 10,  _MAX : 10 },
    "NP":{ _MIN: 9,  _MAX : 10 },
    "NL":{ _MIN: 9,  _MAX : 10 },
    "NZ":{ _MIN: 8,  _MAX : 10 },
    "NG":{ _MIN: 10,  _MAX : 10 },
    "KP":{ _MIN: 10,  _MAX : 10 },
    "PH":{ _MIN: 10,  _MAX : 10 },
    "RO":{ _MIN: 9,  _MAX : 10 },
    "RU":{ _MIN: 10,  _MAX : 10 },
    "KN":{ _MIN: 10,  _MAX : 10 },
    "LC":{ _MIN: 10,  _MAX : 10 },
    "VC":{ _MIN: 10,  _MAX : 10 },
    "SM":{ _MIN: 10,  _MAX : 10 },
    "ZA":{ _MIN: 10,  _MAX : 10 },
    "KR":{ _MIN: 9,  _MAX : 10 },
    "TW":{ _MIN: 9,  _MAX : 10 },
    "TH":{ _MIN: 9,  _MAX : 10 },
    "TT":{ _MIN: 10,  _MAX : 10 },
    "UA":{ _MIN: 10,  _MAX : 10 },
    "US":{ _MIN: 10,  _MAX : 10 },
    "VN":{ _MIN: 9,  _MAX : 10 },
    "ZW":{ _MIN: 9,  _MAX : 10 },
    "VA":{ _MIN: 10,  _MAX : 10 },
    "YU":{ _MIN: 8,  _MAX : 10 },
    "UM":{ _MIN: 10,  _MAX : 10 },
    "VI":{ _MIN: 10,  _MAX : 10 },
    "MP":{ _MIN: 10,  _MAX : 10 },
    "TC":{ _MIN: 10,  _MAX : 10 },
    "VG":{ _MIN: 10,  _MAX : 10 },
    "KY":{ _MIN: 10,  _MAX : 10 },
    "AS":{ _MIN: 10,  _MAX : 10 },
    "GU":{ _MIN: 10,  _MAX : 10 },
    "BM":{ _MIN: 10,  _MAX : 10 },
    "MS":{ _MIN: 10,  _MAX : 10 },
    "PR":{ _MIN: 10,  _MAX : 10 },
    "AI":{ _MIN: 10,  _MAX : 10 },
    "AR":{ _MIN: 10,  _MAX : 11 },
    "BD":{ _MIN: 10,  _MAX : 11 },
    "BR":{ _MIN: 10,  _MAX : 11 },
    "CN":{ _MIN: 11,  _MAX : 11 },
    "EG":{ _MIN: 10,  _MAX : 11 },
    "FI":{ _MIN: 8,  _MAX : 11 },
    "IR":{ _MIN: 10,  _MAX : 11 },
    "IQ":{ _MIN: 10,  _MAX : 11 },
    "IT":{ _MIN: 10,  _MAX : 11 },
    "JP":{ _MIN: 10,  _MAX : 11 },
    "LA":{ _MIN: 9,  _MAX : 11 },
    "MY":{ _MIN: 9,  _MAX : 11 },
    "PK":{ _MIN: 10,  _MAX : 11 },
    "TR":{ _MIN: 10,  _MAX : 11 },
    "GB":{ _MIN: 10,  _MAX : 11 },
    "VE":{ _MIN: 10,  _MAX : 11 },
    "AT":{ _MIN: 10,  _MAX : 12 },
    "BY":{ _MIN: 9,  _MAX : 12 },
    "ID":{ _MIN: 9,  _MAX : 12 },
    "DE":{ _MIN: 10,  _MAX : 15 },
    }
    
function fetchMinMax(iso){
    if(phNumberRange[iso.toUpperCase()]){
        return phNumberRange[iso.toUpperCase()];
    }
    return { _MIN: 10,  _MAX: 10}; // default value
}
    
    
// removing the attribute additoin to html elements for single journey | reference imlogin file
function isValidDataType( e,  value, iso ) {
    let  type  = inputType(value);
    if(type){
        setPopCookie('DTy',JSON.stringify(0)); // 0 for mail
       return  checkValidMail(value);
    }
    else{
        setPopCookie('DTy',JSON.stringify(1)); // 1 for number
       return  checkValidNumber(value, iso) ;
    }
}
function inputType(value){
    let alphabetRegExp = new RegExp(/([a-zA-Z])/)
    let specialRegExp = new RegExp(/[./%&-@<>{}[]\\"":;!@#\$\^&\*\(\)\+]/)
    
    if(value.match(alphabetRegExp)) return 1;
    if(value.match(specialRegExp)) return 1;
    return 0;
}

function checkValidMail( value ){
    let emailRegExp = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    let checkValue = value.match(emailRegExp);
    if(checkValue){
        let validRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);
        let spamRegEx = new RegExp(/<[^>]*>/g); 
        if(!value.match(validRegEx) || value.match(spamRegEx) ){
            return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
        }
        return 1;
    }else{
        return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
    };
}

function checkValidNumber(value, iso){
    let {_MIN, _MAX} = fetchMinMax(iso);
    if(Number.isInteger(value)){
        value = value.toString();
    }
    value = value.replace(/\-|\s|\[|\]|\(|\)/ig, "");
    value = value.replace(/\+/g, "");

    if(!(value.length <= _MAX  && value.length >= _MIN)){
        if(value.length == 0 || value == "") return invalidMsgLogin("Please enter mobile number.") || 0;
        else {
            if(value.length > _MAX) return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
            else if(value.length < _MIN) return invalidMsgLogin("Please Enter A Valid Number/Email") || 0;
        }
    }

    return 1;
}