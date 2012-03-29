
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
                "!/cs":"cs",
                "!/error":"error"
                //"search/:query":"search", // #search/kiwis
                //"search/:query/p:page":"search"   // #search/kiwis/p7
            },
            initialize:function() {

            },
            root:function() {

            },

            cs: function() {
                Views.render_main_cs_view();
            },

            error:function() {
                var template = Handlebars.compile(getFromRemote('templates/error.html'));
                $('#main').html(template({}));

            }

        });

        var app = new RoutedApp;
        Backbone.history.start();
    },



    setEvents: function(context){

    }


}; //end

var Views = {
    init: function() {


    },
    render_main_cs_view: function() {

        var template = Handlebars.compile(getFromRemote('templates/error.html'));
        $('#main').html(template({}));
        Views.render_message('suuup');
    },

    render_message: function(msg) {
        var template = Handlebars.compile(getFromRemote('templates/msg.html'));
        $('#c').html(template({"message":"suup","title":"Branchapps say's"}));
        $('#messageModal').modal()

    }
}




$(document).ready(function() {

    /* Global decl. */
    Ba.init();

});

