export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  imageSource: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type UserInfoEntry = [key: keyof User, value: User[keyof User]];
