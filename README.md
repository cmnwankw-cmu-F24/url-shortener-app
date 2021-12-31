# Frontend Mentor - Shortly URL shortening API Challenge solution

There comes a time in every web developer's life when they will need to shorten a URL. The reason could be to hide tracking links, make a link fit into a Tweet, make a more memorable link, make a link smaller to put it in print, add branding to a link, run an A/B test, retarget a link for market research, or maybe swap out a link at a later time (link rotation).

Developers wishing to take advantage of URL shortening technology will want to seek out URL Shortener APIs. The solution here, provides a convenient interface that integrates nicely with a URL shortening API to provide these functionalities.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learnt](#what-i-learnt)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](./design/desktop-design.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/Minard-NG/url-shortener-app)
- Live Site URL: [Hosted with Netlify](https://shrtcode.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Sass/Scss
- JavaScript
- Git & GitHub
- Mobile-first workflow
- ShrtCode API

### What I learnt

This project did stretch my frontend skills, but I would be focusing on the new things I learnt while building this project.

How to copy text to the clipboard - I have randomly been thinking about how this functionality is implemented but I finally got a chance to research and implement the functionality in this project. The W3 schools code below explicitly shows the logic behind the implementation.

Code Snippet of the html

```html
<!-- The text field -->
<input type="text" value="Hello World" id="myInput">

<!-- The button used to copy the text -->
<button onclick="myFunction()">Copy text</button>
```

```js
function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}
```

For the api integration, I utilized the async/await JS syntax.

Code Snippet, below:
```js
async function shortenUrl(url) {
    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);

    let data = await response.json();

    render(data); //render the output data;
}
```

At some point in the program's logic, I had to store an array in the localStorage. Here is the code snippet of the code below:
```js
let contents = [];
localStorage.setItem("contents", JSON.stringify(contents));

//...
let storedContent = JSON.parse(localStorage.getItem("content"));
```

### Continued development

Work on more web projects involving APIs and learn more about backend developemnt.


### Useful resources

- [ShrtCode API Docs](https://shrtco.de/docs/) - ShrtCode is a privacy friendly url shortener that provides a developer's api. This documentation was very useful in getting me up and running with the api.
- [How do I store an array in localStorage?](https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage#:~:text=Use%20localStorage.,work%20with%20the%20sessionStorage%20object.) - Yay, got a little hazy in memory, had to use stackoverflow for this.
- [CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/) - To ensure styles are consistent on all browsers and also, worry less about the user agent styles that browsers add to the web pages. I used Eric Meyer's standard CSS reset. It was very helpful.
- [Hex to CSS FIlter Generator](https://codepen.io/sosuke/pen/Pjoqqp) - This code is very useful in convert hex color values to css filter values.
- [Top URL Shortener APIs](https://www.programmableweb.com/news/10-top-url-shortener-apis/brief/2020/06/21) - Learnt a lot about ros and cons of different shortening apis from this article.


## Author

- Frontend Mentor - [@Minard-NG](https://www.frontendmentor.io/profile/Minard-NG)
- LinkedIn - [Michael Nwankwo](https://www.linkedin.com/in/michael-nwankwo/)


## Acknowledgments

Special thanks to [Frontend Mentor](https://www.frontendmentor.io) for setting up this challenge to help developers improve their coding skills by building realistic projects.


