$(document).ready(function () {
    
    // $('#layout-nav').load('layout-nav.html');
    $.get('layout-nav.html', function (data) {
        console.log(data);
        $('#layout-nav').html(data);
    });
    $.get('layout-sidenav.html', function (data) {
        $('#layout-sidenav').html(data);
    });
    // $('#layout-sidenav').load('layout-sidenav.html');
});