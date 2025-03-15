// クイズのデータ
const quizData = [
    {
        question: '日本の首都は？',
        options: ['大阪', '東京', '京都', '名古屋'],
        correctAnswer: '東京',
        explanation: '日本の首都は東京です。1868年に江戸から東京に改名されました。'
    },
    {
        question: '1 + 1 = ?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: '1に1を足すと2になります。'
    },
    {
        question: '地球から最も近い惑星は？',
        options: ['火星', '木星', '水星', '金星'],
        correctAnswer: '金星',
        explanation: '地球から最も近い惑星は金星です。太陽系の中で地球に次いで2番目に位置しています。'
    },
    {
        question: '「こんにちは」を英語で言うと？',
        options: ['Good morning', 'Good night', 'Hello', 'Goodbye'],
        correctAnswer: 'Hello',
        explanation: '「こんにちは」の英語表現は「Hello」です。'
    },
    {
        question: '日本の国花は？',
        options: ['桜', 'チューリップ', '梅', 'ひまわり'],
        correctAnswer: '桜',
        explanation: '日本の国花は桜（ソメイヨシノなど）とされています。春の象徴として広く親しまれています。'
    },
    {
        question: 'サッカーのワールドカップで最も多く優勝している国は？',
        options: ['ドイツ', 'イタリア', 'アルゼンチン', 'ブラジル'],
        correctAnswer: 'ブラジル',
        explanation: 'ブラジルは5回の優勝を誇り、サッカーワールドカップで最も成功している国です。'
    },
    {
        question: '次のうち、哺乳類でないのは？',
        options: ['イルカ', 'コウモリ', 'ペンギン', 'クジラ'],
        correctAnswer: 'ペンギン',
        explanation: 'ペンギンは鳥類です。イルカ、コウモリ、クジラはすべて哺乳類です。'
    },
    {
        question: '「Romeo and Juliet」を書いた作家は？',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
        explanation: '「ロミオとジュリエット」はウィリアム・シェイクスピアによって書かれた悲劇です。'
    }
];

// DOM要素
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const explanationText = document.getElementById('explanation-text');
const nextContainer = document.getElementById('next-container');
const nextButton = document.getElementById('next-button');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const timeLeftSpan = document.getElementById('time-left');
const timerProgress = document.getElementById('timer-progress');
const finalScoreSpan = document.getElementById('final-score');
const finalTotalSpan = document.getElementById('final-total');
const finalMessageSpan = document.getElementById('final-message');
const restartButton = document.getElementById('restart-button');

// ゲーム変数
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
const questionsPerGame = 5; // 1ゲームの問題数

// シャッフル関数
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ゲーム開始
function startGame() {
    startScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    endScreen.classList.add('hidden');
    
    // 問題をシャッフルして最初の5問を選択
    shuffledQuestions = shuffleArray(quizData).slice(0, questionsPerGame);
    currentQuestionIndex = 0;
    score = 0;
    
    // 表示を更新
    updateDisplay();
    
    // 最初の問題を表示
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    
    // タイマー開始
    startTimer();
}

// 問題表示
function showQuestion(questionData) {
    // 問題テキスト
    questionText.textContent = questionData.question;
    
    // 選択肢をクリア
    optionsContainer.innerHTML = '';
    
    // 選択肢を表示
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsContainer.appendChild(button);
    });
    
    // 結果と次へボタンを非表示
    resultContainer.classList.add('hidden');
    nextContainer.classList.add('hidden');
    
    // 進行状況更新
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = shuffledQuestions.length;
    scoreSpan.textContent = score;
}

// 回答処理
function selectAnswer(selectedOption) {
    // タイマー停止
    clearInterval(timer);
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // 結果の表示
    resultContainer.classList.remove('hidden');
    if (isCorrect) {
        resultContainer.classList.add('correct');
        resultContainer.classList.remove('incorrect');
        resultText.textContent = '正解です！';
        score++;
        scoreSpan.textContent = score;
    } else {
        resultContainer.classList.add('incorrect');
        resultContainer.classList.remove('correct');
        resultText.textContent = '不正解です！';
    }
    
    // 説明の表示
    explanationText.textContent = currentQuestion.explanation;
    
    // 選択肢の色を変更
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
        
        if (option.textContent === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // 次へボタンを表示
    nextContainer.classList.remove('hidden');
    nextButton.textContent = 
        currentQuestionIndex < shuffledQuestions.length - 1 ? '次の問題へ' : '結果を見る';
}

// 時間切れ処理
function timeUp() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === shuffledQuestions[currentQuestionIndex].correctAnswer) {
            option.classList.add('correct');
        }
    });
    
    // 結果の表示
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('incorrect');
    resultContainer.classList.remove('correct');
    resultText.textContent = '時間切れです！';
    explanationText.textContent = shuffledQuestions[currentQuestionIndex].explanation;
    
    // 次へボタンを表示
    nextContainer.classList.remove('hidden');
    nextButton.textContent = 
        currentQuestionIndex < shuffledQuestions.length - 1 ? '次の問題へ' : '結果を見る';
}

// タイマー開始
function startTimer() {
    // タイマーリセット
    timeLeft = 15;
    timeLeftSpan.textContent = timeLeft;
    timerProgress.style.width = '100%';
    timerProgress.style.backgroundColor = '#2ecc71'; // 緑色
    
    // タイマー開始
    timer = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        
        // タイマーバーの進行
        const percentage = (timeLeft / 15) * 100;
        timerProgress.style.width = `${percentage}%`;
        
        // タイマーの色変更
        if (timeLeft <= 5) {
            timerProgress.style.backgroundColor = '#e74c3c'; // 赤色
        } else if (timeLeft <= 10) {
            timerProgress.style.backgroundColor = '#f39c12'; // 黄色
        }
        
        // 時間切れ
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// 次の問題へ
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    } else {
        endGame();
    }
}

// ゲーム終了
function endGame() {
    quizContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    finalScoreSpan.textContent = score;
    finalTotalSpan.textContent = shuffledQuestions.length;
    
    // 結果メッセージ
    if (score === shuffledQuestions.length) {
        finalMessageSpan.textContent = '完璧です！素晴らしい！';
    } else if (score >= shuffledQuestions.length / 2) {
        finalMessageSpan.textContent = 'よくできました！';
    } else {
        finalMessageSpan.textContent = 'もう一度挑戦してみましょう！';
    }
}

// 表示の更新
function updateDisplay() {
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = shuffledQuestions.length;
    scoreSpan.textContent = score;
}

// イベントリスナー
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startGame);

// 初期表示
totalQuestionsSpan.textContent = questionsPerGame;