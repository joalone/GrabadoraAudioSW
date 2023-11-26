function playFn(){
    const playButton = document.createElement('button');
    const imageBtn = document.createElement('img');
    const spanBtn = document.createElement('span');
    imageBtn.src = './img/play.svg';
    spanBtn.innerText = 'Escuchar';
    playButton.disabled = true;
    playButton.appendChild(imageBtn);
    playButton.appendChild(spanBtn);
    return playButton;
}

export { playFn };