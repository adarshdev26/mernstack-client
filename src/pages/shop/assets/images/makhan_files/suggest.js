
var SuggestUtils = {
    readCookie: function (cookieName, cookieKey) {

        if (!document.cookie.length) return '';
        cookieName += '=';

        var offset = document.cookie.indexOf(cookieName);
        if (offset == -1) return '';

        offset += cookieName.length;
        var length = document.cookie.indexOf(";", offset)
        if (length == -1) length = document.cookie.length;

        var cookieValue = unescape(document.cookie.substring(offset, length));

        if (!cookieKey) return cookieValue;

        cookieValue = "|" + cookieValue + "|";
        var pattern = new RegExp(".*?\\|" + cookieKey + "=([^|]*).*|.*");
        return cookieValue.replace(pattern, "$1");

    }
}

function browserDetails(){
    var navUserAgent = navigator.userAgent;
    var browserName  = navigator.appName;
    var browserVersion  = ''+parseFloat(navigator.appVersion);
    var tempNameOffset,tempVersionOffset,tempVersion;

    if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!=-1) {
        browserName = "Opera";
        browserVersion = navUserAgent.substring(tempVersionOffset+6);
        if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1) 
            browserVersion = navUserAgent.substring(tempVersionOffset+8);
    } 
    else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        browserVersion = navUserAgent.substring(tempVersionOffset+5);
    } 
    else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        browserVersion = navUserAgent.substring(tempVersionOffset+7);
    } 
    else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        browserVersion = navUserAgent.substring(tempVersionOffset+7);
        if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1) 
            browserVersion = navUserAgent.substring(tempVersionOffset+8);
    }
    else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        browserVersion = navUserAgent.substring(tempVersionOffset+8);
    }
    else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
        browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
        browserVersion = navUserAgent.substring(tempVersionOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
    }
    }

    // trim version
    if ((tempVersion=browserVersion.indexOf(";"))!=-1)
        browserVersion=browserVersion.substring(0,tempVersion);
    if ((tempVersion=browserVersion.indexOf(" "))!=-1)
        browserVersion=browserVersion.substring(0,tempVersion);

    return [browserName,browserVersion];
    // alert("BrowserName = " + browserName + "\n" + "Version = " + browserVersion);
}
var brwsr_dtls = browserDetails();

