// Cette classe est utilisée pour typer la variable qui stocke toutes les routes de navigation dans le header.
export class NavigationLink {
    label!: string;
    action!: 'navigate' | 'logout';  
    route?: string; 
  }