export class User {
    username: string;
    email: string;
    password: string;


    constructor(email: string, password: string, username: string, confirmPassword: string) {
        this.username = username;
        this.email = email;
        this.password = password;

    }
}