function isMobileTab(){
    let chk = false;
    (function(a){
        if(/(android|b{2}\d+|me{2}go).+mobile|avantgo|bada\/|blackber{2}y|blazer|compal|elaine|fen{2}ec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|m{2}p|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xi{2}no|android|ipad|playbo{2}k|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|7{2}0s|802s|a wa|abac|ac(er|o{2}|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|at{2}w|au(di|\-m|r |s )|avan|be(ck|l{2}|nq)|bi(lb|rd)|bla[cz]|br[ev]w|bumb|bw\-[nu]|c5{2}\/|capi|c{2}wa|cdm\-|cel{2}|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|l{2}|ng)|dbte|dc\-s|devi|dica|dmob|do[cp]o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-[mpt]|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|in{2}o|ipaq|iris|ja[tv]a|jbro|jemu|jigs|kd{2}i|keji|kgt( |\/)|klon|kpt |kwc\-|kyo[ck]|le(no|xi)|lg( g|\/[klu]|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|mer[ci]|mi(o8|oa|ts)|m{2}ef|mo(01|02|bi|de|do|t(\-| |o|v)|z{2})|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30[02]|n50[025]|n7(0[01]|10)|ne([cm]\-|on|tf|wf|wg|wt)|nok[6i]|nzph|o2im|op(ti|wv)|oran|owg1|p80{2}|pan[adt]|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r60{2}|raks|rim9|ro(ve|zo)|s5{2}\/|sa(ge|ma|m{2}|ms|ny|va)|sc(01|h\-|o{2}|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(0{2}|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel[im]|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v40{2}|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x70{2}|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
            chk = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return chk;
}
var chkFrMb = isMobileTab();
var atocmplt_attr = (chkFrMb && brwsr_dtls[0] == "Chrome" && parseInt(brwsr_dtls[1]) >=88) ? "none" : "off";

function eventTrack(e, t, i, a, n) {
    try {
        var d = new Date;
        var sec = d.getSeconds();
        if (sec % 30 == 0) {
            "undefined" != typeof _gaq && _gaq.push(["_trackEvent", e, t, i, a, n])
            return true;
        }

        return false;
    } catch (e) { console.trace(e); return false; }
}
try {
    if (typeof Suggester == "undefined") {    
        var storeLoaded = false;

        function checkIfAnalyticsLoaded() {
            "undefined" === typeof _gaq && setTimeout("checkIfAnalyticsLoaded()", 1e3)
        }



        function Suggestions(e, t) {
            return this.DIRECT = 1,
                this.FILTERED = 2,
                this.COMPLETE = 3,
                this._list = null,
                this.list(e, t),
                this
        }

        function SuggestionCache(e) {
            return this._cache = new Object,
                this.match = e.match,
                this
        }

        function cleanString(string, options) {
            if ("object" == typeof string) {
                if (null === string || "undefined" == typeof string.id)
                    return null;
                string.id = string.id.toString().toLowerCase(),
                    "undefined" == typeof options ? string.id = string.id.replace(/\W+/g, "") : (string.id = string.id.replace(/[^a-zA-Z0-9\&\@ ]+/g, " "),
                        string.id = string.id.replace(/^\s+/g, ""),
                        string.id = string.id.replace(/\s\s+/g, " ")),
                    string.id;
                return string
            }else if ("string" == typeof string || "number" == typeof string) {
                return string = "undefined" != typeof string ? string.toString().toLowerCase() : "",
                    "undefined" == typeof options ? string = string.replace(/\W+/g, "") : (string = string.replace(/[^a-zA-Z0-9\&\@ ]+/g, " "),
                        string = string.replace(/^\s+/g, ""),
                        string = string.replace(/\s\s+/g, " ")),
                    string
            }
            return null
        }

        function ucwords(str)
        {
            if('string'== typeof(str))
              { 
                 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
              }
            else
            {
                 return str;
            } 
        }

        function spellCheck(e) {
            if (!e || e.length < 4)
                return e;
            if (e.replace(/[^a-zA-Z]/gi, "").replace(/[aeiou\& ]+/gi, "").length < 3)
                return e;
            var t = e.replace(/[^0-9a-zA-Z]/g, "");
            t = t.replace(/(.)(?=\1)/gi, ""),
                t = t.replace(/([^aeiouc])[h]/i, "$1"),
                t = t.replace(/([^aeiou])[y]/i, "$1"),
                t = t.replace(/[yh]([^aeiou])/i, "$1"),
                t = t.replace(/z/gi, "j"),
                t = t.replace(/ck/gi, "k"),
                t = t.substring(0, 2).concat(t.substring(2).replace(/[aeiou\& ]+/g, "")),
                /[aeiou]/.test(t.charAt(1)) === !0 && (t = /[aeiou]/.test(t.charAt(0)) === !0 ? t.charAt(0).concat(t.charAt(0)).concat(t.slice(2)) : t);
            return t
        }

        function previouskeyCache(e, t, i, a, n) {
            a[i] = [],
                a["spck" + i] = [];
            var o = new RegExp("\\b(" + e + ")", "i");
            if ("fuzzy" === n.match && "mcat" != i) {
                e = i == "domain" ? e : cleanString(e);
                var s = "city" === n.type || "unit" === n.type || "domain" === n.type ? new RegExp("(" + removeVowels(e) + ")", "i") : spellCheck(e) !== e ? new RegExp("(" + spellCheck(e) + ")", "i") : ""
            }
            for (var r in t)
                if (t[0] != undefined) {
                    if (null != t[r].value) {
                        var l = t[r].value;
                        cleanString(l.trim(), 1).match(o) && a[i].push(t[r]),
                            "" !== s && "undefined" != typeof s && (l = cleanString(("city" === i || "unit" === i || "domain" === i) && n.match === "fuzzy" ? removeVowels(l) : spellCheck(l)),
                                l.match(s) && a["spck" + i].push(t[r]))
                    }
                }
            return a
        }

        function removeVowels(e) {
            if (!e || e.length < 2)
                return e;
            return e = e.replace(/(.)(?=\1)/gi, ""),
                e = e.substring(0, 1).concat(e.substring(1).replace(/[aeiou]+/gi, ""))
        }

        function readGaCookie(name) {
            var search = name + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1)
                        end = document.cookie.length;
                    return unescape(document.cookie.substring(offset, end))
                }
            }
            return ""
        }

        function addScrollingInDd(e) {
            var t = "";
            $(document).keydown(function (i) {
                    if ($("#" + e + " dd ul").is(":visible")) {
                        if (13 == i.keyCode)
                            return $("#" + e + " dd ul li.selected a").click(),
                                !1;
                        var a = 0;
                        return (40 == i.keyCode || 38 == i.keyCode) && ("" === t ? t = 0 : t < $("#" + e + " dd ul li").length && t >= 0 && (40 == i.keyCode && t < $("#" + e + " dd ul li").length - 1 ? (t++,
                                a++) : 38 == i.keyCode && t > 0 && (t--,
                                a++))),
                            i.keyCode >= 65 && i.keyCode <= 90 && $.each($("#" + e + " dd ul li"), function (e, n) {
                                return n.textContent.substring(0, 1) == String.fromCharCode(i.keyCode) && e > 5 ? (t = e,
                                    a++,
                                    !1) : void 0
                            }),
                            a > 0 && ($("#" + e + " dd ul li").removeClass("selected"),
                                $("#" + e + " dd ul li:eq(" + t + ")").addClass("selected"),
                                $("#" + e + " dd ul").scrollTop(26 * t - 20)),
                            !1
                    }
                }),
                $("#" + e + " dd ul li").click(function () {
                    return t = $("#" + e + " dd ul li").index(this),
                        $("#" + e + " dd ul li").removeClass("selected"),
                        "Show More" === this.textContent ? $("#" + e + " dd ul li:eq(0)").addClass("selected") : $("#" + e + " dd ul li:eq(" + t + ")").addClass("selected"),
                        "Show More" === this.textContent ? (this.innerHTML = "Loading...",
                            $(this).css({
                                padding: "3px"
                            }),
                            !1) : void $("#" + e + " dd ul").hide()
                })
        }

        function activateDropDown(e) {
            $("#" + e + " dt a").click(function () {
                    document.getElementById(e).getAttribute("disabled") || ($("#" + e + " dd ul").toggle(),
                        $("#" + e + " dd ul li:first-child").focus())
                }),
                $(document).bind("click", function (t) {
                    var i = $(t.target);
                    i.parents().hasClass("dropdown") || $("#" + e + " dd ul").hide()
                }),
                addScrollingInDd(e)
        }

        function renderIsd(e, t, i, a, n) {
            if (t.defaultValue == undefined)
                t.defaultValue = "IN";
            if ("" !== e) {
                var o = "",
                    s = 0,
                    r = /function\s([^(]{1,})\(/.exec(t.onSelect.toString()),
                    l = jQuery.inArray(t.defaultValue.toString().toLowerCase(), asgv.data.topCountry);
                ("undefined" == typeof t.defaultValue || "" === t.defaultValue) && (t.defaultValue = "IN"),
                l > -1 && asgv.data.topCountry.splice(jQuery.inArray(t.defaultValue.toString().toLowerCase(), asgv.data.topCountry), 1),
                    "true" === t.showmore && -1 === l && (e.isd = asgv.data.isd.concat(e.isd)),
                    asgv.data.topCountry.unshift(t.defaultValue.toString().toLowerCase()),
                    0 === $("#" + t.element + " dt a").length && (o = '<dt><a><span></span><div class="as_arrow"></div></a><span class="value" ></span></dt>',
                        o += '<dd> <ul class="country_list"></ul></dd> ',
                        $("#" + t.element).append(o)),
                    $.each(e.isd, function (i) {
                        "undefined" != typeof t.defaultValue && "undefined" != typeof e.isd[i].data.iso && e.isd[i].data.iso.toString().toLowerCase() === t.defaultValue.toString().toLowerCase() && (t.onSelect.call(this, a.event, e.isd[i]),
                                s = 1),
                            o = '<li class="country_list_item" onclick=\'javascript:' + r[1] + "(event," + JSON.stringify(e.isd[i]).replace(/'/g, "â€™") + ")'><span style=\"background-position:0px -" + 11 * e.isd[i].data.icon_order + 'px"></span>',
                            o += "<a>" + e.isd[i].label + "</a></li>",
                            "true" === t.showmore ? e.isd[i].data.iso.toString().toLowerCase() != t.defaultValue.toString().toLowerCase() && !l > -1 && $("#" + t.element + " ul").append(o) : $("#" + t.element + " ul").append(o),
                            "true" === t.showmore && e.isd[i].data.iso.toString().toLowerCase() === t.defaultValue.toString().toLowerCase() && $("#" + t.element + " ul").prepend(o)
                    }),
                    "true" === t.showmore ? (l > -1 && $("#" + t.element + " ul").append('<li class="showmore"><a onclick=\'Suggester({"type":"isd","element":"' + t.element + '",fields: "cname,iso,icon_order",displayFields:"cname,value",displaySeparator:"  +","defaultValue":"' + t.defaultValue + '","showmore" : "false","onSelect":' + r[1] + "});return;'>Show More</a></li>"),
                        activateDropDown(t.element)) : ($("#" + t.element + " ul li.country_list_item:nth-child(5)").append("<li style='border-top:1px solid #cccccc;'></li>"),
                        $("#" + t.element + " ul li.showmore").remove(),
                        addScrollingInDd(t.element))
            }
        }
        
        var defaultSuggLen = {
            "city": 45,
            "location": 65,
            "mcat": 45,
            "unit": 45,
            "product": 45,
            "isd": 45,
            "custom": 45,
            "brand": 45,
            "country": 45,
            "city-state": 45,
            "default": 45

        }
        
        var contextKey = {
            "sellerId": "cntxt_sell",
            "cat": "cntxt_txnmy"
        }


        var Suggester = function (e) {
            try {
                if (!e)
                    return;
                e.maxSuggestLen || (e.maxSuggestLen = (typeof e.type !== "undefined" && e.type in defaultSuggLen) ? defaultSuggLen[e.type] : defaultSuggLen['default']);

                e.frstcapcase || (e.frstcapcase = 2) ,
                // e.cacheSuggestions || (e.cacheSuggestions = 0),
                e.minStringLengthToDisplaySuggestion || (e.minStringLengthToDisplaySuggestion = 1),
                    e.defaultSuggChk && (e.minStringLengthToDisplaySuggestion = 0),
                    "undefined" == typeof e.recentData && (e.recentData = !0),
                    e.minStringLengthToFetchSuggestion || (e.minStringLengthToFetchSuggestion = 0),
                    e.suggestionsToFetch || (e.suggestionsToFetch = 40),
                    e.classPlaceholder || (e.classPlaceholder = "ui-placeholder-input"),
                    e.maxCharForSuggestionRequest || (e.maxCharForSuggestionRequest = 29),
                    "undefined" == typeof e.highlight && (e.highlight = "normal"),
                    "undefined" == typeof e.defaultBox && (e.defaultBox = !1),
                    "undefined" != typeof e.type && "country" === e.type.toString().toLowerCase() && (e.method = "beginString"),
                    "undefined" != typeof e.type && "isd" === e.type.toString().toLowerCase() && (e.minStringLengthToDisplaySuggestion = 0,
                        e.suggestionsToFetch = 999,
                        e.iconHeight = asgv.isd.iconHeight,
                        "undefined" == typeof e.showmore && (e.showmore = "true")),
                    ("undefined" == typeof e.match && "undefined" == typeof e.type || "city" === e.type.toString().toLowerCase() || e.type.toString().toLowerCase().indexOf("product") > -1) && (e.match = "fuzzy"),
                    "undefined" == typeof e.match && (e.match = "exact"),
                    "undefined" == typeof e.type && (e.type = asgv.type),
                    "undefined" != typeof e.type && e.type === asgv.type && window.location.href.indexOf("hellotrade") < 0 && (e.fields = window.location.href.indexOf("m.indiamart") < 0 ? "type_data,sort_order" : ""),
                    e.rowsToDisplay || (e.rowsToDisplay = e.type === asgv.type && window.location.href.indexOf("m.indiamart") < 0 ? 10 : 5),
                    "undefined" == typeof e.relatedData && "undefined" != typeof e.type && e.type === asgv.type && (e.relatedData = "true"),
                    "undefined" != typeof e.type && e.type === asgv.type && (e.highlight = "normal"),
                    "undefined" == typeof e.module && (e.module = ""),
                    "undefined" != typeof e.module && e.module != "" && (e.module = "-" + e.module),
                    "undefined" == typeof e.dispstyle && (e.dispstyle = 1),
                    "undefined" == typeof e.pagetyp && (e.pagetyp = "p"),
                    "undefined" == typeof e.showloc && (e.showloc = 0),
                    "undefined" == typeof e.firstclck && (e.firstclck = 0),
                    this.config = e,
                    this.contextData = [],
                    this.context={            //Object containing context of the page 
                        mcat:0,      
                        cat:0,
                        sellerId:0
                     },
                    asgv.relmcatcity = [],
                    asgv.ld = [],
                    this.cache = new SuggestionCache(e),
                    this.mergeDefaultAndRecents = function(defConKeys,rcntKeys){                             
                       
                            return rcntKeys.concat(defConKeys)
                                              
                     },


                    this.recent = function (e, t, i) {
                        var n = {
                            searches: {
                                limit: 50
                            },
                            pdata: {
                                limit: 50
                            },
                            cities: {
                                limit: 10
                            },
                            mcats: {
                                limit: 50
                            },
                            mcatnames: {
                                limit: 50
                            },
                            cats: {
                                limit: 10
                            },
                            groups: {
                                limit: 10
                            },
                            sites: {
                                limit: 25
                            },
                            latLong: {
                                limit: 10
                            },
                            prodId: {
                                limit: 20
                            },
                            blsearches: {
                                limit: 100
                            },
                            location: {
                                limit: 50
                            },
                            prod_data: {
                                limit: 50
                            },
                            mcat_data: {
                                limit: 50
                            },
                            keyw_data: {
                                limit: 100
                            },
                            city_data: {
                                limit: 25
                            },
                            meta_data: {
                                limit: 3
                            },
                            rel_data:{
                                limit: 10
                            },
                            rel_prod:{
                                limit: 20
                            },
                            cntxt_txnmy:{
                                limit: 10
                            },
                            cntxt_sell:{
                                limit: 10
                            }
                        };
                        if ("undefined" != typeof t && "string" == typeof e) {
                            var o = {};
                            o[e] = t,
                                e = o
                        }
                        if ("object" == typeof e) {
                            var s = {};
                            $.each(e, function (e, t) {
                                    if (jQuery.inArray(e, perks) == -1) {
                                        if ("cities" === e) {
                                            if (!t.match(/^[a-zA-Z ]+$/)) {
                                                t = ""
                                            }
                                        }
                                        if ("location" === e) {
                                            if (!t.match(/^[:a-zA-Z ]+$/)) {
                                                t = ""
                                            }
                                        }
                                         if ("cats" === e) {
                                             a.setContext({cat:t, mcat:a.context.mcat});
                                         }
                                         if ("mcats" === e ) {
                                             a.setContext({mcat:t, cat:a.context.cat});
                                         }
                                            "cities" === e && (asgv.reqBoosters = "prod_city:" + t),
                                            "" !== t && (s[e] = t.toString().toLowerCase(),
                                                a.getSetRecent(e, t, i, n))
                                    } else {
                                        var p = {};
                                        p.gid = asgv.p_gid;
                                        p.vid = asgv.p_vid;
                                        var metadt = [{
                                            m_time: (new Date).getTime(),
                                            p_gid: p.gid,
                                            p_vid: p.vid
                                        }];
                                        var mtime = per_gid = per_vid = "";
                                        var meta_dt = asgv.store.getData("ims", "meta_data");
                                        if (meta_dt) {
                                            mtime = meta_dt[0].m_time;
                                            per_gid = meta_dt[0].p_gid;
                                            per_vid = meta_dt[0].p_vid
                                        } else {
                                            asgv.store.setData("ims", "meta_data", metadt)
                                        }
                                        if (!mtime || !per_gid || !per_vid) {
                                            asgv.store.setData("ims", "meta_data", metadt)
                                        }
                                        var pn = asgv.store.getData("ims", e) || [];
                                        if (jQuery.inArray(e, perks) != -1) {
                                            if (t != "" && typeof t != "undefined") {
                                                if (t[0]["type_update"] === undefined) {
                                                    t = t.concat(pn);
                                                    t = t.reduce(function (item, e1) {
                                                        var matches = item.filter(function (e2) {
                                                            return e1.id == e2.id
                                                        });
                                                        if (matches.length == 0) {
                                                            item.push(e1)
                                                        }
                                                        return item
                                                    }, []);
                                                    tl = t.length;
                                                    if (tl > 25) {
                                                        t = t.splice(0, 24)
                                                    }
                                                }
                                                asgv.store.setData("ims", e, t)
                                            }
                                        }
                                    }
                                }),
                                Object.keys(s).length > 0 && (s.vid = asgv.vid,
                                    s.gid = asgv.gid,
                                    s.type = "recent",
                                    s.dName = window.location.host)
                              //  this.context.cat!=0 && (this.contextData = defaultContextData(asgv.domain + "suggest/suggester.php", this.context.cat, this.context.mcat))
                        } else if (!t)
                            return a.getSetRecent(e, t, i, n)
                    },
                    this.getSetRecent = function (e, t, i, a) {
                        try {    
                                var brow1 = navigator.userAgent;
                                var res = brow1.match(/MSIE (\d)/);
                                if (t != 'undefined' && t != null && !Array.isArray(t) && typeof t != 'object') {
                                    t = [t];
                                }
                                if (jQuery.inArray(e, perks) != -1) {
                                    var ps = asgv.store.getData(i = "ims", e) || [],
                                        o = ["0", "-1", void 0, "undefined", null, "null", "type"];
                                    if (res == null || res[1] >= 9) {
                                        ps = $(ps).not(o).get();
                                        return ps
                                    }
                                } else {
                                
                                    if (e == "searches")
                                        e = "keyw_data";
                                    e in a || "undefined" != typeof i || (t = [e],
                                            e = "keyw_data"),
                                        "undefined" == typeof i && (i = "ims");
                                    var n = asgv.store.getData(i, e) || [],
                                        o = ["0", "-1", void 0, "undefined", null, "null", "type"];
                                    if (res == null || res[1] >= 9) {
                                        n = $(n).not(o).get();
                                        if (e == "keyw_data") {
                                            var s = n.map(function (e, t, i) {
                                                return "undefined" != typeof e.id ? e.id.toString().toLowerCase() : "string" == typeof e ? e.toString().toLowerCase() : null
                                            })
                                        } else {
                                            var s = n.map(function (e, t, i) {
                                                return e ? e.toString().toLowerCase() : null
                                            })
                                        }
                                    }
                                    if(t != 'undefined' && t != null && Array.isArray(t))
                                    {
                                        for (var key_ind = 0; key_ind < t.length; key_ind++)
                                        {  
                                            r = Suggester.getArrayCaseInsensitiveMatch(t[key_ind], n);
                                            if(e !== 'cities')
                                            {
                                            t[key_ind] = t[key_ind].toString().toLowerCase();
                                            } 
                                            if (JSON.stringify(n).length >= 1e3) {
                                                n.splice(r, 1)
                                            }
                                            if(-1 != r)
                                            {
                                                n.splice(r, 1)
                                            }

                                        }   
                                    }   
                                            return   e !== 'cities' ? (t && Array.isArray(t) ? void asgv.store.setData(i, e, Suggester.getTopN(t.concat(n), a[e].limit)) : s) : (t && Array.isArray(t) ? void asgv.store.setData(i, e, Suggester.getTopN(t.concat(n), a[e].limit)) : s)
                                }
                                
                            
                        }
                        catch(error)
                            {
                                eventTrack("Auto-suggest", error.message, 0, 0); 
                            }   
                    },
                   
                    this.setCursor = function (e, t, i) {
                        e.setSelectionRange ? (e.focus(),
                            e.setSelectionRange(t, i)) : e.createTextRange && (range = e.createTextRange(),
                            range.collapse(!0),
                            range.moveEnd("character", i),
                            range.moveStart("character", t),
                            range.select())
                        };
                    var t = "#" + e.element,
                        i = function () {
                            var e = document.createElement("input");
                            return "placeholder" in e
                        };
                    // $("#" + e.element).click(function () {
                    //     if (e.firstclck == 0 && document.getElementById(e.element).value != "" && e.type != "isd") {
                    //         document.getElementById(e.element).select();
                    //         e.firstclck = 1
                    //     }
                    // });
                    this.placeholderSupport = i(),
                        this.changePlaceholder = function (i) {
                            if ($(t).attr("placeholder", i),
                                this.placeholderSupport)
                                $(t).attr("placeholder", i);
                            else {
                                (!$(t).val() || $(t).hasClass(e.classPlaceholder)) && ($(t).val($(t).attr("placeholder")).addClass(e.classPlaceholder),
                                    $(t).is(":focus") === !0 && this.setCursor(document.getElementById($(t).attr("id")), 0, 0));
                                var a = this;
                                $(t).click(function () {
                                        $(this).val() == $(t).attr("placeholder") && a.setCursor(document.getElementById($(t).attr("id")), 0, 0)
                                    }),
                                    $(t).keydown(function () {
                                        $(this).val() == $(t).attr("placeholder") && $(this).val("").removeClass(e.classPlaceholder)
                                    }),
                                    $(t).on("paste", function () {
                                        $(this).val() === $(t).attr("placeholder") && $(this).val("").removeClass(e.classPlaceholder)
                                    }),
                                    $(t).focus(function () {
                                        $(t).val() && $(this).val() != $(t).attr("placeholder") || a.setCursor(document.getElementById($(t).attr("id")), 0, 0)
                                    }),
                                    $(t).blur(function (i) {
                                        "" == $(this).val() && $(this).val($(t).attr("placeholder")).addClass(e.classPlaceholder)
                                    })
                            }
                        },
                        this.changePlaceholder(e.placeholder);
                    var a = this,
                        n = "";
                    this.processContext = function(value) {
                        if (Array.isArray(value)) {
                            return value;
                        } else {
                            const intValue = parseInt(value);
                            return isNaN(intValue) ? 0 : intValue;
                        }
                    },
                    this.setLocalStorage = function(defaultContext) {
                        var storageKey = "";
                       
                        if(defaultContext.sellerId && defaultContext.sellerId != 0)
                        {
                            storageKey = contextKey["sellerId"];
                        }
                        else
                        {
                            storageKey = contextKey["cat"];
                        }
                        var self = this;
                        this.obj = {};
                        this.futureDate = getFutureDate(1,false);
                        this.storageKey = storageKey;
                    
                        function handleContextData(contextData) {
                            
                            if (contextData) {
                                self.contextData = contextData;
                                if (self.storageKey === "cntxt_txnmy" && defaultContext.cat != 0) {
                                    self.obj = {
                                        id: "c" + String(defaultContext.cat) + "m" + String(defaultContext.mcat),
                                        exp_date: self.futureDate,
                                        catid: defaultContext.cat,
                                        mcatid: defaultContext.mcat,
                                        data: { sugg: contextData }
                                    };
                                    self.recent({ "cntxt_txnmy": [self.obj] });
                                } else if (self.storageKey === "cntxt_sell" && defaultContext.sellerId != 0) {
                                    self.obj = {
                                        id: defaultContext.sellerId,
                                        exp_date: self.futureDate,
                                        data: { sugg: contextData }
                                    };
                                    self.recent({ "cntxt_sell": [self.obj] });
                                }
                    
                            }
                        }
                    
                        if (self.storageKey === "cntxt_txnmy") {
                            0 != defaultContext.cat && defaultContextData(asgv.domain + "suggest/suggester.php", defaultContext.cat, defaultContext.mcat, function(contextData) {
                                handleContextData(contextData);
                            });
                        } else if (self.storageKey === "cntxt_sell") {
                            
                             0 != defaultContext.sellerId && defaultSellerData("/miscreact/ajaxrequest/seller/blsearchSuggest/suggest/", defaultContext.sellerId, function(contextData) {
                                 handleContextData(contextData);
                             });
                            
                        }
                    },
                    
                    this.setDefaultContextData = function(defaultContext){         //Function to call defcon
                        var storageKey = "";
                       
                        if(defaultContext.sellerId && defaultContext.sellerId != 0)
                        {
                            storageKey = contextKey["sellerId"];
                        }
                        else
                        {
                            storageKey = contextKey["cat"];
                        }
                       
                        var self = this;
                        setTimeout(function() {
                            if(IMStore.localStorageLoaded)
                            {    
                                var defaultSugg = asgv.store.getData("ims", storageKey) || [];
                                if (Array.isArray(defaultSugg) && defaultSugg.length == 0)
                                {
                                    self.setLocalStorage(defaultContext);
                                } 
                                else if(Array.isArray(defaultSugg) && defaultSugg.length != 0)
                                {   let matchedObject = '';
                                    if(storageKey == "cntxt_txnmy" && defaultContext.cat != 0 && defaultContext.mcat != 0)
                                    {
                                        matchedObject = defaultSugg.find(obj => obj.catid && obj.catid == defaultContext.cat && obj.mcatid && obj.mcatid == defaultContext.mcat);
                                        if (matchedObject && matchedObject.exp_date && matchedObject.exp_date >= getFutureDate(0)) {
                                            self.contextData = matchedObject.data.sugg;
                                        
                                        } else {
                                            let match_cntxt = "c" + String(defaultContext.cat) + "m" + String(defaultContext.mcat);
                                            defaultSugg = defaultSugg.filter(obj => obj.id !== match_cntxt);
                                            asgv.store.setData("ims",storageKey,defaultSugg);
                                            self.setLocalStorage(defaultContext);
                                        }
                                    }

                                    else if(storageKey == "cntxt_sell" && defaultContext.sellerId != 0)
                                    {
                                        matchedObject = defaultSugg.find(obj => obj.id && obj.id == defaultContext.sellerId);
                                        if (matchedObject && matchedObject.exp_date && matchedObject.exp_date >= getFutureDate(0)) {
                                            self.contextData = matchedObject.data.sugg;
                                          
                                        } else {
                                            defaultSugg = defaultSugg.filter(obj => obj.id !== defaultContext.sellerId);
                                            asgv.store.setData("ims",storageKey,defaultSugg);
                                            self.setLocalStorage(defaultContext);
                                        }
                                    }
                                }
                            }
                            else{
                                self.contextData = [];
                            }
                        },1000);
                    },
                    this.setContext=function(pageContext){        //function to set the Context for the Page                        
                        
                        
                        if(pageContext.cat)
                        {
                            this.context.cat = this.processContext(pageContext.cat); 
                        }

                        if(pageContext.mcat)
                        {
                            this.context.mcat = this.processContext(pageContext.mcat); 
                        }

                        if(pageContext.sellerId)
                        {
                            this.context.sellerId = this.processContext(pageContext.sellerId); 
                        }

                        this.setDefaultContextData(this.context);
                        this.cache = new SuggestionCache(e);                        
                        
                    },
                    (e.context)  && this.setContext(e.context),  
        
                    a.keyDownRecorded = !1,
                        a.displayRecorded = !1,
                        a.serverDisplayRecorded = !1,
                        a.preFilledTerm = "",
                        a.selectionRecorded = !1,
                        a.displayListLength = 0,
                        a.previousTerm = "",
                        a.pasteFired = !1,
                    this.searchBoxVal = function (e) {
                        var t = $(e).val();
                        t = "string" == typeof t && "" !== t ? t.indexOf(" in ") > -1 || t.indexOf(" from ") > -1 ? cleanString(t, 1) : t : "",
                            $(e).autocomplete("search", t)
                    },
                    this.autoSearch = function (t) {
                        $(t).bind("focus", function () {
                                e.type === asgv.type && a.searchBoxVal(t)
                            }),
                            $(t).bind("click", function () {
                                setTimeout(function () {
                                    $(".ui-menu:not(.dsp)").css("display", "none"),
                                        t.indexOf("search_string") < 0 && $(".autocomplete-box").removeClass("dsp").css("display", "none"),
                                        a.searchBoxVal(t)
                                }, 200)
                            }),
                            $(t).bind("paste", function () {
                                setTimeout(function () {
                                        a.pasteFired = !0,
                                            a.searchBoxVal(t)
                                    }),
                                    setTimeout(function () {
                                        a.pasteFired = !1
                                    }, 2e3)
                            }),
                            $(t).ready(function () {
                                setTimeout(function () {
                                        $(t).attr("autocomplete", atocmplt_attr)
                                }, 1500)
                            })
                    },     
                    this.autoSearch(t),
                    this.isDefaultBox = function (e) {
                        1 == e && $(document).keydown(function (e) {
                            var i = e.which,
                                a = document.activeElement.name;
                            if ((void 0 === a || "" === a) && i >= 65 && 90 >= i && !e.ctrlKey) {
                                var n = $(t).val();
                                $(t).focus(),
                                    n = "string" == typeof n && "" !== n ? $.trim(n) + " " : n,
                                    $(t).val(n)
                            }
                        })
                    },
                    this.onExplicitChangeSuccess = function (e, t, i, a, n) {
                        var o;
                        $.each(e, function (t, i) {
                                return e && void 0 !== e[t]._list ? void(o = {
                                    item: e[t]._list[0]
                                }) : e && void 0 !== e[t][0] ? void(o = {
                                    item: e[t][0]
                                }) : void(o = {
                                    item: ""
                                })
                            }),
                            t.onExplicitChange.call(this, a.event, o)
                    },
                    this.onEnd = function () {
                        var i = $("#" + e["element"]).val().toString().toLowerCase(),
                            n = document.cookie.indexOf("xnHist=") > -1 && document.cookie.indexOf("ss%3D") > -1 ? document.cookie.substring(document.cookie.indexOf("xnHist="), document.cookie.indexOf("ss%3D") + 5) : document.cookie.indexOf("xnHist=") > -1 ? document.cookie.substring(document.cookie.indexOf("xnHist="), document.cookie.indexOf(";", document.cookie.indexOf("xnHist="))) + "%3Dss%7C" : "xnHist=ss%3D";
                        0 === a.displayListLength ? (n += "notDisplayed",
                            eventTrack("Auto-Suggest", e.type + e.module + "-mode-" + asgv.mode + "-suggestion-not-displayed-ms-" + 500 * Math.ceil(((new Date).getTime() - a.firstKeyDownTime) / 500) + "-paste-" + a.pasteFired, i, 0)) : a.displayListLength > 0 && a.selectionRecorded === !1 ? (n += "notSelected",
                            eventTrack("Auto-Suggest", e.type + e.module + "-mode-" + asgv.mode + "-suggestion-not-selected-ms-" + 500 * Math.ceil(((new Date).getTime() - a.firstKeyDownTime) / 500) + "-paste-" + a.pasteFired, i, 0)) : n += "selected";
                        var o = new Date;
                        o.setTime(o.getTime() + 15552e6),
                            document.cookie = n + ";expires=" + o.toGMTString() + ";domain=.indiamart.com;path=/;"
                    },
                    this.requestData = function (e, t, i, a) {
                        var suggestURL = "product" == e.type ? "suggest/suggester.php" : "suggest/suggest.php";
                        // var cache1 = (e.cacheSuggestions != 0) ? false : !0;
                        var cache1 = ((typeof(i.type) != 'undefined' && (i.type == 'mcat' || i.type == 'brand')) || (typeof(e.type) != 'undefined' && (e.type == 'mcat' || e.type == 'brand'))) ? false : !0;
                        $.ajax({
                            url: e.url || asgv.domain + suggestURL,
                            dataType: "json",
                            cache: cache1,
                            data: {
                                q: i.searchTerm.trim() || i.term.trim(),
                                tag: "suggestions",
                                limit: i.limit || e.suggestionsToFetch,
                                type: i.type || e.type,
                                fields: i.fields || e.fields,
                                filters: i.filters || e.filters,
                                method: i.method || e.method,
                                display_fields: i.displayFields || e.displayFields,
                                display_separator: i.displaySeparator || e.displaySeparator,
                                match: i.match || e.match,
                                catid: this.context.cat,
                                mcatid: this.context.mcat,
                                v: asgv.version || -1,
                                country: i.country || e.country
                            },
                            success: function (n) {
                                if (n && typeof n["product"] != "undefined" && n["product"] != null) {
                                    delete n.debugQ;
                                }
                                if (null != i.cache) {
                                    i.sugg = new Suggestions;
                                    var o = i.sugg.DIRECT,
                                        s = {};
                                    if (s.valuesCount = 0,
                                        s.dTypeCount = 0,
                                        i.type === asgv.type) {
                                        var r = n.mcat;
                                        delete n.mcat,
                                            n.mcat = r
                                    }
                                    n && n["product"] != null && $.each(n, function (t, a) {
                                            if (cleanString(i.searchTerm).length > 30)
                                                o = i.sugg.COMPLETE;
                                            else if (a.length === e.suggestionsToFetch)
                                                return o = i.sugg.FILTERED,
                                                    !1
                                        }),
                                        $.each(n, function (t, a) {
                                            if (i.term === i.searchTerm && "product" == t && "undefined" != typeof i.cache._cache[cleanString(i.term).substr(0, cleanString(i.term).length - 1)]) {
                                                var o = new Object;
                                                "fuzzy" == e.match && (n[t] = Suggester.getTopN(previouskeyCache(cleanString(i.term, 1), i.cache._cache[cleanString(i.term).substr(0, cleanString(i.term).length - 1)]._list[t], t, o, e)[t].concat(n[t]), i.rowsToDisplay, i.maxSuggestLen))

                                            }
                                        });
                                    i.sugg.list(n, o),
                                        "city" == i.type || "domain" == e.type ? i.cache.cache(i.term, e, i.term, i.sugg) : i.cache.cache(cleanString(i.searchTerm), e, cleanString(i.searchTerm), i.sugg)
                                }
                                "function" == typeof i.onSuccess && i.onSuccess(n, e, t, i, a)
                            }
                        })
                    },
                    this.renderData = function (e, i, a, n, o) {
                        var s = n.term.trim(),
                            r = n.searchTerm;
                        if (s.length >= i.minStringLengthToDisplaySuggestion && ("city" == n.type || "domain" === i.type || cleanString(s) == cleanString(r))) {
                            "domain" === i.type ? a.changeList(i, n.addBeforCity + "@", e.domain) : "";
                            var l = [],
                                recentKeys = [],
                                defaultContexualKeys = [],
                                contextualFirst = [],
                                cls1 = "",
                                c = i.type ? i.type : "keyword";
                            if ("city" != i.type && "city" != n.type || 1 != i.recentData)
                                i.type == asgv.type && 1 == i.recentData && (i.pagetyp == "bl" ? l = Suggester.getTopN(Suggester.match(s.trim(), a.recent("blsearches"), i.method), i.rowsToDisplay, i.maxSuggestLen) : l = Suggester.getTopN(Suggester.match(s.trim(), a.recent("keyw_data").map(function (s) {
                                        return "undefined" != typeof s.id ? s.id.replace(" near me", "") : "undefined" != typeof s.label ? s.label.replace(" near me", "") : "string" == typeof s ? s.replace(" near me", "") : null
                                    }), i.method), i.rowsToDisplay, i.maxSuggestLen),
                                    i.pagetyp == "bl" ? cls1 = "blrcnt" : cls1 = "rcnt",
                                    "undefined" != typeof l && $.each(l, function (e, t) {
                                        l[e] = {
                                            label: t.replace(/\w+/g, function (e) {
                                                return e.charAt(0).toUpperCase() + e.substr(1).toString().toLowerCase()
                                            }),
                                            value: t.replace(/\w+/g, function (e) {
                                                return e.charAt(0).toUpperCase() + e.substr(1).toString().toLowerCase()
                                            }),
                                            cls: cls1
                                        }
                                    }),
                                    $.each(Suggester.match(s.trim(), a.contextData, i.method), function (e, t) {
                                        l.push({
                                            label: t.value.toString().toLowerCase(),
                                            value: t.value.toString().toLowerCase(),
                                            cls: t.cls.toString().toLowerCase()
                                        })
                                    }),
                                    $.each(Suggester.match(s.trim(), asgv.topSearches, i.method), function (e, t) {
                                        l.push({
                                            label: t.toString().toLowerCase(),
                                            value: t.toString().toLowerCase(),
                                            cls: "topsearches"
                                        })
                                    }));
                            else {
                                if (l = Suggester.match(s, a.recent("cities"), i.method),l = l.map(Suggester.toTitleCase),
                                    "city" != i.type) {
                                    if (i.showloc == 1) {
                                        l = Suggester.match(r, a.recent("location"), i.method)
                                    } else {
                                        l = Suggester.match(r, a.recent("cities"), i.method)
                                    }
                                    var disSep = i.displaySeparator;
                                    if (l.indexOf(":") > -1) {
                                        l = l.replace(":", disSep)
                                    }
                                    for (var d = 0; d < l.length; d++)
                                        l[d] = s.substring(0, s.length - r.length) + l[d].replace(/(^| )(\w)/g, function (e) {
                                            return e.toUpperCase()
                                        })
                                }
                                $.each(l, function (e, t) {
                                    l[e] = {
                                        label: t,
                                        value: t,
                                        cls: "rcnt"
                                    }
                                })
                            }
                            if ("undefined" != typeof n.sugg._list.city && n.sugg._list.city.length > 0 && cleanString(s) != cleanString(r) && a.changeList(n, n.addBeforCity, n.sugg._list.city),
                                l = a.createDpList(e, Suggester.getTopN(l ,i.rowsToDisplay, i.maxSuggestLen), i.rowsToDisplay, a, n.term, i.element, i.type),
                                o(Suggester.remDuplicateImg(Suggester.getTopN(l, i.rowsToDisplay, i.maxSuggestLen, i.frstcapcase))),
                                a.displayListLength = l.length,
                                l.length > 0) {
                                var u = (new Date).getTime() - a.firstKeyDownTime;
                                

                                a.displayRecorded || (eventTrack("Auto-Suggest", c + i.module + "-mode-" + asgv.mode + "-appearance-speed", "after-ms-" + u + "-after-char-" + s.length, u),
                                    a.displayRecorded = !0);

                                if (!a.serverDisplayRecorded && "undefined" != typeof a.prefix && a.prefix.term == n.searchTerm) {
                                    a.prefix.fetchTime = (new Date).getTime() - a.prefix.keydownTime;
                                    eventTrack("Auto-Suggest", c + i.module + "-mode-" + asgv.mode + "-appearance-speed-server", "after-ms-" + a.prefix.fetchTime, a.prefix.fetchTime);
                                    a.serverDisplayRecorded = true;
                                }

                            }
                            i.type == asgv.type && a.searchBoxVal(t)
                        }
                    },
                    this.changeList = function (e, t, i) {
                        var a = i;
                        for (var n = 0; n < a.length; n++)
                            a[n].value = a[n].label = t + a[n].label.toString().toLowerCase()
                    },
                    this.createDpList = function (e, t, i, a, term, elem, typ) {
                        var c = [],
                            s = [],
                            p = [],
                            r = [],
                            topRes_Sort = [],
                            top_count = 20,
                            topRes = [],
                            botRes = [],
                            n = {};
                        var elemId = "#".concat(elem);
                        exact_data = exactMatchResults(e[typ], term, typ);
                        e[typ] = exact_data.concat(e[typ]);
                        var uniqueRes = [];
                        $.each(e[typ], function (i, el) {
                            if (jQuery.inArray(el, uniqueRes) === -1)
                                uniqueRes.push(el)
                        });
                        e[typ] = uniqueRes;
                        $.each(e, function (e, b) {
                            if ("mcat" != e) {
                                if (b[0] != undefined) {
                                    n = Suggester.getTopN(b, 125, a.config.maxSuggestLen, a.config.frstcapcase)
                                }
                                if ("product" == e) {
                                    for (var o = t.length - 1; o > -1; o--)
                                        $.each(n, function (e, i) {
                                            return "undefined" != typeof i && "undefined" != typeof i.data && "undefined" != typeof t[o].label && t[o].label.toString().toLowerCase() == i.label.toString().toLowerCase() ? (t[o].data = i.data,
                                                n.splice(e, 1),
                                                !1) : void 0
                                        });
                                    t = t.concat(n)
                                }
                                "mcat" !== e && "product" !== e && (t = Suggester.getTopN(t.concat(b), i, a.config.maxSuggestLen, a.config.frstcapcase))
                            } else {
                                t = Suggester.getTopN(t.concat(b), i, a.config.maxSuggestLen, a.config.frstcapcase)
                            }
                        });
                        exact_data = exactMatchResults(t, term, typ);
                        t = exact_data.concat(t);
                        var uniqueRes = [];
                        $.each(t, function (i, el) {
                            if (jQuery.inArray(el, uniqueRes) === -1)
                                uniqueRes.push(el)
                        });
                        t = uniqueRes;
                        topRes = t.slice(0, top_count);
                        botRes = t.slice(top_count, t.length);
                        topRes_Sort = sortingResults(topRes, term, exact_data, typ);
                        topRes_Sort = topRes_Sort.concat(botRes);
                        t = topRes_Sort;
                        return t
                    },
                    this.finish = function () {
                        this.serverDisplayRecorded = this.displayRecorded = this.selectionRecorded = false;
                    }
                    onDocReady = function () {
                 
                        var i = a.cache;
                        if ("isd" === e.type) {
                            var uniq_str = "undefined" != typeof e.element ? e.element.replace(/\W+/g, "_") : "";
                            var o = {};
                            o.term = "",
                                o.limit = 500,
                                o.type = "isd",
                                o.callbackstr = "Suggester_callback_" + e.method + uniq_str,
                                o.searchTerm = "",
                                o.cache = i,
                                o.onSuccess = renderIsd,
                                e.defaultValue = "undefined" != typeof e.defaultValue && "" === e.defaultValue ? "IN" : e.defaultValue;
                            var s = "false";
                            return $.each(asgv.data.isd, function (t, i) {
                                    i.data.iso === e.defaultValue && (s = "true")
                                }),
                                void("undefined" != typeof e.showmore && "true" === e.showmore && "true" === s ? renderIsd(asgv.data, e, a, o, "") : a.requestData(e, a, o, ""))
                        }
                        var r = $(t).autocomplete({
                            delay: 10,
                            source: function (t, o) {
                                t.term = t.term.toString().toLowerCase(),
                                    t.cache = a.cache,
                                    n = t.term,
                                    t.callbackstr = "Suggester_callback_",
                                    t.searchTerm = cleanString(n, 1),
                                    t.onSuccess = a.renderData;
                                var s = e.type ? e.type : "keyword";
                                a.keyDownRecorded || (eventTrack("Auto-Suggest", s + e.module + "-mode-" + asgv.mode + "-keydown", "first-keydown", 1),
                                    a.firstKeyDownTime = (new Date).getTime(),
                                    a.preFilledTerm = n,
                                    a.keyDownRecorded = !0);
                                if (!a.serverDisplayRecorded && "undefined" == typeof a.prefix && Math.floor(Math.random() * 10) == 0) {
                                    a.prefix = { keydownTime: (new Date).getTime(), term: t.searchTerm };
                                }

                                var r = 3;
                                "city" == e.type && (r = 1),
                                    n.length == r && (new Date).getTime(),
                                    a.termWords = (n.match(/\s+/g) || []).length;
                                var l = e.source;
                                if (l && n.length >= e.minStringLengthToDisplaySuggestion) {
                                    if (e.finder)
                                        l = e.finder(l, n);
                                    else {
                                        n = cleanString(t.term, {preserveSpaces: true}),
                                            $.each(l, function (e, t) {
                                                "string" == typeof t && (l[e] = {
                                                    label: t,
                                                    value: t
                                                })
                                            });
                                        var c;
                                        c = e.method && "beginstring" == e.method.toString().toLowerCase() ? new RegExp("^" + n, "i") : new RegExp("\\b" + n, "i"),
                                            l = $.grep(l, function (e, t) {
                                                var i = cleanString(e.label, {preserveSpaces: true});
                                                return c.test(i)
                                            })
                                    }
                                    if ($.each(l, function (e, t) {
                                            "string" == typeof t && (l[e] = {
                                                label: t,
                                                value: t
                                            })
                                        }),
                                        o(Suggester.getTopN(l, e.rowsToDisplay, e.maxSuggestLen, e.frstcapcase)),
                                        !a.displayRecorded) {
                                        var d = (new Date).getTime() - a.firstKeyDownTime,
                                            u = n.length === a.preFilledTerm.length && n === a.preFilledTerm ? 0 : n.length;
                                        eventTrack("Auto-Suggest", s + e.module + "-mode-" + asgv.mode + "-appearance-speed", "after-ms-" + d + "-after-char-" + u, d),
                                            a.displayRecorded = !0
                                    }
                                } else {
                                    "domain" === e.type && n.indexOf("@") > -1 && (t.addBeforCity = n.substr(0, n.indexOf("@")),
                                            n = t.searchTerm = " "),
                                        n = cleanString(n, 1);
                                    var disSep = e.displaySeparator;
                                    var p;
                                    t.addPartialTerm = "",
                                        p = "domain" === e.type ? t.cache.cache(t.term, e, t.term) : t.cache.cache(n, e, n),
                                        inCity = n.indexOf(" in") > -1 || n.indexOf(" from") > -1 ? n : false,
                                        n = cleanString(n,1);
                                    var g = [];
                                    var recentKeys = [];
                                    var defaultContexualKeys = [];
                                    var contextualFirst = [];
                                    var cls1 = "";
                                    var elem = e.element;
                                    var typ = e.type;
                                    var uniqueRes1 = [];
                                    isSolr = true;
                                    if (e.type == asgv.type && 1 == e.recentData ? (e.pagetyp == "bl" ? g = Suggester.getTopN(Suggester.match(n, a.recent("blsearches"), e.method), e.rowsToDisplay, e.maxSuggestLen, e.frstcapcase) : g = Suggester.getTopN(Suggester.match(n, a.recent("keyw_data").map(function (s) {
                                                return "undefined" != typeof s.id ? s.id.replace(" near me", "") : "undefined" != typeof s.label ? s.label.replace(" near me", "") : "string" == typeof s ? s.replace(" near me", "") : null
                                            }).concat(a.recent("prod_data").map(function (pd) {
                                                return pd.name
                                            })).concat(a.recent("mcat_data").map(function (md) {
                                                return md.name
                                            })), e.method), e.rowsToDisplay, e.maxSuggestLen, e.frstcapcase),
                                            e.pagetyp == "bl" ? cls1 = "blrcnt" : cls1 = "rcnt",
                                            $.each(g, function (e, t) {
                                                g[e] = {
                                                    label: t.toString().toLowerCase(),
                                                    value: t.toString().toLowerCase(),
                                                    cls: cls1
                                                };
                                                if (isSolr)
                                                    recentKeys[e] = g[e]
                                            }),
                                            $.each(Suggester.match(t.term.trim(), a.contextData, e.method), function (e, t) {
                                                g.push({
                                                    label: t.value.toString().toLowerCase(),
                                                    value: t.value.toString().toLowerCase(),
                                                    cls: t.cls.toString().toLowerCase()
                                                });
                                                if (isSolr)
                                                    defaultContexualKeys.push({
                                                        label: t.value.toString().toLowerCase(),
                                                        value: t.value.toString().toLowerCase(),
                                                        cls: t.cls
                                                    })
                                            }),
                                            $.each(Suggester.match(t.term.trim(), asgv.topSearches, e.method), function (e, t) {
                                                g.push({
                                                    label: t.toString().toLowerCase(),
                                                    value: t.toString().toLowerCase(),
                                                    cls: "topsearches"
                                                });
                                                if (isSolr)
                                                    defaultContexualKeys.push({
                                                        label: t.toString().toLowerCase(),
                                                        value: t.toString().toLowerCase(),
                                                        cls: "topsearches"
                                                    })
                                            }),
                                            isSolr && (g = a.contextData.length ? a.mergeDefaultAndRecents(defaultContexualKeys,recentKeys) : recentKeys)) : "city" == e.type && 1 == e.recentData && (e.showloc == 1 ? g = Suggester.match(n, a.recent("location"), e.method) : g = Suggester.match(n, a.recent("cities"), e.method),
                                            $.each(g, function (e, t) {
                                                if (t.indexOf(":") > -1) {
                                                    t = t.replace(":", disSep)
                                                }
                                                g[e] = {
                                                    label: t.replace(/\w+/g, function (e) {
                                                        return e.charAt(0).toUpperCase() + e.substr(1).toString().toLowerCase()
                                                    }),
                                                    value: t.replace(/\w+/g, function (e) {
                                                        return e.charAt(0).toUpperCase() + e.substr(1).toString().toLowerCase()
                                                    }),
                                                    cls: "rcnt"
                                                }
                                            })),
                                        (n.length >= e.minStringLengthToDisplaySuggestion || "domain" == e.type) && (p && n.trim() == cleanString(t.searchTerm,1) ? g = a.createDpList(p.list(), Suggester.getTopN(g, e.rowsToDisplay, e.maxSuggestLen, e.frstcapcase), e.rowsToDisplay, a, t.searchTerm, elem, typ) : p && p.list()[typ].length && t.searchTerm.indexOf(" ") > -1 && $.each(p.list(), function (e, i) {
                                            $.each(i, function (e, i) {
                                                var cls = "";
                                                var last_dis = 0;
                                                if (typeof i.cls != "undefined" && i.cls != "" && i.cls == "rcnt") {
                                                    cls = i.cls
                                                }
                                                if (typeof i.last_dis != "undefined" && i.last_dis != "") {
                                                    last_dis = i.last_dis
                                                }
                                                if (t.addPartialTerm.substring(t.addPartialTerm.trim().lastIndexOf(" ")).trim() == i.value.substring(0, i.value.indexOf(" "))) {
                                                    var a = t.addPartialTerm.substring(0, t.addPartialTerm.trim().lastIndexOf(" ") + 1) + i.label;
                                                    g.push({
                                                        label: a,
                                                        value: a,
                                                        pos: i.pos,
                                                        last_dis: last_dis,
                                                        cls: cls
                                                    })
                                                } else {
                                                    var a = t.addPartialTerm + i.label;
                                                    g.push({
                                                        label: a,
                                                        value: a,
                                                        data: i.data,
                                                        pos: i.pos,
                                                        last_dis: last_dis,
                                                        cls: "partial"
                                                    })
                                                }
                                            })
                                        })),
                                        exact_data = exactMatchResults(g, t.searchTerm, typ),
                                        g = exact_data.concat(g).concat(),
                                        $.each(g, function (i, el) {
                                            if (jQuery.inArray(el, uniqueRes1) === -1)
                                                uniqueRes1.push(el)
                                        }),
                                        g = uniqueRes1,
                                        topRes = g.slice(0, 20),
                                        botRes = g.slice(20, g.length),
                                        g = sortingResults(topRes, t.searchTerm, exact_data, typ).concat(botRes),
                                        inCity && e.type == asgv.type && 1 == a.displayRecorded) {
                                        containsIn = true;
                                        t.addBeforCity = inCity.indexOf(" in") > -1 ? inCity.substring(0, inCity.indexOf(" in") + 3) : inCity.substring(0, inCity.indexOf(" from") + 5),
                                            t.searchTermCity = inCity.indexOf(" in") > -1 ? inCity.substring(inCity.indexOf(" in") + 4).trim() : inCity.substring(inCity.indexOf(" from") + 6).trim();
                                        

                                        if (!asgv.geoCity) asgv.geoCity = SuggestUtils.readCookie('GeoLoc', 'lg_ct');
                                        if (!asgv.ipCity) asgv.ipCity = SuggestUtils.readCookie('iploc', 'gctnm');
                                        var gcity = Suggester.match(t.searchTermCity, a.recent("cities"), e.method).slice(0, 3).concat(Suggester.match(t.searchTermCity, [asgv.geoCity, asgv.ipCity], e.method));

                                        for (var f = 0; f < gcity.length; f++) {
                                            if (gcity[f].match(/^[A-Za-z ]+$/)) {
                                                gcity[f] = t.addBeforCity + " " + gcity[f].toString().toLowerCase()
                                            } else {
                                                gcity[f] = ""
                                            }
                                        }
                                        gcity = gcity.filter(Boolean);
                                        $.each(gcity, function (e, t) {
                                                gcity[e] = {
                                                    label: t,
                                                    value: t,
                                                    data: {
                                                        type_data: 5,
                                                        sort_order: 5
                                                    }
                                                }
                                            }),
                                            p && "undefined" != typeof p.list().city && p.list().city.length > 0 && (gcity = gcity.concat(p.list().city)),
                                            g = g.filter(function (product) {
                                                return !(product.cls == "" || product.cls == "partial" || !product.data) && product.data.type_data != 5
                                            }).concat(gcity).concat(g.filter(function (product) {
                                                return product.data && product.data.type_data == 5
                                            }))
                                    }

                                    if (o(Suggester.remDuplicateImg(Suggester.getTopN(g, e.rowsToDisplay,e.maxSuggestLen,e.frstcapcase))),
                                        a.displayListLength = g.length,
                                        !a.displayRecorded && g.length > 0) {
                                        var d = (new Date).getTime() - a.firstKeyDownTime,
                                            u = n.length === a.preFilledTerm.length && n === a.preFilledTerm ? 0 : n.length;
                                        eventTrack("Auto-Suggest", s + e.module + "-mode-" + asgv.mode + "-appearance-speed", "after-ms-" + d + "-after-char-" + u, d),
                                            a.displayRecorded = !0
                                    }
                                    if (p && (p.type == p.DIRECT || p.type == p.COMPLETE)) return;
                                    "" !== t.searchTerm && "undefined" == typeof t.cache._cache[t.searchTerm] && (!p || p.type == p.FILTERED) && t.searchTerm.length <= e.maxCharForSuggestionRequest && a.previousTerm != t.searchTerm && ("domain" !== e.type || "domain" == e.type && t.term.indexOf("@") > 0 && t.term.indexOf("@") + 1 === t.term.length) && (a.previousTerm = t.searchTerm.trim(),
                                        1 == t.searchTerm.length && (t.limit = 40),
                                        t.searchTerm == t.searchTerm.trim() && a.requestData(e, a, t, o));
                                }
                            },
                            minLength: e.minStringLengthToFetchSuggestion,
                            select: function (i, o) {
                                var s = e.type ? e.type : "keyword";
                                typeParam = {
                                    1: 'context',
                                    2: 'popular',
                                    3: 'keyword',
                                    4: 'company',
                                    5: 'incity'
                                };
                                if ((e.type == "keyword" || e.type == "product") && "undefined" != typeof o.item && (o.item["askwdSel"] = 1)) {
                                    if ("undefined" != typeof o.item.data && "undefined" != typeof o.item.data.type_data) {
                                        if (o.item.data.type_data == 1) {
                                            if (typeof n != "undefined" && n != "") {
                                                o.item["trackid"] = "as-context|kwd=" + n;
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            } else {
                                                o.item["trackid"] = "as-context";
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            }
                                            if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                                o.item.trackid = o.item.trackid + ":near=" + "1"
                                            }
                                        } else if (o.item.data.type_data == 2) {
                                            if (typeof n != "undefined" && n != "") {
                                                o.item["trackid"] = "as-popular|kwd=" + n;
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            } else {
                                                o.item["trackid"] = "as-popular";
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            }
                                            if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                                o.item.trackid = o.item.trackid + ":near=" + "1"
                                            }
                                        } else if (o.item.data.type_data == 3) {
                                            if (typeof n != "undefined" && n != "") {
                                                o.item["trackid"] = "as-kwd|kwd=" + n;
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            } else {
                                                o.item["trackid"] = "as-kwd";
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            }
                                            if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                                o.item.trackid = o.item.trackid + ":near=" + "1"
                                            }
                                        } else if (o.item.data.type_data == 4) {
                                            if (typeof n != "undefined" && n != "") {
                                                o.item["trackid"] = "as-comp|kwd=" + n;
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            } else {
                                                o.item["trackid"] = "as-comp";
                                                if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                    o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                                }
                                            }
                                            if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                                o.item.trackid = o.item.trackid + ":near=" + "1"
                                            }
                                        }  else if (o.item.data.type_data == 5) {

                                            o.item["trackid"] = 'as-' + typeParam[o.item.data.type_data];
                                            o.item["trackid"] += n ? '|kwd=' + n : '';
                                            o.item["trackid"] += o.item.last_dis ? ':ret=' + o.item.last_dis : '';
                                        }


                                    } else if ("undefined" != typeof o.item && "undefined" != typeof o.item.cls && o.item.cls == "defaultcon") {
                                        if (typeof n != "undefined" && n != "") {
                                            o.item["trackid"] = "as-default|kwd=" + n;
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        } else {
                                            o.item["trackid"] = "as-default";
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        }
                                        if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                            o.item.trackid = o.item.trackid + ":near=" + "1"
                                        }

                                    } else if ("undefined" != typeof o.item && "undefined" != typeof o.item.cls && o.item.cls == "rcmnd") {
                                        if (typeof n != "undefined" && n != "") {
                                            o.item["trackid"] = "as-rcmnd|kwd=" + n;
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        } else {
                                            o.item["trackid"] = "as-rcmnd";
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        }
                                        if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                            o.item.trackid = o.item.trackid + ":near=" + "1"
                                        }

                                    } else if ("undefined" != typeof o.item && "undefined" != typeof o.item.cls && o.item.cls == "cntxt_sell") {
                                        if (typeof n != "undefined" && n != "") {
                                            o.item["trackid"] = "as-selcnxt|kwd=" + n;
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        } else {
                                            o.item["trackid"] = "as-selcnxt";
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        }
                                        if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                            o.item.trackid = o.item.trackid + ":near=" + "1"
                                        }
                                    } else if ("undefined" != typeof o.item && "undefined" != typeof o.item.cls && o.item.cls == "blrcnt") {
                                        if (typeof n != "undefined" && n != "") {
                                            o.item["trackid"] = "as-blrcnt|kwd=" + n;
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        } else {
                                            o.item["trackid"] = "as-blrcnt";
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        }
                                        if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                            o.item.trackid = o.item.trackid + ":near=" + "1"
                                        }
                                    } else {
                                        if (typeof n != "undefined" && n != "") {
                                            o.item["trackid"] = "as-rcnt|kwd=" + n;
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        } else {
                                            o.item["trackid"] = "as-rcnt";
                                            if (typeof o.item.last_dis != "undefined" && o.item.last_dis == 1) {
                                                o.item["trackid"] = o.item["trackid"] + ":ret=" + o.item.last_dis
                                            }
                                        }
                                        if ("undefined" != typeof o.item.addedNear && o.item.addedNear != "" && o.item.addedNear) {
                                            o.item.trackid = o.item.trackid + ":near=" + "1"
                                        }
                                    }
                                    
                                    var typedWordCount = 0;
                                    typeof n != "undefined" && n != null && (typedWordCount = n.trim().length > 0 ? n.split(" ").length : 0);
                                   
                                    o.item.trackid += ("|pos=" + (o.item.pos ? o.item.pos : "-1"));
                                    o.item.trackid += ("|cat=" + (a.context.cat!=0 ? a.context.cat : "-2"));
                                    o.item.trackid += ("|mcat=" + (a.context.mcat!=0 ? a.context.mcat : "-2"));
                                    o.item.trackid += ("|kwd_len=" + (typeof n != "undefined" && n != null ? n.length : "-2"));
                                    o.item.trackid += ("|kwd_cnt=" + (typeof typedWordCount != "undefined" && typedWordCount != null ? typedWordCount : "-2"));

                            
                                }
                                s += "undefined" == typeof o.item.cls ? "-other" : "-" + o.item.cls;
                                typ_data = "undefined" != typeof o.item && "undefined" != typeof o.item.data && "undefined" != typeof o.item.data.type_data ? "-type-" + o.item.data.type_data : "";
                                var r = 500 * Math.ceil(((new Date).getTime() - a.firstKeyDownTime) / 500);
                                !a.selectionRecorded && eventTrack("Auto-Suggest", "selected-" + s + typ_data + e.module + "-mode-" + asgv.mode + "-after-char-" + (n.length === a.preFilledTerm.length && n === a.preFilledTerm ? '0' : n.length) + "-pos-" + ("undefined" != typeof o.item.pos ? o.item.pos : '0') + (("undefined" != typeof o.item.data && "undefined" != typeof o.item.data.cat && "undefined" != typeof o.item.data.catid) ? ("-cat-" + o.item.data.catid + "-" + o.item.data.cat) : ''), n + " - " + o.item.value + "-keydown-to-selection-time-ms-" + r, "undefined" != typeof o.item.pos ? parseInt(o.item.pos.toString().substr(0, 1)) : '0'),
                                    a.selectionRecorded = !0,
                                    $(t).val(o.item.value),
                                    this.onSelectFired = !0,
                                    e.onSelect && e.onSelect.call(this, i, o)
                            },
                            change: function (t, n) {
                                var o = $(this).val();
                                if (!n.item && e.onExplicitChange) {
                                    var s;
                                    if (s == i.cache(o, e, o),  
                                        !s && "" != o) {
                                        var r = {};
                                        r.searchTerm = o,
                                            r.match = "exact",
                                            r.callbackstr = "Suggester_callback_",
                                            r.event = t,
                                            r.method = "exact",
                                            r.limit = 1,
                                            r.onSuccess = a.onExplicitChangeSuccess,
                                            a.requestData(e, a, r, "")
                                    }
                                }
                            },
                            open: e.onOpen,
                            close: e.onClose
                        }).data("autocomplete");
                        e.autocompleteClass && $(r.menu.element[0]).addClass(e.autocompleteClass),
                            r._renderItem = function (t, i) {
                                var a = cleanString(this.term, 1).trim(),
                                    n = a.replace(/ /g, "[^a-zA-Z0-9]+"),
                                    o = new RegExp("\\b(" + n + ")", "ig"),
                                    s = "undefined" != typeof i.label && i.label.replace(/(-)/gi, " ") || "undefined" != typeof i.value && i.value.replace(/(-)/gi, " ") || ("undefined" != typeof i.id ? i.id.replace(/(-)/gi, " ") : false),
                                    r = i && i.cls ? i.cls : "";
                                if (s && e.dispstyle == 2) {
                                    (chkFrMb || window.location.host.match('m\.indiamart\.com')) ? t.addClass("mAtsugst") : t.addClass("dAtsugst");
                                    s && "normal" === e.highlight ? s = "<b>" + s.replace(o, "</b>$1<b>") + "</b>" : "reverse" === e.highlight && (s = s.replace(o, "<b>$1</b>")),
                                        r && (r = ' class="' + r + '"');
                                    var l = $("<li" + r + "></li>").addClass("as_D");
                                    if(!(chkFrMb || window.location.host.match('m\.indiamart\.com'))){
                                        if (typeof i.cls != "undefined" && "" != i.cls && i.cls == "rcnt" || typeof i.cls != "undefined" && "" != i.cls && i.cls == "blrcnt") {
                                            var icon = '<i class="sIcon rcnt"></i>'
                                        } else if ("undefined" != typeof i.data && "undefined" != typeof i.data.type_data && i.data.type_data == 2) {
                                            var icon = '<i class="sIcon pplr"></i>'
                                        } else {
                                            var icon = '<i class="sIcon nrml"></i>'
                                        }
                                    }
                                    else{
                                        if (typeof i.cls != "undefined" && "" != i.cls && i.cls == "rcnt") {
                                            var icon = '<i class="rIcon copyIcn"></i><i class="lIcon hstry"></i>'
                                        } else if (typeof i.cls != "undefined" && "" != i.cls && i.cls == "topsearches" || "undefined" != typeof i.data && "undefined" != typeof i.data.type_data && i.data.type_data == 2) {
                                            var icon = '<i class="rIcon copyIcn"></i><i class="lIcon topSrch"></i>'
                                        } else {
                                            var icon = '<i class="rIcon copyIcn"></i><i class="lIcon autoSrch"></i>'
                                        }
                                    }
                                    
                                    return l.data("item.autocomplete", i),
                                        ("undefined" == typeof i.data || "undefined" == typeof i.data.cat && "undefined" == typeof i.data.img) && l.append('<a class ="ui-corner-all" id="anchor"> ' + icon + s + "</a>"),
                                        l.appendTo(t),
                                        0 === t.find("ul").length && l.wrap('<ul class="ui-autocomplete"></ul>'),
                                        "search_string" === e.element && 1 != t.children().first().is("div") && l.parent().wrap('<div class="wd50"></div>').parent().parent().addClass("autocomplete-box dsp"),
                                        typeof i.last_dis != "undefined" && i.last_dis == 1 ? $(".wd50").addClass("suppl") : $(".wd50").removeClass("suppl"),
                                        (1 !== i.pos || 1 != l.parent().is("ul")) && "search_string" === e.element && 0 == $(".catsug").children().length && t.children().first().children().append(t.children().last()),
                                        1 !== i.pos && "search_string" !== e.element && 1 == l.parent().children().is("ul") && t.children().first().append(t.children().last()),
                                        t.css("position", "absolute"),
                                        window.location.href.indexOf("trade") > 0 && $(".ui-autocomplete li:nth-child(2) .flng-l").css("visibility", "visible"),
                                        t.addClass("as_ui-widget-content")
                                } else if (s) {
                                    s && "normal" === e.highlight ? s = "<b>" + s.replace(o, "</b>$1<b>") + "</b>" : "reverse" === e.highlight && (s = s.replace(o, "<b>$1</b>")),
                                        r && (r = ' class="' + r + '"');
                                    var l = $("<li" + r + "></li>").addClass("as_D");
                                    return l.data("item.autocomplete", i),
                                        ("undefined" == typeof i.data || "undefined" == typeof i.data.cat && "undefined" == typeof i.data.img) && l.append('<a class ="ui-corner-all" id="anchor"> ' + s + "</a>"),
                                        e.type == asgv.type && "undefined" != typeof i.data && "undefined" != typeof i.data.cat && "search_string" === e.element ? (l.append('<a class="ui-corner-all ui-pleft" tabindex="-1"> in<span class="scat">' + i.data[Object.keys(i.data)[0]] + "</span></a>"),
                                            l.appendTo(t)) : "",
                                        e.type == asgv.type && "undefined" != typeof i.data && "undefined" != typeof i.data.img && "" != i.data.img && window.location.href.indexOf("m.indiamart") < 0 ? (l.append('<a></span><span class="product-title">' + s + '</span> <div class="product-img">'),
                                            "undefined" != typeof i.data && "undefined" != typeof i.data.price && "" != i.data.price && l.append('<span class="price">Rs. ' + i.price + "</span>"),
                                            l.append("</span></div></a>"),
                                            $(".catsug").append(l.addClass("ui-menu-box")),
                                            $(".product-img").first().parent().parent().addClass("")) : ("undefined" == typeof i.data || "undefined" == typeof i.data.cat && "undefined" == typeof i.data.img) && l.appendTo(t),
                                        0 === t.find("ul").length && l.wrap('<ul class="ui-autocomplete"></ul>'),
                                        "search_string" === e.element && 1 != t.children().first().is("div") && l.parent().wrap('<div class="wd50"></div>').parent().parent().addClass("autocomplete-box dsp"),
                                        (1 !== i.pos || 1 != l.parent().is("ul")) && "search_string" === e.element && 0 == $(".catsug").children().length && t.children().first().children().append(t.children().last()),
                                        1 !== i.pos && "search_string" !== e.element && 1 == l.parent().children().is("ul") && t.children().first().append(t.children().last()),
                                        "domain" === e.type && t.addClass("domain"),
                                        t.css("position", "absolute"),
                                        window.location.href.indexOf("trade") > 0 && ($(".ui-autocomplete li:nth-child(2) .flng-l").css("visibility", "visible"),
                                            $("#search_string").keydown(function () {
                                                $(".ui-menu-item:nth-child(2) .flng-l").css("visibility", "")
                                            }),
                                            $("#search_string").mouseover(function () {
                                                $(".ui-menu-item:nth-child(2) .flng-l").css("visibility", "")
                                            })),
                                        t.addClass("as_ui-widget-content"),
                                        l
                                }
                            }

                    }, (document.readyState == 'complete') ? onDocReady() : $(document).ready(onDocReady);
            } catch (e) {}
        }

        function IMStore() {
            var e = asgv.domain1 + "storage/store-v17.html",
                t = "storageFrame";
            this.url = document.URL,
                this.childURL = e;
            var i = {
                modId: "*",
                key: "*",
                data: "*",
                url: this.url
            };
            try {
                if ("undefined" == typeof _IMStore_initialized) {
                    _IMStore_initialized = !0;
                    var a = document.createElement("IFRAME");
                    a.setAttribute("src", e),
                        a.style.visibility = "hidden",
                        a.setAttribute("id", t),
                        a.setAttribute("name", "storageFrame"),
                        a.style.width = "0px",
                        a.style.height = "0px",
                        document.body.appendChild(a),
                        $("#" + t).load(function () {
                            IMStore.msgHandler = a.contentWindow,
                                IMStore.msgHandler.postMessage(i, e)
                        });
                    if ($("iframe#storageFrame").length > 0)
                        storeLoaded = true;
                    $(document).ready(function () {
                        if (!storeLoaded) {
                            document.body.appendChild(a);
                            $("#" + t).load(function () {
                                IMStore.msgHandler = a.contentWindow,
                                    IMStore.msgHandler.postMessage(i, e)
                            })
                        }
                    })
                }
            } catch (e) {}
        }

        function defaultContextData(e, catid, mcatid, callback) {
            var con = [];
            $.ajax({
                url: e,
                dataType: "json",
                cache: true,
                data: {
                    tag: "defcon",
                    limit: 10,
                    type: "product",
                    catid: catid,
                    mcatid: mcatid,
                    v: asgv.version || -1
                },
                success: function (x) {
                    if ("undefined" != typeof x && "undefined" != typeof x.product && x.product) {
                        for (i = 0; i < x.product.length; i++) {
                            if ("undefined" != typeof x.product[i] && "undefined" != typeof x.product[i].value) {
                                var val = x.product[i].value;
                                var cls = "defaultcon";
                                con.push({ value: val, cls: cls });
                            }
                        }
                    }
                    callback(con); 
                },
                error: function (error) {
                    callback([]); 
                }
            });
        }

        function defaultSellerData(e, sellerId, callback) {
            var con = [];
            $.ajax({
                url: e,
                type: "POST",
                cache: true,
                data: {
                    'glid': sellerId
                },
                success: function (x) {
                    if ("undefined" != typeof x && "undefined" != typeof x.status && x.status == 200 && "undefined" != typeof x.product && x.product) {
                        for (i = 0; i < x.product.length; i++) {
                            if ("undefined" != typeof x.product[i] && "undefined" != typeof x.product[i].value && "undefined" != typeof x.product[i].cls) {
                                var val = x.product[i].value;
                                var cls = x.product[i].cls;
                                con.push({ value: val, cls: cls });
                            }
                        }
                    }
                    callback(con); 
                },
                error: function (error) {
                    callback([]); 
                }
            });
        }

        function getFutureDate(daysToAdd, useCurrentTime = true) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + daysToAdd);
        
            const year = String(currentDate.getFullYear());
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
        
            let hours, minutes;
        
            if (useCurrentTime) {
                hours = String(currentDate.getHours()).padStart(2, '0');
                minutes = String(currentDate.getMinutes()).padStart(2, '0');
            } else {
                hours = "06";
                minutes = "30";
            }
        
            const formattedDate = year + month + day + hours + minutes;
            return formattedDate;
        } 

        function exactMatchResults(topRes, term, typ) {
            if (typ == "city-state") {
                return topRes
            }
            var extMatch = [];
            var data_value = "";
            term = term.trim().toString().toLowerCase();
            term = term.replace(/(e$|es$|y$|ies$|s$)/i, "");
            if (typeof topRes != "undefined" && topRes != null && topRes.length != 0) {
                for (var x = 0; x < topRes.length; x++) {
                    if (typeof topRes[x] != "undefined" && topRes[x] != null && typeof topRes[x].value != "undefined" && topRes[x].value != "") {
                        data_value = topRes[x].value.toString().toLowerCase();
                        data_value = data_value.replace(/(e$|es$|y$|ies$|s$)/i, "");
                        if (data_value === term) {
                            extMatch.push(topRes[x])
                        }
                    }
                }
            }
            return extMatch
        }

        function sortingResults(topRes, term, extMatch, typ) {
            var orderArr = [];
            if (typeof topRes != "undefined" && topRes.length != 0) {
                for (var x = 0; x < topRes.length; x++) {
                    if (typeof topRes[x] != "undefined" && typeof topRes[x].value != "undefined" && topRes[x].value != "") {
                        orderArr.push(topRes[x]);
                    }
                }
            }
            return orderArr
        }

        function getGidVidUserData() {
            if (0 == asgv.userData) {
                if ("undefined" == typeof asgv.gid && document.cookie.indexOf(" ImeshVisitor") > -1 && document.cookie.indexOf("glid%3D") > -1) {
                    var e = "glid%3D";
                    asgv.mode = "identified";
                    var t = document.cookie.substring(document.cookie.indexOf(e) + 7);
                    asgv.gid = "g" + t.substring(0, t.indexOf("%"));
                    asgv.p_gid = t.substring(0, t.indexOf("%"))
                }
                var ga = readGaCookie("_ga");
                asgv.p_vid = ga;
                if ("undefined" != typeof ga) {
                    var ga_val = ga.split(".");
                    var vid = ga_val[2]
                }
                if ("undefined" == typeof asgv.vid && "undefined" != typeof vid && (asgv.vid = "v" + vid),
                    "" == asgv.reqBoosters && document.cookie.indexOf(" ImeshVisitor") > -1 && document.cookie.indexOf("ct%3D") > -1) {
                    var i = "ct%3D",
                        t = document.cookie.substring(document.cookie.indexOf(i) + 5);
                    if ("" != t.substring(0, t.indexOf("%"))) {
                        asgv.reqBoosters = "prod_city:" + t.substring(0, t.indexOf("%7")).toString().toLowerCase();
                        var a = asgv.reqBoosters.substring(asgv.reqBoosters.indexOf("prod_city:") + 10).toString().toLowerCase().replace(/%20/g, " ").split();
                        setTimeout(function () {
                            "undefined" != typeof asgv.store.setData && -1 == jQuery.inArray(a[0], asgv.store.getData("ims", "cities")) ? "undefined" == typeof asgv.store.getData("ims", "cities") ? asgv.store.setData("ims", "cities", a) : asgv.store.setData("ims", "cities", a.concat(asgv.store.getData("ims", "cities"))) : ""
                        }, 4e3)
                    }
                }
                if (0 == asgv.userData && void 0 != asgv.vid && void 0 != asgv.store.getData) {
                    asgv.userData = !0;
                    var n = typeof asgv.store.getData != "undefined" && asgv.store.getData("ss", "pdmTime") != undefined ? (new Date).getTime() / 1e3 - asgv.store.getData("ss", "pdmTime") > 3600 : true;
                    if (n) {
                        var o = {};
                        o.storage = "ims",
                            o.vid = asgv.vid,
                            o.gid = asgv.gid
                    }
                }
            }
        }! function (e, t) {
            function i(t, i) {
                var n = t.nodeName.toString().toLowerCase();
                if ("area" === n) {
                    var o, s = t.parentNode,
                        r = s.name;
                    return !(!t.href || !r || "map" !== s.nodeName.toString().toLowerCase()) && (o = e("img[usemap=#" + r + "]")[0],
                        !!o && a(o))
                }
                return (/input|select|textarea|button|object/.test(n) ? !t.disabled : "a" == n ? t.href || i : i) && a(t)
            }

            function a(t) {
                return !e(t).parents().andSelf().filter(function () {
                    return "hidden" === e.curCSS(this, "visibility") || e.expr.filters.hidden(this)
                }).length
            }
            e.ui = e.ui || {},
                e.ui.version || (e.extend(e.ui, {
                        version: "1.8.21",
                        keyCode: {
                            ALT: 18,
                            BACKSPACE: 8,
                            CAPS_LOCK: 20,
                            COMMA: 188,
                            COMMAND: 91,
                            COMMAND_LEFT: 91,
                            COMMAND_RIGHT: 93,
                            CONTROL: 17,
                            DELETE: 46,
                            DOWN: 40,
                            END: 35,
                            ENTER: 13,
                            ESCAPE: 27,
                            HOME: 36,
                            INSERT: 45,
                            LEFT: 37,
                            MENU: 93,
                            NUMPAD_ADD: 107,
                            NUMPAD_DECIMAL: 110,
                            NUMPAD_DIVIDE: 111,
                            NUMPAD_ENTER: 108,
                            NUMPAD_MULTIPLY: 106,
                            NUMPAD_SUBTRACT: 109,
                            PAGE_DOWN: 34,
                            PAGE_UP: 33,
                            PERIOD: 190,
                            RIGHT: 39,
                            SHIFT: 16,
                            SPACE: 32,
                            TAB: 9,
                            UP: 38,
                            WINDOWS: 91
                        }
                    }),
                    e.fn.extend({
                        propAttr: e.fn.prop || e.fn.attr,
                        _focus: e.fn.focus,
                        focus: function (t, i) {
                            return "number" == typeof t ? this.each(function () {
                                var a = this;
                                setTimeout(function () {
                                    e(a).focus(),
                                        i && i.call(a)
                                }, t)
                            }) : this._focus.apply(this, arguments)
                        },
                        scrollParent: function () {
                            var t;
                            return t = e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                                    return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                                }).eq(0) : this.parents().filter(function () {
                                    return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                                }).eq(0),
                                /fixed/.test(this.css("position")) || !t.length ? e(document) : t
                        },
                        zIndex: function (i) {
                            if (i !== t)
                                return this.css("zIndex", i);
                            if (this.length)
                                for (var a, n, o = e(this[0]); o.length && o[0] !== document;) {
                                    if (a = o.css("position"),
                                        ("absolute" === a || "relative" === a || "fixed" === a) && (n = parseInt(o.css("zIndex"), 10),
                                            !isNaN(n) && 0 !== n))
                                        return n;
                                    o = o.parent()
                                }
                            return 0
                        },
                        disableSelection: function () {
                            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                                e.preventDefault()
                            })
                        },
                        enableSelection: function () {
                            return this.unbind(".ui-disableSelection")
                        }
                    }),
                    e.each(["Width", "Height"], function (i, a) {
                        function n(t, i, a, n) {
                            return e.each(o, function () {
                                    i -= parseFloat(e.curCSS(t, "padding" + this, !0)) || 0,
                                        a && (i -= parseFloat(e.curCSS(t, "border" + this + "Width", !0)) || 0),
                                        n && (i -= parseFloat(e.curCSS(t, "margin" + this, !0)) || 0)
                                }),
                                i
                        }
                        var o = "Width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
                            s = a.toString().toLowerCase(),
                            r = {
                                innerWidth: e.fn.innerWidth,
                                innerHeight: e.fn.innerHeight,
                                outerWidth: e.fn.outerWidth,
                                outerHeight: e.fn.outerHeight
                            };
                        e.fn["inner" + a] = function (i) {
                                return i === t ? r["inner" + a].call(this) : this.each(function () {
                                    e(this).css(s, n(this, i) + "px")
                                })
                            },
                            e.fn["outer" + a] = function (t, i) {
                                return "number" != typeof t ? r["outer" + a].call(this, t) : this.each(function () {
                                    e(this).css(s, n(this, t, !0, i) + "px")
                                })
                            }
                    }),
                    e.extend(e.expr[":"], {
                        data: function (t, i, a) {
                            return !!e.data(t, a[3])
                        },
                        focusable: function (t) {
                            return i(t, !isNaN(e.attr(t, "tabindex")))
                        },
                        tabbable: function (t) {
                            var a = e.attr(t, "tabindex"),
                                n = isNaN(a);
                            return (n || a >= 0) && i(t, !n)
                        }
                    }),
                    e(function () {
                        var t = document.body,
                            i = t.appendChild(i = document.createElement("div"));
                        i.offsetHeight,
                            e.extend(i.style, {
                                minHeight: "100px",
                                height: "auto",
                                padding: 0,
                                borderWidth: 0
                            }),
                            e.support.minHeight = 100 === i.offsetHeight,
                            e.support.selectstart = "onselectstart" in i,
                            t.removeChild(i).style.display = "block"
                    }),
                    e.extend(e.ui, {
                        plugin: {
                            add: function (t, i, a) {
                                var n = e.ui[t].prototype;
                                for (var o in a)
                                    n.plugins[o] = n.plugins[o] || [],
                                    n.plugins[o].push([i, a[o]])
                            },
                            call: function (e, t, i) {
                                var a = e.plugins[t];
                                if (a && e.element[0].parentNode)
                                    for (var n = 0; n < a.length; n++)
                                        e.options[a[n][0]] && a[n][1].apply(e.element, i)
                            }
                        },
                        contains: function (e, t) {
                            return document.compareDocumentPosition ? 16 & e.compareDocumentPosition(t) : e !== t && e.contains(t)
                        },
                        hasScroll: function (t, i) {
                            if ("hidden" === e(t).css("overflow"))
                                return !1;
                            var a = i && "left" === i ? "scrollLeft" : "scrollTop",
                                n = !1;
                            return t[a] > 0 || (t[a] = 1,
                                n = t[a] > 0,
                                t[a] = 0,
                                n)
                        },
                        isOverAxis: function (e, t, i) {
                            return e > t && t + i > e
                        },
                        isOver: function (t, i, a, n, o, s) {
                            return e.ui.isOverAxis(t, a, o) && e.ui.isOverAxis(i, n, s)
                        }
                    }))
        }(jQuery),
        function (e, t) {
            if (e.cleanData) {
                var i = e.cleanData;
                e.cleanData = function (e) {
                    for (var t, a = 0; null != (t = e[a]); a++)
                        try {
                            n(t).triggerHandler("remove")
                        } catch (n) {}
                    i(e)
                }
            } else {
                var a = e.fn.remove;
                e.fn.remove = function (t, i) {
                    return this.each(function () {
                        return i || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function () {
                                try {
                                    e(this).triggerHandler("remove")
                                } catch (e) {}
                            }),
                            a.call(e(this), t, i)
                    })
                }
            }
            e.widget = function (t, i, a) {
                    var n, o = t.split(".")[0];
                    t = t.split(".")[1],
                        n = o + "-" + t,
                        a || (a = i,
                            i = e.Widget),
                        e.expr[":"][n] = function (i) {
                            return !!e.data(i, t)
                        },
                        e[o] = e[o] || {},
                        e[o][t] = function (e, t) {
                            arguments.length && this._createWidget(e, t)
                        };
                    var s = new i;
                    s.options = e.extend(!0, {}, s.options),
                        e[o][t].prototype = e.extend(!0, s, {
                            namespace: o,
                            widgetName: t,
                            widgetEventPrefix: e[o][t].prototype.widgetEventPrefix || t,
                            widgetBaseClass: n
                        }, a),
                        e.widget.bridge(t, e[o][t])
                },
                e.widget.bridge = function (i, a) {
                    e.fn[i] = function (n) {
                        var o = "string" == typeof n,
                            s = Array.prototype.slice.call(arguments, 1),
                            r = this;
                        return n = !o && s.length ? e.extend.apply(null, [!0, n].concat(s)) : n,
                            o && "_" === n.charAt(0) ? r : (o ? this.each(function () {
                                    var a = e.data(this, i),
                                        o = a && e.isFunction(a[n]) ? a[n].apply(a, s) : a;
                                    return o !== a && o !== t ? (r = o,
                                        !1) : void 0
                                }) : this.each(function () {
                                    var t = e.data(this, i);
                                    t ? t.option(n || {})._init() : e.data(this, i, new a(n, this))
                                }),
                                r)
                    }
                },
                e.Widget = function (e, t) {
                    arguments.length && this._createWidget(e, t)
                },
                e.Widget.prototype = {
                    widgetName: "widget",
                    widgetEventPrefix: "",
                    options: {
                        disabled: !1
                    },
                    _createWidget: function (t, i) {
                        e.data(i, this.widgetName, this),
                            this.element = e(i),
                            this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
                        var a = this;
                        this.element.bind("remove." + this.widgetName, function () {
                                a.destroy()
                            }),
                            this._create(),
                            this._trigger("create"),
                            this._init()
                    },
                    _getCreateOptions: function () {
                        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
                    },
                    _create: function () {},
                    _init: function () {},
                    destroy: function () {
                        this.element.unbind("." + this.widgetName).removeData(this.widgetName),
                            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
                    },
                    widget: function () {
                        return this.element
                    },
                    option: function (i, a) {
                        var n = i;
                        if (0 === arguments.length)
                            return e.extend({}, this.options);
                        if ("string" == typeof i) {
                            if (a === t)
                                return this.options[i];
                            n = {},
                                n[i] = a
                        }
                        return this._setOptions(n),
                            this
                    },
                    _setOptions: function (t) {
                        var i = this;
                        return e.each(t, function (e, t) {
                                i._setOption(e, t)
                            }),
                            this
                    },
                    _setOption: function (e, t) {
                        return this.options[e] = t,
                            "disabled" === e && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", t),
                            this
                    },
                    enable: function () {
                        return this._setOption("disabled", !1)
                    },
                    disable: function () {
                        return this._setOption("disabled", !0)
                    },
                    _trigger: function (t, i, a) {
                        var n, o, s = this.options[t];
                        if (a = a || {},
                            i = e.Event(i),
                            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toString().toLowerCase(),
                            i.target = this.element[0],
                            o = i.originalEvent)
                            for (n in o)
                                n in i || (i[n] = o[n]);
                        return this.element.trigger(i, a),
                            !(e.isFunction(s) && s.call(this.element[0], i, a) === !1 || i.isDefaultPrevented())
                    }
                }
        }(jQuery),
        function (e, t) {
            e.ui = e.ui || {};
            var i = /left|center|right/,
                a = /top|center|bottom/,
                n = "center",
                o = {},
                s = e.fn.position,
                r = e.fn.offset;
            e.fn.position = function (t) {
                    if (!t || !t.of)
                        return s.apply(this, arguments);
                    t = e.extend({}, t);
                    var r, l, c, d = e(t.of),
                        u = d[0],
                        p = (t.collision || "flip").split(" "),
                        g = t.offset ? t.offset.split(" ") : [0, 0];
                    return 9 === u.nodeType ? (r = d.width(),
                            l = d.height(),
                            c = {
                                top: 0,
                                left: 0
                            }) : u.setTimeout ? (r = d.width(),
                            l = d.height(),
                            c = {
                                top: d.scrollTop(),
                                left: d.scrollLeft()
                            }) : u.preventDefault ? (t.at = "left top",
                            r = l = 0,
                            c = {
                                top: t.of.pageY,
                                left: t.of.pageX
                            }) : (r = d.outerWidth(),
                            l = d.outerHeight(),
                            c = d.offset()),
                        e.each(["my", "at"], function () {
                            var e = (t[this] || "").split(" ");
                            1 === e.length && (e = i.test(e[0]) ? e.concat([n]) : a.test(e[0]) ? [n].concat(e) : [n, n]),
                                e[0] = i.test(e[0]) ? e[0] : n,
                                e[1] = a.test(e[1]) ? e[1] : n,
                                t[this] = e
                        }),
                        1 === p.length && (p[1] = p[0]),
                        g[0] = parseInt(g[0], 10) || 0,
                        1 === g.length && (g[1] = g[0]),
                        g[1] = parseInt(g[1], 10) || 0,
                        "right" === t.at[0] ? c.left += r : t.at[0] === n && (c.left += r / 2),
                        "bottom" === t.at[1] ? c.top += l : t.at[1] === n && (c.top += l / 2),
                        c.left += g[0],
                        c.top += g[1],
                        this.each(function () {
                            var i, a = e(this),
                                s = a.outerWidth(),
                                d = a.outerHeight(),
                                u = parseInt(e.curCSS(this, "marginLeft", !0)) || 0,
                                f = parseInt(e.curCSS(this, "marginTop", !0)) || 0,
                                h = s + u + (parseInt(e.curCSS(this, "marginRight", !0)) || 0),
                                m = d + f + (parseInt(e.curCSS(this, "marginBottom", !0)) || 0),
                                v = e.extend({}, c);
                            "right" === t.my[0] ? v.left -= s : t.my[0] === n && (v.left -= s / 2),
                                "bottom" === t.my[1] ? v.top -= d : t.my[1] === n && (v.top -= d / 2),
                                o.fractions || (v.left = Math.round(v.left),
                                    v.top = Math.round(v.top)),
                                i = {
                                    left: v.left - u,
                                    top: v.top - f
                                },
                                v.top = $(this).hasClass("autocomplete-box") === !0 ? v.top + 4 : v.top,
                                v.left = $(this).hasClass("autocomplete-box") === !0 ? v.left - 1 : v.left,
                                e.each(["left", "top"], function (a, n) {
                                    e.ui.position[p[a]] && e.ui.position[p[a]][n](v, {
                                        targetWidth: r,
                                        targetHeight: l,
                                        elemWidth: s,
                                        elemHeight: d,
                                        collisionPosition: i,
                                        collisionWidth: h,
                                        collisionHeight: m,
                                        offset: g,
                                        my: t.my,
                                        at: t.at
                                    })
                                }),
                                e.fn.bgiframe && a.bgiframe(),
                                a.offset(e.extend(v, {
                                    using: t.using
                                }))
                        })
                },
                e.ui.position = {
                    fit: {
                        left: function (t, i) {
                            var a = e(window),
                                n = i.collisionPosition.left + i.collisionWidth - a.width() - a.scrollLeft();
                            t.left = n > 0 ? t.left - n : Math.max(t.left - i.collisionPosition.left, t.left)
                        },
                        top: function (t, i) {
                            var a = e(window),
                                n = i.collisionPosition.top + i.collisionHeight - a.height() - a.scrollTop();
                            t.top = n > 0 ? t.top - n : Math.max(t.top - i.collisionPosition.top, t.top)
                        }
                    },
                    flip: {
                        left: function (t, i) {
                            if (i.at[0] !== n) {
                                var a = e(window),
                                    o = i.collisionPosition.left + i.collisionWidth - a.width() - a.scrollLeft(),
                                    s = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                                    r = "left" === i.at[0] ? i.targetWidth : -i.targetWidth,
                                    l = -2 * i.offset[0];
                                t.left += i.collisionPosition.left < 0 ? s + r + l : o > 0 ? s + r + l : 0
                            }
                        },
                        top: function (t, i) {
                            if (i.at[1] !== n) {
                                var a = e(window),
                                    o = i.collisionPosition.top + i.collisionHeight - a.height() - a.scrollTop(),
                                    s = "top" === i.my[1] ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                                    r = "top" === i.at[1] ? i.targetHeight : -i.targetHeight,
                                    l = -2 * i.offset[1];
                                t.top += i.collisionPosition.top < 0 ? s + r + l : o > 0 ? s + r + l : 0
                            }
                        }
                    }
                },
                e.offset.setOffset || (e.offset.setOffset = function (t, i) {
                        /static/.test(e.curCSS(t, "position")) && (t.style.position = "relative");
                        var a = e(t),
                            n = a.offset(),
                            o = parseInt(e.curCSS(t, "top", !0), 10) || 0,
                            s = parseInt(e.curCSS(t, "left", !0), 10) || 0,
                            r = {
                                top: i.top - n.top + o,
                                left: i.left - n.left + s
                            };
                        "using" in i ? i.using.call(t, r) : a.css(r)
                    },
                    e.fn.offset = function (t) {
                        var i = this[0];
                        return i && i.ownerDocument ? t ? e.isFunction(t) ? this.each(function (i) {
                            e(this).offset(t.call(this, i, e(this).offset()))
                        }) : this.each(function () {
                            e.offset.setOffset(this, t)
                        }) : r.call(this) : null
                    }
                ),
                function () {
                    var t, i, a, n, s, r = document.getElementsByTagName("body")[0],
                        l = document.createElement("div");
                    t = document.createElement(r ? "div" : "body"),
                        a = {
                            visibility: "hidden",
                            width: 0,
                            height: 0,
                            border: 0,
                            margin: 0,
                            background: "none"
                        },
                        r && e.extend(a, {
                            position: "absolute",
                            left: "-1000px",
                            top: "-1000px"
                        });
                    for (var c in a)
                        t.style[c] = a[c];
                    t.appendChild(l),
                        i = r || document.documentElement,
                        i.insertBefore(t, i.firstChild),
                        l.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",
                        n = e(l).offset(function (e, t) {
                            return t
                        }).offset(),
                        t.innerHTML = "",
                        i.removeChild(t),
                        s = n.top + n.left + (r ? 2e3 : 0),
                        o.fractions = s > 21 && 22 > s
                }()
        }(jQuery),
        function (e, t) {
            var i = 0;
            e.widget("ui.autocomplete", {
                    options: {
                        appendTo: "body",
                        autoFocus: !1,
                        delay: 300,
                        minLength: 1,
                        position: {
                            my: "left top",
                            at: "left bottom",
                            collision: "none"
                        },
                        source: null
                    },
                    pending: 0,
                    _create: function () {
                        var t, i = this,
                            a = this.element[0].ownerDocument;
                        this.isMultiLine = this.element.is("textarea"),
                            this.element.addClass("ui-autocomplete-input").attr("autocomplete", atocmplt_attr).attr({
                                role: "textbox",
                                "aria-autocomplete": "list",
                                "aria-haspopup": "true"
                            }).bind("keydown.autocomplete", function (a) {
                                if (!i.options.disabled && !i.element.propAttr("readOnly")) {
                                    t = !1;
                                    var n = e.ui.keyCode;
                                    switch (a.keyCode) {
                                        case n.PAGE_UP:
                                            i._move("previousPage", a);
                                            break;
                                        case n.PAGE_DOWN:
                                            i._move("nextPage", a);
                                            break;
                                        case n.UP:
                                            i._keyEvent("previous", a);
                                            break;
                                        case n.DOWN:
                                            i._keyEvent("next", a);
                                            break;
                                        case n.ENTER:
                                        case n.NUMPAD_ENTER:
                                            i.menu.active && (t = !0,
                                                a.preventDefault());
                                        case n.TAB:
                                            if (!i.menu.active)
                                                return;
                                            i.menu.select(a);
                                            break;
                                        case n.ESCAPE:
                                            i.element.val(i.term),
                                                i.close(a);
                                            break;
                                        case n.CONTROL:
                                            break;
                                        default:
                                            clearTimeout(i.searching),
                                                i.searching = setTimeout(function () {
                                                    i.term != i.element.val() && (i.selectedItem = null,
                                                        i.search(null, a))
                                                }, i.options.delay)
                                    }
                                }
                            }).bind("keypress.autocomplete", function (e) {
                                t && (t = !1,
                                    e.preventDefault())
                            }).bind("focus.autocomplete", function () {
                                i.options.disabled || (i.selectedItem = null,
                                    i.previous = i.element.val())
                            }).bind("blur.autocomplete", function (e) {
                                i.options.disabled || (clearTimeout(i.searching),
                                    i.closing = setTimeout(function () {
                                        i.close(e),
                                            i._change(e)
                                    }, 150))
                            }),
                            this._initSource(),
                            this.menu = e("<div></div>").addClass("ui-autocomplete").css("position", "absolute !important").appendTo(e(this.options.appendTo || "body", a)[0]).mousedown(function (t) {
                                var a = i.menu.element[0];
                                e(t.target).closest(".ui-menu-item").length || setTimeout(function () {
                                        e(document).one("mousedown", function (t) {
                                            t.target !== i.element[0] && t.target !== a && !e.ui.contains(a, t.target) && i.close()
                                        })
                                    }, 1),
                                    setTimeout(function () {
                                        clearTimeout(i.closing)
                                    }, 13)
                            }).menu({
                                focus: function (e, t) {
                                    var a = t.item.data("item.autocomplete");
                                    !1 !== i._trigger("focus", e, {
                                        item: a
                                    }) && /^key/.test(e.originalEvent.type) && i.element.val(a.value)
                                },
                                selected: function (e, t) {
                                    var n = t.item.data("item.autocomplete"),
                                        o = i.previous;
                                    i.element[0] !== a.activeElement && (i.element.focus(),
                                            i.previous = o,
                                            setTimeout(function () {
                                                i.previous = o,
                                                    i.selectedItem = n
                                            }, 1)),
                                        !1 !== i._trigger("select", e, {
                                            item: n
                                        }),
                                        i.term = i.element.val(),
                                        i.close(e),
                                        i.selectedItem = n
                                },
                                blur: function (e, t) {
                                    i.menu.element.removeClass("sugdd"),
                                        i.menu.element.is(":visible") && i.element.val() !== i.term && i.element.val(i.term)
                                }
                            }).zIndex(this.element.zIndex() + 1).css({
                                top: 0,
                                left: 0
                            }).hide().data("menu"),
                            e.fn.bgiframe && this.menu.element.bgiframe(),
                            i.beforeunloadHandler = function () {
                                i.element.removeAttr("autocomplete")
                            },
                            e(window).bind("beforeunload", i.beforeunloadHandler)
                    },
                    destroy: function () {
                        this.menu.element.remove(),
                            e(window).unbind("beforeunload", this.beforeunloadHandler),
                            e.Widget.prototype.destroy.call(this)
                    },
                    _setOption: function (t, i) {
                        e.Widget.prototype._setOption.apply(this, arguments),
                            "source" === t && this._initSource(),
                            "appendTo" === t && this.menu.element.appendTo(e(i || "body", this.element[0].ownerDocument)[0]),
                            "disabled" === t && i && this.xhr && this.xhr.abort()
                    },
                    _initSource: function () {
                        var t, i, a = this;
                        e.isArray(this.options.source) ? (t = this.options.source,
                            this.source = function (i, a) {
                                a(e.ui.autocomplete.filter(t, i.term))
                            }
                        ) : "string" == typeof this.options.source ? (i = this.options.source,
                            this.source = function (t, n) {
                                a.xhr && a.xhr.abort(),
                                    a.xhr = e.ajax({
                                        url: i,
                                        data: t,
                                        dataType: "json",
                                        success: function (e, t) {
                                            n(e)
                                        },
                                        error: function () {
                                            n([])
                                        }
                                    })
                            }
                        ) : this.source = this.options.source
                    },
                    search: function (e, t) {
                        return e = null != e ? e : this.element.val(),
                            this.term = this.element.val(),
                            e.length < this.options.minLength ? this.close(t) : (clearTimeout(this.closing),
                                this._trigger("search", t) !== !1 ? this._search(e) : void 0)
                    },
                    _search: function (e) {
                        this.pending++,
                            this.element.addClass("ui-autocomplete-loading"),
                            this.source({
                                term: e
                            }, this._response())
                    },
                    _response: function () {
                        var e = this,
                            t = ++i;
                        return function (a) {
                            t === i && e.__response(a),
                                e.pending--,
                                e.pending || e.element.removeClass("ui-autocomplete-loading")
                        }
                    },
                    __response: function (e) {
                        !this.options.disabled && e && e.length ? (e = this._normalize(e),
                            this._suggest(e),
                           // this._trigger("open")) : this.close()
                           
                           this._trigger("open")) : true
                    },
                    close: function (e) {
                        clearTimeout(this.closing),
                            this.menu.element.is(":visible") && (this.menu.element.removeClass("as_ui-widget-content"),
                                this.menu.element.children().hide(),
                                this.menu.deactivate(),
                                this._trigger("close", e))
                    },
                    _change: function (e) {
                        this.previous !== this.element.val() && this._trigger("change", e, {
                            item: this.selectedItem
                        })
                    },
                    _normalize: function (t) {
                        return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
                            return "string" == typeof t ? {
                                label: t,
                                value: t
                            } : e.extend({
                                label: t.label || t.value,
                                value: t.value || t.label
                            }, t)
                        })
                    },
                    _suggest: function (t) {
                        var i = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                        this._renderMenu(i, t),
                            this.menu.deactivate(),
                            this.menu.refresh(),
                            i.show(),
                            this._resizeMenu(),
                            i.position(e.extend({
                                of: this.element
                            }, this.options.position)),
                            this.options.autoFocus && this.menu.next(new e.Event("mouseover"))
                    },
                    _resizeMenu: function () {
                        var e = this.menu.element;
                        e.outerWidth((e.children().hasClass("wd50") === !0 || (chkFrMb || window.location.href.match('m\.indiamart\.com'))) ? this.element.outerWidth() + 2 : Math.max(e.width("").outerWidth() + 1, this.element.outerWidth() + 2))
                    },
                    _renderMenu: function (t, i) {
                        var a = this;
                        e.each(i, function (e, i) {
                            a._renderItem(t, i)
                        })
                    },
                    _renderItem: function (t, i) {
                        return e("<li></li>").data("item.autocomplete", i).append(e("<a></a>").text(i.label)).appendTo(t)
                    },
                    _move: function (e, t) {
                        return this.menu.element.is(":visible") ? this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e) ? (this.element.val(this.term),
                            void this.menu.deactivate()) : void this.menu[e](t) : void this.search(null, t)
                    },
                    widget: function () {
                        return this.menu.element
                    },
                    _keyEvent: function (e, t) {
                        (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t),
                            t.preventDefault())
                    }
                }),
                e.extend(e.ui.autocomplete, {
                    escapeRegex: function (e) {
                        return "undefined" != typeof e ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null
                    },
                    filter: function (t, i) {
                        var a = new RegExp(e.ui.autocomplete.escapeRegex(i), "i");
                        return e.grep(t, function (e) {
                            return a.test(e.label || e.value || e)
                        })
                    }
                })
        }(jQuery),
        function (e) {
            e.widget("ui.menu", {
                _create: function () {
                    var t = this;
                    this.element.addClass("ui-menu ui-widget as_ui-widget-content ui-corner-all").attr({
                            role: "listbox",
                            "aria-activedescendant": "ui-active-menuitem"
                        }).click(function (i) {
                            !$(i.delegateTarget).hasClass("dsp") || $(i.target.parentElement).hasClass("rcnt") || $(i.target.parentElement).hasClass("topsearches") || !($(i.target).filter(".wd50.sugbx, .recp, .rc_s,.wd50").length > 0 || "" == $(i.target).children().html()) || $(i.target.parentElement).hasClass("as_D") || $(i.target.parentElement).parent().hasClass("ui-menu-item") ? e(i.target).closest(".ui-menu-item a").length && (i.preventDefault(),
                                t.select(i)) : i.stopPropagation()
                        }),
                        this.refresh()
                },
                refresh: function () {
                    var t = this,
                        i = this.element.find("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
                    i.find("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (i) {
                        t.activate(i, e(this).parent())
                    }).mouseleave(function () {
                        t.deactivate()
                    })
                },
                activate: function (e, t) {
                    if (this.deactivate(),
                        this.hasScroll()) {
                        var i = t.offset().top - this.element.offset().top,
                            a = this.element.scrollTop(),
                            n = this.element.height();
                        0 > i ? this.element.scrollTop(a + i) : i >= n && this.element.scrollTop(a + i - n + t.height())
                    }
                    this.active = t.eq(0).find("a").addClass("as_ui-state-hover").attr("id", "ui-active-menuitem").end(),
                        "mouseenter" !== e.type && $("a:hover").hasClass("ui-corner-all") === !0 && $("a:hover").addClass("wht"),
                        this._trigger("focus", e, {
                            item: t
                        })
                },
                deactivate: function () {
                    this.active && (this.active.find("a").removeClass("as_ui-state-hover").removeAttr("id"),
                        this._trigger("blur"),
                        this.active = null)
                },
                next: function (e) {
                    this.move("next", ".as_D:first", e)
                },
                previous: function (e) {
                    this.move("prev", ".as_D:last", e)
                },
                first: function () {
                    return this.active && !this.active.prevAll(".ui-menu-item").length
                },
                last: function () {
                    return this.active && !this.active.nextAll(".ui-menu-item").length
                },
                move: function (e, t, i) {
                    if (!this.active)
                        return void this.activate(i, this.element.find(t));
                    var a = this.active[e + "All"](".ui-menu-item").eq(0);
                    a.length ? this.activate(i, a) : this.activate(i, this.element.find(t))
                },
                nextPage: function (t) {
                    if (this.hasScroll()) {
                        if (!this.active || this.last())
                            return void this.activate(t, this.element.find(".ui-menu-item:first"));
                        var i = this.active.offset().top,
                            a = this.element.height(),
                            n = this.element.find(".ui-menu-item").filter(function () {
                                var t = e(this).offset().top - i - a + e(this).height();
                                return 10 > t && t > -10
                            });
                        n.length || (n = this.element.find(".ui-menu-item:last")),
                            this.activate(t, n)
                    } else
                        this.activate(t, this.element.find(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
                },
                previousPage: function (t) {
                    if (this.hasScroll()) {
                        if (!this.active || this.first())
                            return void this.activate(t, this.element.find(".ui-menu-item:last"));
                        var i = this.active.offset().top,
                            a = this.element.height(),
                            n = this.element.find(".ui-menu-item").filter(function () {
                                var t = e(this).offset().top - i + a - e(this).height();
                                return 10 > t && t > -10
                            });
                        n.length || (n = this.element.find(".ui-menu-item:first")),
                            this.activate(t, n)
                    } else
                        this.activate(t, this.element.find(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
                },
                hasScroll: function () {
                    return this.element.height() < this.element[e.fn.prop ? "prop" : "attr"]("scrollHeight")
                },
                select: function (e) {
                    eventValue = "undefined" != typeof event ? $(event.target) : $(e.target),
                        this.active = this.active || $(eventValue).closest(".ui-menu-item"),
                        this._trigger("selected", e, {
                            item: this.active
                        })
                }
            })
        }(jQuery);
        var cimjsv;
        var perks = ["prod_data", "mcat_data", "keyw_data", "city_data", "meta_data","rel_data","rel_prod","cntxt_txnmy","cntxt_sell"];
        if ($(this).bind("mousewheel DOMMouseScroll scroll mousedown", function (e) {
                (e.type != "mousedown" || e.which == 3 || !$("div:hover").hasClass("dsp")) && $(".autocomplete-box").removeClass("dsp").css("display", "none")
            }),
            $(document).bind("keypress", function (e) {
                (13 === e.keyCode || 123 === e.keyCode || e.target.id.indexOf("search_string") < 0) && $(".autocomplete-box").removeClass("dsp").css("display", "none")
            }),
            $('#search_string').on('focus',function(){
                if(!$('.sugg_dim').length)  $('header').append('<div class="sugg_dim"></div>');
            }),
            $('#search_string').on('focusout',function(){
                $('.sugg_dim').remove();
            }),
            $('#search_string').on("keyup", function(e) {
                if (e.keyCode === 27) {$('.sugg_dim').remove();$('#search_string').blur();}
            }),
            $(window).on('wheel',function(event){
                $('.sugg_dim').remove();$('#search_string').blur();
            }),
            "undefined" == typeof cimjsv && (cimjsv = new Object),
            cimjsv["//utils.imimg.com/suggest/js/jq-ac-ui.js"] = 369,
            "undefined" == typeof asgv) {
            var asgv = {};
            asgv.version = 411;
            asgv.geoCity = SuggestUtils.readCookie('GeoLoc', 'lg_ct');
            asgv.ipCity = SuggestUtils.readCookie('iploc', 'gctnm');
            asgv.data = {},
                asgv.isd = {
                    iconHeight: 11,
                    iconWidth: 0,
                    maxData: 500,
                    return_all_allowed: !0
                },
                asgv.data.topCountry = ["in", "us", "ae", "gb", "au"],
                asgv.data.isd = [{
                    value: "91",
                    label: "India  +91",
                    data: {
                        cname: "India",
                        iso: "IN",
                        icon_order: "154"
                    }
                }, {
                    value: "1",
                    label: "United States Of America  +1",
                    data: {
                        cname: "United States Of America",
                        iso: "US",
                        icon_order: "4"
                    }
                }, {
                    value: "971",
                    label: "United Arab Emirates  +971",
                    data: {
                        cname: "United Arab Emirates",
                        iso: "AE",
                        icon_order: "202"
                    }
                }, {
                    value: "44",
                    label: "United Kingdom  +44",
                    data: {
                        cname: "United Kingdom",
                        iso: "GB",
                        icon_order: "5"
                    }
                }, {
                    value: "61",
                    label: "Australia  +61",
                    data: {
                        cname: "Australia",
                        iso: "AU",
                        icon_order: "156"
                    }
                }],
                asgv.reqBoosters = "",
                asgv.gid,
                asgv.vid,
                asgv.userData = !1,
                asgv.blJsLoaded = !1,
                asgv.type = "product",
                asgv.mode = "unidentified",
                asgv.domain1 = window.location.host.indexOf("stg") > -1 ? location.protocol + "//stg-utils.imimg.com/" : window.location.host.indexOf("dev") > -1 ? location.protocol + "//dev-utils.imimg.com/" : location.protocol + "//utils.imimg.com/",
                asgv.domain =  window.location.host.indexOf("stg") > -1 ? location.protocol + "//stg-suggest.imimg.com/" : window.location.host.indexOf("dev") > -1 ? location.protocol + "//dev-suggest.imimg.com/" : location.protocol + "//suggest.imimg.com/",
                asgv.gaAcId = "UA-10312824-1"
        }
        asgv.topSearches = [],
            checkIfAnalyticsLoaded(),
            Suggestions.prototype.list = function (e, t) {
                return null != e && (this._list = e,
                        this.type = t || this.DIRECT),
                    this._list
            },
            SuggestionCache.prototype.cache = function (e, t, i, a) {
                var top_data = [],
                    bot_data = [],
                    top_sort = [];
                var term_typ = i;
                if (e = "domain" == t.type ? e : cleanString(e),
                    i = "domain" == t.type ? i : cleanString(i.trim(), 1),
                    null != a && "" != e && (this._cache["" + e] = a),
                    e in this._cache && "object" == typeof this._cache["" + e])
                    return this._cache["" + e];
                if (e.length > 0) {
                    var n = this.cache(e.substr(0, e.length - 1), t, i);
                    if (null != n) {
                        var o = new Suggestions,
                            s = {},
                            r = {},
                            previousKeys = [];
                        return data = n.list(),
                            i = "domain" == t.type && t.match === "fuzzy" ? removeVowels(i) : cleanString(i, 1),
                            $.each(data, function (e, a) {
                                previousKeys = previouskeyCache(i, a, e, r, t)[e];
                                if (t.module == "-IM-HEADER" || t.module == "IM-HEADER" || t.dispstyle == 2) {
                                    if (0 == previousKeys.length) {
                                        if (previousKeys.concat(r["spck" + e]).length == 0) {
                                            s[e] = asgv.ld;
                                            if (n.type == 3) {
                                                for (var y = 0; y < s[e].length; y++) {
                                                    if (typeof s[e][y] != "undefined" && s[e][y] != "") {
                                                        s[e][y]["last_dis"] = 1
                                                    }
                                                }
                                            }
                                        } else {
                                            s[e] = previousKeys.concat(r["spck" + e]);
                                            if (n.type == 3) {
                                                for (var y = 0; y < s[e].length; y++) {
                                                    if (typeof s[e][y] != "undefined" && s[e][y] != "") {
                                                        s[e][y]["last_dis"] = 0
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        s[e] = previousKeys;
                                        if (n.type == 3) {
                                            for (var y = 0; y < s[e].length; y++) {
                                                if (typeof s[e][y] != "undefined" && s[e][y] != "") {
                                                    s[e][y]["last_dis"] = 0
                                                }
                                            }
                                        }
                                    }
                                    asgv.ld = s[e]
                                } else {
                                    s[e] = 0 == previousKeys.length ? previousKeys.concat(r["spck" + e]) : previousKeys
                                }
                            }),
                            n.type == n.COMPLETE ? o.list(s, o.COMPLETE) : o.list(s, o.FILTERED),
                            o
                    }
                }
                return null
            },
            0 == asgv.userData && (asgv.store = new IMStore,
                getGidVidUserData()),
            IMStore.localStorage = {},
            IMStore.localStorageLoaded = false;
        IMStore.localStorageQueue = [];
        IMStore.prototype.getData = function (e, t) {
                if (jQuery.inArray(t, perks) != -1) {
                    return 0 == asgv.userData && getGidVidUserData(),
                        "undefined" == typeof Storage ? null : ("string" == typeof IMStore.localStorage && (IMStore.localStorage = $.parseJSON(IMStore.localStorage)),
                            $.parseJSON(IMStore.localStorage[e] || "{}")[t])
                }
                try {
                    return 0 == asgv.userData && getGidVidUserData(),
                    "undefined" == typeof Storage ? null : ("string" == typeof IMStore.localStorage && (IMStore.localStorage = $.parseJSON(IMStore.localStorage)),
                        $.parseJSON(IMStore.localStorage["undefined" != typeof e.id ? e.id.toString().toLowerCase() : e.toString().toLowerCase()] || "{}")[t.toString().toLowerCase()])
                } catch (error) {
                    var er="";
                    if (typeof IMStore == "undefined") {
                            er = "IMStore is undefined"
                    } else if(typeof IMStore.localStorage == "undefined") {
                            er = "IMStore localStorage is undefined"
                           }
                           else {
                            er = error.message
                           }       
                    eventTrack("Auto-suggest", er, 0, 0)   
                  
                }
                
            },
            IMStore.receieveMessage = function (e) {
                e.data && e.origin.match(/utils.imimg.com/g) && (IMStore.localStorage = e.data) && (IMStore.localStorageLoaded = true);
                try {
                      if (IMStore.localStorageLoaded) {
                        while (IMStore.localStorageQueue.length) {
                            var msg = IMStore.localStorageQueue.shift();
                            asgv.store.setData(msg.modId, msg.key, msg.data.concat(asgv.store.getData(msg.modId, msg.key) || []));
                        }
                      }
                } catch (error) {
                        var er="";
                        if (typeof IMStore == "undefined") {
                                er = "IMStore is undefined"
                        } else if(typeof IMStore.localStorageQueue == "undefined") {
                                er = "IMStore localStorageQueue is undefined"
                               }
                               else {
                                er = error.message
                               }       
                        eventTrack("Auto-suggest", er, 0, 0)
                    
                }
                     
            },
            IMStore.prototype.setData = function (e, t, i) {
                if ("undefined" == typeof Storage)
                    return null;
                var a = {
                    modId: e,
                    key: t,
                    data: i,
                    url: this.url
                };
                "undefined" != typeof IMStore.msgHandler && "0" != i[0] && "undefined" != i[0] && IMStore.localStorageLoaded && IMStore.msgHandler.postMessage(a, this.childURL);
                try{
                     if (!IMStore.localStorageLoaded) IMStore.localStorageQueue.push(a);
                }
                catch(error)
                {       var er="";
                        if (typeof IMStore == "undefined") {
                                er = "IMStore is undefined"
                        } else if(typeof IMStore.localStorageQueue == "undefined") {
                                er = "IMStore localStorageQueue is undefined"
                               }
                               else {
                                er = error.message
                               }       
                        eventTrack("Auto-suggest", er, 0, 0)
                }
            },
            Suggester.match = function (e, t, i) {
                i || (i = "beginword");
                var a;
                e = "undefined" != typeof e && e.replace(/(\\|\[|\]|\*|\?|\{|\}|\.|\(|\))/g, "");
                return a = "beginstring" == i.toString().toLowerCase() ? new RegExp("^" + e, "i") : new RegExp("\\b" + e, "i"),
                    $.grep(t, function (e, t) {
                        try {
                          //   var i = cleanString(e.toString().toLowerCase(), 0);
                          v = "";
                          //"e" is an array of eihter "string", which are direct values or of an "object" which has values in "value" attribute
                          // we need to chose the value to match accordingly
                          if ("string" == typeof e) {
                            v = e.toLowerCase();
                          } else if (e.value) {
                            v = e.value.toString().toLowerCase() || "";
                          }
                          var i = cleanString(v, 0);
                          return a.test(i);
                        } catch (error) {
                              eventTrack("Auto-suggest", error.message, 0, 0);
                              return false
                        }
                        
                    
                    })
            },
            Suggester.getTopN = function (e, t, maxSuggestLen, frstcapcase) {
                maxSuggestLen || (maxSuggestLen = 45),
                frstcapcase || (frstcapcase = 2);
                for (var i = [], a = {}, n = 1, o = 0; o < e.length; o++) {
                    if (e[o] === null)
                        continue;
                    var s = cleanString("object" == typeof e[o] ? "undefined" != typeof e[o].label ? e[o].label.toString().toLowerCase().replace(/(e$|es$|y$|ies$|s$|ing$)/i, "").replace(/(s )/gi, " ").replace(/(-)/gi, " ").replace(/ /g, "") : "undefined" != typeof e[o].id ? e[o].id.toString().toLowerCase().replace(/(e$|es$|y$|ies$|s$|ing$)/i, "").replace(/(s )/gi, " ").replace(/(-)/gi, " ").replace(/ /g, "") : null : e[o].toString().toLowerCase());
                    if (!a["" + s] && ("undefined" == typeof e[o].label || e[o].label.length < maxSuggestLen) && (e[o].label && (e[o].pos = n++),
                    e[o].label = frstcapcase == 1 ? ucwords(e[o].label) : e[o].label,
                    e[o].value = frstcapcase == 1 ? ucwords(e[o].value) : e[o].value,
                        i.push(e[o])),
                        a["" + s] = 1,
                        i.length >= t)
                        break
                }
                return i
            },
            Suggester.toTitleCase = function(str) {
                // return str.toLowerCase().split(' ').map(function(word) {
                //     return word.replace(word[0], word[0].toUpperCase());
                //      }).join(' ');
                return str.replace(/(^\w{1})|(\s{1}\w{1})/g, function(match){
                      return match.toUpperCase();
                    });
            },
            Suggester.remDuplicateImg = function (e) {
                var t = JSON.parse(JSON.stringify(e)),
                    i = [],
                    a = {},
                    n = 0,
                    o = 0;
                for ($(t).each(function (e, t) {
                        "object" == typeof t.data && "undefined" == typeof t.data.img && (t.reldata = JSON.parse(JSON.stringify(t.data)))
                    }),
                    o = t.length - 1; o >= 0; o--)
                    if ("object" == typeof t[o] && "object" == typeof t[o].data && "string" == typeof t[o].data.img) {
                        var s = t[o].data.img;
                        a["" + s] && delete t[o].data.img,
                            s = t[o].data.img,
                            a["" + s] = 1
                    }
                for (o = 0; o < t.length; o++)
                    if (o < t.length && ("object" == typeof t[o].data && "string" == typeof t[o].data.img ? delete t[o].data.img : t[o]),
                        "object" == typeof t[o] && "object" == typeof t[o].data && $.map(Object.keys(t[o].data), function (e, t) {
                            return 0 === e.indexOf("cat") ? e : void 0
                        }).length / 2 > 1 && 1 > n) {
                        var r = 1;
                        for (i.push(t[o]),
                            i[i.length - 1].pos = o + 1,
                            n++,
                            r = 0; $.map(Object.keys(t[o].data), function (e, t) {
                                return 0 === e.indexOf("cat") ? e : void 0
                            }).length / 2 > r && 2 != r; r++)
                            if ("object" == typeof t[o].data && "string" == typeof Object.keys(t[o].data)[r + r]) {
                                var l = {
                                    label: t[o].label,
                                    value: t[o].value,
                                    pos: o + 1
                                };
                                l.data = {},
                                    l.reldata = t[o].reldata,
                                    l.data.cat = t[o].data[$.map(Object.keys(t[o].data), function (e, t) {
                                        return 0 === e.indexOf("cat") ? e : void 0
                                    })[r + r]],
                                    l.data.catid = t[o].data[$.map(Object.keys(t[o].data), function (e, t) {
                                        return 0 === e.indexOf("cat") ? e : void 0
                                    })[2 * r + 1]],
                                    i.push(l)
                            } else
                                "object" == typeof t[o].data && delete i[i.length - r].data
                    } else
                        i.push(t[o]),
                        i[i.length - 1].pos = o + 1,
                        "object" == typeof i[i.length - 1].data && "string" == typeof i[i.length - 1].data.cat1 && o >= 2 && delete i[i.length - 1].data;
                return i
            },
            Suggester.getArrayCaseInsensitiveMatch = function (e, t) {
                var i = -1;
                return "undefined" != typeof e && (e = cleanString(e),
                    e = "undefined" != typeof e.id ? e.id.toString().toLowerCase() : e.toString().toLowerCase(),
                        $.each(t, function (t, a) {
                            return a = cleanString("object" == typeof a ? "undefined" != typeof a.name ? a.name.toString().toLowerCase() : "undefined" != typeof a.id ? a.id.toString().toLowerCase() : null : a.toString().toLowerCase()),
                                e == a.toString().toLowerCase() ? i = t : void 0
                        })),
                    i
            },
            window.addEventListener ? addEventListener("message", IMStore.receieveMessage, !1) : attachEvent("onmessage", IMStore.receieveMessage),
            as_css = (chkFrMb || window.location.host.match('m\.indiamart\.com')) ? [".cls-city li.ui-menu-item a.ui-state-hover {padding:2px 0}.ui-menu {list-style:none;margin:0;display:block;float:left}.ui-autocomplete{position:absolute!important;width:100%}.ui-menu .ui-menu-item { list-style: none; cursor: pointer; background: #fff; position: relative;font-family:arial; padding: 0px 5px !important;}.flng-l.pro-q { top: 13px; }.ui-menu .ui-menu-item a {text-decoration:none;font-size:16px;list-style:none;cursor:pointer;display:block;text-indent:5px;padding:5px 0;font-family:arial;}.ui-menu .ui-menu-item a:nth-child(1){color: #0C0F71!important;}.ui-menu .ui-menu-item a.ui-state-hover,.ui-menu .ui-menu-item a.ui-state-active {background:none repeat scroll 0 0 #efefef;color:#0C0F71;padding:5px 0}.ui-placeholder-input{color:#8d8d8d}.as_ui-widget-content,.as_ui-widget-content>ul{background:#fff;box-shadow:0px 5px 5px #cccccc;padding:0px !important;border:1px solid #0C0F71 !important; border-top:0;border-left-color:#0C0F71 !important;border-top-color: #FFFFFF !important}div.mAtsugst.as_ui-widget-content>ul{box-shadow:none;border:none !important}.as_ui-widget-content li:hover{background:#efefef}.as_ui-widget-content li a:hover{background:none!important;color:#0C0F71!important}", ".flng-l { z-index: 2; margin-right: 3px; font-size: 12px !important; font-weight: bold!important; visibility: hidden; color: #D0392D; position: absolute; right: 5px; top: 0; }.ui-menu .ui-menu-item  .ui-state-hover  .flng-l{visibility:visible;}.ui-menu .ui-menu-item a:nth-child(1).ui-state-hover, .ui-menu .ui-menu-item a:nth-child(1).ui-state-active {background: none repeat scroll 0 0 #efefef !important; color: #0C0F71 !important;}.ui-menu .ui-menu-item a:nth-child(2).ui-state-hover, .ui-menu .ui-menu-item a:nth-child(2).ui-state-active {background: none repeat scroll 0 0 #efefef !important;color: #D0392D !important;padding:3px 0 !important;}.as_ui-widget-content li {padding: 0 !important;}.ui-menu .ui-menu-item a.ui-state-hover.flng-l {visibility:visible;}.ui-menu .ui-menu-item a.ui-state-hover .blink, .ui-menu-item:nth-child(2) .flng-l .blink{ -webkit-animation-duration: 2s; animation-duration: 2s; -webkit-animation-fill-mode: both; animation-fill-mode: both;animation-iteration-count:infinite; -webkit-animation-iteration-count:infinite; -webkit-animation-name: as_shake;animation-name: as_shake;font-size:15px; display:inline-block; } @-webkit-keyframes as_shake { 0%, 100% {-webkit-transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {-webkit-transform: translateX(-3px);}     20%, 40%, 60%, 80% {-webkit-transform: translateX(3px);} } @keyframes as_shake {  0%, 100% {transform: translateX(0);}  10%, 30%, 50%, 70%, 90% {transform: translateX(-3px);}20%, 40%, 60%, 80% {transform: translateX(3px);} }.img-sep{ border-top: 2px solid #C1141A;}", ".dropdown dd,.dropdown dt,.dropdown ul{margin:0px;padding:0px;}.dropdown dd{position:relative;}.dropdown dt a{display:inline-block;width:35px;height:20px;}.dropdown dt a span{cursor:pointer; display:block;}.dropdown dd ul{background:#FFFFFF none repeat scroll 0 0;display:none;list-style:none; padding:5px;position:absolute;left:0px;top:2px;width:auto;height:155px;overflow-y:scroll;border:1px solid #bdc7d8;}.dropdown dd ul li a {color:black;padding:5px;display:block;display:inline-block;cursor:pointer; font-size:14px;font-family: arial;text-decoration: none;}.dropdown dt a  span,.dropdown dd ul li span{width:16px;height:11px;background:url('//utils.imimg.com/imsrchui/imgs/country-v5.png');}.dropdown dt a  span{margin:4px 3px;}.dropdown dd ul li span{display:inline-block;}.value{bottom: 5px;left: 2px;position: relative;font-size:14px;font-family: Arial;}.as_arrow{position: relative; top: 40%;margin-top:-19px;left:24px;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent; border-top: 4px solid #555;}.as_arrow.up{border-top:none;border-bottom:4px solid #555;}.dropdown dd ul li.selected {background:#ddf}.dropdown dd ul li:hover {background: none repeat scroll 0 0 #efefef; color: #FFFFFF;cursor:pointer;}.dropdown dd rll li:nth-child(3){border-bottom: 1px solid #ccc;}.flng-l{float:right;visibility:hidden;  color: #D0392D !important;z-index: 2;  margin-right: 3px;}", ".cat{color:#c94105;font:bold 12px Arial;padding-left:5px} .ui-title{border-top: 1px solid #ccc;margin-top: 12px;overflow: visible;height: 5px;padding:5px 5px 12px 10px;} .ui-title.hover-d{background-color: #fff !important;color: #333;} .ui-title .text {color:#585454;font:bold 13px Arial} .product-img {display:table;} .product-img .image{text-align: center;display:table-cell;width:50px;height:40px} .product-img .image img {max-height:40px;max-width:45px;margin:0px 0px -3px;} .product-img .product-title{display:table-cell;vertical-align:middle;color:#0C0F71;font-size:16px;} .product-img .price {color: #b00;display: block;font: bold 12px Arial;margin-top: 5px;} .scat{color:#c94105;font:bold 16px Arial;padding-left:5px}.showmore{text-align: right !important;} li.showmore a{color: #545454 !important;}", "div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all{position:absolute!important;top:54px;min-height:100%;left:0!important;height:100%!important;width:100%!important;background-color:#fff!important;padding:10px!important;overflow:auto!important;box-shadow:none;padding:0px!important;}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a{font-family:arial!important;font-size:14px!important;color:#333!important;padding:11px 30px!important;border-bottom:1px solid #dddcdd!important;display:block!important;position:relative!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a:hover,div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>.topSrch+span{color:#0C0F71!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i{position:absolute!important;top:0!important;width:30px!important;height:100%!important;background-image:url('https://utils.imimg.com/img/atSgstIcon.svg')!important;background-repeat:no-repeat!important;background-position:-100px 100px!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.lIcon{left:0!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.rIcon{right:0!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.hstry{background-position:0 11px!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.topSrch{background-position:-40px 11px!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.autoSrch{background-position:-80px 11px!important}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a>i.copyIcn{background-position:-110px 11px!important}.suppl.mAtsugst li a b{font-weight: normal}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul.ui-autocomplete{position:relative!important;}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all>ul>li>a{font-size:16px!important;}div.mAtsugst.ui-autocomplete.ui-menu.ui-widget.as_ui-widget-content.ui-corner-all{position:fixed!important;border:none!important}"] : [".dropdown dd,.dropdown dt,.dropdown ul{margin:0px;padding:0px;}.dropdown dd{position:relative;}.dropdown dt a{display:inline-block;width:35px;height:20px;}.dropdown dt a span{cursor:pointer; display:block;}.dropdown dd ul{background:#FFFFFF none repeat scroll 0 0;display:none;list-style:none; padding:5px;position:absolute;left:0px;top:2px;width:auto;height:155px;overflow-y:scroll;border:1px solid #bdc7d8;}.dropdown dd ul li a {color:black;padding:5px;display:block;display:inline-block;cursor:pointer; font-size:14px;font-family: arial;text-decoration: none;}.dropdown dt a  span,.dropdown dd ul li span{width:16px;height:11px;background:url('//utils.imimg.com/imsrchui/imgs/country-v5.png');}.dropdown dt a  span{margin:4px 3px;}.dropdown dd ul li span{display:inline-block;}.value{bottom: 5px;left: 2px;position: relative;font-size:14px;font-family: Arial;}.as_arrow{position: relative; top: 40%;margin-top:-19px;left:24px;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent; border-top: 4px solid #555;}.as_arrow.up{border-top:none;border-bottom:4px solid #555;}.dropdown dd ul li.selected {background:#ddf}.dropdown dd ul li:hover {background: none repeat scroll 0 0 #efefef; color: #FFFFFF;cursor:pointer;}.dropdown dd rll li:nth-child(3){border-bottom: 1px solid #ccc;}", ".ui-menu .ui-menu-item a.as_ui-state-hover.flng-l {visibility:visible;color:#fff;}.flng-l.pro-q { top: 13px; }.ui-menu .ui-menu-item .as_ui-state-hover .flng-l{visibility:visible;color:#fff !important;}.as_ui-widget-content{background:#fff;padding:0px !important; border-top:0; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;}.as_ui-widget-content li{padding:0 !important;}.wd50 .ui-autocomplete .ui-menu-item .flng-l {z-index: 2;margin-right: 3px;font-size: 12px !important;visibility: hidden;position: absolute;background: #2e3192;color: #fff !important;right: -2px;top: 2px;font-weight: normal;border-radius: 5px; height: 12px;line-height: 12px;}.blink {font-size:16px !important;font-weight:bold}.-menu-menu-item:hover .flng-l {visibility:visible;background:#2e3192!important;color: #fff!important;}.ui-menu .sug_box {background: #f6f7f9;border-bottom: 1px solid #e2e2e2;padding:5px 6px;color:#888;font-size:16px;font-weight: bold}.ui-pleft {text-indent:15px!important}.ui-sleft {text-indent:5px!important}.img-sep {border-top:2px solid #ccc;}.pro-q {top:13px;}.wd50 {width:100%;position:relative;padding-bottom: 5px;padding-top: 4px;}.autocomplete-box {padding:0px !important;left:680px;overflow: hidden;z-index:3;}.autocomplete-box ul{margin: 0 0 0px}.clear {clear: both}.ui-menu-box{float:left;width:50%;text-align:center;color:#0c0f71 !important;background:#ededed!important;}.recp {display:table;text-align:left;color:#000;font-size:16px;font-weight:bold;font-style:italic;padding:0 5px;width:99%}.sugbx{background:#eee !important;}.sugbx ul {list-style:none;margin:0;padding:0;}.sugbx ul li{padding:5px 0}", ".ui-menu .ui-menu-item a.as_ui-state-hover,.ui-menu .ui-menu-item a.as_ui-state-active{background:#ededed !important;padding:6px 0}.ui-menu{list-style:none;}.ui-menu .ui-menu-item{list-style:none;position:relative;font-family:arial;background:#fff}.ui-menu .ui-menu-item a{text-decoration:none;font-size:16px;list-style:none;cursor:pointer;display:block;text-indent:5px;padding:6px 5px !important;font-family:Gotham,'Helvetica Neue',Helvetica,Arial,sans-serif !important;color: #0C0F71 !important}.ui-placeholder-input{color:#8d8d8d}.as_ui-widget-content li:hover{background:#ededed}.as_ui-widget-content li a:hover{background:none;}.cat {color: #c94105;font:bold 16px Arial;padding-left:5px}.ui-title {border-top:1px solid #ccc;margin-top:12px;overflow:visible;height:5px;padding:5px 5px 12px 10px;}.ui-title.hover-d {background-color:#fff !important;color:#333;}.ui-title .text {color:#585454;font:bold 16px Arial}.product-img {display: table;width: 100%}.product-img .pro_img {text-align:center;display:table-cell;width:50px;height:40px}.product-img .pro_img img{max-height:45px;transform:scale(1.3);border:1px solid #ccc;padding:10px;background:#fff;}.product-title{color: #0C0F71;overflow:hidden;font-size:16px;text-align: center;padding-bottom: 10px;display: inline-block;}.scat {color:#c94105;font:bold 16px Arial;padding-left:5px}.showmore {text-align:right !important;}li.showmore a {color:#545454 !important;}.wht{background: #fff !important}.sugbx hr{margin-top:15px;background: -moz-linear-gradient(left, rgba(242,242,242,0.7) 0%, rgba(242,242,242,0.7) 1%, rgba(158,158,158,0.84) 52%, rgba(242,242,242,0.98) 100%);background: -webkit-linear-gradient(left, rgba(242,242,242,0.7) 0%,rgba(242,242,242,0.7) 1%,rgba(158,158,158,0.84) 52%,rgba(242,242,242,0.98) 100%);background: linear-gradient(to right, rgba(242,242,242,0.7) 0%,rgba(242,242,242,0.7) 1%,rgba(158,158,158,0.84) 52%,rgba(242,242,242,0.98) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3f2f2f2', endColorstr='#faf2f2f2',GradientType=1 );height: 1px;border: none;}.dsp{display: table !important;}.sIcon{background: url(//utils.imimg.com/globalhf/hrd-sp-v19.png);width: 20px;height: 20px;top: 2px;left:2px;position: absolute;padding-top: 4px;}i.sIcon.rcnt{background-position:-341px -136px}i.sIcon.pplr{background-position:-413px -136px}i.sIcon.nrml{background-position:-377px -138px}.ui-menu.dAtsugst .ui-menu-item a{padding: 6px 5px 6px 20px!important;}.suppl.wd50 ul li a b{font-weight: normal}.sugg_dim{background-color: rgba(0,0,0,0.7);z-index: 8;display: block;position: fixed;top: 55px;bottom: 0;left: 0;right: 0;margin: auto;}"];
            as_css.forEach( function (t, e) {
                for (var i = -1, a = 0; a < document.styleSheets.length; a++)
                   t === (document.styleSheets[a].ownerNode !== null && document.styleSheets[a].ownerNode.innerText) && (i = 1);
                -1 === i && $("<style>" + t + "</style>").appendTo("head")
            })
    } else {
        throw new Error("file already loaded")
    }
} catch (e) {
    if (typeof glmodid != "undefined" && glmodid != "") {
        eventTrack("Auto-suggest", "mutilple calling of jq-ac file by " + glmodid, 0, 0)
    }
    console.trace(e);
}
