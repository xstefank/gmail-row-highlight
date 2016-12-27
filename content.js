
//default colors
var defBgColor = null;
var defColor = null;

//user colors
var userBgColor = "#A0A0A0";
var userColor = "#E0E0E0";

//row change observer
var tabindexObserver = new MutationSummary ({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        if (currentValue == 0) {
            //selected row
            preserveDefaultColor(changeEl);
            setRowColor(changeEl, userBgColor, userColor);
        } else {
            //deselected row
            setRowColor(changeEl, defBgColor, defColor);
        }
    });
}

/*
saves the the default color values so they can be used when the row is deselected
 */
function preserveDefaultColor(elem) {
    if (defBgColor != null) return;

    defBgColor = elem.style.backgroundColor;
    defColor = elem.style.color;
}

/*
set the row colors
 */
function setRowColor(elem, bgCol, col) {
    elem.style.backgroundColor = bgCol;
    elem.style.color = col;
}

