import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout">
      <aside class="sidebar">
        <div class="logo">🎓 SMS</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
          <a routerLink="/students" routerLinkActive="active">👥 Students</a>
          <a routerLink="/students/new" routerLinkActive="active">➕ Add Student</a>
        </nav>
      </aside>
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
