import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TokenService } from '../../../interceptors/services/auth.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { CoreModule } from '../../core.module';

@Component({
  selector: 'app-header',
  imports: [
    SharedModule,
    RouterLink,
    CoreModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  // Variable pour afficher le menu quand on clique sur le burger
  openMenu: boolean = false
  
  constructor(private tokenService : TokenService,
              private displayService : DisplayService,
              private elementRef: ElementRef) {}

  ngOnInit(): void {
  
  }

  // Méthode pour supprimer le token en cas de déconnexion.
  onLogout(): void {
    if(this.tokenService.isLogged()) {
      this.tokenService.removeToken()
      this.displayService.displayMessage('Vous êtes déconnecté.')
    }
  }

  // Méthode permettant d'afficher le menu des options ou de la cacher
  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  // Méthode pour fermer le menu après un clic sur une option
  closeMenu() {
    this.openMenu = false
  }

  // On ferme le menu si on clique en dehors du menu
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    
    // On regarde si le clic est sur le menu ou pas
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    // S'il est en dehors...
    if (!clickedInside) {
      // ... on ferme le menu
      this.closeMenu();
    }
  }  

}
