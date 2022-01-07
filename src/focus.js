var whitelistWebsites = ["www.youtube.com", "www.facebook.com"];

const getHTML = () => {
    return (
        `<div class='textbody'>
        <div class='text'><i>GET BACK TO WORK</i></div>
        <hr>
        </div>`
    
    )
}

const getStyle = () => {
    return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
    body {
        background: #8dabba;
        color: #fff;
        font-family: "Open Sans", sans-serif;
        max-height: 700px;
        overflow: hidden;
    }

    .textbody {
        text-align: center;
    }

    .text {
        font-size: 100px;
        margin-top: 20%
    }`

}

if (whitelistWebsites.includes(window.location.hostname)) {
    document.head.innerHTML = getStyle();
        document.body.innerHTML = getHTML();
}


