export class UpdateUserDTO {
    constructor({nickname,fcm}){
        this.nickname = nickname.trim();
        this.fcm = fcm;
    }
}