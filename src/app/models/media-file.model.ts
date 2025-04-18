export interface MediaFile {
    id?: number;
    portfolio_project?: number; // id du projet
    title: string;
    file: string; // URL
    uploaded_at?: string;
  }