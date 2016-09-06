$(document).ready(function () {
    /* ('#navigation').hide(); */
    //book.init();
    var json;
    var siteUrl = "/Books/TestBook.json";
    // Set for dropbox hosting
    if (window.location.hostname == "dl.dropboxusercontent.com") {
        siteUrl = "/u/60899314/SilentTsunami" + siteUrl;
    }
    
    var handler = $.ajax({
        type: 'GET',
        dataType: 'json',
        url: siteUrl,
        cache: false,
        success: function (data) {
            console.log(data.book.toString());
            book.initFrom(data.book);
        },
    });

    handler.always(function () {
        console.log("always caught");
    });

    timeoutHeaderExitId = setTimeout(function () { $('#header').slideUp('slow'); }, 3000);
    timeoutFooterExitId = setTimeout(function () { $('#footer').slideUp('slow'); }, 3000);

    //Trigger Everything That Effects Post-Load Operations
    refreshEventHandlers();

  //  setTimeout("$('#header').slideToggle('slow');", 2500);
  //  setTimeout("$('#footer').slideToggle('slow');", 2500);
    /* setTimeout("$('#navigation').toggle('slide');", 5000); */
});


//display navigation
/*
$('#main').off().on("click", function () {
    $('#navigation').toggle("slide");
});
*/

// Toggle header on selection
/*
$('#header').off().on("click", function () {
    $('#header').toggle();
});
*/


$('html').click(function (e) {
    // Toggle header on controlled Click
    if (e.pageY < 20) {
        $('#header').toggle();
        //   $('#header').addClass("slideDown");
    }

  /*  if (e.pageY > 100) {
        $('fadeMe').show();
        // '<div class="fadeMe"></div>';
    }
    else {
        $('fadeMe').hide();
    } */
});

$('#content').mousemove(function (e) {
   //    drawSelectorWheel(e, 4);

   // $('#clive').toggleClass("overlay");

    // This is the one that works
    // $('#clive').addClass("fadeMe");
})

var timeout;
var timeoutId;
$('html').mousemove(function (e) {
    // Were are mousing over the exits
    if (e.pageY < 20) {
        // setTimeout("$('#header').slideToggle('slow');", 4000);
        // setTimeout("$('#footer').slideToggle('slow');", 4000);

        timeoutId = window.setTimeout(function () {
            timeoutId = null;
            $("#header").slideDown('slow');
            $("#footer").slideDown('slow');
        }, 500);

    }
    else {
        clearTimeout(timeoutId);
    }

    // Adding removing chevrons
    if (e.pageY > 100) {
     //   clearTimeout(timeoutId);
        //  $("#header").slideUp('slow');

        /*
        if (e.pageX < 40) {
            $('.fa-chevron-right').fadeOut();
            $('.fa-chevron-left').fadeIn();
        }
        else if (e.pageX > screen.width - 40) {
            $('.fa-chevron-left').fadeOut();
            $('.fa-chevron-right').fadeIn();
        }
        else {
            $('.fa-chevron-left').fadeOut(1000);
            $('.fa-chevron-right').fadeOut(1000);
        }
        */
    }
});


/* This section controls exits and enters of the header. 
If mouseleaves, the div slides off (unless you re-enter in less than 1.5 seconds). */
var timeoutHeaderExitId;
var timeoutFooterExitId;
$('#header').mouseleave(function () {
    timeoutHeaderExitId = setTimeout(function () { $('#header').slideUp('slow'); }, 1500);
    timeoutFooterExitId = setTimeout(function () { $('#footer').slideUp('slow'); }, 1500);
});

$('#header').mouseenter(function () {
    clearTimeout(timeoutHeaderExitId);
    clearTimeout(timeoutFooterExitId);
});

$('#footer').mouseenter(function () {
    clearTimeout(timeoutHeaderExitId);
    clearTimeout(timeoutFooterExitId);
});


$('#footer').mouseleave(function () {
    timeoutHeaderExitId = setTimeout(function () { $('#header').slideUp('slow'); }, 1500);
    timeoutFooterExitId = setTimeout(function () { $('#footer').slideUp('slow'); }, 1500);
});

