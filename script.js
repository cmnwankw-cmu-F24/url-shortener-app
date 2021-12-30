//mobile drop down animation
let harm_btn = document.querySelector('.harmburger-btn');
let spanOne = document.querySelector('.harmburger-btn > span:first-child');
let spanTwo = document.querySelector('.harmburger-btn > span:nth-child(2)');
let spanThree = document.querySelector('.harmburger-btn > span:last-child');
let dropDown = document.querySelector('#mobile__drop-down');

harm_btn.addEventListener('click', (evt) => {
    if (dropDown.classList.length === 0 || dropDown.classList.contains('dropDownReturn')) {
        //remove existing return state animation class, if present
        spanOne.classList.remove('spanOneReturn');
        spanTwo.classList.remove('spanTwoReturn');
        spanThree.classList.remove('spanThreeReturn');
        dropDown.classList.remove('dropDownReturn');

        //add end state animation classes
        spanOne.classList.add('spanOneEnd');
        spanTwo.classList.add('spanTwoEnd');
        spanThree.classList.add('spanThreeEnd');
        dropDown.classList.add('dropDownEnd');
    } else {
        //remove existing end state animation class, if present
        spanOne.classList.remove('spanOneEnd');
        spanTwo.classList.remove('spanTwoEnd');
        spanThree.classList.remove('spanThreeEnd');
        dropDown.classList.remove('dropDownEnd');

        //add return state animation classes
        spanOne.classList.add('spanOneReturn');
        spanTwo.classList.add('spanTwoReturn');
        spanThree.classList.add('spanThreeReturn');
        dropDown.classList.add('dropDownReturn');
    }
});



//using shrtcode api for the url shortening
let inputUrl = document.querySelector('.shortener__input');
let shortenerError = document.querySelector('.shortener__error');
let shortenerBtn = document.querySelector('.shortener__btn');
let resultPane = document.querySelector('.result');

shortenerBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    resultPane.innerHTML = '<div class="loader"></div>'
    shortenUrl(inputUrl.value);
});

//utilizing local storage to ensure some data persistence
if(typeof(Storage !== undefined)){
    if(!localStorage.contents){
        localStorage.contents = JSON.stringify([]);
    }
}else{
    shortenerError.innerText = "Browser does not support client-side storage to keep track of scores";
}

//handles asynchronous call to the shrtcode api
async function shortenUrl(url) {
    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);

    let data = await response.json();

    render(data); //render the output data;
}

function render(data) {
    if (data["ok"]) {
        shortenerError.style.visibility = "hidden";
        inputUrl.style.outline = "none";
        
        let info = data.result;
        let content = `<div class="result__tab">
        <span class="long_link">${info.original_link}</span>
        <span class="short_link">${info.short_link}</span>
        <input type="text" value="${info.short_link}" />
        <button class="copy_btn">Copy</button>
        </div>`;

        let tmpContents = JSON.parse(localStorage.getItem('contents'));

        tmpContents.push(content);
        resultPane.innerHTML = "";
        tmpContents.forEach((cont) => {
            resultPane.innerHTML += cont;
        });

        //add clear all button
        resultPane.innerHTML += `<div id="clear_btn"> Clear All </div>`;

        //binding event handler to clear button
        let clear_btn = document.getElementById("clear_btn");

        clear_btn.addEventListener('click',(evt)=>{
            localStorage.clear();
            resultPane.innerHTML="";
        });
        
        //binding click event handler to handle copying to clipboard;
        let copy_btns = document.querySelectorAll('.copy_btn');
        
        
        copy_btns.forEach((copy_btn)=>{
            copy_btn.addEventListener('click', copyToClipboard);
        });
        
        localStorage.setItem('contents', JSON.stringify(tmpContents));

    } else {
        shortenerError.style.visibility = "visible";
        inputUrl.style.outline = "2px solid red";
        resultPane.innerHTML="";

        //handle all input validation using the api error code
        switch (data['error_code']) {
            case 1:
                shortenerError.innerText = "No URL specified";
                break;
            case 2:
                shortenerError.innerText = "Invalid URL submitted";
                break;
            case 3:
                shortenerError.innerText = "Rate limit reached. Wait a second and try again";
                break;
            case 4:
                shortenerError.innerText = "IP Address blocked. Violates terms!";
                break;
            case 5:
                shortenerError.innerText = "shrtcode code (slug) already taken/in use";
                break;
            case 6:
                shortenerError.innerText = "Unknown error";
                break;
            case 7:
                shortenerError.innerText = "No code specified";
                break;
            case 8:
                shortenerError.innerText = "Invalid code submitted";
                break;
            case 9:
                shortenerError.innerText = "Missing required parameters";
                break;
            case 10:
                shortenerError.innerText = "Trying to shorten a disallowed Link";
                break;

            default:
                shortenerError.innerText = "Unknown Error"
                break;
        }
    }
}

function copyToClipboard(evt){
    evt.target.style.backgroundColor="#3b3054";
    evt.target.innerText="Copied!";

    var copyText = evt.target.previousElementSibling;

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);


}

function intialRender(){
    let tmp = JSON.parse(localStorage.getItem('contents'));

    
    if(tmp.length !== 0){
        tmp.forEach((content) => {
            resultPane.innerHTML += content;
        });


        //add clear all button
        resultPane.innerHTML += `<div id="clear_btn"> Clear All </div>`;

        //binding event handler to clear button
        let clear_btn = document.getElementById("clear_btn");

        clear_btn.addEventListener('click',(evt)=>{
            localStorage.clear();
            resultPane.innerHTML="";
        });
        
        //binding click event handler to handle copying to clipboard;
        let copy_btns = document.querySelectorAll('.copy_btn');
        
        copy_btns.forEach((copy_btn)=>{
            copy_btn.addEventListener('click', copyToClipboard);
        });
    }
    
}

intialRender(); //initial rendering of the resultPane