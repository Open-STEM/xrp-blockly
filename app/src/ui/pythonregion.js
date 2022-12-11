/* Toggle Display of Python Region */
const toggleClosedDiv = document.getElementById("toggleClosed");

const pythonArea = document.getElementById("textArea");
const blocklyArea = document.getElementById("blocklyArea");
const comTitle = document.getElementById("comport_title");
const comData = document.getElementById("comport_data");


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

var streamToDisplay = ""
const charactersToShow = 1000;
var currentlyDisplayedPort = ""

window.api.robotCOMStream((_event, rawObject) => {
    if (rawObject.port == currentlyDisplayedPort) {
        streamToDisplay += rawObject.data;
        streamToDisplay = streamToDisplay.slice(-charactersToShow);
        // console.log(currentlyDisplayedPort);
        // console.log(streamToDisplay);   
        comData.innerHTML = streamToDisplay;
    } else {
        currentlyDisplayedPort = rawObject.port;
        streamToDisplay = "";
        comTitle.innerHTML = currentlyDisplayedPort;
        comData.innerHTML = streamToDisplay;
    }

});