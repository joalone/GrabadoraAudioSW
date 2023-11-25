import { recordFn } from './recordButton.js';
import { playFn } from './playButton.js';
import { uploadFn } from './uploadButton.js';
import v4 from '../utils/uuid/v4.js';

class App {
    constructor(audio, blob, state) {
        this.audio = audio;
        this.blob = blob;
        this.state = state;
        this.audioChunks = [];
        if (!localStorage.getItem("uuid")) localStorage.setItem("uuid", v4()); 
        this.uuid = localStorage.getItem("uuid");
    }

    async init() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        initaudio();
        initRecord(stream);
    }

    initAudio() {
        this.audio = Audio();
        this.audio.onloadedmetadata = function () {
            console.log("Metadata cargada");
        };
        this.audio.ondurationchange = function () {
            console.log("Duración del audio ha cambiado ");
        };
        this.audio.ontimeupdate = function () {
            setState();
            console.log("Tiempo de reproducción actual");
        };
        this.audio.onended = function () {
            console.log("Reproducción del audio ha finalizado");
        };
    }

    loadBlob() {
        const audioUrl = URL.createObjectURL(this.blob);
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = audioUrl;
    }

    initRecord(stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                console.log('Datos disponibles:', event.data);
            }
        }
        mediaRecorder.onstop = () => {
            console.log('Grabación detenida');
            this.blob = new Blob(this.audioChunks, { type: 'audio/wav' });
            loadBlob();
        };

    }

    record() {
        // PENDIENTE
    }

    stopRecording() {
        // PENDIENTE
    }

    playAudio() {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.playAudio();
    }

    stopAudio() {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.stopAudio();
    }

    upload() {
        this.setState({ uploading: true });
        const body = new FormData();
        body.append("recording", this.blob);
        fetch("/api/upload/" + this.uuid, {
            method: "POST",
            body,
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    files: json.files,
                    uploading: false,
                    uploaded: true,
                });
            })
            .catch((err) => {
                this.setState({ error: true });
            });
    }

    deleteFile() {
        // PENDIENTE
    }

    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.render();
    }

    render() {
        // PENDIENTE
    }

}

function main() {
    const liRecordButton = document.getElementById('liRecordButton');
    const liPlayButton = document.getElementById('liPlayButton');
    const liUploadButton = document.getElementById('liUploadButton');
    
    liRecordButton.onclick = recordFn();
    liPlayButton.onclick = playFn();
    liUploadButton.onclick = uploadFn();

    moment.locale('es');

    fetch('../api/list/index.html').then(r=>r.json()).then(r => {
        r.files.forEach(audio => {
            console.log(audio);
            introducirAudio(audio.filename, audio.date);
        });
    })

    console.log('hola')

    fetch(`../api/delete/${uuid}/${filename}`).then(r => {
        
    })
}

// PENDIENTE DE LLAMAR Y PROBAR
function introducirAudio(idAudio, fechaAudio){
    const img1 = document.createElement('image');
    const spanFecha = document.createElement('span');
    const img2 = document.createElement('image');
    
    img1.src='./img/copy.svg';
    spanFecha.innerText = moment(fechaAudio).calendar().toLocaleLowerCase();
    img2.src='./img/trash.svg';
    img1.onclick = function(){
        copiarAudio(idAudio);
    }
    img2.onclick = function(){
        borrarAudio(idAudio);
    }

    const li = document.createElement('li');
    li.filename = idAudio;
    li.appendChild(img1);
    li.appendChild(spanFecha);
    li.appendChild(img2);

    console.log(li);
    const listaAudios = document.getElementById('audioList');
    listaAudios.appendChild(li);
}

function copiarAudio(idAudio){
    Clipboard.write(`/play/:${idAudio}`);
    Snackbar.show({text: 'La URL ha sido correctamente copiada al portapapeles.'});
}

function borrarAudio(idAudio){
    fetch(`/api/delete/${app.uuid}/${idAudio}`);
}

var numAudios = 0;
const PORT = 3000;
const URL = `https://localhost:${PORT}`;
const app = new App();
window.onload = main;