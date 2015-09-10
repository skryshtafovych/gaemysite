var browserModal = function (modalName) {
    $(modalName).dialog({
        autoOpen: true,
        modal: true,
        draggable: false,
        width: 692,
        dialogClass: "browser-detect"
    });
    var uriToUse4BrowserDetectionSession = "/PWSBrowserDetection.ashx";
    $.ajax({
        url: uriToUse4BrowserDetectionSession,
        type: "POST"
    }).done(function (data) {
        //alert("test" + data);
    }
);

};




if (bowser.mobile || bowser.tablet) {
    // if user agent is a mobile or tablet device, do nothing

} else if ((!bowser.firefox) && (!bowser.safari) && (!bowser.chrome) && (!bowser.msie)) {
    browserModal(".browser-multiple-modal");
} else if (bowser.firefox && bowser.version < 5) {//Firefox minFF 5
    $(".browser-modal .ffonly").css("display", "");
    $('#ffversionnumber').text(bowser.version);
    browserModal(".browser-modal");
} else if (bowser.safari && bowser.version < 5) {//Safari minSafari 5
    $(".browser-modal .safarionly").css("display", "");
    $('#safariversionnumber').text(bowser.version);
    browserModal(".browser-modal");
} else if (bowser.chrome && bowser.version < 18) {//Chrome minChrome
    $(".browser-modal .chromeonly").css("display", "");
    $('#chromeversionnumber').text(bowser.version);
    browserModal(".browser-modal");
} else if (bowser.msie && bowser.version < 8) { // 8
    $('#ieversionnumber').text(bowser.version);
    $(".browser-modal .ieonly").css("display", "");
    browserModal(".browser-modal");
    //console.log("test" + bowser.version);
} else {
    // something else
}