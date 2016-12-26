
var tabindexObserver = new MutationSummary({
    callback: tabindexChangeHandler,
    queries: [{ attribute: 'tabindex' }]
});

function tabindexChangeHandler(trs) {
    var tr = trs[0];
    tr.valueChanged.forEach(function(changeEl) {
        var currentValue = changeEl.getAttribute('tabindex');

        if (currentValue == 0) {
            changeEl.style.backgroundColor = "yellow";
        } else {
            changeEl.style.backgroundColor = "initial";
        }
    });
}
