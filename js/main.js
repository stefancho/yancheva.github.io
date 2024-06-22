
// close/open issue panels
const panels = document.querySelectorAll('.panel')
for (panel of panels) {
    panel.addEventListener('click', showHidePanel)
}

function showHidePanel(event)
{
    event.preventDefault();
    const constainerDiv = event.target.closest('.problem')
    const panelDiv = constainerDiv.querySelector('.panel-body')
    panelDiv.classList.toggle("hidden");
    const iconButtons = constainerDiv.querySelectorAll(".material-symbols-outlined");
    for (const btnIcon of iconButtons) {
        btnIcon.classList.toggle('hidden');
    }
}

// Main menu navigation
let currentActive = 0;
const mainLinks = document.querySelectorAll('nav > a');
for (const buttonLink of mainLinks) {
    buttonLink.addEventListener('click', mainMenuClick);
}

lastScrollY = 0;
NAV_HEIGHT = 60;
const topLevelElems = Array.from(document.querySelector('main').children);
topLevelElems.push(document.querySelector('footer'));

function mainMenuClick(e)
{
    e.preventDefault();
    const clickedLink = e.currentTarget;
    const fullHref = clickedLink.href;
    const href = fullHref.substring(fullHref.lastIndexOf('#'));
    if(href.trim() !== '#')
    {
        const gotoElement = document.querySelector(href);
        console.log(gotoElement.offsetTop - NAV_HEIGHT + 1);
        window.scrollTo({top: gotoElement.offsetTop - NAV_HEIGHT + 1, behavior: 'smooth'});
    }
    else
    {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('scroll', detectScroll);

function isWithin(element, threshold) { 
    console.log('iswithin');
    console.log(element, currentActive);
    return element.offsetTop <= threshold && element.offsetTop + element.offsetHeight > threshold;
} 

function detectScroll()
{
    const scrollY = (window.scrollY || window.pageYOffSet) !== undefined ? (window.scrollY || window.pageYOffSet) : 0;
    const visibleThreshold = scrollY + NAV_HEIGHT;
    console.log("threshold",visibleThreshold);

    const prevActiveSection = currentActive;
    const sameSection = isWithin(topLevelElems[currentActive], visibleThreshold);
    console.log("samesection", sameSection);
    const upScroll = (scrollY - lastScrollY) < 0;
    if(upScroll && !sameSection)
    {
        // Search for the active section
        while(!isWithin(topLevelElems[currentActive], visibleThreshold))
            currentActive--;
        mainLinks[prevActiveSection].classList.remove('active');
        mainLinks[currentActive].classList.add('active');
    }
    else if(!upScroll && !sameSection)
    {
        // Search for the active section
        while(!isWithin(topLevelElems[currentActive], visibleThreshold))
            currentActive++;
        mainLinks[prevActiveSection].classList.remove('active');
        mainLinks[currentActive].classList.add('active');
    }

    lastScrollY = scrollY;
}

const menuButton = document.querySelector('#dropdown');
const dropdownMenu = document.querySelector('.dropdown');
menuButton.addEventListener('click', toggleDropDown)

function toggleDropDown()
{
    dropdownMenu.classList.toggle('hidden');
}