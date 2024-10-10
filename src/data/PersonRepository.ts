import { Person } from "./Person";

export interface PersonRepository {
  getPeople(): Person[];
}

// temporary in-memory implementation

export class PersonRepositoryInMemory implements PersonRepository {
  private people: Person[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date(1980, 1, 1),
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: new Date(1985, 2, 2),
    },
  ];

  getPeople(): Person[] {
    return this.people;
  }
}
