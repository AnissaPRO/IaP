import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-[10px] text-cyan-400 uppercase tracking-[0.3em] font-bold block mb-2">Available Vectors</span>
        <h2 class="text-4xl font-serif mb-4 text-white font-bold">Select Your Era</h2>
        <p class="text-slate-300 text-sm font-light leading-relaxed">Each destination is meticulously researched and prepared. Our temporal guides ensure an authentic, safe, and unforgettable experience.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        @for (dest of destinations; track dest.id) {
          <div class="group relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl transition-all duration-300 hover:border-cyan-500/20">
            <img [src]="dest.imageUrl" [alt]="dest.title" class="absolute inset-0 w-full h-full object-cover z-0" />

            <!-- Lightened clean visual layout with overlay protection -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10"></div>

            <div class="relative z-20 h-full p-6 flex flex-col justify-end">
              <span class="text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-bold block mb-1">{{ dest.subtitle }}</span>
              <h3 class="text-2xl font-serif text-white font-bold mb-2 group-hover:text-cyan-300 transition-colors">{{ dest.title }}</h3>
              <p class="text-xs text-slate-200 leading-relaxed font-normal mb-4 max-w-sm line-clamp-2">{{ dest.description }}</p>
              
              <div class="w-full h-[1px] bg-slate-800/60 mb-4"></div>
              
              <!-- Direct Routing Target to the dedicated parameter configuration page -->
              <a [routerLink]="['/book', dest.id]" class="text-[10px] uppercase font-extrabold tracking-widest text-cyan-400 hover:text-white flex items-center gap-2 transition-transform focus:outline-none">
                Configure Vector &rarr;
              </a>
            </div>

            <div class="absolute top-4 left-4 bg-slate-950/80 border border-slate-700 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono font-bold tracking-widest text-cyan-400 z-20">
              {{ dest.year }}
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class GalleryComponent {
  destinations = [
    {
      id: 'paris',
      year: '1889 AD',
      subtitle: 'Eiffel Tower Inauguration',
      title: 'Paris 1889',
      description: 'Witness the Eiffel Tower unveiling. Stroll gaslit boulevards and dine where Impressionists gathered.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196601/paris-16-9-image_t26q1d.jpg'
    },
    {
      id: 'cretaceous',
      year: '65M BC',
      subtitle: 'Prehistoric Expedition',
      title: 'Cretaceous',
      description: 'Venture to prehistoric Earth. Observe magnificent creatures from secured temporal observation pods.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196634/cretace-16-9-image_n4ufr6.jpg'
    },
    {
      id: 'florence',
      year: '1504 AD',
      subtitle: 'David Unveiling Ceremony',
      title: 'Florence 1504',
      description: 'Stand in Michelangelo\'s studio as David is unveiled. Witness the golden age of human creativity.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196812/renaissance-16-9-image_eiedxe.jpg'
    }
  ];
}