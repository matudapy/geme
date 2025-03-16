// Matter.jsモジュールを取得
const { Engine, Render, Runner, Bodies, World, Body, Events, Composite, Mouse, MouseConstraint } = Matter;

// ゲーム設定
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const WALL_THICKNESS = 20;
const DROP_ZONE_Y = 100;
const GRAVITY = 1.2; // 少し重力を強くする
const FRUITS_COUNT = 10; // フルーツの種類数

// フルーツの設定 (サイズと点数)
const FRUITS = [
    { radius: 15, score: 1 },    // チェリー
    { radius: 25, score: 3 },    // ブドウ
    { radius: 35, score: 6 },    // ミカン
    { radius: 45, score: 10 },   // レモン
    { radius: 55, score: 15 },   // キウイ
    { radius: 65, score: 21 },   // 梨
    { radius: 75, score: 28 },   // 桃
    { radius: 85, score: 36 },   // パイナップル
    { radius: 95, score: 45 },   // メロン
    { radius: 105, score: 55 }   // スイカ
];

// フルーツの色
const FRUIT_COLORS = [
    '#ff6b6b',  // チェリー
    '#5f3dc4',  // ブドウ
    '#fd7e14',  // ミカン
    '#fab005',  // レモン
    '#82c91e',  // キウイ
    '#ff922b',  // 梨
    '#ff6b6b',  // 桃
    '#da77f2',  // パイナップル
    '#748ffc',  // メロン
    '#ff4d4d'   // スイカ
];

// フルーツ画像のパス（画像を使いたい場合はコメントアウトを解除して使用してください）
/*
const FRUIT_IMAGES = [
    'images/cherry.png',
    'images/grape.png',
    'images/orange.png',
    'images/lemon.png',
    'images/kiwi.png',
    'images/pear.png',
    'images/peach.png',
    'images/pineapple.png',
    'images/melon.png',
    'images/watermelon.png'
];
*/

// ゲーム状態
let engine;
let render;
let runner;
let currentFruitIndex;
let nextFruitIndex;
let currentFruit = null;
let isGameOver = false;
let score = 0;
let dropLock = false;
let lastFruitDropTime = 0;
let fruitCount = 0;
let gameStarted = false;

// DOM要素
const canvas = document.getElementById('game-canvas');
const scoreElement = document.getElementById('score');
const nextFruitDisplay = document.getElementById('next-fruit-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreElement = document.getElementById('final-score');
const retryButton = document.getElementById('retry-button');

// ゲーム初期化
function initGame() {
    // エンジンの作成
    engine = Engine.create({
        gravity: {
            x: 0,
            y: GRAVITY
        },
        constraintIterations: 3,  // 拘束反復回数を増やす
        positionIterations: 6,    // 位置反復回数を増やす
        velocityIterations: 4     // 速度反復回数を増やす
    });
    
    // レンダリングの設定
    render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            wireframes: false,
            background: '#ffffff'
        }
    });
    
    // ランナーの作成
    runner = Runner.create();
    
    // 壁の作成
    const walls = [
        // 底部
        Bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT + WALL_THICKNESS / 2, GAME_WIDTH, WALL_THICKNESS, { 
            isStatic: true,
            label: 'ground',
            render: { fillStyle: '#333333' }
        }),
        // 左壁
        Bodies.rectangle(-WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, { 
            isStatic: true,
            render: { fillStyle: '#333333' }
        }),
        // 右壁
        Bodies.rectangle(GAME_WIDTH + WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, { 
            isStatic: true,
            render: { fillStyle: '#333333' }
        })
    ];
    
    // ワールドに壁を追加
    World.add(engine.world, walls);
    
    // マウス操作の設定
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    // ゲーム状態の初期化
    score = 0;
    scoreElement.textContent = '0';
    isGameOver = false;
    dropLock = false;
    lastFruitDropTime = 0;
    fruitCount = 0;
    
    // 最初のフルーツを設定
    currentFruitIndex = Math.floor(Math.random() * 5); // 最初の5種類からランダム
    nextFruitIndex = Math.floor(Math.random() * 5);
    updateNextFruitDisplay();
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // レンダリングの開始
    Render.run(render);
}

