export class CreateCrewDto {
    constructor(name, description, isPublic, password) {
      this.name = name;
      this.description = description;
      this.isPublic = isPublic;
      this.password = password;
    }
}
