function loadAudioFn() {
    fetch('../api/list/index.html').then(r => r.json()).then(r => {
        r.files.forEach(audio => {
            addAudioFn(audio.filename, audio.date);
        });
    })
}

function addAudioFn(idAudio, fechaAudio) {
    const img1 = document.createElement('img');
    const spanFecha = document.createElement('span');
    const img2 = document.createElement('img');
    img1.src = './img/copy.svg';
    spanFecha.innerText = moment(fechaAudio).calendar().toLocaleLowerCase();
    img2.src = './img/trash.svg';
    img1.onclick = () => copiarAudio(idAudio);
    img2.onclick = () => borrarAudio(idAudio);
    
    const li = document.createElement('li');
    li.filename = idAudio;
    li.appendChild(img1);
    li.appendChild(spanFecha);
    li.appendChild(img2);

    return li;
}

function copiarAudio(idAudio) {
    Clipboard.write(`/play/:${idAudio}`);
    Snackbar.show({ text: 'La URL ha sido correctamente copiada al portapapeles.' });
}

function borrarAudio(uuid, idAudio) {
    fetch(`../api/delete/${uuid}/${filename}`).then(r => {

    });
}

export { loadAudioFn, addAudioFn };