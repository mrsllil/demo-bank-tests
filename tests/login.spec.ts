import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test.only('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPassword = '5454553r';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const userId = 'tester';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPassword = '12345';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
