const dummies = [
    {
        title: 'スーパーで買い物',
        detail: '牛乳、卵、パン、トマト、きゅうり、にんじん、じゃがいも、豚肉、鶏肉、牛肉、魚、醤油、みりん、酒、砂糖、塩、コショウ、カレー粉、パスタ、ケチャップ、マヨネーズ、バター、チーズ、ヨーグルト、アイスクリーム、お菓子、お茶、コーヒー、ビール、ワイン、日用品、洗剤、トイレットペーパー、ティッシュ、ゴミ袋、ビニール袋、アルミホイル、ラップ、キッチンペーパー、スポンジ、歯ブラシ、歯磨き粉、シャンプー、リンス、ボディーソープ、洗顔料、化粧水、乳液、クリーム、日焼け止め、虫除け、蚊取り線香、灯油、ガスボンベ、電球、電池、ライター、マッチ、ハンカチ、タオル、シーツ、枕カバー、布団カバー、掃除機、掃除機用の袋、掃除機用のフィルター、掃除機用のノズル、掃除機用のホース、掃除機用の延長コード、掃除機用のブラシ、掃除機用のモップ、掃除機用のクロス、掃除機用のスプレー、掃除機用の洗剤、掃除機用の消臭剤、掃除機用の除湿剤、掃除',
    },
    {
        title: '家事',
        detail: '洗濯、掃除、ごみ出し、料理、買い物、掃除機、拭き掃除、食器洗い、風呂掃除、トイレ掃除、洗面所掃除、キッチン掃除、リビング掃除、寝室掃除、子供部屋掃除、書斎掃除、玄関掃除、ゴミ箱交換、ゴミ箱洗い、ゴミ箱消臭、ゴミ箱除湿、ゴミ箱整理、ゴミ箱収納、ゴミ箱移動、ゴミ箱処分、ゴミ箱購入、ゴミ箱設置',
    },
    {
        title: 'レポート作成',
        detail: 'プレゼンの下書きを完成させる。',
    },
    {
        title: 'ジムへ行く',
        detail: 'トレッドミルで30分ランニングをする。',
    },
    {
        title: '昼ごはん',
        detail: 'パスタとサラダを準備する。',
    },
    {
        title: '映画鑑賞',
        detail: '新しい映画をレンタルして観る。',
    },
    {
        title: 'ウォーキング',
        detail: '公園で1時間散歩する。',
    },
    {
        title: '語学勉強',
        detail: 'フランス語の文法を復習する。',
    },
    {
        title: 'プロジェクト会議',
        detail: '週次の進捗報告を準備する。',
    },
    {
        title: '本の購入',
        detail: '新しい小説をオンラインで注文する。',
    },
    {
        title: '花見の計画',
        detail: '友人たちと週末に桜の下でピクニックをする。',
    },
    {
        title: '旅行の準備',
        detail: '航空券を予約し、ホテルの予約を確認する。',
    },
    {
        title: 'プログラミング',
        detail: 'JavaScriptの新機能を学ぶ。',
    },
    {
        title: '家族とのSkype',
        detail: '週末に家族とビデオ通話をする。',
    },
    {
        title: '映画の脚本執筆',
        detail: '第2幕の構想を練る。',
    },
    {
        title: 'マラソントレーニング',
        detail: '週に3回、距離を増やして走る。',
    },
    {
        title: '誕生日プレゼントの購入',
        detail: '友人の誕生日に合わせてプレゼントを買う。',
    },
    {
        title: '新しいレシピの試作',
        detail: 'ベジタリアンの料理を作ってみる。',
    },
    {
        title: 'ブログ記事の執筆',
        detail: '最新のテクノロジートピックに関する記事を書く。',
    },
    {
        title: '散骨の手続き',
        detail: '祖父の遺骨を海に散骨する手続きを進める。',
    },
    {
        title: 'スキー旅行の計画',
        detail: '冬休みにスキーリゾートへの旅行を計画する。',
    },
    {
        title: '洗濯',
        detail: '洗濯機を使って衣類を洗う。',
    },
    {
        title: '散歩',
        detail: '近所を30分歩く。',
    },
    {
        title: '読書',
        detail: '最新の小説を読む。',
    },
    {
        title: '料理',
        detail: 'オムレツを作る。',
    },
    {
        title: '音楽鑑賞',
        detail: 'お気に入りのアルバムを聴く。',
    },
    {
        title: '昼寝',
        detail: '30分昼寝をする。',
    },
    {
        title: 'ヨガ',
        detail: 'ヨガのポーズを15分行う。',
    },
    {
        title: 'ガーデニング',
        detail: '庭で花を植える。',
    },
    {
        title: '映画鑑賞',
        detail: '古典映画を観る。',
    },
    {
        title: '家族との食事',
        detail: '家族と夕食を楽しむ。',
    },
    {
        title: '旅行の計画',
        detail: '次の休暇の目的地を決める。',
    },
    {
        title: 'ペットのお世話',
        detail: '犬の散歩をする。',
    },
    {
        title: 'ゲーム',
        detail: '新しいゲームをプレイする。',
    },
    {
        title: '写真撮影',
        detail: '街を散歩しながら写真を撮る。',
    },
    {
        title: 'スマートフォンの整理',
        detail: '不要なアプリを削除する。',
    },
    {
        title: 'クッキングクラス',
        detail: '新しい料理のレシピを学ぶ。',
    },
    {
        "title": "新しい言語の学習についての詳細なリサーチとその結果のまとめを行い、それを基に自分の言語能力を拡大するための具体的な学習計画を立て、その進捗を定期的に確認し、必要に応じて計画を見直す",
        "detail": "スペイン語の基本的な文法と概念を学び、毎日の学習練習を行う。"
    },
    {
        "title": "次の長期休暇に向けた国内旅行の詳細な計画立案と予約を行い、そのための予算計画を立て、必要な手配をするとともに、旅行中の緊急連絡先や現地の情報を事前に調査しておく",
        "detail": "旅行の日程、宿泊先、観光地などを調査し、予約を行う。"
    },
    {
        "title": "週末に友人と一緒に観に行く新作映画の選定とチケットの購入を行い、そのための映画のレビューを読み、映画館の選定と予約をするとともに、映画鑑賞後に友人と感想を共有する時間を設ける",
        "detail": "友人が楽しめる映画を選び、事前にチケットを購入する。"
    },
    {
        "title": "毎日の食事にフルーツと野菜を多く含める健康的な食生活の実践を行い、そのための食事メニューの作成と食材の購入を計画するとともに、栄養バランスを考慮した食事を心がけ、健康状態を定期的にチェックする",
        "detail": "バランスの良い食事を心がけ、体調管理に努める。"
    },
    {
        "title": "自己啓発のための読書の習慣の養成とそのための時間管理を行い、読むべき本のリストを作成し、それらの本を読み終えたらその要約を書くとともに、読書から得た知識を生活や仕事に活かすためのアクションプランを立てる",
        "detail": "毎日少なくとも30分間は読書をする時間を確保する。"
    },
    {
        "title": "自分の興味を広げるための新しい趣味の探索とそのためのリソースの確保を行い、その趣味に関連するイベントやクラスに参加するためのスケジュールを作成するとともに、新しい趣味から得た経験や学びを他人と共有する機会を見つける",
        "detail": "新しい趣味を見つけ、それに必要なリソースを確保する。"
    },
    {
        "title": "新しいスポーツの学習についての詳細なリサーチとその結果のまとめを行い、それを基に自分の身体能力を向上させるための具体的なトレーニング計画を立て、その進捗を定期的に確認し、必要に応じて計画を見直す",
        "detail": "テニスの基本的なルールと技術を学び、毎日のトレーニングを行う。"
    },
    {
        "title": "次の長期休暇に向けたキャンプ旅行の詳細な計画立案と予約を行い、そのための予算計画を立て、必要な手配をするとともに、旅行中の緊急連絡先や現地の情報を事前に調査しておく",
        "detail": "旅行の日程、キャンプ場、観光地などを調査し、予約を行う。"
    },
    {
        "title": "週末に友人と一緒に観に行く新作演劇の選定とチケットの購入を行い、そのための演劇のレビューを読み、劇場の選定と予約をするとともに、演劇鑑賞後に友人と感想を共有する時間を設ける",
        "detail": "友人が楽しめる演劇を選び、事前にチケットを購入する。"
    },
    {
        "title": "毎日の食事にフルーツと野菜を多く含める健康的な食生活の実践を行い、そのための食事メニューの作成と食材の購入を計画するとともに、栄養バランスを考慮した食事を心がけ、健康状態を定期的にチェックする",
        "detail": "バランスの良い食事を心がけ、体調管理に努める。"
    },
    {
        "title": "自己啓発のための読書の習慣の養成とそのための時間管理を行い、読むべき本のリストを作成し、それらの本を読み終えたらその要約を書くとともに、読書から得た知識を生活や仕事に活かすためのアクションプランを立てる",
        "detail": "毎日少なくとも30分間は読書をする時間を確保する。"
    },
    {
        "title": "自分の興味を広げるための新しい趣味の探索とそのためのリソースの確保を行い、その趣味に関連するイベントやクラスに参加するためのスケジュールを作成するとともに、新しい趣味から得た経験や学びを他人と共有する機会を見つける",
        "detail": "新しい趣味を見つけ、それに必要なリソースを確保する。"
    },
    {
        "title": "新しいプログラミング言語の学習についての詳細なリサーチとその結果のまとめを行い、それを基に自分のスキルセットを拡大するための具体的な学習計画を立て、その進捗を定期的に確認し、必要に応じて計画を見直す",
        "detail": "Pythonの基本的な文法と概念を学び、毎日のコーディング練習を行う。"
    },
    {
        "title": "来月の長期休暇に向けた海外旅行の詳細な計画立案と予約を行い、そのための予算計画を立て、必要な予防接種や保険の手配をするとともに、旅行中の緊急連絡先や現地の情報を事前に調査しておく",
        "detail": "旅行の日程、宿泊先、観光地などを調査し、予約を行う。"
    },
    {
        "title": "週末に家族と一緒に観に行く新作映画の選定とチケットの購入を行い、そのための映画のレビューを読み、映画館の選定と予約をするとともに、映画鑑賞後に家族で感想を共有する時間を設ける",
        "detail": "家族が楽しめる映画を選び、事前にチケットを購入する。"
    },
    {
        "title": "毎日の食事にフルーツと野菜を多く含める健康的な食生活の実践を行い、そのための食事メニューの作成と食材の購入を計画するとともに、栄養バランスを考慮した食事を心がけ、健康状態を定期的にチェックする",
        "detail": "バランスの良い食事を心がけ、体調管理に努める。"
    },
    {
        "title": "自己啓発のための読書の習慣の養成とそのための時間管理を行い、読むべき本のリストを作成し、それらの本を読み終えたらその要約を書くとともに、読書から得た知識を生活や仕事に活かすためのアクションプランを立てる",
        "detail": "毎日少なくとも30分間は読書をする時間を確保する。"
    },
    {
        "title": "自分の興味を広げるための新しい趣味の探索とそのためのリソースの確保を行い、その趣味に関連するイベントやクラスに参加するためのスケジュールを作成するとともに、新しい趣味から得た経験や学びを他人と共有する機会を見つける",
        "detail": "新しい趣味を見つけ、それに必要なリソースを確保する。"
    }
    
];

export const getRandTnD = () => dummies[Math.floor(Math.random() * dummies.length)];

