/* Author: 

*/
$(function () {
    notify('Loaded');
    removeFlash();
})

$('.account .settings').click(function () {
    $('.profilepopup').show();
});
$('.account .settings').blur(function () {
    $('.profilepopup').hide();
});

$('.closeprofile').click(function () {
    $('.profilepopup').hide();
});

var notify = function (text) {

        $('.notice').html(text);
        $('.notice').show();
        setTimeout("hideNotice()", 1000);
    };

function hideNotice() {
    $('.notice').fadeOut();

}

function removeFlash() {
    setTimeout(function () {
        $('.flashes').fadeOut()
    }, 5000);


};