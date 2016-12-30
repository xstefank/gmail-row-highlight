
//constants
const READ_EMAIL_CLASSMAME = "yO";
const UNREAD_EMAIL_CLASSMAME = "zE";

//default colors
var defReadBgColor = null;
var defReadColor = null;
var defUnreadBgColor = null;
var defUnreadColor = null;

//user colors
var userReadBgColor = "#858585";
var userReadColor = "#4A4A4A";
var userUnreadBgColor = "#A0A0A0";
var userUnreadColor = "#505050";

//color class
class RowColor {
    constructor(defColor, defBgColor, userColor, userBgColor) {
        this.defColor = defColor;
        this.defBgColor = defBgColor;
        this.userColor = userColor;
        this.userBgColor = userBgColor;
    }
}

//row color objects
var readRowColor = new RowColor(defReadColor, defReadBgColor, userReadColor, userReadBgColor);
var unreadRowColor = new RowColor(defUnreadColor, defUnreadBgColor, userUnreadColor, userUnreadBgColor);

//row change observer
var tabindexObserver = new MutationSummary ({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        var isRead = hasClass(changeEl, READ_EMAIL_CLASSMAME);

        if (currentValue == 0) {
            if (isRead) {
                preserveDefaultColor(changeEl, readRowColor.defColor, readRowColor.defBgColor);
                setRowColor(changeEl, readRowColor.userColor, readRowColor.userBgColor);
            } else {
                preserveDefaultColor(changeEl, unreadRowColor.defColor, unreadRowColor.defBgColor);
                setRowColor(changeEl, unreadRowColor.userColor, unreadRowColor.userBgColor);
            }
        } else {
            if (isRead) {
                setRowColor(changeEl, readRowColor.defColor, readRowColor.defBgColor)
            } else {
                setRowColor(changeEl, unreadRowColor.defColor, unreadRowColor.defBgColor);
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

