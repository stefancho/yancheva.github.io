
// close/open issue panels
const panels = document.querySelectorAll('.panel')
for (panel of panels) {
    panel.addEventListener('click', showHidePanel)
}

function showHidePanel(event)
{
    const constainerDiv = event.target.closest('.problem')
    const panelDiv = constainerDiv.querySelector('.panel-body')
    panelDiv.classList.toggle("hidden");
}


// let intro_section = document.querySelector('#intro');
// let about_section = document.querySelector('#about');
// let therapy_section = document.querySelector('#therapy');
// let footer = document.querySelector('footer');

// console.log(intro_section);
// console.log(about_section.offsetTop);
// console.log(therapy_section.offsetTop);
// console.log(footer.offsetTop);

// Main menu navigation
let currentActive = 0;
const mainLinks = document.querySelectorAll('nav > a');
for (const buttonLink of mainLinks) {
    buttonLink.addEventListener('click', mainMenuClick);
}

NAV_HEIGHT = 50;
const topLevelElems = Array.from(document.querySelector('main').children);
topLevelElems.push(document.querySelector('footer'));
console.log(topLevelElems);

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
        window.scrollTo(0, 1);
    }

    // mainLinks[currentActive].classList.remove('active');
    // clickedLink.classList.add('active');
    // currentActive = Array.from(mainLinks).indexOf(clickedLink);
}

window.addEventListener('scroll', detectScroll);

function isWithin(element, threshold) { 
    console.log(threshold);
    console.log(element.offsetTop, element.offsetHeight);
    return element.offsetTop <= threshold && element.offsetTop + element.offsetHeight > threshold;
} 

function detectScroll()
{
    const visibleThreshold = (window.scrollY || window.pageYOffSet) + NAV_HEIGHT;
    if(currentActive > 0 && isWithin(topLevelElems[currentActive - 1], visibleThreshold))
    {
        mainLinks[currentActive--].classList.remove('active');
        mainLinks[currentActive].classList.add('active');
    }
    else if(isWithin(topLevelElems[currentActive + 1], visibleThreshold))
    {
        mainLinks[currentActive++].classList.remove('active');
        mainLinks[currentActive].classList.add('active');
    }
}