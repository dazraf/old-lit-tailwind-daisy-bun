import { Person } from "./Person";
import { createContext } from "@lit/context";
import { generateRandomPeople } from "./RandomPersonGenerator";

export interface PersonRepository {
  getPeople(): Person[];
  getPerson(id: string): Person | undefined;
}

// temporary in-memory implementation
const randomPeople = generateRandomPeople(20);

export class PersonRepositoryInMemory implements PersonRepository {
  private people: Person[] = randomPeople;

  getPeople(): Person[] {
    return this.people;
  }

  getPerson(id: string): Person | undefined {
    return this.people.find((p) => p.id === id);
  }
}

export const personRepositoryContext = createContext<PersonRepository>("person-repository");
