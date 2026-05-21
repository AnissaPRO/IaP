import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[80vh] flex items-center justify-center px-4 animate-slide-up">
      <div class="bg-slate-900/80 border border-cyan-500/30 p-10 md:p-16 rounded-3xl shadow-[0_10px_40px_rgba(6,182,212,0.15)] backdrop-blur-md max-w-2xl w-full text-center">
        
        <div class="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-400/50">
          <svg class="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <span class="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase mb-4 block font-bold">
          Transaction Authorized
        </span>
        
        <h1 class="text-4xl font-serif text-white font-bold mb-4">Vector Reserved</h1>
        
        <p class="text-slate-300 text-sm md:text-base mb-10 leading-relaxed font-light">
          Your temporal manifest has been successfully synchronized with the quantum routing servers. Prepare for imminent chronal displacement. A summary will be sent to your terminal.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a routerLink="/" class="w-full sm:w-auto px-8 py-4 border border-slate-700 hover:border-slate-500 bg-slate-950 backdrop-blur-md rounded-lg transition-all duration-300 text-xs uppercase tracking-widest font-bold text-white shadow-lg">
            Return to Main Terminal
          </a>
          <a routerLink="/reservations" class="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-slate-950 font-extrabold uppercase tracking-widest text-xs rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-[0_4px_25px_rgba(6,182,212,0.2)]">
            View Active Itineraries
          </a>
        </div>

      </div>
    </section>
  `
})
export class ConfirmationComponent {}