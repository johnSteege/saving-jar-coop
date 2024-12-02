import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { v7 as uuidv7 } from "uuid";
import { ref } from "vue";

export type Jar = {
  name: string;
  notes?: string;
};

export type Transaction = {
  jar: string;
  description: string;
  amount: number;
  date: number;
  note?: string;
};

const db = getDatabase();
export const jarsRef = dbRef(db, "jars");
export const transactionsRef = dbRef(db, "transactions");

export function addJar(jar: Jar) {
  set(dbRef(db, "jars/" + uuidv7()), jar);
}

export function addTransaction(transaction: Transaction) {
  set(dbRef(db, "transactions/" + uuidv7()), transaction);
}

export function updateTransaction(txid: string, transaction: Transaction) {
  set(dbRef(db, "transactions/" + txid), transaction);
}
