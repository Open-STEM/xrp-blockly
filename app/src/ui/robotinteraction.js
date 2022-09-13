
const robotIcon = document.getElementById("roboticon");
const uploadButton = document.getElementById("uploadbtn");

function robotHandleMouseover() {
    uploadButton.style.color = '#0066B2';
    uploadButton.style.cursor = 'pointer';
}

function robotHandleMouseout() {
    uploadButton.style.color = '';
}

async function robotHandleClick() {
    const outputCode = document.getElementById("codeLine").innerHTML;
    let fileContent = makefp_content(outputCode, Blockly.serialization.workspaces.save(workspace));
    let result = await window.api.uploadCode(fileContent);
    console.log(result);
    
    if (result.status !== 200) alert(result.message);
}

var eventListenerAdded = false;

window.api.robotConnected((_event, value) => {
    if (value === true) {
        robotIcon.style.color = 'green';

        if (!eventListenerAdded) {
            uploadButton.addEventListener("mouseover", robotHandleMouseover);
            uploadButton.addEventListener("mouseout", robotHandleMouseout);
            uploadButton.addEventListener("click", robotHandleClick);
            eventListenerAdded = true;
        }
    } else if (value === false) {
        robotIcon.style.color = 'red';

        if (eventListenerAdded) {
            uploadButton.removeEventListener("mouseover", robotHandleMouseover);
            uploadButton.removeEventListener("mouseout", robotHandleMouseout);
            uploadButton.removeEventListener("click", robotHandleClick);
            eventListenerAdded = false;
            uploadButton.style.cursor = 'default';
            uploadButton.style.color = '';
        }
    } else {
    }
});