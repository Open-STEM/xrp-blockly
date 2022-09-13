const fileNameEl = document.getElementById("filename");

/* Get all elements */
const newFileButton = document.getElementById("newfilebtn");
const openFileButton = document.getElementById("openfilebtn");
const saveButton = document.getElementById("savebtn");
const saveAsButton = document.getElementById("saveasbtn");

/* Link event listeners */
newFileButton.addEventListener("click", newFileListener);
openFileButton.addEventListener("click", openFilelistener)
saveButton.addEventListener("click", saveListener);
saveAsButton.addEventListener("click", saveAsListener);

/* Event listeners */
function newFileListener () {
    // const outputCode = document.getElementById("codeLine").innerHTML;
    // window.api.send("save-code", outputCode);
};

async function openFilelistener() {
    let result = await window.api.openFile();
    console.log(result);

    if (result.status === 200) {
        let newLib = readfp(result.payload.fileContent);
        Blockly.serialization.workspaces.load(newLib,workspace);

        fileNameEl.innerHTML = result.payload.fileName;
    } else {
        alert(result.message);
    }
};

async function saveListener() {
    let outputCode = document.getElementById("codeLine").innerHTML;
    let fileContent = makefp_content(outputCode, Blockly.serialization.workspaces.save(workspace));
    let result = await window.api.saveCode({
        content: fileContent,
        filename: fileNameEl.innerHTML === 'Unsaved File' ? 'code.fp' : `${fileNameEl.innerHTML}.fp`
    });

    if (result.status === 200) {
        fileNameEl.innerHTML = result.message;
        await new Promise(r => setTimeout(r, 500));
        fileNameEl.innerHTML = result.payload;
    } else {
        alert(result.message);
    }
}

async function saveAsListener() {
    let outputCode = document.getElementById("codeLine").innerHTML;
    let fileContent = makefp_content(outputCode, Blockly.serialization.workspaces.save(workspace));
    let result = await window.api.saveAsCode({
        content: fileContent,
        filename: 'code.fp'
    });

    console.log(result);
    if (result.status === 200) {
        fileNameEl.innerHTML = result.message;
        await new Promise(r => setTimeout(r, 500));
        fileNameEl.innerHTML = result.payload;
    } else {
        alert(result.message);
    }
}


/* Color all icons on hover */
let iconsArr = ["newfilebtn", "openfilebtn", "savebtn", "saveasbtn"];
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


// window.api.loadAppState()
//     .then(result => {
//         window.appState = result
//     });