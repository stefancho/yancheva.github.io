// Main menu navigation
let currentActive = undefined;
const mainLinks = document.querySelectorAll('nav > a');
for (const buttonLink of mainLinks) {
    buttonLink.addEventListener('click', mainMenuClick);
}

const dropdownLinks = document.querySelectorAll('header > div.dropdown > a');
for (const buttonLink of dropdownLinks) {
    buttonLink.addEventListener('click', mainMenuClick);
}

function mainMenuClick(e)
{
    e.preventDefault();
    const clickedLink = e.currentTarget;
    const fullHref = clickedLink.href;
    const modalView = document.querySelector('#modal-view');
    if(modalView && modalView.checkVisibility()){//gallery is open disable main menu
        return;
    }
    // if we dont' have # in the url href will be the fullHref
    const href = fullHref.substring(fullHref.lastIndexOf('#'));
    console.log("href: " + fullHref);
    const isDropDown = clickedLink.parentElement.classList.contains('dropdown');
    if(fullHref.includes('home/') && href.trim().startsWith('#'))//link to home
    {
        window.location.replace("../index.html" + href);
    }
    else if(href.trim().startsWith('#'))//Link within the page
    {
        const gotoElement = document.querySelector(href);
        console.log(gotoElement.offsetTop - NAV_HEIGHT + 1);
        if(isDropDown){
            dropdownMenu.classList.add('hidden');
        }
        const transitionDisabled = window.getComputedStyle(document.querySelector('html')).transition.indexOf('none') !== -1;
        const transitionBehaviour = (transitionDisabled) ? 'instant' : 'smooth';
        window.scrollTo({top: gotoElement.offsetTop - NAV_HEIGHT + 1, behavior: transitionBehaviour});
    }
    else//links to publications page
    {
        window.location.replace(fullHref);
    }
}

const menuButton = document.querySelector('#dropdown');
const dropdownMenu = document.querySelector('.dropdown');
menuButton.addEventListener('click', toggleDropDown)

function toggleDropDown()
{
    dropdownMenu.classList.toggle('hidden');
}

document.addEventListener("readystatechange", (event) => {
    const url = window.location.href;
    const urlAnchor = url.lastIndexOf('#') !== -1;
    if(urlAnchor){
        window.scrollBy(0, -NAV_HEIGHT + 1);
    }
});