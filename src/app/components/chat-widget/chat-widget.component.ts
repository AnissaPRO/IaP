import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 font-sans">
      @if (isOpen()) {
        <div class="w-85 sm:w-96 h-[480px] bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col mb-4捷 animate-slide-up backdrop-blur-xl overflow-hidden">
          <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <div>
              <h4 class="text-cyan-400 text-sm font-bold tracking-wider uppercase">Time Concierge</h4>
              <span class="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Temporal Travel Expert</span>
            </div>
            <button (click)="isOpen.set(false)" class="text-slate-400 hover:text-white text-xl">&times;</button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            @for (msg of chatService.messages(); track $index) {
              @if (msg.role !== 'system') {
                <div [class]="msg.role === 'user' ? 'text-right' : 'text-left'">
                  <div class="inline-block p-3.5 rounded-xl text-sm max-w-[85%] leading-relaxed shadow-sm
                    {{ msg.role === 'user' ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-800 text-slate-300 border border-slate-700/30 rounded-tl-none font-light' }}">
                    {{ msg.content }}
                  </div>
                </div>
              }
            }
            @if (chatService.isLoading()) {
              <div class="text-left text-xs text-slate-500 font-mono tracking-wider flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> 
                Syncing quantum frequency...
              </div>
            }
          </div>

          <div class="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input [(ngModel)]="userInput" (keyup.enter)="send()" 
                   class="flex-1 bg-slate-900 text-white px-4 py-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/50 text-sm placeholder-slate-600"
                   placeholder="Query temporal coordinates..." />
            <button (click)="send()" [disabled]="chatService.isLoading() || !userInput"
                    class="bg-cyan-500 text-slate-950 px-4 py-2.5 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" /></svg>
            </button>
          </div>
        </div>
      }

      <button (click)="isOpen.set(!isOpen())" 
              class="w-14 h-14 bg-cyan-500 text-slate-950 rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:bg-cyan-400 hover:scale-105 transition-all flex items-center justify-center float-right border border-cyan-400/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" /></svg>
      </button>
    </div>
  `
})
export class ChatWidgetComponent {
  chatService = inject(ChatbotService);
  isOpen = signal(false);
  userInput = '';

  send() {
    if (!this.userInput.trim()) return;
    this.chatService.sendMessage(this.userInput);
    this.userInput = '';
  }
}