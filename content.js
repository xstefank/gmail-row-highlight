//constants
const READ_EMAIL_CLASSMAME = "yO";
const UNREAD_EMAIL_CLASSMAME = "zE";
const SELECTED_EMAIL_CLASSNAME = "x7";
const INBOX_ROW_CLASS = "zA";

let currentRowElement = null;

//color class
class RowColor {
    constructor(origColor, origBgColor, userColor, userBgColor) {
        this.origColor = origColor;
        this.origBgColor = origBgColor;
        this.userColor = userColor;
        this.userBgColor = userBgColor;
    }
}

//row color objects
let readRowColor = null;
let unreadRowColor = null;
let selectedRowColor = null;

//row change observer
const tabindexObserver = new MutationSummary({
    callback: tabindexChangeHandler,
    queries: [{
        element: '.' + INBOX_ROW_CLASS,
        elementAttributes: 'tabindex'
    }]
});

//selection observer
const selectObserver = new MutationSummary({
    callback: selectHandler,
    queries: [{element: '.' + SELECTED_EMAIL_CLASSNAME}]
});

function selectHandler(trs) {
    const tr = trs[0];
    tr.added.forEach(assignRowColorFromElemIfSelected);
    tr.removed.forEach(assignRowColorFromElemIfSelected);
}

function tabindexChangeHandler(trs) {
    const tr = trs[0];
    tr.attributeChanged['tabindex'].forEach(function (changeEl) {
        setRowColor(changeEl);
    });
}

/**
 * sets the current row element color by its attributes
 * @param elem the element which is being changed
 */
function setRowColor(elem) {
    const currentValue = elem.getAttribute("tabindex");
    const rowColor = pickRowColor(elem);

    if (currentValue == 0) {
        preserveDefaultColor(elem, rowColor);
        assignRowColor(elem, rowColor.userColor, rowColor.userBgColor);
        currentRowElement = elem;
    } else {
        assignRowColor(elem, rowColor.origColor, rowColor.origBgColor)
    }
}

/**
 * picks the color of the element by its classnames
 * @param elem the element being checked
 * @returns RowColor of the element
 */
function pickRowColor(elem) {
    const isRead = hasClass(elem, READ_EMAIL_CLASSMAME);
    const isSelected = hasClass(elem, SELECTED_EMAIL_CLASSNAME);

    if (isSelected) {
        return selectedRowColor;
    } else if (isRead) {
        return readRowColor;
    } else {
        return unreadRowColor;
    }
}

/**
 * saves the the default color values so they can be used when the row is deselected
 * @param elem row element
 * @param rowColor the color class to be set up
 */
function preserveDefaultColor(elem, rowColor) {
    if (rowColor.origBgColor != null) return;

    rowColor.origColor = elem.style.color;
    rowColor.origBgColor = elem.style.backgroundColor;
}

/**
 * assign the row colors
 * @param elem row element
 * @param color main color
 * @param bgColor background color
 */
function assignRowColor(elem, color, bgColor) {
    elem.style.color = color;
    elem.style.backgroundColor = bgColor;
}

/**
 * tests if the element contains a CSS class
 * @param elem element
 * @param clazz name of the CSS class
 * @returns boolean whether the element contains the CSS class
 */
function hasClass(elem, clazz) {
    return (' ' + elem.className + ' ').indexOf(' ' + clazz + ' ') > -1;
}

/**
 * picks the right colors and sets the row color
 * @param elem row element
 */
function assignRowColorFromElem(elem) {
    const rowColor = pickRowColor(elem);
    assignRowColor(elem, rowColor.userColor, rowColor.userBgColor);
}

/**
 * set the color row if selected
 * @param elem row element
 */
function assignRowColorFromElemIfSelected(elem) {
    if (elem.getAttribute('tabindex') == 0) {
        assignRowColorFromElem(elem);
    }
}

/**
 * reloads the current row element
 */
function reloadCurrentRow() {
    setRowColor(currentRowElement);
}

/**---- colors transitions and controls ----**/
//initial request for the color information from background local storage
chrome.runtime.sendMessage({
    from: "content",
    type: "init"
}, function (response) {
    readRowColor = new RowColor(null, null, response.read, response.readBg);
    unreadRowColor = new RowColor(null, null, response.unread, response.unreadBg);
    selectedRowColor = new RowColor(null, null, response.selected, response.selectedBg);
});

//dynamic setting of different colors to the current row
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "background" && request.type == "update") {
        readRowColor.userColor = request.read;
        readRowColor.userBgColor = request.readBg;
        unreadRowColor.userColor = request.unread;
        unreadRowColor.userBgColor = request.unreadBg;
        selectedRowColor.userColor = request.selected;
        selectedRowColor.userBgColor = request.selectedBg;
        reloadCurrentRow();
    }
});

