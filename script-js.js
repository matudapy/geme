// 星座データとアイコン
const zodiacData = {
    aries: {
        name: "おひつじ座",
        icon: '<i class="fas fa-fire"></i>',
        fortuneText: [
            "今日は新しいことに挑戦するのに最適な日です。思い切った行動が吉と出ています。あなたの情熱が周りの人を動かす力になるでしょう。",
            "周りの人とのコミュニケーションが活発になる日。あなたの言葉が人を動かす力を持ちます。積極的に意見を伝えてみましょう。",
            "体力が充実し、エネルギッシュに過ごせる一日。スポーツや体を動かすことで運気アップ！内なる炎を燃やし続けることが成功への鍵です。"
        ],
        luckyColors: ["炎のような赤", "情熱的なオレンジ", "輝くゴールド", "深紅色"],
        luckyItems: ["スポーツ用品", "キーホルダー", "赤い小物", "ヘッドフォン", "キャンドル"]
    },
    taurus: {
        name: "おうし座",
        icon: '<i class="fas fa-seedling"></i>',
        fortuneText: [
            "安定と落ち着きが得られる日。計画的に物事を進めることで成功への道が開けます。地に足をつけた判断があなたを導きます。",
            "金運が上昇中。堅実な投資や貯蓄を始めるのに良い時期かもしれません。長期的な視点で物事を考えると良い結果に繋がります。",
            "自然との触れ合いがあなたに幸運をもたらします。少し外に出てリフレッシュしましょう。大地のエネルギーがあなたを癒すでしょう。"
        ],
        luckyColors: ["大地の緑", "落ち着いたブラウン", "優しいアイボリー", "森林グリーン"],
        luckyItems: ["観葉植物", "お財布", "心地よい香り", "陶器", "ナチュラル素材のアクセサリー"]
    },
    gemini: {
        name: "ふたご座",
        icon: '<i class="fas fa-wind"></i>',
        fortuneText: [
            "好奇心を満たす発見がある日。新しい情報や知識があなたの視野を広げてくれるでしょう。多方面に興味を持つことで思わぬチャンスが訪れます。",
            "コミュニケーション能力が高まっています。大切な話し合いや交渉事は今日がチャンス！言葉の力を最大限に活用して表現してみましょう。",
            "多方面での活躍が期待できる日。いくつかの物事を同時進行させても上手くいきそうです。柔軟な思考とアイデアが周囲から評価されるでしょう。"
        ],
        luckyColors: ["明るい黄色", "爽やかな水色", "輝くシルバー", "パステルブルー"],
        luckyItems: ["本", "スマートフォン", "メモ帳", "双子モチーフの小物", "風鈴"]
    },
    cancer: {
        name: "かに座",
        icon: '<i class="fas fa-water"></i>',
        fortuneText: [
            "家族や親しい人との絆が深まる日。心温まる時間を過ごせるでしょう。感情の波を大切にし、自分の気持ちに素直になると良いことがあります。",
            "直感が冴える日。あなたの感覚を信じて行動することで良い結果につながります。月の光があなたの感性を高めてくれるでしょう。",
            "思いやりの心が人を助け、その行為があなた自身にも幸せをもたらすでしょう。優しさと包容力があなたの魅力を一層引き立てます。"
        ],
        luckyColors: ["月明かりの白", "パールホワイト", "優しいライトブルー", "シルバーグレー"],
        luckyItems: ["思い出の品", "お気に入りのマグカップ", "貝殻", "クリスタル", "アロマオイル"]
    },
    leo: {
        name: "しし座",
        icon: '<i class="fas fa-sun"></i>',
        fortuneText: [
            "あなたの魅力が輝く日。自信を持って行動すれば、周りの人を惹きつけることができるでしょう。太陽のような存在感で場を明るく照らします。",
            "リーダーシップを発揮する場面が訪れます。あなたの判断が周りの人を正しい方向へ導くでしょう。威厳と寛大さのバランスが鍵となります。",
            "創造性が高まっています。芸術や表現活動で才能を発揮できる日です。内なる輝きを恐れずに表現すれば、多くの人があなたの魅力に惹かれるでしょう。"
        ],
        luckyColors: ["太陽のようなゴールド", "王者のロイヤルパープル", "鮮やかなオレンジ", "琥珀色"],
        luckyItems: ["ゴールドアクセサリー", "ミラー", "芸術作品", "サングラス", "クラウン型の小物"]
    },
    virgo: {
        name: "おとめ座",
        icon: '<i class="fas fa-leaf"></i>',
        fortuneText: [
            "細部への注意が実を結ぶ日。丁寧な作業や分析が高く評価されるでしょう。完璧を追求する姿勢が成功への道を開きます。",
            "健康運が上昇中。新しい健康習慣を始めるのに適した時期です。心身のバランスを整えることで、より良いパフォーマンスが期待できます。",
            "人の役に立つことであなた自身も充実感を得られる日。技術や知識を分かち合いましょう。あなたの真摯な姿勢が周囲の信頼を勝ち取ります。"
        ],
        luckyColors: ["清潔なネイビー", "穏やかなベージュ", "癒しのパステルグリーン", "ラベンダー"],
        luckyItems: ["手帳", "ハーブティー", "整理ボックス", "健康食品", "精密な道具"]
    },
    libra: {
        name: "てんびん座",
        icon: '<i class="fas fa-balance-scale"></i>',
        fortuneText: [
            "人間関係のバランスが取れる日。対立していた相手との和解や新たな出会いがあるかもしれません。公平な視点が物事を円滑に進めるでしょう。",
            "美的センスが冴える日。ファッションやインテリアの選択で周りから称賛を受けるでしょう。美しいものに囲まれることであなたの運気も上昇します。",
            "公平な判断が求められる場面で、あなたの決断が重要な役割を果たします。バランス感覚を大切に、調和のとれた選択をすると良いでしょう。"
        ],
        luckyColors: ["優雅なピンク", "調和のライトブルー", "柔らかいパステルカラー", "ミントグリーン"],
        luckyItems: ["花", "芳香剤", "バランスの取れた小物", "ペアアイテム", "アート作品"]
    },
    scorpio: {
        name: "さそり座",
        icon: '<i class="fas fa-bolt"></i>',
        fortuneText: [
            "直感力が高まる日。秘密や謎を解き明かす力があなたを導くでしょう。深層に潜む真実を見抜く洞察力が、重要な場面であなたを助けます。",
            "変化や改革のチャンス。古いものを手放し、新しいスタートを切るのに良い時期です。自己変革の力を信じて前に進みましょう。",
            "情熱的な取り組みが実を結びます。集中力を発揮して取り組むことで大きな進展が期待できます。隠された才能が開花する予感があります。"
        ],
        luckyColors: ["神秘的なダークレッド", "深遠なブラック", "魅惑のエメラルドグリーン", "ディープパープル"],
        luckyItems: ["水晶", "鍵", "ミステリー小説", "黒曜石", "秘密のノート"]
    },
    sagittarius: {
        name: "いて座",
        icon: '<i class="fas fa-mountain"></i>',
        fortuneText: [
            "冒険心がくすぐられる日。新しい場所や経験があなたの人生を豊かにします。未知の世界への一歩を踏み出す勇気を持ちましょう。",
            "楽観的な気持ちが周りの人に希望を与えます。あなたの笑顔が大切な人を元気づけるでしょう。前向きなエネルギーが周囲に広がります。",
            "学びの機会に恵まれる日。新しい知識や哲学があなたの視野を広げてくれます。知的好奇心を満たす探求心が、あなたの魅力をさらに高めるでしょう。"
        ],
        luckyColors: ["遠方を思わせるパープル", "広大な空のブルー", "神秘的なターコイズ", "冒険的なレッド"],
        luckyItems: ["地図", "外国の小物", "カメラ", "バックパック", "矢印のデザイン"]
    },
    capricorn: {
        name: "やぎ座",
        icon: '<i class="fas fa-mountain-sun"></i>',
        fortuneText: [
            "目標に向かって着実に前進できる日。地道な努力が実を結び始めています。揺るぎない決意と忍耐力があなたを成功へと導くでしょう。",
            "責任感が評価される場面があります。信頼を得ることで新たなチャンスが広がるでしょう。リーダーシップを発揮する良い機会です。",
            "計画性が成功の鍵となります。長期的な視点で物事を考えると良い結果につながります。目標達成のためのロードマップを見直すと良いでしょう。"
        ],
        luckyColors: ["信頼感のあるチャコールグレー", "堅実なダークグリーン", "落ち着いたブラウン", "上品なボルドー"],
        luckyItems: ["腕時計", "ビジネスバッグ", "古い記念品", "石のアクセサリー", "アンティーク"]
    },
    aquarius: {
        name: "みずがめ座",
        icon: '<i class="fas fa-plug"></i>',
        fortuneText: [
            "独創的なアイデアが浮かぶ日。型破りな発想が周りの人に新鮮な風をもたらします。常識にとらわれない視点が革新的な解決策を生み出すでしょう。",
            "人道的な活動や社会貢献で充実感を得られる日。あなたの行動が多くの人に良い影響を与えるでしょう。仲間と共に大きな変化を起こせる予感があります。",
            "テクノロジーを活用することで効率的に問題を解決できます。新しいツールや方法を試してみましょう。先進的な発想があなたの未来を切り開きます。"
        ],
        luckyColors: ["未来的なエレクトリックブルー", "洗練されたシルバー", "先進的なネオングリーン", "クリアなアクア"],
        luckyItems: ["電子機器", "ユニークな服飾品", "サイエンス関連グッズ", "未来的なデザインの小物", "天体望遠鏡"]
    },
    pisces: {
        name: "うお座",
        icon: '<i class="fas fa-fish"></i>',
        fortuneText: [
            "直感と想像力が高まる日。芸術的な表現や瞑想を通じて内なる声に耳を傾けましょう。霊感が強まり、創造性が開花する時期です。",
            "共感力があなたの強みになる日。人の気持ちを理解することで深い絆が築けるでしょう。感性を大切にし、直感を信じることが幸運を招きます。",
            "夢や理想に向かって一歩踏み出すのに良い時期です。心の赴くままに行動してみてください。波のように流れる感情に身を任せると、思わぬ発見があるでしょう。"
        ],
        luckyColors: ["深海のシーブルー", "神秘的なパープル", "夢見るようなペールグリーン", "オパールのような真珠色"],
        luckyItems: ["音楽", "アート作品", "香水", "クリスタルボール", "詩集"]
    }
};

