
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console) {
        arguments.callee = arguments.callee.caller;
        var newarr = [].slice.call(arguments);
        (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
};




// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// Stupid browser detection

function badBrowser(){
    if($.browser.msie && parseInt($.browser.version) <= 7){ return true;}
    if($.browser.opera && parseInt($.browser.version) <= 9) { return true;}
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
        var ffversion=new Number(RegExp.$1)
        if (ffversion<=4) { return true;}}
    return false;
}


/**
 * HAPPY FORM VALIDATION
 */

(function($){
    function trim(el) {
        return (''.trim) ? el.val().trim() : $.trim(el.val());
    }
    $.fn.isHappy = function (config) {
        var fields = [], item;

        function getError(error) {
            return $('<span id="'+error.id+'" class="unhappyMessage">'+error.message+'</span>');
        }
        function handleSubmit() {
            var errors = false, i, l;
            for (i = 0, l = fields.length; i < l; i += 1) {
                if (!fields[i].testValid(true)) {
                    errors = true;
                }
            }
            if (errors) {
                if (isFunction(config.unHappy)) config.unHappy();
                return false;
            } else if (config.testMode) {
                if (window.console) console.warn('would have submitted');
                return false;
            }
        }
        function isFunction (obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        }
        function processField(opts, selector) {
            var field = $(selector),
                error = {
                    message: opts.message,
                    id: selector.slice(1) + '_unhappy'
                },
                errorEl = $(error.id).length > 0 ? $(error.id) : getError(error);

            fields.push(field);
            field.testValid = function (submit) {
                var val,
                    el = $(this),
                    gotFunc,
                    error = false,
                    temp,
                    required = !!el.get(0).attributes.getNamedItem('required') || opts.required,
                    password = (field.attr('type') === 'password'),
                    arg = isFunction(opts.arg) ? opts.arg() : opts.arg;

                // clean it or trim it
                if (isFunction(opts.clean)) {
                    val = opts.clean(el.val());
                } else if (!opts.trim && !password) {
                    val = trim(el);
                } else {
                    val = el.val();
                }

                // write it back to the field
                el.val(val);

                // get the value
                gotFunc = ((val.length > 0 || required === 'sometimes') && isFunction(opts.test));

                // check if we've got an error on our hands
                if (submit === true && required === true && val.length === 0) {
                    error = true;
                } else if (gotFunc) {
                    error = !opts.test(val, arg);
                }

                if (error) {
                    el.addClass('unhappy').before(errorEl);
                    return false;
                } else {
                    temp = errorEl.get(0);
                    // this is for zepto
                    if (temp.parentNode) {
                        temp.parentNode.removeChild(temp);
                    }
                    el.removeClass('unhappy');
                    return true;
                }
            };
            field.bind(config.when || 'blur', field.testValid);
        }

        for (item in config.fields) {
            processField(config.fields[item], item);
        }

        if (config.submitButton) {
            $(config.submitButton).click(handleSubmit);
        } else {
            this.bind('submit', handleSubmit);
        }
        return this;
    };
})(this.jQuery || this.Zepto);





function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}






function param(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}




// load Handlebars template remotely
function getFromRemote(path) {
    var returnvalue;
    $.ajax({
        url: path,
        cache: true,
        async:false,
        success: function(data) {
            returnvalue = data;
        },
        error: function(data) {
            //smoke.signal('Template not found error')
        }
    });
    return returnvalue;
}



// Some AJAX traffic indicators.
$(document).ajaxStart(function() {
    $('.loader').show();
});

$(document).ajaxStop(function() {
    // Seems that things are too fast for jquery to even
    // show the spinner, so - give it half a second.
    setTimeout(function() { $('.loader').fadeOut() }   ,500)
});




/* Setup validation */

function happyCreate() {
    var happy = {

        email: function (val) {
            return /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/.test(val);
        },
        minLength: function (val, length) {
            return val.length >= length;
        },
        equal: function (val1, val2) {
            return (val1 == val2);
        }
    };

    $('#loginform').isHappy({
        submitButton: "#submitlogin",
        fields: {
            // login
            '#login-gebruikersnaam': {
                required: true,
                message: 'Gebruikersnaam verplicht'
            },
            '#login-wachtwoord': {
                required: true,
                message: 'Wachtwoord verplicht'

            }
        }
    });

    $('#registratieform').isHappy({
        submitButton: "#submitregistratie",
        fields: {
            // registratie
            '#registratie-organisatie': {
                required: true,
                message: 'Organisatie verplicht'
            },
            '#registratie-voornaam': {
                required: true,
                message: 'Voornaam verplicht'
            },
            '#registratie-achternaam': {
                required: true,
                message: 'Achternaam verplicht'
            },
            '#registratie-emailadres': {
                required: true,
                test: happy.email,
                message: 'Voer een gelding email adres in.'
            },
            '#registratie-confirm': {
                required: true,
                message: 'Moet bevestigen'
            }
        }
    });
}

/* TABS --------------------------------- */

function tabsCreate() {
    var tabs = $('dl.tabs');
    tabsContent = $('ul.tabs-content')

    tabs.each(function (i) {
        //Get all tabs
        var tab = $(this).children('dd').children('a');
        tab.click(function (e) {

            //Get Location of tab's content
            var contentLocation = $(this).attr("href")
            contentLocation = contentLocation + "Tab";

            //Let go if not a hashed one
            if (contentLocation.charAt(0) == "#") {

                e.preventDefault();

                //Make Tab Active
                tab.removeClass('active');
                $(this).addClass('active');

                //Show Tab Content
                $(contentLocation).parent('.tabs-content').children('li').css({"display":"none"});
                $(contentLocation).css({"display":"block"});

            }
        });
    });
}


var dta;
function bindFields(el) {


    dta = {
        "fielddata": {
            "text1": "4B030C2E-3D53-4DF8-A3535EF377B45DE5",
            "text2": "Unlabeled",
            "bool1": true,
            "select1": "opt2",
            "radio" :true
        }
    }

    var $templateHTML   = $(el),
        $fieldArray     = $("[data-bind]:input",$templateHTML),
        fdata           = dta,
        $field          = "",
        item            = "",
        index           = "";

    // loop over the array of form fields
    $.each(
        $fieldArray,
        function( index ) {
            $field = $($fieldArray[index]);

            if( $field.attr('data-bind').length ) {
                var item = $field.attr('data-bind');

                var val = item,
                    acc = dta,
                    parts = val.split('.'),
                    i;

                for( i = 0; i < parts.length; i++ )
                    acc = acc[parts[i]];

                // if the field type is text/textfield, it is a straight value assignment
                log('--- ',acc)
                if ($field.attr('type') == 'text' || $field.is('textarea') ) {
                     $field.attr('value', acc)
                }

                // for checkboxes, we need to use :checked
                else if ($field.attr('type') == 'checkbox') {
                    // check the field if the data value is true/1
                    if( acc == 1) {
                        $field.attr("checked", "checked");
                    }

                    // for select statements, yet another assignment type
                } else if ($field.is("select")) {
                    $field.val( acc );
                }
                // Radiobuttons : TODO
            }
        }
    );
}


