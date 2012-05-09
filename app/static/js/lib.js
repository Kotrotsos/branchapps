
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


// Backbone.ModelBinding v0.5.0
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT Liscene
//
// Documentation and Full Licence Availabe at:
// http://github.com/derickbailey/backbone.modelbinding
//
// ----------------------------
// Backbone.ModelBinding
// ----------------------------
(function(m){var p=function(j,l,r){var c={version:"0.5.0",bind:function(a,b){a.modelBinder=new m(a,b);a.modelBinder.bind()},unbind:function(a){a.modelBinder&&a.modelBinder.unbind()}},m=function(a,b){this.config=new c.Configuration(b);this.modelBindings=[];this.elementBindings=[];this.bind=function(){var q=c.Conventions,b;for(b in q)if(q.hasOwnProperty(b)){var f=q[b];f.handler.bind.call(this,f.selector,a,a.model,this.config)}};this.unbind=function(){l.each(this.elementBindings,function(b){b.element.unbind(b.eventName,
    b.callback)});l.each(this.modelBindings,function(b){b.model.unbind(b.eventName,b.callback)})};this.registerModelBinding=function(b,a,c){a="change:"+a;b.bind(a,c);this.modelBindings.push({model:b,eventName:a,callback:c})};this.registerDataBinding=function(b,a,c){b.bind(a,c);this.modelBindings.push({model:b,eventName:a,callback:c})};this.registerElementBinding=function(b,a){b.bind("change",a);this.elementBindings.push({element:b,eventName:"change",callback:a})}};c.Configuration=function(a){this.bindingAttrConfig=
{};l.extend(this.bindingAttrConfig,c.Configuration.bindindAttrConfig,a);if(this.bindingAttrConfig.all){a=this.bindingAttrConfig.all;delete this.bindingAttrConfig.all;for(var b in this.bindingAttrConfig)this.bindingAttrConfig.hasOwnProperty(b)&&(this.bindingAttrConfig[b]=a)}this.getBindingAttr=function(b){return this.bindingAttrConfig[b]};this.getBindingValue=function(b,a){var c=this.getBindingAttr(a);return b.attr(c)}};c.Configuration.bindindAttrConfig={text:"id",textarea:"id",password:"id",radio:"name",
    checkbox:"id",select:"id",number:"id",range:"id",tel:"id",search:"id",url:"id",email:"id"};c.Configuration.store=function(){c.Configuration.originalConfig=l.clone(c.Configuration.bindindAttrConfig)};c.Configuration.restore=function(){c.Configuration.bindindAttrConfig=c.Configuration.originalConfig};c.Configuration.configureBindingAttributes=function(a){a.all&&(this.configureAllBindingAttributes(a.all),delete a.all);l.extend(c.Configuration.bindindAttrConfig,a)};c.Configuration.configureAllBindingAttributes=
    function(a){var b=c.Configuration.bindindAttrConfig;b.text=a;b.textarea=a;b.password=a;b.radio=a;b.checkbox=a;b.select=a;b.number=a;b.range=a;b.tel=a;b.search=a;b.url=a;b.email=a};var k=function(){var a={},b=function(b){var a=b[0].tagName.toLowerCase();if("input"==a&&(a=b.attr("type"),void 0==a||""==a))a="text";return a};a.bind=function(a,c,f,n){var g=this;c.$(a).each(function(){var a=c.$(this),d=b(a),e=n.getBindingValue(a,d),o=function(a,b){var d={};d[a]=b;f.set(d)};g.registerModelBinding(f,e,function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                d){a.val(d)});g.registerElementBinding(a,function(b){o(e,c.$(b.target).val())});d=f.get(e);"undefined"!==typeof d&&null!==d?a.val(d):(d=a.val())&&o(e,d)})};return a}(j),p=function(){return{bind:function(a,b,c,i){var f=this;b.$(a).each(function(){var a=b.$(this),g=i.getBindingValue(a,"select"),h=function(a,b,d){var e={};e[a]=b;e[a+"_text"]=d;c.set(e)};f.registerModelBinding(c,g,function(b,d){a.val(d)});f.registerElementBinding(a,function(a){var d=b.$(a.target),a=d.val(),d=d.find(":selected").text();
    h(g,a,d)});var d=c.get(g);"undefined"!==typeof d&&null!==d&&a.val(d);if(a.val()!=d){var d=a.val(),e=a.find(":selected").text();h(g,d,e)}})}}}(j),s=function(){return{bind:function(a,b,c,i){var f=this,n=[];b.$(a).each(function(){var a=b.$(this),h=i.getBindingValue(a,"radio");if(!n[h]){n[h]=!0;var d=i.getBindingAttr("radio");f.registerModelBinding(c,h,function(a,c){b.$("input[type=radio]["+d+"='"+h+"'][value='"+c+"']").attr("checked","checked")});var e=function(a,b){var d={};d[a]=b;c.set(d)},o=function(a){a=
    b.$(a.currentTarget);a.is(":checked")&&e(h,a.val())};b.$("input[type=radio]["+d+"='"+h+"']").each(function(){var a=r(this);f.registerElementBinding(a,o)});a=c.get(h);"undefined"!==typeof a&&null!==a?b.$("input[type=radio]["+d+"='"+h+"'][value='"+a+"']").attr("checked","checked"):(a=b.$("input[type=radio]["+d+"='"+h+"']:checked").val(),e(h,a))}})}}}(j),t=function(){return{bind:function(a,b,c,i){var f=this;b.$(a).each(function(){var a=b.$(this);i.getBindingAttr("checkbox");var g=i.getBindingValue(a,
    "checkbox"),h=function(a,b){var d={};d[a]=b;c.set(d)};f.registerModelBinding(c,g,function(b,d){d?a.attr("checked","checked"):a.removeAttr("checked")});f.registerElementBinding(a,function(a){a=b.$(a.target).is(":checked")?!0:!1;h(g,a)});if(c.attributes.hasOwnProperty(g)){var d=c.get(g);"undefined"!==typeof d&&null!==d&&!1!=d?a.attr("checked","checked"):a.removeAttr("checked")}else d=a.is(":checked")?!0:!1,h(g,d)})}}}(j),j=function(a,b,j){var i={"default":""};c.Configuration.dataBindSubst=function(a){this.storeDataBindSubstConfig();
    b.extend(i,a)};c.Configuration.storeDataBindSubstConfig=function(){c.Configuration._dataBindSubstConfig=b.clone(i)};c.Configuration.restoreDataBindSubstConfig=function(){c.Configuration._dataBindSubstConfig&&(i=c.Configuration._dataBindSubstConfig,delete c.Configuration._dataBindSubstConfig)};c.Configuration.getDataBindSubst=function(a,b){var c=b;void 0===b&&(c=i.hasOwnProperty(a)?i[a]:i["default"]);return c};var f=function(a,b,e){e=c.Configuration.getDataBindSubst(b,e);switch(b){case "html":a.html(e);
    break;case "text":a.text(e);break;case "enabled":a.attr("disabled",!e);break;case "displayed":a[e?"show":"hide"]();break;case "hidden":a[e?"hide":"show"]();break;default:a.attr(b,e)}},k=function(a){var d=[],e=c.Conventions.databind.selector.replace(/^(.*\[)([^\]]*)(].*)/g,"$2"),a=a.attr(e).split(";");b.each(a,function(a){a=j.trim(a).split(" ");1==a.length&&a.unshift("text");d.push({elementAttr:a[0],modelAttr:a[1]})});return d},g=function(a,b){var c={},g=b.modelAttr;0==g.indexOf("event:")?(c.name=
    g.substr(6),c.callback=function(c){f(a,b.elementAttr,c)}):(c.name="change:"+g,c.callback=function(c,e){f(a,b.elementAttr,e)});return c};return{bind:function(a,c,e){var i=this;c.$(a).each(function(){var a=c.$(this),h=k(a);b.each(h,function(b){var c=g(a,b);i.registerDataBinding(e,c.name,c.callback);f(a,b.elementAttr,e.get(b.modelAttr))})})}}}(j,l,r);c.Conventions={text:{selector:"input:text",handler:k},textarea:{selector:"textarea",handler:k},password:{selector:"input:password",handler:k},radio:{selector:"input:radio",
    handler:s},checkbox:{selector:"input:checkbox",handler:t},select:{selector:"select",handler:p},databind:{selector:"*[data-bind]",handler:j},number:{selector:"input[type=number]",handler:k},range:{selector:"input[type=range]",handler:k},tel:{selector:"input[type=tel]",handler:k},search:{selector:"input[type=search]",handler:k},url:{selector:"input[type=url]",handler:k},email:{selector:"input[type=email]",handler:k}};return c};"function"===typeof define&&define.amd?define(["backbone","underscore","jquery"],
    function(j,l,m){return p(j,l,m)}):(m.Backbone=Backbone||{},m.Backbone.ModelBinding=p(Backbone,_,jQuery))})(this);


// Easy handlbars template loader
function template(name) {
    return Handlebars.compile(getFromRemote('templates/' + name + '.html'));
}

function log(msg) {
    if (window.console) console.log(msg);
}