// 衝突イベントの設定
function setupEventListeners() {
    // 衝突イベント
    Events.on(engine, 'collisionStart', (event) => {
        if (isGameOver) return;
        
        const pairs = event.pairs;
        
        for (let i = 0; i < pairs.length; i++) {
            const bodyA = pairs[i].bodyA;
            const bodyB = pairs[i].bodyB;
            
            // 同じタイプのフルーツが衝突した場合
            if (bodyA.fruitIndex !== undefined && bodyB.fruitIndex !== undefined && bodyA.fruitIndex === bodyB.fruitIndex) {
                // 同じIDのフルーツは合体させない（自分自身との衝突を防ぐ）
                if (bodyA.id === bodyB.id) continue;
                
                // 最近合体したフルーツは無視（連鎖反応を防ぐ）
                if (bodyA.recentlyMerged || bodyB.recentlyMerged) continue;
                
                if (bodyA.fruitIndex < FRUITS_COUNT - 1) {
                    // 合体して次のフルーツになる
                    const newIndex = bodyA.fruitIndex + 1;
                    const position = {
                        x: (bodyA.position.x + bodyB.position.x) / 2,
                        y: (bodyA.position.y + bodyB.position.y) / 2
                    };
                    
                    // 古いフルーツを削除
                    const toRemove = [bodyA, bodyB];
                    Composite.remove(engine.world, toRemove);
                    
                    // 新しいフルーツを作成
                    const newFruit = createFruit(newIndex, position.x, position.y);
                    
                    // 合体直後のフラグを設定（0.1秒後に解除）
                    newFruit.recentlyMerged = true;
                    setTimeout(() => {
                        newFruit.recentlyMerged = false;
                    }, 100);
                    
                    // スコアの更新
                    updateScore(FRUITS[newIndex].score);
                    
                    // 効果音再生 (実装する場合はここに追加)
                    // playSound('merge');
                }
            }
            
            // フルーツが天井に到達したかチェック
            if ((bodyA.label === 'fruit' && bodyB.label === 'ceiling') || 
                (bodyA.label === 'ceiling' && bodyB.label === 'fruit')) {
                if (!isGameOver) {
                    endGame();
                }
            }
        }
    });
    
    // キャンバスのクリックイベント
    canvas.addEventListener('click', (e) => {
        if (!gameStarted || isGameOver || dropLock) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // 既存のフルーツがあれば削除
        if (currentFruit) {
            World.remove(engine.world, currentFruit);
        }
        
        // フルーツのドロップ
        dropFruit(x);
    });
    
    // マウス移動イベント
    canvas.addEventListener('mousemove', (e) => {
        if (!gameStarted || isGameOver || dropLock || currentFruit === null) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // フルーツの位置を更新
        Body.setPosition(currentFruit, { x: Math.max(FRUITS[currentFruitIndex].radius, Math.min(GAME_WIDTH - FRUITS[currentFruitIndex].radius, x)), y: DROP_ZONE_Y });
    });
    
    // スタートボタンイベント
    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            startGame();
        }
    });
    
    // リセットボタンイベント
    resetButton.addEventListener('click', () => {
        resetGame();
    });
    
    // リトライボタンイベント
    retryButton.addEventListener('click', () => {
        gameOverModal.style.display = 'none';
        resetGame();
    });
    
    // ゲーム上部での衝突検出
    const ceilingDetector = Bodies.rectangle(GAME_WIDTH / 2, DROP_ZONE_Y + 50, GAME_WIDTH, 5, {
        isStatic: true,
        isSensor: true,
        label: 'ceiling',
        render: { 
            fillStyle: 'rgba(255, 255, 255, 0)' // 透明
        }
    });
    
    World.add(engine.world, ceilingDetector);
}

