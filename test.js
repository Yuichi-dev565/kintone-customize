(function() {
    'use strict';

    // 対象とするイベント（新規作成時と編集時の保存ボタン押下時）
    var events = [
        'app.record.create.submit',
        'app.record.edit.submit'
    ];

    kintone.events.on(events, function(event) {
        var record = event.record;

        // --- ここからエラーチェックの条件 ---
        // フィールドコード（例: 開始日 と 終了日）の値を取得
        var startDate = record['開始日'].value;
        var endDate = record['終了日'].value;

        // 両方の日時が入力されている場合のみチェック
        if (startDate && endDate) {
            // 開始日が終了日より未来になっているかチェック
            if (startDate > endDate) {
                // 画面上部に表示するエラーメッセージを設定
                event.error = 'エラー：開始日は終了日より前の日付にしてください！！';

                // 必要に応じて、該当するフィールドの下にもエラーメッセージを表示
                event.record['開始日'].error = '日付の前後関係が不正です';
            }
        }
        // --- ここまでエラーチェックの条件 ---

        return event; // eventオブジェクトを返すことでエラーが反映される
    });
})();

