



var main  = $('#main-template-contents');
var sidebar  = $('#sidebar-template-contents');

var app; // The Backbone application object





var BA = {
    init: function() {
        this.setupRoutes();
        this.setupEvents();


        app.user = new User;
        log("signed in? ", app.user.isSignedIn());

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
                '*path':  'defaultRoute'
                //"search/:query":"search", // #search/kiwis
                //"search/:query/p:page":"search"   // #search/kiwis/p7
            },
            initialize:function() {

            },
            defaultRoute: function(path) {
                Views.popupMessage("Branchapps say's","Route not found error.");
            },
            root:function() {
                Views.notify("I say:","Will put some more general info here","alert")

            },

            cs: function() {
                Views.render_main_cs_view();
                Views.notify('title','suuuuuujaaa',"block")

            }

        });

        app = new RoutedApp;
        Backbone.history.start();

    }


}; //end

var Views = {
    init: function() {
        setupAccountBar();
    },

    // Messages

    notify: function(title,msg,type) {
        _template = template("notify");
        $('.error-area').html(_template({"title":title,"message":msg,"type":type}));
    },

    popupMessage: function(title,msg) {
        _template = template("msg");
        $('#c').html(_template({"message":msg,"title":title}));
        $('#messageModal').modal()

    },

    setupAccountBar: function() {
        _template = template("accountbar");
        $('ol.account').html(_template({"username":"Marco","loggedin":session.loggedin}));
    },

    // Primary views

    render_main_cs_view: function() {
       // Views.popupMessage("Foo Fy Fo Fom");
    }
}





$(document).ready(function() {

    /* Global decl. */
    BA.init();

});

