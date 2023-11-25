import { recordFn } from './recordButton.js';
import { playFn } from './playButton.js';
import { uploadFn } from './uploadButton.js';
import { v4 } from '../utils/v4.js';

class App {
    constructor(audio, blob, state) {
        this.audio = audio;
        this.blob = blob;
        this.state = state;
        this.audioChunks = [];
        if (!localStorage.getItem("uuid")) localStorage.setItem("uuid", uuidv4()); 
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
    liRecordButton.innerHTML = recordFn();
    liPlayButton.innerHTML = playFn();
    liUploadButton.innerHTML = uploadFn();

    fetch('../api/list').then(r => {
        // PENDIENTE
    })

    fetch(`../api/delete/${uuid}/${filename}`).then(r => {
        // PENDIENTE
    })
}

window.onload = main;