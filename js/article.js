window.onload = function() {
    document.querySelectorAll(".code-block").forEach((codeBlockContainer) => {
        new CodeBlock(codeBlockContainer).init();
    });
    hljs.initHighlighting();
};