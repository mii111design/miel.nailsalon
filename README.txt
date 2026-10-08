Miel Webサイト — ZIP版

使い方
ZIPを解凍し、index.htmlをブラウザーで開いてください。
公開する場合はindex.html、style.css、script.js、config.js、assetsフォルダを同じ階層で配置します。
外部ライブラリー・ビルド・インストールは不要です。

現在未完成の部分
1. ロゴ：提供された透過PNGをLoading・Header・Hero・Footerに反映済みです。

2. Square予約：提供された予約URLを「空き状況を確認・予約する」に設定済みです。サイト内のサンプルカレンダーは削除しました。「空き状況を確認・予約する」ボタンからSquareの予約サイトが別タブで開きます。
予約URLはconfig.jsのsquareUrlで変更できます。
URL設定後はSquare予約ページへ移動します。
埋め込みの可否・プラン・予約可能日時の表示は、契約するSquareの実際の設定で確認が必要です。

3. Instagram：config.jsのinstagramUrlに正式なHTTPSアカウントURLを設定してください。

4. 参考動画：今回のローカル添付は画像8枚のみです。動画照合は未実施です。
演出は指示書に従ったピン留め・クロスフェード・逆スクロール方式です。

5. 仮メニュー・料金とFAQ：正式な営業ルール確定後、index.html内で差し替えてください。
住所・電話・営業時間・支払いブランド・キャンセル料は創作していません。

画像対応
ロゴ assets/logo-transparent.png：Loading、Header、Hero、Footer。元JPEGは保持しています。
画像2 assets/image-2.jpeg：Hero背景1。指示書では横長ですが、添付実体は1122×1402の縦長です。
画像3 assets/image-3.jpeg：Hero背景3、Gallery。
画像4 assets/image-4.jpeg：Gallery。
画像5 assets/image-5.jpeg：Gallery。
画像6 assets/image-6.jpeg：About。
画像7 assets/image-7.jpeg：About。
画像8 assets/image-8.jpeg：Hero背景2。
すべて元JPEGをそのままコピーしており、写真の色・明るさ・デザインは変更していません。
PCの手元・ネイル背景はcover表示で左右の余白を解消します。縦長写真のため上下がトリミングされます。
スマートフォンの手元・ネイル背景もcover表示で上下の余白を解消します。
画像比率と画面比率が異なる部分はトリミングされます。画像そのものは変更していません。

演出
初回は1秒フェードイン、0.5秒保持、0.7秒フェードアウト。
sessionStorageが利用できる環境ではタブ内の再表示でローディングを省略します。
読み込み中はスクロールをロックし、終了後に解除します。
動きを減らす設定が有効な環境ではローディング・フェードインを短縮／抑制します。
HeroはCSS sticky。背景だけをスクロール量に応じて重ねて切り替えます。
3枚目を保持した後、Hero全体が流れてAboutに移ります。
Galleryは標準dialogによる拡大表示。閉じるボタン・Escape・背景クリックに対応します。
FAQは標準details/summary。キーボードでも操作できます。

確認範囲
JavaScript構文、HTMLのパースと画像参照、画像8枚のバイト一致を確認。
画面幅320/375/390/414/768px向けCSSを用意。
PC・タブレット・スマートフォンのブラウザー実行・目視確認は未実施です。
参考動画との照合・Instagramの実URL設定・Squareの実予約確認を終えてから納品／一般公開してください。
