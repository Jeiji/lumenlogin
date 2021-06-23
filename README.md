# lumenlogin

ただの練習。技術の道をわかることができるようのアプリ

Just putting the basics to work and learning how to get along with containers.


## セットアップ Setup

リポジトリーをクローンしたら、env ファイルを準備する

Once you've cloned the repository, prepare the env file
~~~
$ cd lumenlogin
~~~

~~~
$ make set-env
~~~


## 開発/利用 Development/Use

To run app just run `make dev`を入力するだけで発動

アプリは `localhost:8000` のポートで実行されている

The app runs at the address noted above

終わり

Done.




### 既に登録されたユーザー情報でのログイン Login with pre-registered data

APIのDockerのコンテイナーにターミナルから入る

Get into the api Docker container via the terminal
~~~
$ docker exec -it lumen_api_1 sh
~~~

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


