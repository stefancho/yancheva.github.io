lastScrollY = 0;
const topLevelElems = [];
topLevelElems.push(document.querySelector('#intro'));
topLevelElems.push(document.querySelector('#about'));
topLevelElems.push(document.querySelector('#therapy'));
topLevelElems.push(document.querySelector('#gallery'));
topLevelElems.push(document.querySelector('footer'));


window.addEventListener('scroll', detectScroll);

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

function isWithin(element, threshold) { 
    // console.log('iswithin');
    // console.log(element, currentActive);
    return element.offsetTop <= threshold && element.offsetTop + element.offsetHeight > threshold;
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