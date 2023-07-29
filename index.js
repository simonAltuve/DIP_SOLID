class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}

let user = new User('usertest', '1234');

//-------------wrong code--------------------

class wrongUserController{

    constructor(){
        this.userService = new wrongUserService();
    }

    save(user){
        user.password = this.encrypt(user.password);
        this.userService.save(user);
    }

    encrypt(password){
        //my encrypt algorithm
        return 'mypasswordencryptwrong';
    }
}

class wrongUserService{

    save(user){
        console.log('User '+user.username+' saved');
        //save the user
    }
}

const _wrongUserController = new wrongUserController();
_wrongUserController.save(user);

console.log('--------------------------');


//----------------------right code-------------------------------

class PasswordEncryptor{

    encrypt(password){
        //my encrypt algorithm
        return 'mypasswordencrypt';
    }
}


class UserController{

    constructor(userService){
        this.userService = userService;
    }

    save(user){
        this.userService.save(user);
    }
}

class UserService{

    constructor(passwordEncryptor){
        this._passwordEncryptor = passwordEncryptor;
    }

    save(user){
        user.password = this._passwordEncryptor.encrypt(user.password);
        console.log('User '+user.username+' saved successfully');
        //save the user
    }
}

const encryptor = new PasswordEncryptor();
const _userController = new UserController(new UserService(encryptor));

_userController.save(user);