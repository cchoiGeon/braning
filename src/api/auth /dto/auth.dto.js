export class SignupDTO {
    constructor({username,nickname,birth,gender,fcm}){ // 데이터가 안 들어오면 undefined가 뜸
        this.username = username.trim();
        this.nickname = nickname.trim();
        this.birth = birth;
        this.gender = gender;
        this.fcm = fcm;
    }
}

export class SigninDTO {
    constructor({username,fcm}){
        this.username = username.trim();
        this.fcm = fcm;
    }
}