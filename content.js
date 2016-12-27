
var defBgColor = null;
var defColor = null;

var userBgColor = "#A0A0A0";
var userColor = "#E0E0E0";

var tabindexObserver = new MutationSummary ({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        if (currentValue == 0) {
            preserveDefaultColor(changeEl);
            setRowColor(changeEl, userBgColor, userColor);
        } else {
            setRowColor(changeEl, defBgColor, defColor);
        }
    });
}

function preserveDefaultColor(elem) {
    if (defBgColor != null) return;

    defBgColor = elem.style.backgroundColor;
    defColor = elem.style.color;
}

function setRowColor(elem, bgCol, col) {
    elem.style.backgroundColor = bgCol;
    elem.style.color = col;
}

