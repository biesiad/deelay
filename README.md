If you are looking for deelay ruby gem, you can find it [here](https://github.com/biesiad/deelay-ruby).

# [Deelay.me](http://deelay.me)

**Inline delay proxy for http resources**
Slow loading resources (images, scripts, etc) can break your code. Test it simulating unexpected network conditions applied to specific resource.

## Local installation
```sh
$ npm install -g deelay
$ deelay
Starting delay on port 4567
```

## Docker installation
```sh
$ docker build -t deelay .
$ docker run -p 4567:4567 deelay
Starting delay on port 4567
```

## Usage
```html
<img src="localhost:4567/1000/http://mysite.com/image.gif">
```

### Tests
```sh
npm install
npm test
```
