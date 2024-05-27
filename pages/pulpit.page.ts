import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  performTransfer = this.page.getByRole('button', { name: 'wykonaj' });

  closeButton = this.page.getByTestId('close-button');

  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement',
  );

  confirmButton = this.page.getByRole('button', { name: 'doładuj telefon' });

  messageText = this.page.locator('#show_messages');
  moneyValueText = this.page.locator('#money_value');

  userName = this.page.getByTestId('user-name');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.performTransfer.click();
    await this.closeButton.click();
  }

  async executeMobileTopUp(
    receiverNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.topupReceiver.selectOption(receiverNumber);
    await this.topupAmount.fill(transferAmount);
    await this.topupAgreementCheckbox.click();

    await this.confirmButton.click();
    await this.closeButton.click();
  }
}
