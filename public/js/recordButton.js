function recordFn(){
    const recordButton = document.createElement('button');
    const imageBtn = document.createElement('img');
    const spanBtn = document.createElement('span');
    imageBtn.src = './img/record.svg';
    spanBtn.innerText = 'Grabar';
    recordButton.appendChild(imageBtn);
    recordButton.appendChild(spanBtn);
    return recordButton;
}

export { recordFn };