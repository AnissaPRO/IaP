import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 animate-fade-in overflow-hidden bg-slate-950">
      
      <!-- Video Background: No Blur, Looping, Full Speed -->
      <video #bgVideo 
             autoplay 
             muted 
             loop 
             playsinline
             class="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none">
        <source src="https://res.cloudinary.com/de1zsah0d/video/upload/q_auto/f_auto/v1779196792/final_cuzzhz.mp4" type="video/mp4" />
      </video>

      <!-- Lightened Overlay: Less darkening for higher clarity -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/80 z-10 pointer-events-none"></div>
      
      <div class="max-w-4xl mx-auto relative z-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
        <span class="text-cyan-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 inline-block border border-cyan-400/20 px-3 py-1 bg-slate-950/50 rounded-full backdrop-blur-sm shadow-lg">
          Premium Temporal Excursions
        </span>
        <h1 class="text-4xl md:text-7xl font-serif text-white max-w-4xl leading-tight mb-6 tracking-tight font-bold">
          History is your <br><span class="italic font-light text-slate-300">next destination.</span>
        </h1>
        <p class="text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal mb-10 leading-relaxed">
          Experience the most exclusive journeys through time. Witness empires rise, walk among legends, and discover moments that shaped our world.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a routerLink="/assessment" class="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-slate-950 font-extrabold uppercase tracking-widest text-xs rounded-sm hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:scale-105">
            Book Your Era
          </a>
          <a routerLink="/destinations" class="w-full sm:w-auto px-8 py-4 border border-slate-700 hover:border-slate-500 bg-slate-950/50 backdrop-blur-md rounded-sm transition-all duration-300 text-xs uppercase tracking-widest font-bold text-white shadow-lg">
            Explore Destinations
          </a>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoElement?.nativeElement;
    if (video) {
      video.muted = true;
      video.play().catch(err => console.log('Autoplay blocked:', err));
    }
  }
}