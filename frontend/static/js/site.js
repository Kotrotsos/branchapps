
var main  = $('#main-template-contents');
var sidebar  = $('#sidebar-template-contents');

var Ba = {
    init: function() {
        this.setupRoutes();
        this.setupEvents();
    },

    setupEvents: function () {

    },

    setupRoutes: function() {
        var RoutedApp;

        RoutedApp = Backbone.Router.extend({

            routes:{
                "":"root",
                "!":"root",
                "!/oplossingen":"oplossingen",
                "!/support":"support",
                "!/sharedcontacts":"sharedcontacts",
                "!/crm":"crm",
                "!/hrm":"hrm",
                "!/projects":"projects",
                "!/error":"error"
                //"search/:query":"search", // #search/kiwis
                //"search/:query/p:page":"search"   // #search/kiwis/p7
            },
            initialize:function() {
                if(typeof _gaq !== 'undefined'){
                    this.bind('route', function(){
                        // transform AJAX URLs into "like real" ones
                        var url = document.location.href.replace(/\/?#!/, '/');
                        _gaq.push(['_trackPageview', url]);
                    });
                }
            },
            root:function() {
                Views.render_home();
            },
            oplossingen:function() {
                Views.render_oplossingen();
            },

            sharedcontacts:function() {
                Views.render_sharedcontacts();
            },
            crm:function() {
                Views.render_crm();
            },
            hrm:function() {
                Views.render_hrm();
            },
            projects:function() {
                Views.render_projects();
            },

            support:function() {
                Views.render_support();
            },
            error:function() {
                var template = Handlebars.compile(getFromRemote('templates/error.html'));
                $('#main').html(template({}));
            }

        });

        var app = new RoutedApp;
        Backbone.history.start();
    }
}; //end

var Views = {

    init: function() {
        $('.template_area').html('')
    },
    render_message: function(msg) {
        var template = Handlebars.compile(getFromRemote('templates/msg.html'));
        $('#c').html(template({"message":"suup","title":"Branchapps say's"}));
        $('#messageModal').modal()

    },
    render_home: function() {
        var blocks = Handlebars.compile(getFromRemote('templates/fourblocks.html')),
            promo = Handlebars.compile(getFromRemote('templates/promospace.html')),
            hero = Handlebars.compile(getFromRemote('templates/hero.html'));

        $('#fourblocks').html(blocks({}));
        $('#promospace').html(promo({}));
        $('#primary').html(hero({}));
    },

    render_oplossingen: function() {
        this.init();

        var oplossingen = Handlebars.compile(getFromRemote('templates/oplossingen.html')),
            blocks = Handlebars.compile(getFromRemote('templates/fourblocks.html'));
        $('#primary').html(oplossingen({}));
        $('#fourblocks').html(blocks({}));
    },

    render_sharedcontacts: function() {
        this.init();
        var sharedcontacts = Handlebars.compile(getFromRemote('templates/sharedcontacts.html'))
        $('#primary').html(sharedcontacts({}));

    },
    render_crm: function() {
        this.init();
        var crm = Handlebars.compile(getFromRemote('templates/crm.html'))
        $('#primary').html(crm({}));
    },
    render_hrm: function() {
        this.init();
        var hrm = Handlebars.compile(getFromRemote('templates/hrm.html'))
        $('#primary').html(hrm({}));
    },
    render_projects: function() {
        this.init();
        var projects = Handlebars.compile(getFromRemote('templates/projects.html'))
        $('#primary').html(projects({}));
    },




    render_support: function() {
        this.init();
        var support = Handlebars.compile(getFromRemote('templates/support.html'));
        $('#primary').html(support({}));

    }
}


var Site = {
    init: function() {
        log('sup')
    }
}


$(document).ready(function() {

    /* Global decl. */


    Ba.init();

});

