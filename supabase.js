// Supabase設定
const SUPABASE_URL = 'https://alckuhuidtwayycbxakw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsY2t1aHVpZHR3YXl5Y2J4YWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg1MTQsImV4cCI6MjA1NzY2NDUxNH0.j_zc5yKsgcfvT3bJx5kaOgOgXgtxH0M1yWBlkk8Zsdo';

// Supabaseクライアントの初期化
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// プレイヤー名の取得・保存
let playerName = localStorage.getItem('playerName') || '';
const playerNameInput = document.getElementById('player-name');
playerNameInput.value = playerName;
playerNameInput.addEventListener('input', (e) => {
    playerName = e.target.value;
    localStorage.setItem('playerName', playerName);
});

// ランキングデータの取得
async function fetchRankingData() {
    try {
        const { data, error } = await supabase
            .from('suika_rankings')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;
        
        return data;
    } catch (error) {
        console.error('ランキングデータの取得に失敗しました:', error);
        return [];
    }
}

// ランキング表示の更新
async function updateRankingDisplay() {
    const rankingBody = document.getElementById('ranking-body');
    rankingBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">ランキングデータを読み込み中...</td></tr>';
    
    const data = await fetchRankingData();
    
    if (data.length === 0) {
        rankingBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">ランキングデータがありません</td></tr>';
        return;
    }
    
    rankingBody.innerHTML = '';
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        // 日付フォーマット
        const date = new Date(entry.created_at);
        const formattedDate = `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.player_name}</td>
            <td>${entry.score.toLocaleString()}</td>
            <td>${formattedDate}</td>
        `;
        rankingBody.appendChild(row);
    });
}

// スコアの送信
async function submitScore(score) {
    if (!playerName.trim()) {
        alert('プレイヤー名を入力してください');
        return false;
    }
    
    try {
        const { data, error } = await supabase
            .from('suika_rankings')
            .insert([
                {
                    player_name: playerName,
                    score: score
                }
            ]);
            
        if (error) throw error;
        
        alert('スコアが送信されました！');
        updateRankingDisplay();
        return true;
    } catch (error) {
        console.error('スコア送信に失敗しました:', error);
        alert('スコアの送信に失敗しました。もう一度お試しください。');
        return false;
    }
}

// イベントリスナー設定
document.getElementById('submit-score').addEventListener('click', () => {
    const currentScore = parseInt(document.getElementById('score').textContent);
    submitScore(currentScore);
});

document.getElementById('save-score-button').addEventListener('click', () => {
    const finalScore = parseInt(document.getElementById('final-score').textContent);
    if (submitScore(finalScore)) {
        document.getElementById('game-over-modal').style.display = 'none';
    }
});

// 初期ランキング表示
updateRankingDisplay();
