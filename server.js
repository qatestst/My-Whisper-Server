const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/transcribe', upload.single('audio'), (req, res) => {
    const filePath = req.file.path;
    const outputFilePath = filePath +'.txt';

    exec(`whisper.exe ${filePath} -o ${"./uploads"} --output_format txt` , (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error transcribing audio.' });
        }

        fs.readFile( outputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error: ${err.message}`);
                return res.status(500).json({ error: 'Error reading transcription file.' });
            }

            res.json({ transcription: data });

            fs.unlink(filePath, err => {
                if (err) console.error(`Error deleting audio file: ${err.message}`);
            });
            fs.unlink(outputFilePath, err => {
                if (err) console.error(`Error deleting output file: ${err.message}`);
            });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});