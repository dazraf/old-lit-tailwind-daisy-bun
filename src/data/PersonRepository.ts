import { Person } from "./Person";
import { createContext } from "@lit/context";
import { generateRandomPeople } from "./RandomPersonGenerator";
import Fuse from "fuse.js";

export interface PersonRepository {
  getPeople(): Person[];
  getPerson(id: string): Person | undefined;
  fuzzySearch(query: string): Person[];
}

// temporary in-memory implementation
const randomPeople = generateRandomPeople(100);

export class PersonRepositoryInMemory implements PersonRepository {
  private people: Person[] = randomPeople;

  private fuse = new Fuse(this.people, {
    // ignoreLocation: true,
    location: 0,
    threshold: 0.0,
    distance: 1000,
    shouldSort: true,
    keys: ["firstName", "lastName"],
  });

  getPeople(): Person[] {
    return this.people;
  }

  getPerson(id: string): Person | undefined {
    return this.people.find((p) => p.id === id);
  }

  fuzzySearch(query: string): Person[] {
    const result = this.fuse.search(query);
    return result.map((r) => r.item);
  }
}

export const personRepositoryContext = createContext<PersonRepository>("person-repository");