$('#navigationIcons').mouseenter(function () {
    $('.navigationTest').show('slide');
    if ($(this).siblings().hasClass("hidden")) {
        $(this).siblings().removeClass("hidden");
    }
    else {
      //  $('.navigationTest').toggle('slide');
    }

    // call all functions not involving navigation.
    $('#cliveTips').hide();
});

/* This section controls exits and enters of navigation. 
If mouseleaves, the div slides off (unless you re-enter in less than 1.5 seconds). */
var timeoutNavigationExitId;
var timeoutGamePlayOn;
$('#navigation').mouseleave(function () {
    if ($('.navigationTest').is(':visible')) {
        timeoutNavigationExitId = setTimeout(function () { $('.navigationTest').toggle('slide'); }, 2000);
        timeoutGamePlayOn = setTimeout(function () { $('#cliveTips').show(); }, 2000);
    }
});

$('#navigation').mouseenter(function () {
    clearTimeout(timeoutNavigationExitId);
    clearTimeout(timeoutGamePlayOn);
    /* setTimeout( function () { $('.navigationTest').toggle('slide'); }, 5000); */
});

/* This navigation controls the side navigation bar animation*/
$('.navigationTest').click(function () {
    var leftMargin = ($('#navigation').css('margin-left') === '0px') ? '-380px' : '0px';
    $(this).parent().animate({ 'margin-left': leftMargin }, 500);
    /* document.getElementById("navigation").style.marginLeft = leftMargin; */
});

$('#main').mousemove(function (e) {
   // $('#content').removeClass("fadeMe");
});

$('.fa-chevron-left').click(function(){
    book.backward();
});

$('.fa-chevron-right').click(function(){
    book.forward();
});

function leftArrowPressed() {
    book.backward();
    $("#header").slideDown('slow');
    $("#footer").slideDown('slow');

    clearTimeout(timeoutHeaderExitId);
    clearTimeout(timeoutFooterExitId);

    timeoutHeaderExitId = setTimeout(function () { $('#header').slideUp('slow'); }, 1500);
    timeoutFooterExitId = setTimeout(function () { $('#footer').slideUp('slow'); }, 1500);
}

function rightArrowPressed() {
    book.forward();
    $("#header").slideDown('slow');
    $("#footer").slideDown('slow');

    clearTimeout(timeoutHeaderExitId);
    clearTimeout(timeoutFooterExitId);

    timeoutHeaderExitId = setTimeout(function () { $('#header').slideUp('slow'); }, 1500);
    timeoutFooterExitId = setTimeout(function () { $('#footer').slideUp('slow'); }, 1500);
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};

$('.fa-book').click(function () {
    // Set the side-tile content + reader
    var currentPage = book.getCurrentPage();
    $('#navContent')[0].innerHTML = '<div class="navigationTest"><h1>' + currentPage.chapterNumber.toString() + '</h1><hr width="90%"><h2>' + currentPage.chapterName.toString() + '</h2><p>' + currentPage.content.toString() + '</p></div>';

    // set Selection
    $('.fa-book').siblings().removeClass("opacity");
    $('.fa-book').addClass("opacity");
});

$('.fa-pencil').click(function () {
    var currentPage = book.getCurrentPage();
    var notes = "";
    for (i = 0; i < currentPage.Notes.length; i++) {
        notes += '<div class="navigationTest" style="height: auto;"><h2>' + i.toString() + '. ' + currentPage.Notes[i].title.toString() + '<i class="fa fa-edit fa-1x black right"></i></h2><hr width="90%"><p>' + currentPage.Notes[i].content.toString() + '</p></div>';
    }

    var addNoteDiv = '<div class="navigationTest" style="height: auto;"><h2><input type="text" name="addNoteTitle" placeholder="' + i.toString() + '. New note..." /></h2><hr /><p><input type="text" name="addNote" placeholder="..." /></p></div>';
    $('#navContent')[0].innerHTML = '<div class="navigationTest" style="height: auto;"><h1>Notebook</h1><br /></div>' + notes + addNoteDiv;

    // Set Selection
    $('.fa-pencil').siblings().removeClass("opacity");
    $('.fa-pencil').addClass("opacity");
});

