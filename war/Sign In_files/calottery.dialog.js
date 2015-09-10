(function ($) {
    var getData = $('input[type=hidden][id*=hWinnerModal]'),
		modalToShow = getData.data('modalshowid'),
		showModal = getData.data('modalshow');
    modalToShow = $('#' + modalToShow);
    if (modalToShow != '' && modalToShow.length > 0 && showModal == true) {
        modalToShow.dialog({
            width: 620,
            height: 'auto',
            resizable: false,
            modal: true,
            title: modalToShow.find('#winner-notification-download').length > 0 ? modalToShow.find('#winner-notification-download').attr('title') : '',
            open: function () {
                if ($(this).find('#winner-notification-download').length < 1) {
                    $(this).parents('.ui-dialog').find('.ui-dialog-titlebar').hide();
                }
            }
        });
        modalToShow.dialog('open');
    }
    var drawDetails = $('table.loadModal');
    var drawDetailsDialog;
    drawDetails.find('a.g2modal').click(function (e) {
        var _this = $(this),
			row = _this.parents('tr'),
			getVal = row.find('input:hidden').val(),
			getGame = row.find('td:nth-child(3)').text(),
			replaceVal = $('#objBody_content_0_pagecontent_0_txtCurrentDrawNumber'),
			replaceGameVal = $('#objBody_content_0_pagecontent_0_txtCurrentGameName'),
			theImaginaryButton = $('#objBody_content_0_pagecontent_0_testButton');
        replaceGameVal.val(getGame);
        replaceVal.val(getVal);
        var loadModal = function () {
            drawDetailsDialog = $('#draw-details').dialog({
                modal: true,
                draggable: false,
                autoOpen: false,
                resizeable: false,
                width: 600,
                close: function () {
                    drawDetailsDialog.dialog('destroy').appendTo('#objBody_content_0_pagecontent_0_upDrawGameDetails');
                }
            });
            drawDetailsDialog.dialog('open');
        }
        theImaginaryButton.click(function (e) {
            $.ajax().complete(function () {
                var checkPlease = setInterval(function () {
                    var checkIt = $('#checkPlease').text();
                    if (getVal && checkIt && getVal == checkIt) {
                        loadModal();
                        clearInterval(checkPlease);
                    }
                }, 250);
                setTimeout(function () { clearInterval(checkPlease) }, 10000);
            });
        });
        theImaginaryButton.trigger('click');
        e.preventDefault();
    });

    var entrydialog;
    drawDetails.find('a.g2modalLoggedIn').click(function (e) {
        var _this = $(this),
			row = _this.parents('tr'),
			getVal = row.find('input:hidden').val(),
			replaceVal = $('#objBody_content_0_pagecontent_0_txtCurrentDrawNumber'),
			theImaginaryButton = $('#objBody_content_0_pagecontent_0_btnSubmissions');
        replaceVal.val(getVal);
        var loadModalUpdate = function () {
            entrydialog = $("#modalUpdate").dialog({
                modal: true,
                draggable: false,
                autoOpen: false,
                resizeable: false,
                width: 600,
                close: function () {
                    entrydialog.dialog('destroy').appendTo('#objBody_content_0_pagecontent_0_updateModal');
                }
            });
            entrydialog.dialog('open');
        }
        theImaginaryButton.click(function (e) {
            $.ajax().complete(function () {
                var checkItPlease = setInterval(function () {
                    var checkThis = $('#objBody_content_0_pagecontent_0_testLabel').text();
                    if (getVal && checkThis && getVal == checkThis) {
                        loadModalUpdate();
                        clearInterval(checkItPlease);
                    }
                }, 250);
                setTimeout(function () { clearInterval(checkItPlease) }, 10000);
            });
        });
        theImaginaryButton.trigger('click');
        e.preventDefault();
    });

    $('a.fgTOS').click(function (e) {
        e.preventDefault();
        $('#terms-of-services').dialog({
            width: 600,
            height: 'auto',
            resizeable: false,
            modal: true
        }).find('button.close').click(function () {
            $('#terms-of-services').dialog('close');
        });
        $("#terms-of-services").parent().appendTo($("#frmMain"));
    });

    $('a.fgWhy').click(function (e) {
        e.preventDefault();
        $('#why-do-we-need').dialog({
            width: 600,
            height: 'auto',
            resizeable: false,
            modal: true
        }).find('button.close').click(function () {
            $('#why-do-we-need').dialog('close');
        });
        $("#why-do-we-need").parent().appendTo($("#frmMain"));
    });


    $('a.fgPass').click(function (e) {
        e.preventDefault();
        $('#forgot-password').dialog({
            width: 600,
            height: 'auto',
            resizeable: false,
            modal: true
        }).find('button.close').click(function () {
            $('#forgot-password').dialog('close');
        });
        $("#forgot-password").parent().appendTo($("#frmMain"));
    });
     $('a.privacyPolicy').click(function (e) {
        e.preventDefault();
        $('#privacy-policy').dialog({
            width: 600,
            height: 'auto',
            resizeable: false,
            modal: true
        }).find('button.close').click(function () {
            $('#privacy-policy').dialog('close');
        });
        $("#privacy-policy").parent().appendTo($("#frmMain"));
    });

    if (window.location.pathname.indexOf('reset-password') > 0 && window.location.search.indexOf('Auth') < 0) {
        $('a.fgPass').trigger('click');
    }


    // RESEND VERIFICATION EMAIL MOVED TO global.js SINCE IT NEEDS TO BE AVAILABLE ON EVERY PAGE

    var entryDetails = $('table.loadModal');

    entryDetails.find('a.open-entries-for-draw').click(function () {
        $("#entries-for-ticket").dialog({
            autoOpen: true,
            modal: true,
            draggable: false,
            resizeable: false,
            width: 600
        });
    });

    if ($('#confirmation_email_sent').length) {
        $('#confirmation_email_sent').dialog({
            autoOpen: true,
            modal: true,
            draggable: false,
            width: 500
        }).find('button.close').click(function () {
            $('#confirmation_email_sent').dialog('close');
        });
    }

    $('a.open-code-locator').click(function (e) {
        e.preventDefault();
        $('#code-locator').dialog({
            width: 500,
            height: 'auto',
            resizeable: false,
            modal: true
        }).find('button.close').click(function () {
            $('#code-locator').dialog('close');
        });
    });


    /**
    * Initialize Wheel of Fortune modal for 2nd chance submission page
    * dialog gets triggered in calottery.validation4.js
    */
    var dialogWheelOfFortune = $('#dialog_wof').dialog({
        modal: true,
        draggable: false,
        autoOpen: false,
        resizeable: false,
        width: 620,
        close: function () {

            // check value of 'Do not display' checkbox
            // if selected, submit ajax request to update user's setting
            if ($('#dialog_wof_checkbox_hide').is(':checked')) {

                var drawNumber = $('#dialog_wof_draw_number').val();
                var submitUrl = '/SecondChanceWheelOfFortune.ashx?donotshow=true&drawNumber=' + drawNumber;

                // clear any queued responses that haven't been displayed yet
                window.secondChanceDialog.queuedResponses = [];

                $.ajax({
                    url: submitUrl,
                    type: "GET"
                }).done(function (data) {
                });
            }

            // clear data in dialog
            window.secondChanceDialog.wofClear();

            // if there are queued responses, display the next one
            if (window.secondChanceDialog.queuedResponses.length > 0) {
                setTimeout(function () {
                    window.secondChanceDialog.wofPopulate(window.secondChanceDialog.queuedResponses.shift());
                    window.secondChanceDialog.wofOpen();
                }, 250);
                return;
            }

            window.secondChanceDialog.isOpen = false;

            // if the last item in the page is a wheel of fortune item we need to display the 'Additional Tickets' dialog
            window.secondChanceDialog.checkForLastTicket();
        }
    });

    /**
    * Trigger dialog close when Wheel of Fortune 'Continue' button is clicked 
    */
    $('#dialog_wof_close').click(function () {
        dialogWheelOfFortune.dialog('close');
    });

    /**
    * Initialize dialog that prompts user to enter additional 2nd Chance tickets
    */
    $("#done").dialog({
        autoOpen: false,
        modal: true,
        width: 500
    }).find('.more').click(function () {
        location.reload();
    });


    /**
    * Global methods for handling of dialogs on 2nd Chance ticket entry page
    */
    window.secondChanceDialog = {

        /**
        * Boolena to track the open state of the Wheel of Fortune modal
        */
        isOpen: false,

        /**
        * Queue of responses that haven't been displayed yet
        */
        queuedResponses: [],

        /**
        * Open the Wheel of Fortune modal
        */
        wofOpen: function () {
            window.secondChanceDialog.isOpen = true;
            $('#dialog_wof').dialog('open');
        },

        po5Open: function () {
            window.secondChanceDialog.isOpen = true;
            $('#dialog_wof').dialog('open');
        },

        /**
        * Populate data on the Wheel of Fortune modal
        */
        wofPopulate: function (data) {

            var formContent = data.WheelofFortuneLightBoxSitecoreItem;

            // do string replace to add number of entries to headline
            $('#ui-dialog-title-dialog_wof').html(formContent['Head Line'].replace('{0}', data.NumEntries));

            // populate dialog data
            $('#dialog_wof_draw_type').html(data.DrawType);
            $('#dialog_wof_draw_name').html(data.DrawName);
            $('#dialog_wof_draw_number').val(data.DrawNumber);
            $('#dialog_wof_draw_value').html(data.TotalPrizeValue);
            $('#dialog_wof_entry_deadline').html(data.EntryDeadline);
            $('#dialog_wof_num_entries').html(data.NumEntries);

            $('#dialog_wof_subhead').html(formContent['Description Text']);
            $('#dialog_wof_subhead_link').attr('href', formContent['Submissions Link']);
            $('#dialog_wof_subhead_link').html(formContent['Submissions Link-Text']);

           
            if (formContent['Videos-Title']) {
                
            	$('#dialog_wof_video_img').attr('src', formContent['Videos-Image']);
            	$('#dialog_wof_video_img_link').attr('href', '/LotteryHome/happenings/lottery-tv/?v=' + formContent['Videos-Name']);
            	$('#dialog_wof_video_img_link').attr('target', '_blank');
            	$('#dialog_wof_video_link').attr('href', '/LotteryHome/happenings/lottery-tv/?v=' + formContent['Videos-Name']);
            	$('#dialog_wof_video_link').attr('target', '_blank');
            	$('#dialog_wof_video_link').html(formContent['Videos-Title']);
            	$('#dialog_wof_video_description').html(formContent['Videos-Description']);
                $('#dialog_wof_video').show();
            } else {
                $('#dialog_wof_video').hide();
            }

            if (formContent['Optional Marketing Link']) {
                $('#dialog_wof_marketing_link').attr('href', formContent['Optional Marketing Link']);
                $('#dialog_wof_marketing_link').attr('target', '_blank');
                $('#dialog_wof_marketing_link').html(formContent['Optional Marketing Link-Text']);
                $('#dialog_wof_marketing_description').html(formContent['Optional Marketing Description']);
                $('#dialog_wof_marketing').show();
            } else {
                $('#dialog_wof_marketing').hide();
            }

            $('#dialog_wof_close_label').html(formContent['Button Text']);
            $('#dialog_wof_checkbox_hide_label').html(formContent['Do Not Show Check Box Text']);

            if (formContent['Do Not Show Visible']) {
                $('#dialog_wof_checkbox_hide, #dialog_wof_checkbox_hide_label').show();
            } else {
                $('#dialog_wof_checkbox_hide, #dialog_wof_checkbox_hide_label').hide();
            }

            if (formContent['Bottom Panel Visible']) {
                $('#dialog_wof_bottom_panel').show();
            } else {
                $('#dialog_wof_bottom_panel').hide();
            }
        },

        /**
        * Clear data on the Wheel of Fortune modal
        */
        wofClear: function () {

            $('#ui-dialog-title-dialog_wof').html('');

            $('#dialog_wof_checkbox_hide').attr('checked', false);

            $('#dialog_wof_draw_type').html('');
            $('#dialog_wof_draw_name').html('');
            $('#dialog_wof_draw_number').val('');
            $('#dialog_wof_draw_value').html('');
            $('#dialog_wof_entry_deadline').html('');
            $('#dialog_wof_num_entries').html('');

            $('#dialog_wof_subhead').html('');
            $('#dialog_wof_subhead_link').attr('href', '#');
            $('#dialog_wof_subhead_link').text('');

            $('#dialog_wof_video_img').attr('src', '');
            $('#dialog_wof_video_img_link').attr('href', '#');
            $('#dialog_wof_video_link').attr('href', '#');
            $('#dialog_wof_video_link').text('');
            $('#dialog_wof_video_description').text('');

            $('#dialog_wof_marketing_link').attr('href', '#');
            $('#dialog_wof_marketing_link').text('');
            $('#dialog_wof_marketing_description').text('');

            $('#dialog_wof_close_label').html('');
        },


        /**
        * Populate data for Power of 5
        */
        po5Populate: function (data) {

            var formContent = data.PowerOf5LightBoxSitecoreItem;

            // do string replace to add number of entries to headline
            $('#ui-dialog-title-dialog_wof').html(formContent['Head Line'].replace('{0}', data.NumEntries));

            // populate dialog data
            $('#dialog_wof_draw_type').html(data.DrawType);
            $('#dialog_wof_draw_name').html(data.DrawName);
            $('#dialog_wof_draw_number').val(data.DrawNumber);
            $('#dialog_wof_draw_value').html(data.TotalPrizeValue);
            $('#dialog_wof_entry_deadline').html(data.EntryDeadline);
            $('#dialog_wof_num_entries').html(data.NumEntries);

            $('#dialog_wof_subhead').html(formContent['Description Text']);
            $('#dialog_wof_subhead_link').attr('href', formContent['Submissions Link']);
            $('#dialog_wof_subhead_link').html(formContent['Submissions Link-Text']);

           
            if (formContent['Videos-Title']) {
                
                $('#dialog_wof_video_img').attr('src', formContent['Videos-Image']);
                $('#dialog_wof_video_img_link').attr('href', '/LotteryHome/happenings/lottery-tv/?v=' + formContent['Videos-Name']);
                $('#dialog_wof_video_img_link').attr('target', '_blank');
                $('#dialog_wof_video_link').attr('href', '/LotteryHome/happenings/lottery-tv/?v=' + formContent['Videos-Name']);
                $('#dialog_wof_video_link').attr('target', '_blank');
                $('#dialog_wof_video_link').html(formContent['Videos-Title']);
                $('#dialog_wof_video_description').html(formContent['Videos-Description']);
                $('#dialog_wof_video').show();
            } else {
                $('#dialog_wof_video').hide();
            }

            if (formContent['Optional Marketing Link']) {
                $('.light-box-bottom').css('width', '100%');
                $('#dialog_wof_marketing_link').attr('href', formContent['Optional Marketing Link']);
                $('#dialog_wof_marketing_link').attr('target', '_blank');
                $('#dialog_wof_marketing_link').html(formContent['Optional Marketing Link-Text']);
                $('#dialog_wof_marketing_description').html(formContent['Optional Marketing Description'] + 
                    ' <a class="social facebook" href="#"><img style="border:none;width:21px;" src="/power-of-five/i/modal-social-fb.png"/></a> <a class="social twitter" href="#" data-twitter="' +
                     formContent['Twitter Comment'].replace('{0}', data.TotalPrizeValue) + 
                     '"><img  style="border:none;width:21px;" src="/power-of-five/i/modal-social-twitter.png"/></a>');
                
                $('#dialog_wof_marketing').show();
            } else {
                $('#dialog_wof_marketing').hide();
            }

            $('#dialog_wof_close_label').html(formContent['Button Text']);
            $('#dialog_wof_checkbox_hide_label').html(formContent['Do Not Show Check Box Text']);

            if (formContent['Do Not Show Visible']) {
                $('#dialog_wof_checkbox_hide, #dialog_wof_checkbox_hide_label').show();
            } else {
                $('#dialog_wof_checkbox_hide, #dialog_wof_checkbox_hide_label').hide();
            }

            if (formContent['Bottom Panel Visible']) {
                $('#dialog_wof_bottom_panel').show();
            } else {
                $('#dialog_wof_bottom_panel').hide();
            }
        },


        /**
        * Check to see if maximum number of tickets has been entered on the 2nd Chance
        * page. If max number has been reached, display modal to prompt user to add
        * additional tickets.
        */
        checkForLastTicket: function () {

            if ($('.check-ticket').length == $('.success').length) {
                $('#done').dialog('open');
            }
        }
    };


     $(document).on('click', '#dialog_wof_marketing_description a.social', function (e) {
        e.preventDefault();

        var articleTitle = $('#dialog_wof_marketing_link').text();
        var socialPath = null;

        switch (this.className) {
            case "social facebook":
                socialPath = "http://www.facebook.com/sharer.php?u=" + $('#dialog_wof_marketing_link').attr("href") + "&t=" + encodeURIComponent(articleTitle);
                break;
            case "social twitter":
                socialPath = "http://twitter.com/home?status=" + encodeURIComponent($('#dialog_wof_marketing_description a.twitter').data("twitter"));
                break;
            default:
        }

        window.open(socialPath, "sharer", "toolbar=0,status=0,width=1026,height=616");

    });

})(jQuery);


