# lumenlogin

ただの練習。技術の道をわかることができるようのアプリ
Just putting the basics to work and learning how to get along with containers.


## セットアップ Setup

リポジトリーをダウンロードしたら、env ファイルを準備する
Once you've downloaded the repository, prepare the env file
~~~
$ cd lumenlogin
~~~

~~~
$ make set-env
~~~


## 開発 Development

To run app just run `make dev`を入力するだけで発動

アプリは `localhost:8000` のポートで実行されている
The app runs at the address noted above


### データベースを満たす Populating the database

ログインする前に、データベースを満たすのが必要。登録の機能を構築していないから、データベースからの情報を使ってログインするから。
Before logging in you have to populate the database. Because there is no register function, you will use info from pre-registered fake users.

APIのDockerのコンテイナーにターミナルから入る
Get into the api Docker container via the terminal
~~~
$ docker exec -it lumen_api_1 sh
~~~

マイグレートとシード
Migrate and seed
~~~
$ php artisan migrate --seed
~~~


### ログイン Login

(まだ`lumen_api_1`のDockerコンテイナーの中で：)
(Still from within the `lumen_api_1` container:)

Tinkerを実行する
Run Tinker
~~~ 
$ php artisan tinker
~~~

既に入力されたユーザーの情報（メール）を見てエントリーのメーリ一つどれでもコピーして
Choose any email from one of the entries in the database

~~~
>>> \App\Models\User::all()
~~~

アプリのログインページに入力して、以下のパスワードを入れる
Enter the email, and the password below into the login page
~~~
asdfjkl;
~~~
終わり
Done.

