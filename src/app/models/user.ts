export class User {
    userId?: number;
    userName: string;
    email: string;
    password: string;


    constructor(email: string, password: string, username: string, id: number) {
        this.userName = username;
        this.email = email;
        this.password = password;
        this.userId = id;
    }
}
