
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
                "!/error":"error"
                //"search/:query":"search", // #search/kiwis
                //"search/:query/p:page":"search"   // #search/kiwis/p7
            },
            initialize:function() {

            },
            root:function() {
                Views.render_home();
            },
            oplossingen:function() {
                Views.render_oplossingen();
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

