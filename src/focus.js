//get from home page
var whitelistWebsites = ["www.youtube.com", "www.google.com"];

const getHTML = () => {
    return (
        `<div style="background-color:rgb(255, 99, 71);">GO BACK TO WORK</div>`
    )
}

if (!whitelistWebsites.includes(window.location.hostname)) {
        document.body.innerHTML = getHTML();
}