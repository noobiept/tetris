/*global CANVAS*/

var Utilities;
(function(Utilities) {


/**
 * Keys code for the keyboard events.
 */
Utilities.EVENT_KEY = {

    backspace  : 8,
    tab        : 9,
    enter      : 13,
    esc        : 27,
    space      : 32,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,

    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,

    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,

    f1  : 112,
    f2  : 113,
    f3  : 114,
    f4  : 115,
    f5  : 116,
    f6  : 117,
    f7  : 118,
    f8  : 119,
    f9  : 120,
    f10 : 121,
    f11 : 122,
    f12 : 123
};


/**
 * Get a random integer between the minimum and maximum values provided (inclusive).
 */
Utilities.getRandomInt = function( min, max )
    {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };


/**
 * Centers an html element in the middle of the game canvas (assumes html element has its css position: absolute;
 */
Utilities.centerElement = function( element )
    {
    var canvasWidth = CANVAS.width;
    var canvasHeight = CANVAS.height;

        // the canvas may not be starting at 0,0 position, so we need to account for that
    var canvasPosition = $( CANVAS ).position();

    var left = canvasWidth / 2 - $( element ).width() / 2 + canvasPosition.left;

    var top = canvasHeight / 2 - $( element ).height() / 2 + canvasPosition.top;

    $( element ).css({
        top  : top  + 'px',
        left : left + 'px'
        });
    };


/**
 * Used for 'class' inheritance (search prototypal inheritance).
 */
function OBJECT( o )
    {
    function F(){}

    F.prototype = o;

    return new F();
    }


/**
 * Used for 'class' inheritance (search for parasitic combination inheritance).
 */
Utilities.INHERIT_PROTOTYPE = function( derivedClass, baseClass )
    {
    var prototype = OBJECT( baseClass.prototype );

    prototype.constructor = derivedClass;

    derivedClass.prototype = prototype;
    };


})(Utilities || (Utilities = {}));