// フルーツの作成
function createFruit(index, x, y, isControlled = false) {
    const fruit = Bodies.circle(x, y, FRUITS[index].radius, {
        fruitIndex: index,
        label: 'fruit',
        restitution: 0.5, // 反発係数を上げる
        friction: 0.05,   // 摩擦を少し増やす
        density: 0.002,   // 密度を少し上げる
        render: {
            fillStyle: FRUIT_COLORS[index],
            // 画像を使用する場合はこちらを使用
            // sprite: {
            //     texture: FRUIT_IMAGES[index],
            //     xScale: (FRUITS[index].radius * 2) / 100,
            //     yScale: (FRUITS[index].radius * 2) / 100
            // }
        }
    });
    
    // ドロップゾーンのフルーツは静的に
    if (isControlled) {
        Body.setStatic(fruit, true);
        currentFruit = fruit;
    } else {
        // ドロップされたフルーツには衝撃を加えて動きを良くする
        Body.setAngularVelocity(fruit, (Math.random() - 0.5) * 0.05);
    }
    
    World.add(engine.world, fruit);
    return fruit;
}

// フルーツをドロップ
function dropFruit(x) {
    // ドロップのクールダウンチェック
    const now = Date.now();
    if (now - lastFruitDropTime < 500) return; // 0.5秒のクールダウン
    
    lastFruitDropTime = now;
    dropLock = true;
    
    if (!currentFruit) {
        console.error("currentFruit is null");
        dropLock = false;
        return;
    }
    
    // 速度にわずかなランダム性を追加して、同じ場所に落ちるのを防ぐ
    const randomVelocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: 0
    };
    
    // 静的状態を解除してドロップ
    Body.setStatic(currentFruit, false);
    Body.setVelocity(currentFruit, randomVelocity);
    fruitCount++;
    
    // 少し待ってから次のフルーツを準備
    setTimeout(() => {
        dropLock = false;
        currentFruitIndex = nextFruitIndex;
        nextFruitIndex = Math.floor(Math.random() * 5); // 最初の5種類からランダム
        updateNextFruitDisplay();
        
        // 落下するフルーツの数が10個を超えるたびに、新しいフルーツの種類を解放
        if (fruitCount % 10 === 0 && nextFruitIndex < 4) {
            nextFruitIndex = Math.min(4, nextFruitIndex + 1);
        }
        
        // 次のフルーツをドロップゾーンに配置
        currentFruit = createFruit(currentFruitIndex, x, DROP_ZONE_Y, true);
    }, 500);
}

// 次のフルーツ表示の更新
function updateNextFruitDisplay() {
    nextFruitDisplay.style.backgroundColor = FRUIT_COLORS[nextFruitIndex];
    nextFruitDisplay.style.width = `${FRUITS[nextFruitIndex].radius * 1.5}px`;
    nextFruitDisplay.style.height = `${FRUITS[nextFruitIndex].radius * 1.5}px`;
    nextFruitDisplay.style.borderRadius = '50%';
    
    // 画像を使用する場合はこちらを使用
    // nextFruitDisplay.style.backgroundImage = `url(${FRUIT_IMAGES[nextFruitIndex]})`;
}

// スコアの更新
function updateScore(points) {
    score += points;
    scoreElement.textContent = score;
}

// ゲームスタート
function startGame() {
    gameStarted = true;
    startButton.disabled = true;
    Runner.run(runner, engine);
    
    // 最初のフルーツを作成
    currentFruit = createFruit(currentFruitIndex, GAME_WIDTH / 2, DROP_ZONE_Y, true);
}

// ゲームリセット
function resetGame() {
    // 既存のエンジンをクリーンアップ
    World.clear(engine.world);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    
    // ゲームを再初期化
    initGame();
    
    if (gameStarted) {
        // 再度スタート
        startGame();
    }
    
    gameOverModal.style.display = 'none';
}

// ゲーム終了
function endGame() {
    isGameOver = true;
    Runner.stop(runner);
    
    // 最終スコアを表示
    finalScoreElement.textContent = score;
    gameOverModal.style.display = 'flex';
}

// ゲームの初期化
initGame();
