# test-lumen-for-a-buddy

Test lumen app for a friend. This is a sample app to test out lumen with docker.

## Development

To run app just run `make dev`

### Creating New App

Run the following docker command to start a brand new app

```
docker run --rm --interactive --tty --volume $PWD:/app composer create-project --prefer-dist laravel/lumen <app-name>
```