$('.fa-trophy').click(function () {
    var goals = "";
    for (i = 0; i < book.goals.length; i++) {
        goals += '<div class="navigationTest" style="height: auto;"><h2>' + book.goals[i].title.toString() + ' <i class="fa fa-square-o fa-1x black right"></i></h2><hr width="90%"><p>' + book.goals[i].description.toString() + '</p></div>';
    }

    $('#navContent')[0].innerHTML = '<div class="navigationTest" style="height: auto;"><h1>Objectives</h1><br /></div>' + goals;

    // Set Selection
    $('.fa-trophy').siblings().removeClass("opacity");
    $('.fa-trophy').addClass("opacity");
});

$('.fa-cog').click(function () {
    $('#navContent')[0].innerHTML = '<div class="navigationTest"><h1>Settings</h1><hr width="90%">' + '<h2>General</h2><p>Tips Enabled<input type="checkbox" id="myToggleButton" class="right" /></p><p>Tutorials Enabled<input type="checkbox" id="myToggleButton" class="right" /></p><h2>Options</h2><p>Wifi Enabled<input type="checkbox" id="myToggleButton" class="right" /></p><p>Mute Audio<input type="checkbox" class="right" /></p></div>';
    // font selector, magnifying glass, and brightness. 

    // Set Selection
    $('.fa-cog').siblings().removeClass("opacity");
    $('.fa-cog').addClass("opacity");
});

function refreshEventHandlers() {

    // Assuming all circles are nav
    $('.fa-circle').click(function () {
        console.log(this);
        var k = $(this).attr('title');
        book.navigateTo(k);
    });

    $('.infoBox').click(function (e) {
        if ($(this).hasClass("hidden")) {
            $(this).siblings().removeClass("hidden");
        }
        $(this).siblings().toggle("slide");
        $(this).show();
    });

    $('.navigationTest').mouseenter(function () {
        //Test was hit
        $(this).siblings.style.opacity = .8;
    });
}

function registerVideoHandlers() {
    // Refresh video end handler
    var video = document.getElementsByTagName('video')[0];
    video.onended = function (e) {
        //tell book, the page is ready.
        book.getCurrentPage().completed() = true;
    };
}

//Motion around Area Selector
function drawSelectorWheel(location, pages) {
    var sections = pages / 2;
    var canvas = document.getElementById('selectorWheel');
 //   var context = canvas.getContext('2d');
  
    
    var x = screen.width/2;
    var y = screen.height/2;
    if (location.pageY < y) {
        if (location.pageX < x) {
            value = .5;
            canvas.src = "Images/selectorA.png";
        }
        else {
            value = 1;
            canvas.src = "Images/selectorB.png";
            $('#clive').addClass("scale");
        }
    }
    else {
        if (location.pageX > x) {
            value = 1.5;
            canvas.src = "Images/selectorC.png";
        }
        else {
            value = 2;
            canvas.src = "Images/selectorD.png";
        }
    }

    var crew = document.getElementById('test');
    crew.innerText = value;  
}

