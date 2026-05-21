import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        
        <!-- Brand Logo / Page Title -->
        <a routerLink="/" class="text-xl font-serif text-white font-bold tracking-widest uppercase flex items-center gap-2 hover:text-cyan-400 transition-colors">
          Time Travel Agency
        </a>
        
        <!-- Navigation Controls -->
        <nav class="flex items-center gap-6">
          <a routerLink="/destinations" 
             routerLinkActive="text-cyan-400" 
             [routerLinkActiveOptions]="{exact: false}"
             class="text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition-colors hidden sm:block">
            Timelines
          </a>
          
          <!-- Access to Reservations Page -->
          <a routerLink="/reservations" 
             routerLinkActive="bg-cyan-600 hover:bg-cyan-500 text-slate-950"
             class="text-xs uppercase tracking-widest font-extrabold text-slate-950 bg-cyan-500 px-5 py-2.5 rounded-lg hover:bg-cyan-400 transition-all shadow-md flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            My Reservations
          </a>
        </nav>
        
      </div>
    </header>
  `
})
export class HeaderComponent {}