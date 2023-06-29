import { IUser } from './model';

export class Global {
  //http://192.168.1.136:90/api/login/userLogin
  //public static MAGNA_API: string = 'http://192.168.1.136:90/api'; //local
  // public static MAGNA_API: string = 'http://localhost:4950/api';//local copy
  // public static MAGNA_API: string = 'http://178.63.87.175:91/api'; //live
  public static MAGNA_API: string = 'https://projectapi.ffherp.co.in/api'; //live https
  public static LOGGED_IN_USER: IUser;
}
