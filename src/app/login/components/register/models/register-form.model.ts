// Ce modèle permet de stocker les données du formulaire d'inscription (ou de modification) de compte.
export class RegisterForm {
  personalInfo!: {
    firstName: string,
    lastName: string,
  }
  emailInfo!: {
    email: string,
    confirmEmail: string
  }
  
  loginInfo!: {
    username: string,
    password: string,
    confirmPassword: string
  }

  image!: string
}

