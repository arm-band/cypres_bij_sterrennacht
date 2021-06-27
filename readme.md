# Cypres bij Sterrennacht

## Abstract

Cypress + reg-cli によるビジュアルリグレッションテストのスクリプト。

## Usage

### Init Settings

1. `cypress/fixtures/visual-regression-test/config.json.sample` をコピーし、 `cypress/fixtures/visual-regression-test/config.json` とする
2. `config.json` を変更する
    - `commons.url.ref` と `commons.url.test` を見本サイトのURLとテストしたいサイトのURLにする
        - 末尾 `/` 不要
    - 非表示にしたい要素のセレクタ文字列を `commons.hideElements` に追加・削除する
    - `viewports` を設定する
    - `pages` でサイト内のテストしたいページを指定する
        - `uri`: 先頭 `/` 始まり
        - `test_id`: ファイル名になるため重複しないようにすること

### Usage

1. `yarn` (初回のみ)
    - 多少時間がかかる (環境にも依存するが、例えば10分程度とか)
2. `yarn test`
