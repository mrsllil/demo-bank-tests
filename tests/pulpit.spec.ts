import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act (+wait for page to fully load)
    await page.waitForLoadState('domcontentloaded');
    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle,
    );

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('succesfull mobile top-up', async ({ page }) => {
    // Arrange
    const receiverNumber = '500 xxx xxx';
    const transferAmount = '70';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverNumber}`;

    // Act
    await pulpitPage.executeMobileTopUp(receiverNumber, transferAmount);

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after succesfull mobile top-up', async ({ page }) => {
    // Arrange
    const receiverNumber = '500 xxx xxx';
    const transferAmount = '70';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    // Act
    await pulpitPage.executeMobileTopUp(receiverNumber, transferAmount);

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
