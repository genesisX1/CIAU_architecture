import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';
import { PortfolioService } from 'src/app/services/portfolio.service';
declare var $: any;

interface Partner {
  img: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  projects: any[] = [];
  displayedProjects: any[] = [];
  partners: Partner[] = [
    { img: 'assets/img/partners/boad.png', alt: 'BOAD' },
    { img: 'assets/img/partners/BIDC.png', alt: 'BIDC' },
    { img: 'assets/img/partners/ecobank.webp', alt: 'Ecobank' },
    { img: 'assets/img/partners/w.png', alt: 'Wendkuni Bank' }
  ];
  selectedCategory: string = 'all';
  constructor(private portfolioService: PortfolioService) {}
  ngAfterViewInit(): void {
    const splide = new Splide('#main-slider', {
      type: 'fade',
      autoplay: true,
      interval: 8000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      cover: true,
      heightRatio: 0.5,
    });

    const bar = document.querySelector('#main-slider .my-slider-progress-bar') as HTMLElement | null;
    splide.on('mounted move', function () {
      const end  = splide.Components.Controller.getEnd() + 1;
      const rate = Math.min((splide.index + 1) / end, 1);
      if(bar) bar.style.width = String(100 * rate) + '%';
    });
    splide.mount();
  }
  
  ngOnInit(): void {
    // this.reloadScripts();
    this.loadProjects();
    // Reload toutes les 10 minutes (600 000 ms)
    setInterval(() => {
      this.loadProjects();
    }, 600000);
  }

  loadProjects(): void {
    this.portfolioService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      this.displayedProjects = this.getRandomProjects(projects, 6);
    });
  }

  getFilteredProjects(): any[] {
    if (this.selectedCategory === 'all') {
      return this.displayedProjects;
    }
    return this.displayedProjects.filter(
      project => project.category === this.selectedCategory
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getRandomProjects(arr: any[], n: number): any[] {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  reloadScripts(): void {
    // Ajoute ici les scripts nécessaires après changement de route
    const scriptUrls = [
      'assets/js/plugins.js',
      'assets/js/scripts.js',
      'assets/revolution/js/jquery.themepunch.tools.min.js',
      'assets/revolution/js/jquery.themepunch.revolution.min.js',
      'assets/js/slick.min.js'  // Ajout de Slick Slider
    ];

    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    });
  }
}

    const scriptUrls = [
      'assets/js/plugins.js',
      'assets/js/scripts.js',
      'assets/revolution/js/jquery.themepunch.tools.min.js',
      'assets/revolution/js/jquery.themepunch.revolution.min.js',
      'assets/js/slick.min.js'  // Ajout de Slick Slider
    ];

    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    });
  
