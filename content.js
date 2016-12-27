
var defBgColor = null;
var defColor = null;

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
            changeEl.style.backgroundColor = "#A0A0A0";
            changeEl.style.color = "#E0E0E0";
        } else {
            changeEl.style.backgroundColor = defBgColor;
            changeEl.style.color = defColor;
        }
    });
}

function preserveDefaultColor(elem) {
    if (defBgColor != null) return;

    defBgColor = elem.style.backgroundColor;
    defColor = elem.style.color;
}

