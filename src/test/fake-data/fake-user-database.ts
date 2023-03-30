export type UserTypeDB = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const fakeUserDataBase: UserTypeDB[] = [
  {
    id: "856be205-18d7-4b55-8e67-d27501f7cf5f",
    email: "zezim@email.com",
    name: "Zezim Pereira",
    password: "123456",
  },
];
