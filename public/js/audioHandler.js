class AudioHandler {
    constructor(uuid){
        this.ulAudio = null;
        this.numAudios = 0;
        this.uuid = uuid;
    }

    async init(){
        this.ulAudio = document.getElementById('ulAudio');
        fetch('../api/list/index.html').then(r => r.json()).then(r => {
            r.files.forEach(audio => {
                this.addAudioFn(audio.filename, audio.date);
            });
        }); 
    }
    
    addAudioFn(idAudio, fechaAudio) {
        const img1 = document.createElement('img');
        const spanFecha = document.createElement('span');
        const img2 = document.createElement('img');
        img1.src = './img/copy.svg';
        spanFecha.innerText = moment(fechaAudio).calendar().toLocaleLowerCase();
        img2.src = './img/trash.svg';
        img1.onclick = () => this.copyAudio(idAudio);
        img2.onclick = () => this.deleteAudio(idAudio);
        
        const li = document.createElement('li');
        li.filename = idAudio;
        li.appendChild(img1);
        li.appendChild(spanFecha);
        li.appendChild(img2);
        
        this.ulAudio.appendChild(li);
        this.numAudios++;
    }

    copyAudio(idAudio){
        navigator.clipboard.writeText(`/play/${idAudio}`);
        Snackbar.show({ 
            text: 'La URL ha sido correctamente copiada al portapapeles.',
            pos: 'bottom-center',
            actionText: 'VALE',
            actionTextColor: '#F50158'
        });
    }

    deleteAudio(idAudio){
        fetch(`../api/delete/${this.uuid}/${idAudio}`).then(r => {
            console.log('Hecha petición de borrado.');
        });
    }
}

export { AudioHandler };