import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="max-w-6xl mx-auto px-6 py-16 animate-fade-in min-h-[85vh]">
      
      <div class="mb-12">
        <span class="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase mb-2 block font-bold">
          Chrono-Deck Records
        </span>
        <h1 class="text-4xl font-serif text-white font-bold">My Temporal Itineraries</h1>
      </div>

      <!-- FINISHED RESERVATIONS -->
      <div class="mb-16">
        <h2 class="text-xl font-serif text-slate-200 mb-6 font-bold flex items-center gap-3 border-b border-slate-800 pb-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
          Confirmed Deployments
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Item Card using Strict 16:9 Aspect Video Form -->
          <div class="group relative aspect-video w-full rounded-2xl overflow-hidden border border-cyan-900/50 bg-slate-950 shadow-xl">
            <img src="https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196812/renaissance-16-9-image_eiedxe.jpg" alt="Florence" class="absolute inset-0 w-full h-full object-cover z-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 z-10"></div>
            
            <div class="relative z-20 h-full p-6 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <span class="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest backdrop-blur-md">
                  TICKET #FL-99381
                </span>
                <span class="text-xs font-mono text-slate-300">Departs: T-Minus 4 Days</span>
              </div>

              <div>
                <h3 class="text-2xl font-serif text-white font-bold mb-1">Florence 1504</h3>
                <p class="text-xs text-slate-300 font-light mb-4">Renaissance Integration • Linguistic Translation Included</p>
                <button class="px-5 py-2 text-[10px] uppercase tracking-widest font-bold text-slate-950 bg-cyan-500 rounded hover:bg-cyan-400 transition-colors">
                  View Full Manifest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DRAFT RESERVATIONS -->
      <div>
        <h2 class="text-xl font-serif text-slate-200 mb-6 font-bold flex items-center gap-3 border-b border-slate-800 pb-2">
          <span class="w-2 h-2 rounded-full bg-slate-500"></span>
          Incomplete Drafts
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="group relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 opacity-80 hover:opacity-100 transition-opacity">
            <img src="https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196634/cretace-16-9-image_n4ufr6.jpg" alt="Cretaceous" class="absolute inset-0 w-full h-full object-cover z-0 grayscale" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 z-10"></div>
            
            <div class="relative z-20 h-full p-6 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <span class="bg-slate-800/80 text-slate-400 border border-slate-700 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest backdrop-blur-md">
                  PENDING WAIVER
                </span>
              </div>

              <div>
                <h3 class="text-2xl font-serif text-slate-200 font-bold mb-1">The Cretaceous</h3>
                <p class="text-xs text-slate-400 font-light mb-4">Missing biological waiver and pod specifications.</p>
                <a routerLink="/book/cretaceous" class="inline-block px-5 py-2 text-[10px] uppercase tracking-widest font-bold text-white border border-cyan-500/50 rounded hover:bg-cyan-500/20 transition-colors">
                  Resume Configuration
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  `
})
export class ReservationsComponent {}