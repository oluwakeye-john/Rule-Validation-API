const databaseSource = [
  {
    name: "Oluwakeye John",
    github: "@oluwakeye-john",
    email: "bjohnoluwakeye@gmail.com",
    mobile: "07053643618",
    twitter: "@oluwakeyejohn",
  },
];

class PersonalRepository {
  getUser() {
    const user = databaseSource[0];
    return user;
  }
}

const personalRepo = new PersonalRepository();
export default personalRepo;
