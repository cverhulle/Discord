/*
private initSubmitForm(): void{
    //On remet les erreurs à false et on lance le chargement.
    this.errorFormEmail = false;
    this.errorFormUsername = false;
    this.loading = true;
  }


  private emailAlreadyExists(): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'adresse email dans le formulaire envoyée existe déjà dans la BDD.
    // Si oui, on arrête le chargement et, on passe errorFormEmail à true.
    return this.registerFormService.emailExists(this.registerForm.value).pipe(
      tap(exist => {
        if (exist) {
          this.loading = false;
          this.errorFormEmail = true
          console.log("L'email est déjà utilisé")
        }
      })
    )
  }



  private usernameAlreadyExists(): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'username dans le formulaire envoyée existe déjà dans la BDD.
    // Si oui, on arrête le chargement et, on passe errorFormUsername à true.
    return this.registerFormService.usernameExists(this.registerForm.value).pipe(
      tap(exist => {
        if (exist) {
          this.loading = false;
          this.errorFormUsername = true
          console.log("L'username est déjà utilisé")
        }
      })
    )
  }



  private sendForm(): Observable<boolean> {
    // Retourne un Observable permettant d'envoyer le formulaire.
    return this.registerFormService.saveUserInfo(this.registerForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.registerForm.reset();
          console.log("Utilisateur crée");
        } else {
          console.log("Erreur lors de l\'enregistrement de l\'utilisateur");
        }
      })
    )
  }

  


  onSubmitForm() {
    // On remet les erreurs d'username et d'email à false
    // On lance le chargement
    this.initSubmitForm()

    // On regarde si l'email est déjà dans la base de données.
    this.emailAlreadyExists().subscribe()

    // On regarde si l'username est déjà dans la base de données.
    this.usernameAlreadyExists().subscribe(
      (after) => {

        // On regarde si l'erreur d'username ou l'erreur d'email a lieu.
        if(!this.errorFormEmail && !this.errorFormUsername) {

          // Si les deux erreurs sont fausses, on lance l'envoi du formulaire.
          this.sendForm().subscribe()
        }
      }

    )
  }










import { forkJoin, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// Méthode pour vérifier si l'email existe déjà
private emailAlreadyExists(event: RegisterForm): Observable<boolean> {
  return this.registerFormService.emailExists(event).pipe(
    tap(exist => {
      if (exist) {
        this.registerModifyService.setLoading(false);
        this.registerModifyService.setErrorEmail(true);
        console.log("L'email est déjà utilisé");
      }
    }),
    catchError(() => {
      this.registerModifyService.setLoading(false);
      return of(false); // En cas d'erreur, on renvoie false
    })
  );
}

// Méthode pour vérifier si le nom d'utilisateur existe déjà
private usernameAlreadyExists(event: RegisterForm): Observable<boolean> {
  return this.registerFormService.usernameExists(event).pipe(
    tap(exist => {
      if (exist) {
        this.registerModifyService.setLoading(false);
        this.registerModifyService.setErrorUsername(true);
        console.log("L'username est déjà utilisé");
      }
    }),
    catchError(() => {
      this.registerModifyService.setLoading(false);
      return of(false); // En cas d'erreur, on renvoie false
    })
  );
}

// Méthode pour envoyer le formulaire
private sendForm(event: RegisterForm): Observable<boolean> {
  return this.registerFormService.saveUserInfo(event).pipe(
    tap(saved => {
      this.registerModifyService.setLoading(false);
      if (saved) {
        console.log("Utilisateur créé");
        this.router.navigateByUrl('/homepage');
      } else {
        console.log("Erreur lors de l'enregistrement de l'utilisateur");
      }
    }),
    catchError(() => {
      this.registerModifyService.setLoading(false);
      return of(false); // En cas d'erreur, on renvoie false
    })
  );
}

// Méthode principale pour créer un utilisateur
onCreateUser(event: RegisterForm) {
  this.registerModifyService.setLoading(true); // Démarre le chargement

  // Vérifie à la fois l'email et le nom d'utilisateur en parallèle
  forkJoin([
    this.emailAlreadyExists(event),
    this.usernameAlreadyExists(event)
  ]).subscribe(([emailExists, usernameExists]) => {
    if (!emailExists && !usernameExists) {
      // Si aucune erreur n'a été trouvée, envoie le formulaire
      this.sendForm(event).subscribe();
    } else {
      // Si l'une des vérifications échoue, on ne fait rien ou on gère une erreur supplémentaire
      console.log("Des erreurs sont présentes, le formulaire ne sera pas envoyé.");
    }
  });
}


*/