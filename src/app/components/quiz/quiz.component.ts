import { Component, signal, computed } from '@angular/core';

interface Option { text: string; value: 'paris' | 'cretaceous' | 'florence'; }
interface Question { question: string; options: Option[]; }

@Component({
  selector: 'app-quiz',
  standalone: true,
  template: `
    <section class="max-w-4xl mx-auto px-6 py-20 animate-fade-in min-h-[70vh]">
      @if (!result()) {
        <div class="mb-10 text-center">
          <span class="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.3em] font-bold block mb-2">Temporal Resonance Analyzer</span>
          <h2 class="text-3xl font-serif text-white mb-2 font-bold">Discover Your Perfect Horizon</h2>
          <span class="text-slate-400 text-xs font-mono tracking-wider">Matrix Node {{ step() + 1 }} of {{ questions.length }}</span>
        </div>
        
        <div class="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
          <h3 class="text-lg font-serif text-slate-100 mb-6 leading-snug font-bold">{{ questions[step()].question }}</h3>
          <div class="space-y-3">
            @for (opt of questions[step()].options; track opt.text) {
              <button (click)="selectOption(opt.value)"
                      class="w-full text-left p-4 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm font-normal hover:border-cyan-500/60 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 flex items-center justify-between group shadow-sm">
                {{ opt.text }}
                <span class="opacity-0 group-hover:opacity-100 transition-all text-cyan-400 font-bold text-lg">&rarr;</span>
              </button>
            }
          </div>
        </div>
      } @else {
        <!-- Matched Card: Strict 16:9 Aspect Ratio -->
        <div class="group relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-slide-up bg-slate-950">
          
          <!-- Background Image Layer (z-0) -->
          <img [src]="finalMatch().imageUrl" 
               [alt]="finalMatch().title" 
               class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-105" />
               
          <!-- Dark Gradient Mask (z-10) for pure text visibility -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20 z-10"></div>

          <!-- Foreground Text Container (z-20) -->
          <div class="relative z-20 h-full p-8 md:p-12 flex flex-col justify-end">
            <span class="text-cyan-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-2 block font-extrabold drop-shadow-md">
              Quantum Vector Confirmed
            </span>
            <h2 class="text-3xl md:text-5xl font-serif text-white mb-4 font-bold drop-shadow-lg">
              {{ finalMatch().title }}
            </h2>
            <p class="text-slate-200 text-sm md:text-base font-normal leading-relaxed mb-8 max-w-xl drop-shadow-md">
              {{ finalMatch().desc }}
            </p>
            
            <div>
              <button (click)="reset()" class="w-full sm:w-auto text-xs uppercase tracking-widest font-extrabold text-slate-950 bg-cyan-500 px-6 py-4 rounded-md hover:bg-cyan-400 transition-colors shadow-lg hover:scale-105 transform duration-300">
                Recalibrate Array
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `
})
export class QuizComponent {
  step = signal(0);
  scores = signal<string[]>([]);
  result = signal<'paris' | 'cretaceous' | 'florence' | null>(null);

  questions: Question[] = [
    {
      question: 'Identify the experience dynamic that dictates your travel goals:',
      options: [
        { text: 'Grand global expositions and historical industrial milestones.', value: 'paris' },
        { text: 'Wild, uncharted ecosystem exploration and biological mapping.', value: 'cretaceous' },
        { text: 'Classical creation workshops and timeless human philosophy.', value: 'florence' }
      ]
    },
    {
      question: 'Which cultural framework aligns with your exploratory curiosity?',
      options: [
        { text: 'The Belle Époque world exhibition expansion.', value: 'paris' },
        { text: 'The Prehistoric megafauna wildlife structures.', value: 'cretaceous' },
        { text: 'The High Renaissance human creative apex.', value: 'florence' }
      ]
    },
    {
      question: 'Identify your preferred timeline environmental setting:',
      options: [
        { text: 'Gaslit boulevards and complex structural ironwork architecture.', value: 'paris' },
        { text: 'Untamed natural canopies observed from secured vector units.', value: 'cretaceous' },
        { text: 'Sunlit marble studios and geometrically perfected cathedrals.', value: 'florence' }
      ]
    },
    {
      question: 'Select your core destination operational milestone objective:',
      options: [
        { text: 'Dining among vanguard artists after a world fair unveiling.', value: 'paris' },
        { text: 'Observing prehistoric apex lifeforms safely inside closed systems.', value: 'cretaceous' },
        { text: 'Witnessing classical historical sculptors working in real time.', value: 'florence' }
      ]
    }
  ];

  finalMatch = computed(() => {
    const res = this.result();
    if (res === 'paris') {
      return { 
        title: 'Paris 1889', 
        desc: 'The Belle Époque awaits your arrival. Witness modern engineering marvels and walk among the vanguard art elite under gaslit skies.',
        imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196601/paris-16-9-image_t26q1d.jpg' 
      };
    }
    if (res === 'cretaceous') {
      return { 
        title: 'The Cretaceous Period', 
        desc: 'Prehistoric vector initialized. Prepare to study raw evolutionary biology and planetary giants safely from protected observation pods.',
        imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196634/cretace-16-9-image_n4ufr6.jpg' 
      };
    }
    if (res === 'florence') {
      return { 
        title: 'Florence 1504', 
        desc: 'High Renaissance timeline locked. Step foot directly inside the master workshops that permanently defined human artistic lineage.',
        imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196812/renaissance-16-9-image_eiedxe.jpg' 
      };
    }
    return { title: '', desc: '', imageUrl: '' };
  });

  selectOption(val: 'paris' | 'cretaceous' | 'florence') {
    this.scores.update(s => [...s, val]);
    if (this.step() < this.questions.length - 1) {
      this.step.update(v => v + 1);
    } else {
      this.calculate();
    }
  }

  calculate() {
    const count = this.scores().reduce((acc, v) => ({ ...acc, [v]: (acc[v as keyof typeof acc] || 0) + 1 }), {} as Record<string, number>);
    const highest = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    this.result.set(highest as any);
  }

  reset() {
    this.step.set(0);
    this.scores.set([]);
    this.result.set(null);
  }
}