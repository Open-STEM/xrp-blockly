/* Main Blockly Workspace */
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