document.addEventListener('keydown', (ev) => {
    const key = ev.key;
    const element = document.querySelector(
        '[data="' + key.toUpperCase() + '"]'
    );
    if (key.length == 1 && !sketch.selectionKeys) return;
    if (element) element.classList.add('active');
});

document.addEventListener('keyup', (ev) => {
    const key = ev.key;
    const element = document.querySelector(
        '[data="' + key.toUpperCase() + '"]'
    );
    if (key.length == 1 && !sketch.selectionKeys) return;
    if (element) element.classList.remove('active');
});

document.addEventListener('click', (e) => {
    const value = e.target.getAttribute("data");
    if (value) sketch.keybindings(value);
})
