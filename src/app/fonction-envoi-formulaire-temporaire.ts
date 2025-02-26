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

*/