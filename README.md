# Kong-SDET

## _Cypress: Take home Test_

## Tech

- [VSCode](code.visualstudio.com)- Editor: Free, Built on open source, Runs everywhere!
- [node.js] - event I/O for the backend
- [cypress](cypress. io) - Fast, easy and reliable testing for anything that runs in a browser.
- [Javascript](https://www.javascript.com/) - world's most popular programming language.
- [Allure-reports](https://docs.qameta.io/allure/) - Allure Framework is a flexible lightweight multi-language test report tool

| Tools | Links |
| ----- | ----- |

| GitHub | https://github.com/AnkitGuhe/kongtest |
| Cypress Dashboard | https://dashboard.cypress.io/projects/9jrfso/runs

## Cypress Features

###### Time travel

Cypress takes snapshots as your tests run. Simply hover over commands in the Command Log to see exactly what happened at each step.

###### Debuggability

Stop guessing why your tests are failing. Debug directly from familiar tools like Chrome DevTools. Our readable errors and stack traces make debugging lightning fast.

###### Real time reloads

Cypress automatically reloads whenever you make changes to your tests. See commands execute in real-time in your app.

###### Automatic waiting

Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.

###### Spies, stubs, and clocks

Verify and control the behaviour of functions, server responses, or timers. The same functionality you love from unit testing is right at your fingertips.

###### Network traffic control

Easily control stub, and test edge cases without involving your server. You can stub network traffic however you like.

###### Consistent results

Our architecture doesn’t use Selenium or WebDriver. Say hello to fast, consistent and reliable tests that are flake-free.

###### Screenshots and videos

View screenshots were taken automatically on failure, or videos of your entire test suite when run headlessly.

## Best Practices

[Best Practises](https://docs.cypress.io/guides/references/best-practices)
Selector Recommended Notes
`cy.get('button').click()` Never Worst - too generic, no context.
`cy.get('.btn.btn-large').click()` Never Bad. Coupled to styling. Highly subject to change.
`cy.get('#main').click()` Sparingly Better. But still coupled to styling or JS event listeners.
`cy.get('[name=submission]').click()` Sparingly Coupled to the name attribute which has HTML semantics.
`cy.contains('Submit').click()` Depends Much better. But still coupled to text content that may change.
`cy.get('[data-cy=submit]').click()` Always Best. Isolated from all changes.

## Project structure

###### _Each test is divided into two parts_

- _We will be following a hybrid POM Structure where each test will have its page_
- _Each page will have its class containing actions inside a class and locators inside an object_

_Example_

1. Login.spec.js
2. Login.page.js

| Login.spec.js                      | Login.page.js                                        |
| ---------------------------------- | ---------------------------------------------------- |
| Calls the Actions class from pages | Contains the class with locators for respective page |

##### Folder Structure

Cypress

- Integration: Contains test files
- Pages: Contains the pages for each test file
- reports: Contains report for every run
- Support: Contains a support file for globally used actions (Command.js)
- Fixtures: Contains images

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/AnkitGuhe/kongtest
cd kongtest
npm i
```

For cypress run with Test runner...

```sh
npm run cy:open
```

For cypress run with CLI- headless...

```sh
npm run cy:run
```

For cypress run with CI-Parallel...

```sh
npm run cy:run-ci
```
