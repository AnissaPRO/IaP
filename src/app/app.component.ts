import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ChatbotService } from './services/chatbot.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative">
      <router-outlet></router-outlet>
    </main>

    <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      <div *ngIf="isChatOpen()" class="mb-4 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[28rem] transition-all duration-300 origin-bottom-right">
        <div class="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
            <span class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Chrono-Bot AI</span>
          </div>
          <button (click)="toggleChat()" class="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex-1 p-5 overflow-y-auto bg-slate-900/50 space-y-4">
          <ng-container *ngFor="let msg of chatbotService.messages()">
            <div *ngIf="msg.role !== 'system'" class="text-sm p-3 rounded-lg max-w-[85%] break-words shadow-sm" 
                 [ngClass]="msg.role === 'user' ? 'bg-cyan-900 text-white ml-auto rounded-2xl rounded-tr-sm' : 'bg-slate-800 text-slate-200 mr-auto rounded-2xl rounded-tl-sm'">
              {{ msg.content }}
            </div>
          </ng-container>

          <div *ngIf="chatbotService.isLoading()" class="flex items-center gap-1 text-slate-500 font-mono text-xs pl-1">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]"></span>
            <span class="ml-1 italic text-[11px]">Connecting to timeline...</span>
          </div>
        </div>
        
        <div class="p-3.5 bg-slate-950 border-t border-slate-800">
          <div class="relative flex items-center">
            <input #msgInput type="text" placeholder="Transmit message..." 
                   (keyup.enter)="sendMessage(msgInput.value, msgInput)"
                   [disabled]="chatbotService.isLoading()"
                   class="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-4 pr-12 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-colors placeholder:text-slate-600 disabled:opacity-50">
            <button (click)="sendMessage(msgInput.value, msgInput)" 
                    [disabled]="chatbotService.isLoading()"
                    class="absolute right-2 text-cyan-500 hover:text-cyan-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none disabled:opacity-30">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button (click)="toggleChat()" 
              class="w-14 h-14 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400 hover:scale-105 transition-all duration-300 focus:outline-none">
        <svg *ngIf="!isChatOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <svg *ngIf="isChatOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
    </div>
  `
})
export class AppComponent {
  // Made public so template can read messages and loading signals directly
  public chatbotService = inject(ChatbotService);
  
  isChatOpen = signal(false);

  toggleChat(): void {
    this.isChatOpen.update(state => !state);
  }

  sendMessage(text: string, input: HTMLInputElement): void {
    const trimmed = text.trim();
    if (!trimmed || this.chatbotService.isLoading()) return;

    // Execute asynchronous stream dispatching via the core service layer
    this.chatbotService.sendMessage(trimmed);
    input.value = '';
  }
}