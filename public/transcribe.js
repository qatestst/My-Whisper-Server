
// Първи вариант на кода
// Code without timer
/* 
document.getElementById('transcribeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('audioFile');
    if (fileInput.files.length === 0) {
        alert('Моля, изберете аудио файл.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('audio', file);

    fetch('/transcribe', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('transcriptionResult').textContent = data.transcription;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}); */

// adding a timer - code with timer
// Втори вариан на Кода - добавя таймер и бутон "Изчисти", който нулира таймера и такстовото поле, в което е транскрибирания текст
/* let timerInterval;

document.getElementById('transcribeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('audioFile');
    if (fileInput.files.length === 0) {
        alert('Моля, изберете аудио файл.');
        return;
    }

    // Start the timer
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

        // Update the timer display on the HTML page
        document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('audio', file);

    fetch('/transcribe', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('transcriptionResult').textContent = data.transcription;

        // Stop the timer
        clearInterval(timerInterval);
    })
    .catch(error => {
        console.error('Error:', error);

        // Stop the timer
        clearInterval(timerInterval);
    });

// бутон за изчистване на текстовото поле с резултатите и таймера
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('transcriptionResult').value = '';
    document.getElementById('timer').textContent = '0:0:0';
    clearInterval(timerInterval);
});
});
 */

// Трети вариант - деактивира бутона "Транскрибирай", след като е натиснат веджън и се активира отново когато транскрибирането завърши или има грешка
// Това предотвратява многократно натискане на бутона и изпращане на множество идентични заявки към сървъра, които го наводняват
document.getElementById('transcribeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('audioFile');
    const transcribeButton = document.getElementById('transcribeButton');

    if (fileInput.files.length === 0) {
        alert('Моля, изберете аудио файл.');
        return;
    }

    // Disable the button
    transcribeButton.disabled = true;

    // Start the timer
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

        // Update the timer display on the HTML page
        document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('audio', file);

    fetch('/transcribe', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('transcriptionResult').textContent = data.transcription;

        // Stop the timer
        clearInterval(timerInterval);

        // Enable the button
        transcribeButton.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);

        // Stop the timer
        clearInterval(timerInterval);

        // Enable the button
        transcribeButton.disabled = false;
    });

// бутон за изчистване на цялата страница чрез рефреш
document.getElementById('clearButton').addEventListener('click', () => {
    // Refresh the page
    location.reload();
});

});