// 日付を表示する
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('ja-JP', options);
}

// 占い結果を表示する
function showFortune() {
    // 演出効果として一瞬暗くする
    document.querySelector('.fortune-container').style.opacity = '0.7';
    
    setTimeout(() => {
        const selectedSign = document.getElementById('zodiacSign').value;
        const data = zodiacData[selectedSign];
        
        // 星座のタイトルを設定
        document.getElementById('signTitle').textContent = data.name + "の今日の運勢";
        
        // 星座のアイコンを設定
        document.getElementById('constellationIcon').innerHTML = data.icon;
        
        // 運勢テキストをランダムに選択
        const randomText = data.fortuneText[Math.floor(Math.random() * data.fortuneText.length)];
        document.getElementById('fortuneText').textContent = randomText;
        
        // ラッキーアイテムをランダムに選択
        document.getElementById('luckyColor').textContent = data.luckyColors[Math.floor(Math.random() * data.luckyColors.length)];
        document.getElementById('luckyNumber').textContent = Math.floor(Math.random() * 10) + 1;
        document.getElementById('luckyItem').textContent = data.luckyItems[Math.floor(Math.random() * data.luckyItems.length)];
        
        // ラッキー度を星で表示（1〜5星）
        const luckLevel = Math.floor(Math.random() * 5) + 1;
        document.getElementById('luckStars').innerHTML = '★'.repeat(luckLevel) + '☆'.repeat(5 - luckLevel);
        
        // 結果を表示
        document.getElementById('fortuneResult').style.display = 'block';
        
        // フェードイン効果
        document.querySelector('.fortune-container').style.opacity = '1';
        
        // 結果へスクロール
        document.getElementById('fortuneResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// イベントリスナーを設定
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    document.getElementById('fortuneButton').addEventListener('click', function() {
        // ボタン押下時にクリック効果
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 200);
        
        showFortune();
    });
    
    // 星空の背景効果を強化
    addStars();
});

// 星空に星を追加する関数
function addStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        // サイズをランダムに
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        starsContainer.appendChild(star);
    }
    
    // 流れ星の追加
    addShootingStars();
}

// 流れ星を追加する関数
function addShootingStars() {
    const container = document.getElementById('shootingStars');
    
    // 定期的に流れ星を発生させる
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // ランダムな位置と角度
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight / 2); // 上半分から
        const angle = Math.random() * 20 + 35; // 35-55度の間
        
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        shootingStar.style.transform = `rotate(${angle}deg)`;
        
        // アニメーション時間をランダムに
        const duration = Math.random() * 2 + 3; // 3-5秒
        shootingStar.style.animation = `shooting ${duration}s linear`;
        
        container.appendChild(shootingStar);
        
        // アニメーション終了後に要素を削除
        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }, 8000); // 8秒ごとに流れ星を発生
}