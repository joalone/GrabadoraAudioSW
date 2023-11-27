function uploadFn(){
    const uploadButton = document.createElement('button');
    const imageBtn = document.createElement('img');
    const spanBtn = document.createElement('span');
    imageBtn.src = './img/upload.svg';
    spanBtn.innerText = 'Subir';
    uploadButton.disabled = true;
    uploadButton.appendChild(imageBtn);
    uploadButton.appendChild(spanBtn);
    return uploadButton;
}

export { uploadFn };