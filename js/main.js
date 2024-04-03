
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