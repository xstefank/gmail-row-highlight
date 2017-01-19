
//constants
const READ_EMAIL_CLASSMAME = "yO";
const UNREAD_EMAIL_CLASSMAME = "zE";
const SELECTED_EMAIL_CLASSNAME = "x7";

//default colors
var defReadColor = null;
var defReadBgColor = null;
var defUnreadColor = null;
var defUnreadBgColor = null;
var defSelectedColor = null;
var defSelectedBgColor = null;

//user colors
var userReadColor = "#4A4A4A";
var userReadBgColor = "#858585";
var userUnreadColor = "#505050";
var userUnreadBgColor = "#A0A0A0";
var userSelectedColor = "blue";
var userSelectedBgColor = "yellow";

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
var selectedRowColor = new RowColor(defSelectedColor, defSelectedBgColor, userSelectedColor, userSelectedBgColor);

//row change observer
var tabindexObserver = new MutationSummary ({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

var selectObserver = new MutationSummary ({
    callback: selectHandler,
    queries: [{ element: '.' + SELECTED_EMAIL_CLASSNAME }]
});

function selectHandler(trs) {
    var tr = trs[0];
    tr.added.forEach(setRowColorFromElem);
    tr.removed.forEach(setRowColorFromElem);
}

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        var rowColor = pickRowColor(changeEl);

        if (currentValue == 0) {
            preserveDefaultColor(changeEl, rowColor.defColor, rowColor.defBgColor);
            setRowColor(changeEl, rowColor.userColor, rowColor.userBgColor);
        } else {
            setRowColor(changeEl, rowColor.defColor, rowColor.defBgColor)
        }
    });
}


function pickRowColor(elem) {
    var isRead = hasClass(elem, READ_EMAIL_CLASSMAME);
    var isSelected = hasClass(elem, SELECTED_EMAIL_CLASSNAME);

    if (isSelected) {
        return selectedRowColor;
    }

    if (isRead) {
        return readRowColor;
    } else {
        return unreadRowColor;
    }
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

/**
 * picks the right colors and sets the row color
 * @param elem row element
 */
function setRowColorFromElem(elem) {
    var rowColor = pickRowColor(elem);
    setRowColor(elem, rowColor.userColor, rowColor.userBgColor);
}
