# Skill2Token Website

[![build](https://github.com/skill2token/website/actions/workflows/test.yml/badge.svg)](https://github.com/skill2token/website/actions/workflows/test.yml) [![website](https://img.shields.io/website?down_color=red&down_message=down&style=plastic&up_color=green&up_message=up&url=https%3A%2F%2Fskill2token.com%2F)](https://skill2token.com)[![Gmail](https://img.shields.io/badge/-Gmail-c14438?style=plastic&logo=Gmail&logoColor=white)](mailto:contact@skill2token.com)

## Index

- [Run the Project](#run-the-project)
- [Run Tests](#run-tests)
- [Style Practices](#style-practices)
- [Warning](#warnings)

### Run the Project

To install all the project dependencies and then start a local server to interact with the website run those commands:

```console
npm install
npm start
```

### Run Tests

Before making a pull request or pushing any changes to the repository you should run `npm run test`, and check if all the tests passed.

### Style Practices

- Try to follow [Google typescript practices](https://google.github.io/styleguide/tsguide.html) as much as you can.
- Before committing any changes, it's important to use the command `npx prettier --write .`, to adequate indentation, among other things, to the rest of the project.

### Warnings

- It's important to notice that this setup expects that the app is running as `http://localhost:3000/` and the API at `http://localhost:5500/`, thus it's extremely important to change the code after assigning a domain to each of those.
