function clearList(className) {
    document.getElementsByClassName(className)[0].innerHTML = '';
}

function showHTMLElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideHTMLElement(id) {
    document.getElementById(id).style.display = 'none';
}

function hideHTMLElementByClassName(className) {
    document.getElementsByClassName(className)[0].style.display = 'none';
}

export {
    clearList,
    showHTMLElement,
    hideHTMLElement,
    hideHTMLElementByClassName,
};
