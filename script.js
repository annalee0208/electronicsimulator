document.addEventListener('DOMContentLoaded', async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/IHFCPocsu/";
    let recognizer;

    async function createModel() {
        const checkpointURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        recognizer = speechCommands.create("BROWSER_FFT", undefined, checkpointURL, metadataURL);
        await recognizer.ensureModelLoaded();
        return recognizer;
    }

    recognizer = await createModel(); // 모델을 페이지 로드 시 미리 로드합니다.

    function updateResults(result) {
        const scores = result.scores;
        const classLabels = recognizer.wordLabels();
        const labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '';
        let stopRecording = false;

        classLabels.forEach((label, i) => {
            if (scores[i] > 0.8) {
                switch(label) {
                    case 'Class 2': window.location.href = '1. first.html'; break;
                    case 'Class 3': window.location.href = '2. seo.html'; break;
                    case 'Class 4': window.location.href = '3. third.html'; break;
                    case 'Class 5': window.location.href = '4. fourth.html'; break;
                    case 'Class 6': window.location.href = '5. fifth.html'; break;
                }
                stopRecording = true;
            }
        });

        if (stopRecording) {
            recognizer.stopListening();
            document.getElementById('status').innerHTML = "녹음 완료";
            document.getElementById('status').className = 'stopped';
        }
    }

    const startImage = document.getElementById('startImage');
    const set1 = document.getElementById('set1');
    const set2 = document.getElementById('set2');
    const img0 = document.getElementById('img0');

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');

    let firstClick = true;

    startImage.addEventListener('click', () => {
        if (firstClick) {
            startImage.src = "main/main-1.gif";
            set1.style.display = 'block';
            set2.style.display = 'block';
            firstClick = false; // 이후에는 set1과 set2를 표시하지 않음
        }
    });

    set1.addEventListener('click', () => {
        startImage.src = "main/main-2.gif";
        set1.style.display = 'none';
        set2.style.display = 'none';

        const statusElement = document.getElementById('status');
        statusElement.innerHTML = "녹음 중...";
        statusElement.className = 'recording';

        recognizer.listen(updateResults, {
            includeSpectrogram: true,
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50
        });
    });

    set2.addEventListener('click', () => {
        img0.style.display = 'block';
        img1.style.display = 'block';
        img2.style.display = 'block';
        img3.style.display = 'block';
        img4.style.display = 'block';
        img5.style.display = 'block';
        set1.style.display = 'none';
        set2.style.display = 'none';
    });

    [img1, img2, img3, img4, img5].forEach((img, index) => {
        img.addEventListener('click', () => {
            console.log(`Image ${index + 1} clicked`);
            switch(index) {
                case 0: window.location.href = '1. first.html'; break;
                case 1: window.location.href = '2. seo.html'; break;
                case 2: window.location.href = '3. third.html'; break;
                case 3: window.location.href = '4. fourth.html'; break;
                case 4: window.location.href = '5. fifth.html'; break;
            }
        });
    });
});
