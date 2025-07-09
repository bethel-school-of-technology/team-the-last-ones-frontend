export class User {
<<<<<<< HEAD
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
=======
    username?: string = '';
    email?: string = '';
    password?: string = '';


    // constructor(email: string, password: string, username: string) {
    //     this.username = username;
    //     this.email = email;
    //     this.password = password;

    // }
>>>>>>> f815a10a80a0a8dff7e6c67bdb36fafce683f6c8
}
