
# タスクアプリ
![スクリーンショット 2022-05-03 7 17 26](https://user-images.githubusercontent.com/96964613/166337357-7b0ebcbc-11eb-400f-9d34-44fa971ab3fb.png)

![スクリーンショット 2022-05-03 7 33 45](https://user-images.githubusercontent.com/96964613/166337593-f8c421f7-3a7f-4052-97ef-00e3fef98b99.png)

### リンク
[https://www.hajime-kamino.com](https://www.hajime-kamino.com/)

## サービス概要
シンプルなtodoアプリです。macOSのリマインダーライクなデザインにしました。

## 実装機能
- 検索窓<br>
  入力した文字列を部分一致でフィルタリング
- アイコン通知<br>
  期日を超過したものはアイコンで通知
- タグ<br>
  カラーリングでカテゴリーをわかりやすくしました。
- グラフ表示<br>
  終了したタスクは毎月棒グラフで表示し、タグ別の円グラフで割合を表示する機能を追加しました。

## 使用技術
### フロントエンド
- Vue 2.6.14
- Nunx.js 2.15.8
- Vuetify 1.12.3

### バックエンド
- php 8.0
- Laravel 9.2

### データベース
- MySQL 5.0

### ライブラリ
- vee-validate 3.4.14
- nuxtjs/axios 5.13.6
- nuxtjs/moment 1.6.1
- chart.js 2.8
- nuxt-client-init-module 0.3.0
- vee-validate 3.4.14
- vue-chartjs 3.5.1
### インフラ
- heroku


## ER図
![スクリーンショット 2022-05-03 9 10 53](https://user-images.githubusercontent.com/96964613/166345370-29e8ff4e-f8ae-40a1-a6e6-87add9fb5efd.png)
