# Test Automation training from jaktestowac.pl
### Application of training knowledge in practice

## Links
- course  
https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site  
https://demo-bank.vercel.app/  
if link is broken check  
https://jaktestowac.pl/lesson/pw1s01l01/
- code repository (from training) 
https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie
- code repository (my version)  
https://github.com/mrsllil/demo-bank-tests

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```


## Visual Studio Code
- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu
- Formatting: editor -> context menu -> Format document