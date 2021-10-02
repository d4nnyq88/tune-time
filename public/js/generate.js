// Playlist Generator
console.log(`Generating Playlist!`);

// Variables
const body = $(`body`);
const generateButton = $(`.generateButton`);
const promptForm = $(`.promptForm`);
const closeBtn = $(`.closeBtn`);
const generateBtn = $(`.submitBtn`);
promptForm.hide();

// Prompt form when user clicks generateButton
generateButton.on(`click`, event => {
    promptFormShow();
})

// Functions
function promptFormShow() {
    promptForm.show(1000);

    generateBtn.on(`click`, event => {
        event.preventDefault();

        console.log(event);
        console.log(event.target);
    })

    closeBtn.on(`click`, event => {
        promptFormHide();
    })
}

function promptFormHide() {
    promptForm.hide(1000);
}