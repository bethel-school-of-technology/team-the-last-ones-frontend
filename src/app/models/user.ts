export class User {
    username: string;
    email: string;
    password: string;

    //removed confirmPassword: string because it was never used and was not letting me use the model
    constructor(email: string, password: string, username: string) {
        this.username = username;
        this.email = email;
        this.password = password;

    }
}
