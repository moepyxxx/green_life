# green_life

- [仕様・要件定義・型定義等](https://sjpy-xx-1007.gitbook.io/greenlife/)
- [画面設計・デザイン・ユーザーストーリーマッピング](https://www.figma.com/file/dyshywesoPWvZNwD3rfHxm/green-Life?node-id=19%3A329)
- [プロジェクト戦略](https://startdash.sony-startup-acceleration-program.com/app/projects/24963)

## 適当な開発ステップ

### はじめに
1. `front`ファイル特化の`.env.sample`をコピーして`.env.local`という名前で保存

### 起動
```
$ docker compose up (-d) (--build)
```

### パッケージインストール
```
$ docker compose run -w /front --rm node npm install package
$ docker compose run -w /server --rm server npm install package
```

### ビルド
```
$ docker compose run -w /front --rm node npm install
$ docker compose run -w /server --rm server npm install
```

### DB接続
```
$ docker compose exec mongo bash
// docker-compose.ymlのID・パスワードを入力
# mongo admin -u root -p example
```