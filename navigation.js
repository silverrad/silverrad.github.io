$(document).ready(function () {
    $('#navigation').hide();
});


//display navigation
$('#main').off().on("click", function () {
    $('#navigation').toggle();
});

// Toggle header on selection
$('#header').off().on("click", function () {
    $('#header').toggle();
});


$('html').click(function (e) {
    // Toggle header on controlled Click
    if (e.pageY < 20) {
        $('#header').toggle();
     //   $('#header').addClass("slideDown");
    }
});