function distance(x, y, x0, y0){
        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

$(function () {
    $("#selectorWheel").kenburnsy({
        fullscreen: false, // fullscreen mode
        duration: 9000,
        fadeInDuration: 1500
    });
});

/* --------------------- AUDIO CLIPS  ----------------------------- */
function playSound(soundfile) {
    document.getElementById("soundPlayer").innerHTML =
    "<embed src=\"" + soundfile + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}

/* ---------------------------------------------- State Management --------------------------------------------------  */

// This controls the generic flow of pages and maintains state.

var book = (function (o) {
    // Event Enums
    var Events = {

    };

    // Private Variables
    var pageCount = 3; //defaults
    var goalCount = 3;
    var pages = []; //pageCount

    // Public Variables
    var currentPageIndex = 0;
    var currentPageObject;
    var completedGoals = 0;

    // From Json

    function initialize() {
        // Populate pages of the book
        pages.push('<video class="fullScreenVideo" src="Videos/TempHDVideo.mp4" autoplay></video>');
        pages.push('<div class="' + 'imageBackground' + '"></div>');
        pages.push('<video class="fullScreenVideo" src="Videos/TempHD2Video.mp4" autoplay></video>');

        //Fill pagination
        for (i = 0; i < pageCount; i++) {
            $('#pagination').append('<i class="fa fa-circle fa-1x" title="' + i + '"></i>');
        }

        // Set Initial Selection
        $('#pagination').children().eq(0).addClass("opacity");
    }

    function initFromDatabase(data){
        pageCount = data.pageCount;
        goalCount = data.goalCount;

        // Set goals accordingly
        this.goals = data.Goals;

        // Set Book Title and Author
        $('.headerSection').find('h1')[0].innerText = data.title;
        $('.headerSection').find('p')[0].innerText = data.author;

        for (i = 0; i < data.Pages.length; i++) {
            var page = new BookPage(data.Pages[i]);
            pages.push(page);
        }

        //Fill pagination
        for (i = 0; i < pageCount; i++) {
            $('#pagination').append('<i class="fa fa-circle fa-1x" title="' + i + '"></i>');
        }

        // Set Initial Selection
        $('#pagination').children().eq(0).addClass("opacity");

        //Set initial reader and content
        book.navigateTo(0);
    }

    function addPage(page) {
        pages.push(page);
        pageCount++;
        var t =  pageCount - 1;
        // Add to paginator
        $('#pagination').append('<i class="fa fa-circle fa-1x" title="' + t + '"></i>');
        refreshEventHandlers();
    }

    function getPageContent(pageNumber) {
        if (pages.length > pageNumber) {
            console.log(pages[pageNumber]);
            return pages[pageNumber];
        }
    }

    function navigateToPage(pageIndex) {
        //update page icon
        $('#pagination').children().eq(currentPageIndex).removeClass("opacity");

        // Set Current Page
        currentPageIndex = pageIndex;
        $('#pagination').children().eq(currentPageIndex).addClass("opacity");

        currentPageObject = pages[currentPageIndex];
        console.log("The page has changed to" + currentPageIndex);
        clive.innerHTML = pages[currentPageIndex].render();
        refreshEventHandlers();
    }

    function getCurrentPage() {
        return pages[currentPageIndex];
    }

    function increaseCurrentPage() {
        if (currentPageIndex === pageCount - 1) {
            // Some animated page behavior indicating end of book
        }
        else {
            // Increment and fire some page turning trigger
            currentPageIndex++;

            //update page icon
            $('#pagination').children().eq(currentPageIndex-1).removeClass("opacity");
            $('#pagination').children().eq(currentPageIndex).addClass("opacity");

            currentPageObject = pages[currentPageIndex];
            console.log("The page has incremented " + currentPageIndex);
            clive.innerHTML = pages[currentPageIndex].render();

            // Update DOM with Appropriate Page From Array
            refreshEventHandlers();
        }
    }

    function decreaseCurrentPage() {
        if (currentPageIndex === 0) {
            // Some animated page behavior indicating beginning of book
        }
        else {
            // Increment and fire some page turning trigger
            currentPageIndex--;

            //Update the page indicator
            $('#pagination').children().eq(currentPageIndex+1).removeClass("opacity");
            $('#pagination').children().eq(currentPageIndex).addClass("opacity");

            currentPageObject = pages[currentPageIndex];
            console.log("The page has decremented " + currentPageIndex);
            clive.innerHTML = pages[currentPageIndex].render();
            // Update DOM with Appropriate Page From Array
            refreshEventHandlers();
        }
    }

    return {
        forward: increaseCurrentPage,
        backward: decreaseCurrentPage,
        init: initialize,
        initFrom: initFromDatabase,
        add: addPage,
        getCurrentPage: getCurrentPage,
        getPage: function (pageIndex) {
            getPageContent(pageIndex);
        },
        navigateTo: function (pageIndex) {
            navigateToPage(pageIndex);
        }
    };

})();


/* Because Page is an object, we can display it as a prototype */
function BookPage (data) {
    this.type = data.type;
    this.id = data.id; // all parameter must be initialized with values.
    this.src = data.src,
    this.completed = false;

    // Set additional text information
    this.content = data.content;
    this.chapterName = data.chapterName;
    this.chapterNumber = data.chapterNumber;

    // Set Notes and Tips
    this.Notes = data.Notes;
    this.Tips = data.Tips;

    this.getInfo = function() {
        return this.type + ' ' + this.src + ' page';
    };
}

BookPage.prototype = {
    start: function () {
        console.log("Book was started");
    },
    pause: function () {
        console.log("Book was paused");
    },
    completed: function () {
        console.log("the activity is complete, we are free to advanced to next page");
        this.completed = true;
        // when completed the first time, we flash the arrow...
    },
    inprogress: function () {
        console.log("the activity is currently in progress, we should not advance");
        this.completed = false;
    },
    render: function () {
        var html;
        if (this.type == "VideoPage") {
            html = '<video class="fullScreenVideo" src="' + this.src +'" autoplay controls></video>';
            console.log("pushed video");
            // registerVideoHandlers();
        }
        else {
            html = '<div class="' + 'imageBackground' + '"></div>';
            console.log("pushed html");
        }

        // Set the side-tile content + reader
        $('.navigationTest')[0].innerHTML = '<h1>' + this.chapterNumber.toString() + '</h1><hr /><h2>' + this.chapterName.toString() + '</h2><p>' + this.content.toString() + '</p>';

        // Set Page Tips
        var tipDescriptions = "";
        for(i = 0; i < this.Tips.length; i++){
            tipDescriptions += '<div class="tips"><div class="infoBox"><h2>' + this.Tips[i].id.toString() + '</h2></div><div class="infoText hidden"><p>' + this.Tips[i].description.toString() + '</p></div></div>';
        }
        $('#cliveTips')[0].innerHTML = tipDescriptions;

        return html;
    }
};


// This prototype represents a child of BookPage
ImagePage.prototype = new BookPage();        // Here's where the inheritance occurs 
ImagePage.prototype.constructor = ImagePage;       // Otherwise instances of Cat would have a constructor of Mammal 
function ImagePage(type) {
    this.type = type;
}
ImagePage.prototype.render = function () {
    var html = '<div class="' + 'imageBackground' + '"></div>';
    console.log("pushed html");
    return html;
}


 
function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype = {
    addVertex: function(v){
        this.vertices.push(v);
    }
};

function Mammal(name) {
    this.name = name;
    this.offspring = [];
}
Mammal.prototype.haveABaby = function () {
    var newBaby = new Mammal("Baby " + this.name);
    this.offspring.push(newBaby);
    return newBaby;
}
Mammal.prototype.toString = function () {
    return '[Mammal "' + this.name + '"]';
}


Cat.prototype = new Mammal();        // Here's where the inheritance occurs 
Cat.prototype.constructor = Cat;       // Otherwise instances of Cat would have a constructor of Mammal 
function Cat(name) {
    this.name = name;
}
Cat.prototype.toString = function () {
    return '[Cat "' + this.name + '"]';
}


var someAnimal = new Mammal('Mr. Biggles');
var myPet = new Cat('Felix');
alert('someAnimal is ' + someAnimal);   // results in 'someAnimal is [Mammal "Mr. Biggles"]' 
alert('myPet is ' + myPet);             // results in 'myPet is [Cat "Felix"]' 

myPet.haveABaby();                    // calls a method inherited from Mammal 
alert(myPet.offspring.length);        // shows that the cat has one baby now 
alert(myPet.offspring[0]);

/* var bookManager = (function () {
    var my = {},
		privateVariable = 1;
        currentPage = 0;
        completedGoals = 0;
        pageCount = 3;
        goalCount = 1;

    function privateMethod() {
        // ...
    }

    my.moduleProperty = 1;
    my.moduleMethod = function () {
        // ...
    };

    return my;
}());
*/