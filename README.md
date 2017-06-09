# Angular l10n sample
> Sample app built with Angular Material, AoT compilation & webpack: [live example](http://robisim74.github.io/angular-l10n-sample)

## Running locally the sample app
Make sure that you have the latest version of _npm_:
```Shell
npm install npm@latest -g

npm cache verify
```

- For development, we use _JiT compilation_ with Hot Module Replacement:
```Shell
npm install
npm start
```
Make the changes: the browser will update without refreshing.

- For production, we use _AoT compilation_, tree shaking & minification:
```Shell
npm run build
```

Analyzing the bundle:
```Shell
npm run explore
```

Running the sample test:
```Shell
npm test
```
