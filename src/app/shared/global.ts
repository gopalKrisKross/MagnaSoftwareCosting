import { IUser } from './model';

export class Global {
  //http://192.168.1.136:90/api/login/userLogin
  public static MAGNA_API: string = 'http://192.168.1.136:90/api';
  public static LOGGED_IN_USER: IUser;
}
