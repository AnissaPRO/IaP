import { Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiUrl = 'https://api.mistral.ai/v1/chat/completions';
  private readonly apiKey = environment.mistralApiKey; // Map to environment in production
  
  messages = signal<ChatMessage[]>([
    {
      role: 'system',
      content: 'You are the Time Concierge, a warm, luxury virtual assistant for TimeTravel Agency. You are passionate about history and highly knowledgeable about Paris 1889 (Belle Époque, Eiffel Tower), Cretaceous (-65M years, dinosaurs), and Florence 1504 (Renaissance, Michelangelo). Making history accessible since 2087.'
    },
    {
      role: 'assistant',
      content: "Welcome to TimeTravel Agency. I'm your personal Time Concierge. Which era would you like to explore today?"
    }
  ]);
  
  isLoading = signal<boolean>(false);

  async sendMessage(userMessage: string) {
    if (!userMessage.trim()) return;
    
    this.messages.update(m => [...m, { role: 'user', content: userMessage }]);
    this.isLoading.set(true);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: this.messages()
        })
      });

      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      this.messages.update(m => [...m, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      this.messages.update(m => [...m, { role: 'assistant', content: 'Our temporal connection faded. Please try again.' }]);
    } finally {
      this.isLoading.set(false);
    }
  }
}