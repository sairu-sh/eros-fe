export interface IDetails {
  id: number;
  bio: string;
  city: string;
  college: string;
  country: string;
  dob: Date;
  fullname: string;
  gender: string;
  interests: { id: number; interest: string }[];
  distance: number;
  imageurls: string[];
}
