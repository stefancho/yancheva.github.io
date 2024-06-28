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

lastScrollY = 0;
NAV_HEIGHT = 60;
const topLevelElems = [];
topLevelElems.push(document.querySelector('#intro'));
topLevelElems.push(document.querySelector('#about'));
topLevelElems.push(document.querySelector('#therapy'));
topLevelElems.push(document.querySelector('#gallery'));
topLevelElems.push(document.querySelector('footer'));

function mainMenuClick(e)
{
    e.preventDefault();
    const clickedLink = e.currentTarget;
    const fullHref = clickedLink.href;
    const href = fullHref.substring(fullHref.lastIndexOf('#'));
    const isDropDown = clickedLink.parentElement.classList.contains('dropdown');
    if(href.trim() !== '#')
    {
        const gotoElement = document.querySelector(href);
        // console.log(gotoElement.offsetTop - NAV_HEIGHT + 1);
        if(isDropDown)
            dropdownMenu.classList.add('hidden');
        window.scrollTo({top: gotoElement.offsetTop - NAV_HEIGHT + 1, behavior: 'smooth'});
    }
    else
    {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('scroll', detectScroll);

function isWithin(element, threshold) { 
    // console.log('iswithin');
    // console.log(element, currentActive);
    return element.offsetTop <= threshold && element.offsetTop + element.offsetHeight > threshold;
} 

function detectScroll()
{
    const scrollY = (window.scrollY || window.pageYOffSet) !== undefined ? (window.scrollY || window.pageYOffSet) : 0;
    const visibleThreshold = scrollY + NAV_HEIGHT;
    // console.log("threshold",visibleThreshold);

    if(!isValidSection(currentActive))
    {
        const elem = getThresholdElement(visibleThreshold);
        if(elem){
            currentActive = topLevelElems.indexOf(elem);
            mainLinks[currentActive].classList.add('active');
        }
    }
    else
    {
        const prevActiveSection = currentActive;
        const upScroll = (scrollY - lastScrollY) < 0;
        //search up or down with respect to currently active section
        while(isValidSection(currentActive) && !isWithin(topLevelElems[currentActive], visibleThreshold))
            (upScroll) ? currentActive-- : currentActive++;

        if(currentActive !== prevActiveSection){
            mainLinks[prevActiveSection].classList.remove('active');
            if(isValidSection(currentActive)){
                mainLinks[currentActive].classList.add('active');
            }
            else{
                currentActive = undefined;
            }
        }
    }
        
    lastScrollY = scrollY;
}

function getThresholdElement(screenY)
{
    // console.log('start getThresholdElement');
    for (const elem of topLevelElems) {
        // console.log(elem);
        if(isWithin(elem, screenY)){
            return elem;
        }
    }
    // console.log('end getThresholdElement');
    return undefined;
}

function isValidSection(sectionIndex)
{
    return sectionIndex >= 0 && sectionIndex < topLevelElems.length;
}

const menuButton = document.querySelector('#dropdown');
const dropdownMenu = document.querySelector('.dropdown');
menuButton.addEventListener('click', toggleDropDown)

function toggleDropDown()
{
    dropdownMenu.classList.toggle('hidden');
}