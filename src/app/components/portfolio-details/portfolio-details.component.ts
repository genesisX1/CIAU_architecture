import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaFile } from 'src/app/models/media-file.model';
import { MediaFileService } from 'src/app/services/media-file.service';
import { PortfolioProject, PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent {
  projectId!: number;
  project!: PortfolioProject;
  mediaFiles: MediaFile[] = [];
  otherProjects: PortfolioProject[] = [];

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private mediaFileService: MediaFileService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.projectId = +id;
        this.portfolioService.getProjectById(this.projectId).subscribe({
          next: (project) => {
            this.project = project;
          },
          error: (err) => {
            console.error(err.message);
            this.router.navigate(['/404']);
          }
        });
        // Fetch other projects (excluding current)
        this.portfolioService.getAllProjects().subscribe((projects) => {
          this.otherProjects = projects.filter(p => p.id !== this.projectId);
        });
        this.mediaFileService.getMediaByProject(this.projectId).subscribe((media) => {
          this.mediaFiles = media;
        });
      }
    });
  }
}
