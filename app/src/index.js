/* Set up blockly workspace */
// var blocklyArea = document.getElementById('blocklyArea');
const toggleOpenDiv = document.getElementById("toggleOpen");


var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,
    {
        'toolbox': document.getElementById('toolbox'),
        'zoom':
        {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: true
        },
        trashcan: true
    });

var onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var x = 0;
    var y = 0;
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    if (window.getComputedStyle(toggleOpenDiv).getPropertyValue("display") == "none") {
        blocklyDiv.style.width = (window.innerWidth / 3 * 2) + 'px';
    } else {
        blocklyDiv.style.width = window.innerWidth + 'px';
    }
    blocklyDiv.style.height = (window.innerHeight * 0.9)  + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

/* Load blocks to workspace. */
var workspaceBlocks = document.getElementById("workspaceBlocks");
if (workspaceBlocks) {
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
}

/* Auto update Python when workspace is changed */
function myUpdateFunction(event) {
    var code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeLine').innerHTML = processCode(code);
}
workspace.addChangeListener(myUpdateFunction);

window.api.loadAppState()
    .then(result => {
        window.appState = result
    });

/* Add event listeners to buttons */
const newFileButton = document.getElementById("newfilebtn");
newFileButton.addEventListener("click", () => {
    // const outputCode = document.getElementById("codeLine").innerHTML;
    // window.api.send("save-code", outputCode);
});

const openFileButton = document.getElementById("openfilebtn");
openFileButton.addEventListener("click", () => {
    window.api.send("open-file");
});

function handleSave() {
    let outputCode = document.getElementById("codeLine").innerHTML;
    let fileContent = makefp_content(outputCode, Blockly.serialization.workspaces.save(workspace));
    window.api.send("save-code", {
        content: fileContent,
        filename: 'code.fp'
    });
}

const saveButton = document.getElementById("savebtn");
saveButton.addEventListener("click", handleSave);

const saveAsButton = document.getElementById("saveasbtn");
saveAsButton.addEventListener("click", handleSave);

const uploadButton = document.getElementById("uploadbtn");
uploadButton.addEventListener("click", () => {
    const outputCode = document.getElementById("codeLine").innerHTML;
    let fileContent = makefp_content(outputCode, Blockly.serialization.workspaces.save(workspace));
    window.api.send("upload-code", fileContent);
});

const pythonArea = document.getElementById("textArea");
const blocklyArea = document.getElementById("blocklyArea");

const toggleClosedDiv = document.getElementById("toggleClosed");

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


let iconsArr = ["newfilebtn", "openfilebtn", "savebtn", "saveasbtn", "uploadbtn"];

iconsArr.forEach(x => {
    let el = document.getElementById(x);
    el.onmouseover = function() {
        el.style.color = '#0066B2';
        el.style.cursor = 'pointer';
    }

    el.onmouseout = function() {
        el.style.color = '';
    }
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
})

/* Code Cleaning and Formatting */
function processCode(code) {
    // console.log("Processing Code");
    code = "from WPILib import *\n\n" + code
    // if (code.includes('encoded_motor')) {
    //     // console.log("Found encoded_motor");
    // }
    // TODO: Add code cleaning and formatting here
    return code;
}