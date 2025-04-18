import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  // ngAfterViewInit(): void {
  //   this.hideLoader();  // Appelle la fonction pour masquer le loader
  //   this.reloadScripts();
  // }

  // hideLoader(): void {
  //   const loaderMask = document.querySelector('.loader-mask');
  //   if (loaderMask) {
  //     loaderMask.classList.add('hidden'); // Ajoute une classe CSS pour cacher le loader
  //   }
  // }

  // reloadScripts(): void {
  //   const scriptUrls = [
  //     'assets/js/plugins.js',
  //     'assets/js/scripts.js',
  //     'assets/revolution/js/jquery.themepunch.tools.min.js',
  //     'assets/revolution/js/jquery.themepunch.revolution.min.js'
  //   ];

  //   scriptUrls.forEach(url => {
  //     const script = document.createElement('script');
  //     script.src = url;
  //     script.async = true;
  //     document.body.appendChild(script);
  //   });
  // }
}
