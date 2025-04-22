// Ce modèle permet de modifier le profil (hors mot de passe)
export class ModifyProfileForm {
    personalInfo!: {
      firstName: string,
      lastName: string,
    }
    emailInfo!: {
      email: string,
      confirmEmail: string
    }
    
    loginInfo!: {
      username: string
    } 

    image!: string
  }
  
  