import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Montrer le loader au démarrage
    this.showLoader();
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showLoader(); // Montrer le loader avant le chargement
      // Attendre que le DOM soit prêt
      setTimeout(() => {
        this.hideLoader();
        this.reloadScripts();
      }, 500);
    });
  }

  showLoader(): void {
    const loaderMask = document.querySelector('.loader-mask');
    if (loaderMask) {
      loaderMask.classList.remove('hidden');
    }
  }

  hideLoader(): void {
    const loaderMask = document.querySelector('.loader-mask');
    if (loaderMask) {
      loaderMask.classList.add('d-none');
    }
  }

  reloadScripts(): void {
    // Supprimer les anciens scripts pour éviter les doublons
    this.removeExistingScripts();

    const scriptUrls = [
      'assets/js/jquery.min.js', // Ajouter jQuery en premier
      'assets/js/plugins.js',
      // 'assets/revolution/js/jquery.themepunch.tools.min.js',
      // 'assets/revolution/js/jquery.themepunch.revolution.min.js',
      'assets/js/scripts.js' // Mettre scripts.js en dernier
    ];

    scriptUrls.forEach((url, index) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = false; // Important : charger les scripts dans l'ordre
      script.defer = true;
      script.id = `dynamic-script-${index}`; // Ajouter un ID pour pouvoir les supprimer plus tard
      document.body.appendChild(script);
    });
  }

  private removeExistingScripts(): void {
    const scripts = document.querySelectorAll('script[id^="dynamic-script-"]');
    scripts.forEach(script => script.remove());
  }
}
