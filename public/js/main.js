import { recordFn  } from './recordButton.js';
import { playFn } from './playButton.js';
import { uploadFn } from './uploadButton.js';
import { AudioHandler } from './liAudio.js';
import v4 from '../utils/uuid/v4.js';

class App {
    constructor() { // Constructor
        this.audio = null; // Reproductor de audio, se inicializa en initAudio
        this.mediaRecorder = null; // Grabador de audio, se inicializa en initRecord
        this.recordButton = null; // Botón de grabar del formulario, se inicializa en init
        this.playButton = null; // Botón de reproducir del formulario, se inicializa en init
        this.uploadButton = null; // Botón de subir del formulario, se inicializa en init
        this.state = []; // Estado, nos interesa isRecording e isPlaying
        this.audioChunks = []; // Chunks de datos grabados del audio actual
        this.blob = new Blob(this.audioChunks, { type: 'audio/wav' }); // Último audio grabado
        if (!localStorage.getItem('uuid')) localStorage.setItem('uuid', v4());
        this.uuid = localStorage.getItem('uuid'); // Identifica al usuario actual
        this.audioHandler = null; // Se encargará de añadir audios a la lista
        this.recordingTime = MAX_RECORD_TIME; // Para controlar que no exceda el límite
        this.recordingInterval = null; // Para parar el contador de tiempo
    }

    async init() { // Inicializa todo, se debe invocar al cargar la ventana
        const liPlayButton = document.getElementById('liPlayButton');
        const liRecordButton = document.getElementById('liRecordButton');
        const liUploadButton = document.getElementById('liUploadButton');
        
        this.recordButton = recordFn();
        this.playButton = playFn();
        this.uploadButton = uploadFn();
        liRecordButton.appendChild(this.recordButton);
        liPlayButton.appendChild(this.playButton);
        liUploadButton.appendChild(this.uploadButton);
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.initAudio();
        this.initRecord(stream);

        this.setState({ isRecording: false, isPlaying: false, recordCache: false });

        moment.locale('es');
        this.audioHandler = new AudioHandler();
        this.audioHandler.init();
    }

    initAudio() { // Inicializa el audio, es llamado por this.init
        this.audio = new Audio();
        this.audio.hidden = true;
        document.body.appendChild(this.audio);
        this.audio.onloadedmetadata = () => console.log('Metadatos del audio cargados.');
        this.audio.ondurationchange = () => console.log('Duración del audio cambiada.');
        this.audio.ontimeupdate = () => {
            console.log('Tiempo de reproducción actualizado.');
            this.setState();
        }
        this.audio.onended = () => {
            console.log('Reproducción del audio finalizada.');
            this.stopAudio();
        };
    }

    initRecord(stream) { // Inicializa la grabadora, es llamado por this.init
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) =>  this.record(event.data);
        this.mediaRecorder.onstop = () => this.loadBlob();
    }

    loadBlob() {
        this.blob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audio.src = URL.createObjectURL(this.blob);
    }

    record(data) {
        this.audioChunks.push(data);
    }

    startRecording() {
        this.audioChunks = [];
        this.loadBlob();
        this.mediaRecorder.start();
        this.setState({ isRecording: true });
        this.recordingTime = MAX_RECORD_TIME;
        this.recordingInterval = setInterval(() => {
            this.recordingTime--;
            if(this.recordingTime <= 0) {
                this.stopRecording();
            } else {
                this.setState();
            }
        }, 1000);
    }

    stopRecording() {
        this.mediaRecorder.stop();
        clearInterval(this.recordingInterval);
        this.recordingTime = MAX_RECORD_TIME;
        this.setState({ isRecording: false, recordCache: true });
    }

    playAudio() {
        this.audio.play();
        this.setState({ isPlaying: true });
    }

    stopAudio() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.setState({ isPlaying: false });
    }

    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.render();
    }

    render() {
        var isRecording = this.state.isRecording;
        var isPlaying = this.state.isPlaying;
        if(isRecording && isPlaying){
            this.setState({ isPlaying: false });
            return;
        }
        let recordTime = this.#toMinSeconds(this.recordingTime);
        if(this.state.isRecording) {
            this.playButton.disabled = true;
            this.uploadButton.disabled = true;
            this.recordButton.children[1].innerText = `Parar (${recordTime})`;
            this.recordButton.onclick = () => this.stopRecording();
            this.recordButton.children[0].src = './img/stop.svg';
        } else {  
            if(this.state.recordCache){
                this.playButton.disabled = false;
                this.uploadButton.disabled = false;
                this.recordButton.children[0].src = './img/arrow-clockwise.svg';
            }
            this.recordButton.children[1].innerText = `Grabar (${recordTime})`;
            this.recordButton.onclick = () => this.startRecording();
        }
        let playTime = this.#toMinSeconds(this.audio.currentTime) || 0;
        if(this.state.isPlaying) {
            this.playButton.children[1].innerText = `Parar (${playTime})`;
            this.playButton.onclick = () => this.stopAudio();
            this.playButton.children[0].src = './img/stop.svg';
        } else {
            this.playButton.children[1].innerText = `Escuchar (${playTime})`;
            this.playButton.onclick = () => this.playAudio();
            this.playButton.children[0].src = './img/play.svg';
        }
    }

    #toMinSeconds(time){
        let minutes = Math.floor(time/60);
        let seconds = ("00" + (Math.floor(time)%60)).slice(-2);
        
        return `${minutes}:${seconds}`;
    }

    upload() {
        this.setState({ uploading: true });
        const body = new FormData();
        body.append('recording', this.blob);
        fetch('/api/upload/' + this.uuid, {
            method: 'POST',
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

}

const MAX_RECORD_TIME = 300; // En segundos
const app = new App();
window.onload = app.init();