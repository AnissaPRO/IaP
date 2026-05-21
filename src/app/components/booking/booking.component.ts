import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="max-w-4xl mx-auto px-6 py-12 animate-fade-in min-h-[90vh]">
      
      <div class="mb-6">
        <a routerLink="/destinations" class="text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
          &larr; Return to Chrono-Deck
        </a>
      </div>

      <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mb-10 shadow-xl">
        <img [src]="destination().imageUrl" [alt]="destination().title" class="absolute inset-0 w-full h-full object-cover z-0" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent z-10"></div>
        
        <div class="relative z-20 h-full p-8 md:p-12 flex flex-col justify-end">
          <span class="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase mb-1 block font-bold">
            Quantum Vector Configured
          </span>
          <h1 class="text-3xl md:text-5xl font-serif text-white font-bold drop-shadow-md mb-2">
            Manifesting: {{ destination().title }}
          </h1>
          <p class="text-slate-200 text-sm md:text-base max-w-xl font-light drop-shadow-sm">
            {{ destination().description }}
          </p>
        </div>
      </div>

      <div class="bg-slate-900/60 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md max-w-3xl mx-auto">
        <h2 class="text-xl font-serif text-white mb-6 font-bold border-b border-slate-800 pb-4">
          Travel Manifest Registration
        </h2>

        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-8">
          
          <!-- SECTION 1: Passenger Identification -->
          <div class="space-y-4">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">1. Passenger Identification</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Full Legal Name</label>
                <input type="text" formControlName="travelerName"
                       class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-colors"
                       [class.border-red-500/50]="isInvalid('travelerName')">
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Passport ID (12-Digit Padded)</label>
                <input type="text" formControlName="passportId" placeholder="e.g. A1234567"
                       (blur)="padPassport()"
                       class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500/60 transition-colors"
                       [class.border-red-500/50]="isInvalid('passportId')">
                <p *ngIf="isInvalid('passportId')" class="text-xs text-red-400 mt-1">Alphanumeric passport required.</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Date of Birth (DD-MM-YYYY)</label>
                <div class="relative flex items-center bg-slate-950 border border-slate-800 rounded-lg focus-within:border-cyan-500/60 transition-colors overflow-hidden"
                     [class.border-red-500/50]="isInvalid('dateOfBirth')">
                  
                  <input type="text" formControlName="dateOfBirth" placeholder="DD-MM-YYYY"
                         class="w-full bg-transparent p-3 text-sm text-slate-200 focus:outline-none">
                  
                  <button type="button" (click)="datePicker.showPicker()" 
                          class="pr-3 text-cyan-500/70 hover:text-cyan-400 transition-colors focus:outline-none flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  
                  <input type="date" #datePicker 
                         (input)="onCalendarSelect($event)"
                         class="absolute right-0 w-0 h-0 opacity-0 pointer-events-none [color-scheme:dark]">
                </div>
                
                <!-- Expanded contextual validation warnings -->
                <p *ngIf="bookingForm.get('dateOfBirth')?.hasError('pattern') && isInvalid('dateOfBirth')" class="text-xs text-red-400 mt-1">
                  Must be exactly DD-MM-YYYY.
                </p>
                <p *ngIf="bookingForm.get('dateOfBirth')?.hasError('underage') && !bookingForm.get('dateOfBirth')?.hasError('pattern') && isInvalid('dateOfBirth')" class="text-xs text-red-400 mt-1">
                  Main traveler must be an adult (at least 18 years old).
                </p>
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Gender</label>
                <select formControlName="gender" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Non-binary / Other</option>
                </select>
              </div>
            </div>
          </div>

          <!-- SECTION 2: Primary Contact Information -->
          <div class="space-y-4 border-t border-slate-800/60 pt-6">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">2. Primary Contact Information</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Email Address</label>
                <input type="email" formControlName="email" placeholder="name@example.com"
                       class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-colors"
                       [class.border-red-500/50]="isInvalid('email')">
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Mobile Phone Number</label>
                <div class="flex bg-slate-950 border border-slate-800 rounded-lg focus-within:border-cyan-500/60 transition-colors overflow-hidden"
                     [class.border-red-500/50]="isInvalid('phoneNumber')">
                  
                  <select formControlName="phoneCode" class="bg-slate-900 border-r border-slate-800 text-slate-200 p-3 outline-none text-sm w-[100px] cursor-pointer focus:outline-none">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>

                  <input type="tel" formControlName="phoneNumber" placeholder="000-0000"
                         class="w-full bg-transparent p-3 text-sm text-slate-200 focus:outline-none">
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 3: Emergency Ground Contact -->
          <div class="space-y-4 border-t border-slate-800/60 pt-6">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">3. Emergency Ground Contact</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Emergency Name</label>
                <input type="text" formControlName="emergencyName" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
              </div>
              
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Emergency Phone</label>
                <div class="flex bg-slate-950 border border-slate-800 rounded-lg focus-within:border-cyan-500/60 transition-colors overflow-hidden"
                     [class.border-red-500/50]="isInvalid('emergencyPhone')">
                  
                  <select formControlName="emergencyPhoneCode" class="bg-slate-900 border-r border-slate-800 text-slate-200 p-3 outline-none text-sm w-[100px] cursor-pointer focus:outline-none">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>

                  <input type="tel" formControlName="emergencyPhone" placeholder="000-0000"
                         class="w-full bg-transparent p-3 text-sm text-slate-200 focus:outline-none">
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 4: Dietary & Special Assistance -->
          <div class="space-y-4 border-t border-slate-800/60 pt-6">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">4. Dietary & Special Assistance</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Dietary Preferences</label>
                <select formControlName="dietaryPreference" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                  <option value="none">No Specific Preference / Standard</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Mobility Support</label>
                <select formControlName="accessibilityNeeds" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                  <option value="none">No Special Requirements</option>
                  <option value="wheelchair">Wheelchair / Ramp Access</option>
                </select>
              </div>
            </div>
          </div>

          <!-- SECTION 5: Dynamic Parameters -->
          <div [ngSwitch]="destinationId()" class="border-t border-slate-800/60 pt-6">
            <div *ngSwitchCase="'paris'" class="space-y-6">
              <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">5. Paris 1889 Parameters</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Exposition Pass Tier</label>
                  <select formControlName="parisPassTier" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                    <option value="standard">Standard Pavilion Access</option>
                    <option value="vip">VIP Eiffel Lounge Elite</option>
                  </select>
                </div>
              </div>
            </div>
            <div *ngSwitchCase="'cretaceous'" class="space-y-6">
              <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">5. Survival Configurations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Oxygen Reserves (Hrs)</label>
                  <input type="number" formControlName="cretaceousOxygen" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                </div>
              </div>
              <div class="mt-4 flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                <input type="checkbox" formControlName="cretaceousWaiver" id="waiver" class="mt-1 accent-cyan-500">
                <label for="waiver" class="text-xs text-slate-300 leading-relaxed">I explicitly acknowledge megafauna apex predators and waive liability.</label>
              </div>
            </div>
            <div *ngSwitchCase="'florence'" class="space-y-6">
              <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">5. Renaissance Integration</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Florin Local Currency</label>
                  <input type="number" formControlName="florenceFlorins" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60">
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button type="submit" 
                    [disabled]="bookingForm.invalid && bookingForm.touched"
                    class="w-full text-xs uppercase tracking-widest font-extrabold text-slate-950 bg-cyan-500 py-4 rounded-xl hover:bg-cyan-400 disabled:opacity-40 transition-all duration-300 shadow-md">
              Complete Secure Booking Reservation
            </button>
          </div>

        </form>
      </div>
    </section>
  `
})
export class BookingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  destinationId = signal<string>('paris');

  destinationsData: Record<string, { title: string; description: string; imageUrl: string }> = {
    paris: {
      title: 'Paris 1889',
      description: 'Witness the magnificent Eiffel Tower unveiling and connect with avant-garde artists under gaslit skies.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196601/paris-16-9-image_t26q1d.jpg'
    },
    cretaceous: {
      title: 'The Cretaceous Period',
      description: 'Study untamed primeval ecosystems from inside completely secured vector observation pods.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196634/cretace-16-9-image_n4ufr6.jpg'
    },
    florence: {
      title: 'Florence 1504',
      description: 'Immerse yourself directly inside the golden age apex of human artistic generation.',
      imageUrl: 'https://res.cloudinary.com/de1zsah0d/image/upload/q_auto/f_auto/v1779196812/renaissance-16-9-image_eiedxe.jpg'
    }
  };

  destination = computed(() => this.destinationsData[this.destinationId()] || this.destinationsData['paris']);
  bookingForm!: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const id = p['id'];
      if (id && this.destinationsData[id]) {
        this.destinationId.set(id);
      }
      this.initValidationForm();
    });
  }

  private initValidationForm(): void {
    const currentId = this.destinationId();

    this.bookingForm = this.fb.group({
      travelerName: ['', [Validators.required, Validators.minLength(3)]],
      passportId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{6,12}$/i)]],
      // Appended the dynamic adulthood checking validator to the field initialization sequence
      dateOfBirth: ['', [
        Validators.required, 
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/),
        this.adultAgeValidator
      ]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['+1', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\\s\\-\\)]{7,20}$/)]],
      emergencyName: ['', [Validators.required]],
      emergencyPhoneCode: ['+1', [Validators.required]],
      emergencyPhone: ['', [Validators.required, Validators.pattern(/^[0-9\\s\\-\\)]{7,20}$/)]],
      dietaryPreference: ['none'],
      accessibilityNeeds: ['none'],
      
      parisPassTier: ['standard'],
      cretaceousOxygen: [8, [Validators.min(2), Validators.max(24)]],
      cretaceousWaiver: [false]
    });

    if (currentId === 'cretaceous') {
      this.bookingForm.get('cretaceousWaiver')?.setValidators([Validators.requiredTrue]);
    } else if (currentId === 'florence') {
      this.bookingForm.addControl('florenceFlorins', this.fb.control(200, [Validators.required, Validators.min(50), Validators.max(5000)]));
    }
    this.bookingForm.updateValueAndValidity();
  }

  // Custom Form Control Validator computing structural timestamp deltas from DD-MM-YYYY structures
  private adultAgeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    // Verify compliance with structural formats first before parsing components
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
    if (!datePattern.test(control.value)) return null;

    const [day, month, year] = control.value.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { underage: true };
  }

  onCalendarSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const [year, month, day] = inputElement.value.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      this.bookingForm.get('dateOfBirth')?.setValue(formattedDate);
      this.bookingForm.get('dateOfBirth')?.markAsDirty();
      this.bookingForm.get('dateOfBirth')?.markAsTouched();
    }
  }

  padPassport(): void {
    const ctrl = this.bookingForm.get('passportId');
    if (ctrl?.value) {
      const paddedValue = ctrl.value.toString().padStart(12, '0');
      ctrl.setValue(paddedValue);
    }
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.bookingForm.get(controlName);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.router.navigate(['/confirmation']);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}