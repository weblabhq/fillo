# Fillo - Weblab GraphQL api

[![CircleCI](https://circleci.com/gh/weblabhq/fillo.svg?style=svg)](https://circleci.com/gh/weblabhq/fillo) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Development

### ENV variables

```
$ cp .env.sample .env
```

### Run server

```
$ npm start
```

### Tests

```
$ npm test
```

#### Linter

We're using [ESLint](http://eslint.org/) with [Standard](https://github.com/feross/eslint-config-standard) config

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

```
$ npm run lint
```

### Git Hooks

You can use a **pre-push** hook to run tests before every push. If tests are failing the push will not take place.
To install it just run in the **project root directory**:

```
$ ./tools/hooks/install.sh
```

If you want to skip the tests when you make a push just use the `--no-verify` flag. Example:

```
$ git push --no-verify <remote> <branch>
```

## License

MIT. Copyright (c) Cristian Guraliuc <cristi@weblab.io>
