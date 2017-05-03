# Contributing to Unity

Thanks for your interest in contributing to this project!

To get started:

- Read the [code of conduct](CODE_OF_CONDUCT.md).
- Make sure you have git and [Node](https://nodejs.org) v6 or greater installed. Then, run the following:

  ```bash
  $ git clone git@github.com:collectivehealth/unity.git && cd unity
  $ npm install
  ```

- Familiarize yourself with the `"scripts"` section of `package.json` to get a good understanding of the project's development workflow and tooling.

## Commands

To lint:

```bash
$ npm run lint
```

This command is also run by a git pre-commit hook.

To build:

```bash
$ npm run build
```

This command is also run by a git pre-commit hook as well as an NPM pre-publish hook.

## Submitting an Issue

- Search the issue tracker before opening an issue.
- Use a clear and descriptive title.
- Include as much information as possible, including:
  - Steps to reproduce the issue.
  - Error message(s) encountered.
  - Node / NPM versions used.
  - Operating system.
  - Versions of relevant dependencies/peer dependencies used.
