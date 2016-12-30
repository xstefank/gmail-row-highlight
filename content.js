
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
            if (readEmail) {
                preserveDefaultColor(changeEl, defReadColor, defReadBgColor);
                setRowColor(changeEl, userReadColor, userReadBgColor);
            } else {
                preserveDefaultColor(changeEl, defUnreadColor, defUnreadBgColor);
                setRowColor(changeEl, userUnreadColor, userUnreadBgColor);
            }
        } else {
            if (readEmail) {
                setRowColor(changeEl, defReadColor, defReadBgColor)
            } else {
                setRowColor(changeEl, defUnreadColor, defUnreadBgColor);
            }
        }
    });
}

/*
saves the the default color values so they can be used when the row is deselected
 */
function preserveDefaultColor(elem, color, bgColor) {
    if (bgColor != null) return;

    color = elem.style.color;
    bgColor = elem.style.backgroundColor;
}

/*
set the row colors
 */
function setRowColor(elem, color, bgColor) {
    elem.style.color = color;
    elem.style.backgroundColor = bgColor;
}

/*
test if the elemnt contains a class
 */
function hasClass(elem, clazz) {
    return (' ' + elem.className + ' ').indexOf(' ' + clazz + ' ') > -1;
}

