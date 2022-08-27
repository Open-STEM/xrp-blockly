// const fs = require('fs');
// var blocklyArea = document.getElementById('blocklyArea');
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
    blocklyDiv.style.width = (window.innerWidth / 3 * 2) + 'px';
    blocklyDiv.style.height = window.innerHeight + 'px';
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


function myUpdateFunction(event) {
    var code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeLine').innerHTML = processCode(code);
}
workspace.addChangeListener(myUpdateFunction);

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
    let outputCode = document.getElementById("codeLine").innerHTML;
    window.api.send("save-code", outputCode);
});


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