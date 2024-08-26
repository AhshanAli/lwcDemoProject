import { LightningElement,track } from 'lwc';

export default class ChatApp extends LightningElement {
    @track messages = [];
  @track messageText = '';

  handleKeyDown(event) {
    if (event.keyCode === 13 && this.messageText.trim() !== '') {
      this.messages = [...this.messages, { id: Date.now(), sender: 'user', text: this.messageText }
    ];
      this.messageText = '';
      this.triggerBotResponse();
}
}
}