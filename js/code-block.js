let CodeBlock = function (container) {
    this.container = container;
    this.pre = this.container.querySelector("pre");
    this.code = this.pre.querySelector("code");
    this.icon = this.container.querySelector(".copy-code-icon");
};

CodeBlock.prototype = function() {
    let removeTrailingWhiteSpacesAddedInCodeSourceForFormattingPurposes = function() {
        // add a new line at the begining to be able to calculate the pattern to replace correcly
        let firstNewLineAndindentation = this.code.innerHTML.match(/\n\s*/);
        let firstNewLineAndindentationRegExp = new RegExp(firstNewLineAndindentation, "g");
        this.code.innerHTML = this.code.innerHTML.replace(firstNewLineAndindentationRegExp, "\n");

        // remove the whitespaces around code tag
        this.code.innerHTML = this.code.innerHTML.replace(/^\s*\n/, "");
        this.code.innerHTML = this.code.innerHTML.replace(/\n\s*$/, "");

        // remove the whitespaces around pre tag
        this.pre.innerHTML = this.pre.innerHTML.replace(/^\s*/, "");
        this.pre.innerHTML = this.pre.innerHTML.replace(/\n\s*$/, "");

        // reassign code variable after the modification of pre innerHTML attribute 
        this.code = this.pre.querySelector("code");
    }

    let addLineNumbersColumn = function() {
        if (typeof (window.getComputedStyle) === 'undefined') {
            return; // old browsers :(
        }
        let lineNumbersColumn = document.createElement('div');
        lineNumbersColumn.setAttribute('area-hidden', 'true');
        this.code.innerHTML.split("\n").forEach(line => {
            lineNumbersColumn.appendChild(document.createElement('span'));
        }); 
        this.pre.insertBefore(lineNumbersColumn, this.code);
        this.pre.classList.add("line-numbers");
    };

    
    let resetCopyCodeIconTooltipDataAttribute = function() {
        this.icon.setAttribute("data-tooltip", "Copy the code to clipboard");
    }

    let addEventListnerToCopyCodeIcon = function() {
        this.icon.addEventListener("click", () => {
            // code inspiration: https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
            // code inspiration: https://edupala.com/copy-div-content-clipboard/
            if (document.body.createTextRange) { 
                // for Internet Explorer
                let range = document.body.createTextRange();
                range.moveToElementText(this.code);
                console.log(range);
                range.select().createTextRange();
                document.execCommand("Copy"); 
            } else if (window.getSelection) {
                // other browsers
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(this.code);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeRange(range);
                this.icon.setAttribute("data-tooltip", "Copied");
            }
        });

        this.icon.addEventListener("mouseout", () => resetCopyCodeIconTooltipDataAttribute.call(this));
    }

    let init = function() {
        removeTrailingWhiteSpacesAddedInCodeSourceForFormattingPurposes.call(this);
        addLineNumbersColumn.call(this);
        resetCopyCodeIconTooltipDataAttribute.call(this);
        addEventListnerToCopyCodeIcon.call(this);
    }

    return {
        init: init
    }
}();