export interface IGame {
  players: string[];
  winner: string;
  id: string;
  date: any;
  createdBy: string;
}

export interface DBUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  permittedUsers: string[];
  confirmed: boolean;
}
