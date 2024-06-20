let model, webcam, maxPredictions, labelContainer, indicatorCircles;

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    console.log("Predictions: ", prediction);  // 예측 결과 로깅

    // 모든 원을 초기 회색으로 설정
    indicatorCircles.forEach(circle => {
        circle.style.backgroundColor = "grey";
    });

    // 메시지 출력을 위한 초기화
    if (labelContainer.children[0]) {
        labelContainer.children[0].innerHTML = "";  // 기존 내용을 초기화
    }

    // 예측된 각 클래스의 확률에 따라 불이 들어오는 원의 개수 및 메시지를 설정
    for (let i = 0; i < maxPredictions; i++) {
        const probability = prediction[i].probability.toFixed(2);
        if (i === 0) {  // 클래스 0에 대한 조건만 확인
            console.log("Class 0 probability: ", probability);  // 확률 로깅
            if (probability >= 0.95) {
                fillCircles(5);
                addMessage(" 완 벽 합 니 다.");
            } else if (probability >= 0.8) {
                fillCircles(4);
                addMessage(" 하 나 만  더  찾 으 세 요");
            } else if (probability >= 0.6) {
                fillCircles(3);
                addMessage(" 거 의  다  왔 어 요");
            } else if (probability >= 0.4) {
                fillCircles(2);
                addMessage(" 조 금 만  더  생 각 해 봐 요");
            } else if (probability >= 0.2) {
                fillCircles(1);
                addMessage(" 분 발 하 셔 야  합 니 다");
            }
        }
    }
}





let isPlaying = true;  // 웹캠이 현재 재생 중인지 추적하는 플래그

document.getElementById('controlButton').addEventListener('click', function() {
    if (isPlaying) {
        webcam.pause();  // 웹캠 일시 정지
        this.textContent = '다 시 시 작';  // 버튼 텍스트 변경
        isPlaying = false;  // 플래그 업데이트
    } else {
        webcam.play();  // 웹캠 재시작
        this.textContent = '일 시 정 지';  // 버튼 텍스트 변경
        isPlaying = true;  // 플래그 업데이트
    }
});










function fillCircles(count) {
    for (let i = 0; i < count; i++) {
        indicatorCircles[i].style.backgroundColor = "blue";
    }
}

function addMessage(message) {
    if (labelContainer.children[0]) {
        labelContainer.children[0].innerHTML += message;
    }
}


async function init() {
    const modelURL = 'https://teachablemachine.withgoogle.com/models/nozp-LX8W/model.json';
    const metadataURL = 'https://teachablemachine.withgoogle.com/models/nozp-LX8W/metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(323, 323, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-container').appendChild(webcam.canvas);
    labelContainer = document.getElementById('label-container');

    // labelContainer 내에 각 클래스의 라벨을 동적으로 생성
    for (let i = 0; i < maxPredictions; i++) {
        const div = document.createElement('div');
        labelContainer.appendChild(div);
    }

    // 원들의 DOM 요소를 가져와서 indicatorCircles에 할당
    indicatorCircles = document.querySelectorAll('.circle');
}

function loop() {
    webcam.update(); // 웹캠 업데이트
    predict(); // 예측 실행
    window.requestAnimationFrame(loop); // 반복 실행
}

document.addEventListener('DOMContentLoaded', init);
