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

