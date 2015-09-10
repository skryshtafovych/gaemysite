var today = new Date(),
    todayDay = today.getDate(),
    todayMon = today.getMonth() + 1,
    todayYe = today.getFullYear() - 18,
    areU18 = new Date(todayYe, todayMon, todayDay),
    areU18 = parseInt(areU18.getTime(), 10),
	scratchFF5Regex = /^[0-9]+$/,
	SLPRegex = /^[b-df-hj-np-tv-z#&%\d]+$/i,
	myProfileEmailRegex = /^([a-zA-Z\d_\.\-\+'%])+\@(([a-zA-Z\d\-])+\.)+([a-zA-Z\d]{2,4})+$/,
	regex2Use;
(function ($) {
	$('#codeLocator').change(function (e) {
		var swapUrl = $('select option:selected').attr("imgUrl");
		//change src value for div id #image
		$("div #gameImage").attr("src", swapUrl);
		e.preventDefault();
	}).trigger('change');
    var bValidatorOptions = { showCloseIcon: false, showErrMsgSpeed: "fast", errorClass: "error error-state", position: { x: 'right', y: 'bottom' }, offset: { x: 10, y: 0} };
    var bvalidator_reg_form = $('#registration_form');
    bvalidator_reg_form.bValidator(bValidatorOptions).find('a[id*=lbSubmit]').click(function () {
        if (!$(this).parents(bvalidator_reg_form).data('bValidator').validate()) {
            $(this).parents(bvalidator_reg_form).find('[id*=AgreeToTerms]').next('div.bVErrMsgContainer').remove().appendTo($('[id*=AgreeToTerms]').parents('.full'));
            return false;
        } else {
            return true;
        }
    });
    var bvalidator_reset_pass_form = $('#resetPass');
    bvalidator_reset_pass_form.bValidator(bValidatorOptions).find('a[id*=lbReset]').click(function () {
        if (!$(this).parents(bvalidator_reset_pass_form).data('bValidator').validate()) {
            return false;
        } else {
            return true;
        }
    });
    var bvalidator_signin_form = $('#signinForm');
    bvalidator_signin_form.bValidator(bValidatorOptions).find('a[id*=lbSubmit]').click(function () {
        if (!$(this).parents(bvalidator_signin_form).data('bValidator').validate()) {
            return false;
        } else {
            return true;
        }
    });

    //Retailer Evaluation Form
    var bvalidator_retEvaluation_form = $('#request-evaluation');
    bvalidator_retEvaluation_form.bValidator(bValidatorOptions).find('a[id*=btnSubmit]').click(function () {
        if (!bvalidator_retEvaluation_form.data('bValidator').validate()) {
            return false;
        } else {
            return true;
        }
    });
    // validation code for second chance submission pages1
    $('.check-ticket .button').click(function (e) {
		var resetTimeOutScr = window.timeOutScr;
		clearTimeout(window.timeOutScr);
        var $button = $(this),
			$buttonParent = $button.parents('.check-ticket'),
			$input = $buttonParent.find(':text'),
            inputErr = 'error-input',
            labelErr = 'errorlbl',
            genErr = 'error';
        e.preventDefault();

        // if you've got an error class, remove it before each attempt at validation
        if ($buttonParent.hasClass(genErr)) {
            $buttonParent.find('p').remove();
            $buttonParent.removeClass(genErr).find('.' + labelErr + ',.' + inputErr + ',.' + genErr).removeClass(labelErr).removeClass(inputErr).removeClass(genErr);
        }
        // loop through each input and evaluate if the data attribute (set statically in layouts\sublayouts\Second Chance\SC_OneEntryCode.ascx)
        // matches the length of the input - this also inadvertenly does a basic regex since it's matching on type
        $input.each(function () {
            var _this = $(this);
            if (_this.parents('fieldset').hasClass('slp-submissions')) {
                regex2Use = SLPRegex;
            } else {
                regex2Use = scratchFF5Regex;
            }
            // condition #1: if the value of the input is not a number
            if (!regex2Use.test(_this.val())) {
                $buttonParent.addClass('error');
                _this.parent('fieldset').addClass('error');
                _this.addClass('error-input');
                _this.siblings('label').addClass('errorlbl');
            } else if (_this.data("maxlength") !== _this.val().length && _this.data("maxlength") !== _this.val().length+1) {
                // condition #2: if the value of the input and the value of the data attribute don't match
                $buttonParent.addClass('error');
                _this.parent().addClass('error');
                _this.addClass('error-input');
                _this.siblings('label').addClass('errorlbl');
            }

        });
        // if you've errored out, then add the validation message
        // (this'll probably have to be abstracted into sitecore later for translation stuff)
		var entryCode,
			ticketId;
        if ($buttonParent.hasClass('error')) {
        	$button.after('<p>' + $('#EnterNumbersCorrectlyMsg').text() + '</p>');
            return false;
        } else if ($buttonParent.hasClass('success')) {
            return false;
            $button.prop('disabled', true);
        } else {
            $button.hide().parent().append('<img src="/i/blue-roller-throbber.gif" />');
            var today = new Date(),
                today = today.format("mm/dd/yy"),
                today = today.toString();
			ticketId = $buttonParent.find('.ticket-id').val(),
			entryCode = $buttonParent.find('.entry-code').val();
            if ($buttonParent.find('fieldset').hasClass('ff5-submissions') || $buttonParent.find('fieldset').hasClass('slp-submissions')) {
                entryCode = "";
                for (var k = 0; k < $input.length; k++) {
                    entryCode += $($input[k]).val();
                }
            }
            var uriToUse = "https://www.calottery.com/SecondChanceSubmit.ashx?entrycode=" + escape(entryCode);
            if (!$buttonParent.find('fieldset').hasClass('ff5-submissions') && !$buttonParent.find('fieldset').hasClass('slp-submissions')) {
                uriToUse = uriToUse + "&ticketid=" + escape(ticketId);
            }
            $.ajax({
                url: uriToUse,
                type: "GET"
            }).done(function (data) {

                var data = $.parseJSON(data),
					dataEntryCode = data.entryCode ? data.entryCode.toString().toLowerCase() : '',
					formEntryCode = entryCode ? entryCode.toString().toLowerCase() : '',
					dataTicketId = data.ticketId ? data.ticketId.toString().toLowerCase() : '',
					formTicketId = ticketId ? ticketId.toString().toLowerCase() : '',
					showWofDialog = false;

				if (dataEntryCode == formEntryCode && dataTicketId == formTicketId) {
					//Wheel of fortune
					if (data.instantPrizes != null)
					{
						if (data.instantPrizes[0] != null && data.instantPrizes[0].prizeType == "1")
						{
						    showWofDialog = true;

						    var uriToUse4WheelOfFortune = "/SecondChanceWheelOfFortune.ashx?submissionid=" + escape(data.submissionId);

							$.ajax({
								url: uriToUse4WheelOfFortune,
								type: "GET"
							}).done(function (data) {

							    // Get data response from Wheel of Fortune ticket entry and handle
							    // display of confirmation dialog.

							    // Dialog service is initialized in calottery.dialog.js

							    var dataLightbox = $.parseJSON(data);

							    // If there is no data in the response, do not display dialog
							    if (!$.isPlainObject(dataLightbox)) {
							        // if the last item in the page is a wheel of fortune item, display the 'Additional Tickets' dialog
                                    // method invoked here is defined in calottery.dialog.js
							        window.secondChanceDialog.checkForLastTicket();
							        return;
							    }

							    if (window.secondChanceDialog.isOpen === true) {
							        // If the Wheel of Fortune dialog is already open,
							        // save this response for later use
							        window.secondChanceDialog.queuedResponses.push(dataLightbox);
							    } else {
							        // Populate and display the Wheel of Fortune dialog.
							        window.secondChanceDialog.wofPopulate(dataLightbox);
							        window.secondChanceDialog.wofOpen();
							    }
							});
						}
					}
					//Wheel of fortune END

                    // Po5
                    else {

                            showWofDialog = true;

                            var uriToUse4WheelOfFortune = "/SecondChanceWheelOfFortune.ashx?po5=true&submissionid=" + escape(data.submissionId);

                            $.ajax({
                                url: uriToUse4WheelOfFortune,
                                type: "GET"
                            }).done(function (data) {

                                // Get data response from Wheel of Fortune ticket entry and handle
                                // display of confirmation dialog.

                                // Dialog service is initialized in calottery.dialog.js

                                var dataLightbox = $.parseJSON(data);

                                // If there is no data in the response, do not display dialog
                                if (!$.isPlainObject(dataLightbox)) {
                                    // if the last item in the page is a wheel of fortune item, display the 'Additional Tickets' dialog
                                    // method invoked here is defined in calottery.dialog.js
                                    window.secondChanceDialog.checkForLastTicket();
                                    return;
                                }

                                if (window.secondChanceDialog.isOpen === true) {
                                    // If the Power of 5 dialog is already open,
                                    // save this response for later use
                                    window.secondChanceDialog.queuedResponses.push(dataLightbox);
                                } else {
                                    // Populate and display the Power of 5 dialog.
                                    window.secondChanceDialog.po5Populate(dataLightbox);
                                    window.secondChanceDialog.po5Open();
                                }
                            });

                    }
                    // Po5 End
                    $buttonParent.find('img').remove();
					$buttonParent.find('fieldset').first().append('<p class="nums"><strong></strong></p>');
                    var text = $buttonParent.find(':text');
                    for (var i = 0; i < text.length; i++) {
						$buttonParent.find('p.nums strong').append($(text[i]).val() + ( i != text.length-1 ? ' - ': '' ));
                    }
                    $buttonParent.find(':text').hide().siblings('em').remove();
                    $buttonParent.addClass('success').append('<img src="/i/success-green-check.png"/><p>' + $('#SubmittedSuccessfullyMsg').text() + '</p>');
                    __doPostBack('objBody_content_0_ctl01_UpdatePanel_SC_TicketCounter', '');
				} else if (data.code == "Session Expired") {
                    $buttonParent.addClass('error').append('<p>' + $('#SessionExpMsg').text() + '</p>');
                    $buttonParent.find('img').remove();
                } else {
                    var showThisError = data.code ? data.code : 'unknown error';
                    $buttonParent.addClass('error').append('<p>' + showThisError + '</p>');
                    $buttonParent.find('img').remove();
                    $button.show();
				}

                // if this is the last ticket entry on the page, and Wheel of Fortune dialog
				// wasn't triggered, display modal to add additional tickets
				if (showWofDialog === false) {
				    window.secondChanceDialog.checkForLastTicket();
				}

				setTimeout(resetTimeOutScr,window.timeOut);
            }).fail(function () {
				setTimeout(resetTimeOutScr, window.timeOut);
                $buttonParent.find('img').remove();
                $button.show();
                $buttonParent.addClass('error').append("<p>" + $(".SystemErrorMsg").text() + "</p>");
            });
        }
    });
    $('.check-ticket :text').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).parents('.check-ticket').find('a.button').click();
        }
		var _this = $(this);
        if (_this.parents('fieldset').hasClass('slp-submissions')) {
            regex2Use = SLPRegex;
        } else {
            regex2Use = scratchFF5Regex;
        }
        var c = String.fromCharCode(e.which);
        var isWordCharacter = c.match(regex2Use);
		_this.keyup(function(){
			if (isWordCharacter) {
				var nextInput = _this.nextAll(':text:lt(1)');         // look for next text input field within parent, limit 1 result
				if (!nextInput.length) {                                // if no text input within parent
					nextInput = _this.parent().next('.button');       // check for submit button

					// if not submit button, look for text input in next parent element
					if (!nextInput.length) { nextInput = _this.parent().next().find(':text'); }
				}
				if (_this.val().length == _this.attr('maxlength')) { // if max length on current element is reached, jump to nextInput determined above
					nextInput.focus();
				}
			}
		});
    });

    $('.check-ticket a.button').keyup(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            // find closest parent .check-ticket, jump to next sibling .check-ticket, find first text input, focus.
            $(this).closest('.check-ticket').next().find(':text:lt(1)').focus();
        }
    });

	/**
	* Validates an address or name
	* @param  {String} address to validate
	* @return {Bool}       validation state
	*/
	validaddressorname = function (code, type) {
		code = code.toString();
		if(type.toString() == "address") {
			var regexAddr = /[^a-zA-Z0-9\s-,'\.#]+/g;
		} else {
			var regexAddr = /[^a-zA-Z0-9\s-,'\.]+/g;
		}
		return !regexAddr.test(code);
	}
	/**
	* Validates an email address
	* @param {string} email address to validate
	* @return {bool} validation state
	*/

	validemailmyprofile = function(code) {
		code = code.toString();
		return myProfileEmailRegex.test(code);
	}

    /**
    * Validates a phone number
    * @param  {String} num Phone nuumber string to validate
    * @return {Bool}       validation state
    */
    validphone = function (num) {
        num = num.toString();
        var stripped = num.replace(/[\D]/gi, '');
        return (num.length <= 20
            && /[\d]{7,20}/.test(stripped)
            && !/[a-z]/i.test(num));
    };
    /**
    * Validates a postal code
    * @param  {String} code Postal code string to validate
    * @return {Bool}        Validation state
    */
    validpostalcode = function (code) {
        code = code.toString();
		if ($('#objBody_content_0_leftcolumn_0_hdnValidZip').val() == 'true' || $('#objBody_content_0_pagecontent_0_hdnValidZip').val() == 'true') {
			return (code.length <= 15 && /[a-z0-9\-\s]/i.test(code));
		}
    };
    validDLNum = function (code) {
        var isValid = false;
        //4 num
        isValid = code.match(/\d/g) == null ? false : code.match(/\d/g).length >= 4;
        //2 alpha
        isValid = (code.match(/[a-zA-Z]/g) == null ? false : isValid && code.match(/[a-zA-Z]/g).length <= 2);
        //3 & 4 num
        isValid = (code.match(/^..\d\d/) == null ? false : isValid && code.match(/^..\d\d/));
        //max length
        isValid = isValid && code.length < 10;
        return isValid;
    }
    minage18 = function (code) {
        var dobDateMo = code.split('/')[0],
            dobDateDa = code.split('/')[1],
            dobDateYe = code.split('/')[2],
            dob = new Date(dobDateYe, dobDateMo, dobDateDa),
            dobMilli = parseInt(dob.getTime(), 10);
        if (dobMilli <= areU18 && dobDateYe >= 1900) {
            return true;
		} else {
            return false;
        }
    }

    passcontains = function (code) {
        var reqCount = 0,
			code = code.toString(),
            atLeastOneNum = /\d+/,
            atLeastOneCap = /[A-Z]+/;
            atLeastOneLow = /[a-z]+/;
            atLeastOneSym = /[&%$#@!]+/,
			emailAdd =  $('#objBody_content_0_pagecontent_0_txtEmail').length > 0 ? $('#objBody_content_0_pagecontent_0_txtEmail') : $('#objBody_content_0_leftcolumn_0_txtEmail'),
			notNewEmail = $(emailAdd).val().split('@')[0],
			notNewEmail = notNewEmail.replace(/([^a-zA-Z0-9]+)/g,'\\$1'),
			notNewEmail = new RegExp(notNewEmail, ''),
			notCurEmail = $('#objBody_content_0_pagecontent_0_lblCurrentEmail').next('p').text(),
			notCurEmail = notCurEmail.replace(/([^a-zA-Z0-9]+)/g,'\\$1'),
			notCurEmail = new RegExp(notCurEmail, 'g');
		if (notCurEmail.test(code)) { reqCount = 0; }
		if (notNewEmail.test(code)) { reqCount = 0; }
        if (atLeastOneNum.test(code)) { reqCount++; }
        if (atLeastOneCap.test(code)) { reqCount++; }
        if (atLeastOneLow.test(code)) { reqCount++; }
        if (atLeastOneSym.test(code)) { reqCount++; }

        if (reqCount >= 2 && code.length >= 8) { return true; }
        else { return false; }

        //atLeastOneCap not currently used
        // if (atLeastOneNum.test(code) && code.length >= 8) {
        //     return true;
        // }
    }

    var dobField = $('#objBody_content_0_leftcolumn_0_dob1');
    dobField.keyup(function () {
        var _this = $(this),
            leng = _this.val().length;
        if (leng == 2) {
            _this.val(_this.val() + '/');
		} else if (leng == 4 && _this.val().split('/').length == 3) {
			var splitUp = _this.val().split('/');
			_this.val(splitUp[0] + '/' + splitUp[1]);
		} else if (leng == 5) {
			_this.val(_this.val() + '/');
		} else if (leng == 7 && _this.val().split('/').length == 4) {
			var splitUp = _this.val().split('/');
			_this.val(splitUp[0] + '/' + splitUp[1] + '/' + splitUp[2]);
		}
    });
})(jQuery);
