

/*
* NOTES: Class User and it's instance are always created at application start.
*
 */


var User = Backbone.Model.extend({
    initialize: function() {
        Views.setupAccountBar();
    },
    isSignedIn : function() {
        // Check if signed in on the server/session
        return true;
    },
    signIn : function() {

    },
    signOut : function() {

    }
});

var Contact = Backbone.Model.extend({
    initialize : function() {

    }
})


var Process = Backbone.Model.extend({

})

var session = {
    loggedin: true,
    user_id: 1
}

var settings = {
    domain: "",
    os: ""
};

/*
var User = Backbone.Model.extend({

    init: function() {
        alert('sup')
    },
    isSignedIn : function() {
        return !this.isNew();
    },

    signIn: function(email, password, onFail, onSucceed) {
        $.ajax({
            url       : '/sign-in',
            method    : 'POST',
            dataType  : 'json',
            data      : { email : email, password : password },
            error     : onFail,
            success   : onSucceed,
            context   : this
        });
        return this;
    },

    signOut : function() {
        $.ajax({
            url       : '/sign-out',
            method    : 'POST'
        }).done(function() {
                this.clear();
                this.trigger('signed-out');
            });
    }

});

*/

/*
 * Mocked functions...
 *
 */

var HTTP = {

    // So these functions will serve as stubs at the moment.
    get: function(payload) {

    },
    post: function(payload) {

    },
    put: function(payload) {

    },
    delete: function(payload) {

    }
}


var User_ = {
    list: function() {
        alert('hi')
    },
    show: function(id) {

    },
    login: function() {

    },
    logout: function() {

    }
}


var Contact = {

    list: function() {
        return contactsdata.contacts;
    },
    show: function() {

    },
    search: function() {

    }
};



var Group = {
    list: function() {
        alert('hi')
    },
    show: function() {

    },
    search: function() {

    }
}

var BAPP = {
    synch: function() {

    }
}



