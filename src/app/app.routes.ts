import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/hero/hero.component').then(m => m.HeroComponent)
  },
  {
    path: 'destinations',
    loadComponent: () => import('./components/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'assessment',
    loadComponent: () => import('./components/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./components/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./components/confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: 'reservations',
    loadComponent: () => import('./components/reservations/reservations.component').then(m => m.ReservationsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];