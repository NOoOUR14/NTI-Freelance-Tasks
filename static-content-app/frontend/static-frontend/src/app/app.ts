import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentService } from './services/content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private contentService = inject(ContentService);

  contentData = signal<any>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.contentService.getContent().subscribe({
      next: (data) => {
        this.contentData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Backend Error:', err);
        this.loading.set(false);
      }
    });
  }
}
