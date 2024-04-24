import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('simple payment', async ({ page }) => {
    await page.getByRole('link', { name: 'płatności' }).click();
    await page.getByTestId('transfer_receiver').click();
    await page.getByTestId('transfer_receiver').fill('Jan Nowak');
    await page.getByTestId('form_account_to').click();
    await page
      .getByTestId('form_account_to')
      .fill('12 3456 7891 2345 6789 0000 00');
    await page.getByTestId('form_amount').click();
    await page.getByTestId('form_amount').fill('222');
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    await page
      .getByRole('link', { name: 'Przelew wykonany! 222,00PLN' })
      .click();
  });
});
