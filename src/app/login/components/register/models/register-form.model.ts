export class RegisterForm {
  personalInfo!: {
    firstName: string,
    lastName: string,
  }
  email!: string
  
  loginInfo!: {
    username: string,
    password: string,
    confirmPassword: string
  }

  image!: string
}

