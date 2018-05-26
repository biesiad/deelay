# [Deelay.me](http://deelay.me)

**Inline delay proxy for http resources**

Slow loading resources (images, scripts, etc) can break your code. Test it simulating unexpected network conditions applied to specific resource.


## Installation
```sh
$ npm install -g deelay
$ deelay

Starting delay on port 4567
```

## Usage

```html
<img src="localhost:4567/1000/http://mysite.com/image.gif">
```

## Development

### Tests
```sh
npm install
npm test
```
