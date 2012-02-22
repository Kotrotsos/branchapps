

var listobj =
    { "items": [
    { id:123, sortnr: 1, type: "headpart", text: "Dit is een kopje" },
    { id:432, sortnr: 2, type: "textpart", text: "At this point, I want to call out Mat Marquis aka @wilto, in particular, for really taking early ownership of this project and spearheading the design and frontend development." },
    { id:223, sortnr: 3, type: "todopart", text: "Dit is een normale checkbox item" },
    { id:555, sortnr: 4, type: "listpart", text: "Dit is een multipart met parts |  Marco | Groen" }
    ]};

var settings = {
    domain: "",
    os: ""
};

var auth = {
    id: undefined,
    name: undefined,
    email: undefined
};

// Lookup dicts

var lookup = {
    month: {
        0: "Januari",
        1: "Februari",
        2: "Maart",
        3: "April",
        4: "Mei",
        5: "Juni",
        6: "Juli",
        7: "Augustus",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "December"
    },
    count: {

        1: "twelve",
        2: "six",
        3: "four",
        4: "three",
        5: "two"

    }
};

var ASYNC = false,
    CACHE = false,
    user = {
    _get:(function (url) {
        var obj;
        $.ajax({
            url:settings.domain + url,
            cache:CACHE,
            async:ASYNC,
            dataType:"json",
            success:function (html) {
                obj = html;
            },
            error:function (html) {
                obj = html.status
            }
        });
        return obj;
    }),
    _post:(function (url, payload) {
        var status = ""
        $.ajax({
            type:'POST',
            cache:CACHE,
            async:ASYNC,
            url:url,
            data:payload,
            error:(function (e) {
                status = e
            }),
            dataType:"application/json",
            contentType:"application/json"
        });
        return status
    }),
    _put:(function (url, payload) {
        var status = "";
        $.ajax({
            type:'PUT',
            cache:CACHE,
            async:ASYNC,
            url:url,
            data:payload,
            error:(function (e) {
                status = e.status
            }),
            dataType:"application/json",
            contentType:"application/json"

        });
        return status
    }),

    info:(function () {
        var res = this._get(settings.domain + "/api/v2/user/self");
        return res;
    })
};















