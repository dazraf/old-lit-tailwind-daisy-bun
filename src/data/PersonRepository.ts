import { Person } from "./Person";
import { createContext } from "@lit/context";

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
      email: "john.doe@me.com",
      address: "1234 Elm St",
      mobile: "555-555-5555",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: new Date(1985, 2, 2),
      email: "jane.smith@me.com",
      address: "1234 Oak St",
      mobile: "555-555-5555",
    },
    {
      id: "3",
      firstName: "Alex",
      lastName: "Wonderland",
      dateOfBirth: new Date(1988, 3, 3),
      email: "alex.wonderland@me.com",
      address: "1234 Maple St",
      mobile: "555-555-5555",
    },
    {
      id: "4",
      firstName: "Alexandra",
      lastName: "Mertz",
      dateOfBirth: new Date(1990, 4, 4),
      email: "alexandra.mertz@me.com",
      address: "1234 Pine St",
      mobile: "555-555-5555",
    },
  ];

  getPeople(): Person[] {
    return this.people;
  }
}

export const personRepositoryContext = createContext<PersonRepository>("person-repository");
