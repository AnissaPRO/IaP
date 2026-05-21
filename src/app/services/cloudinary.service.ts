import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private readonly cloudName = 'chronos-travel-agency';
  private readonly baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;

  // Implements optimal Cloudinary delivery via f_auto (format) and q_auto (quality)
  getOptimizedUrl(assetId: string, width: number = 800): string {
    return `${this.baseUrl}/c_fill,g_auto,w_${width}/f_auto/q_auto/${assetId}`;
  }
}