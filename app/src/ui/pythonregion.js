/* Toggle Display of Python Region */
const toggleClosedDiv = document.getElementById("toggleClosed");

const pythonArea = document.getElementById("textArea");
const blocklyArea = document.getElementById("blocklyArea");


toggleClosedDiv.addEventListener("click", () => {
    toggleClosedDiv.style.display = "none";
    toggleOpenDiv.style.display = "block";
    pythonArea.style.display = "none";
    blocklyArea.classList.add("col-12");
    blocklyArea.classList.remove("col-8");
    blocklyDiv.style.width = window.innerWidth + 'px';
    Blockly.svgResize(workspace);
});

toggleOpenDiv.addEventListener("click", () => {
    toggleClosedDiv.style.display = "block";
    toggleOpenDiv.style.display = "none";
    pythonArea.style.display = "block";
    blocklyArea.classList.remove("col-12");
    blocklyArea.classList.add("col-8");
    blocklyDiv.style.width = (window.innerWidth / 3 * 2) + 'px';
    Blockly.svgResize(workspace);
});


let toggleIconsArr = ["toggleClosed", "toggleOpen"];
toggleIconsArr.forEach(x => {
    let el = document.getElementById(x);

    el.onmouseover = () => {
        el.style.cursor = 'pointer';
        el.style.color = '#EC1C24';
    }

    el.onmouseout = () => {
        el.style.color = '';
    }
});