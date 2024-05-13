import { type User as FireUser } from "firebase/auth";

export default class User {
  id: string;
  name: string;
  displayName: string;
  email: string;
  isAdmin: boolean = false;

  constructor(id: string, name: string, displayName: string, email: string) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.email = email;
  }

  setAdmin(value: boolean) {
    this.isAdmin = value;
  }

  static setUserFromFirebase(user: FireUser): User {
    console.log("fireuser", user);
    return new User(user.uid, user.displayName || "", user.displayName || "", user.email || "");
  }

  static createEmptyUser() {
    return new User("", "", "", "");
  }
}