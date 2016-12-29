
//constants
const READ_EMAIL_CLASSMAME = "yO";
const UNREAD_EMAIL_CLASSMAME = "zE";

//default colors
var defReadBgColor = null;
var defReadColor = null;
var defUnreadBgColor = null;
var defUnreadColor = null;

//user colors
var userReadBgColor = "#A0A0A0";
var userReadColor = "#E0E0E0";
var userUnreadBgColor = "yellow";
var userUnreadColor = "blue";

//row change observer
var tabindexObserver = new MutationSummary ({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        var readEmail = hasClass(changeEl, READ_EMAIL_CLASSMAME);

        if (currentValue == 0) {
            //selected row
            if (readEmail) {
                preserveDefaultColor(changeEl, defReadBgColor, defReadColor);
                setRowColor(changeEl, userReadBgColor, userReadColor);
            } else {
                preserveDefaultColor(changeEl, defUnreadBgColor, defUnreadColor);
                setRowColor(changeEl, userUnreadBgColor, userUnreadColor);
            }
        } else {
            //deselected row
            if (readEmail) {
                setRowColor(changeEl, defReadBgColor, defReadColor)
            } else {
                setRowColor(changeEl, defUnreadBgColor, defUnreadColor);
            }
        }
    });
}

/*
saves the the default color values so they can be used when the row is deselected
 */
function preserveDefaultColor(elem, bgColor, color) {
    if (bgColor != null) return;

    bgColor = elem.style.backgroundColor;
    color = elem.style.color;
}

/*
set the row colors
 */
function setRowColor(elem, bgCol, col) {
    elem.style.backgroundColor = bgCol;
    elem.style.color = col;
}

/*
test if the elemnt contains a class
 */
function hasClass(elem, cls) {
    return (' ' + elem.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

