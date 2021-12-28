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