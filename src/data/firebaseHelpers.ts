import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";
import { v7 as uuidv7 } from "uuid";
import { ref } from "vue";
import { useDatabaseList } from "vuefire";

export type Jar = {
  name: string;
  notes?: string;
};

export type Transaction = {
  readonly id: string;
  jar: string;
  amount: number;
  date: number;
  note?: string;
};

const db = getDatabase();
const jarsRef = dbRef(db, "jars");
export const jarsList = useDatabaseList<Jar>(jarsRef);

const transactionsRef = dbRef(db, "transactions");
const transactionsList = useDatabaseList<Transaction>(transactionsRef);

export const jarSums = ref<Record<string, number>>({});

onValue(transactionsRef, () => {
  sumTransactions();
});

function sumTransactions() {
  transactionsList.value.forEach((transaction) => {
    jarSums.value[transaction.jar] =
      (jarSums.value[transaction.jar] || 0) + Number(transaction.amount);
  });
}

export function addJar(jar: Jar) {
  set(dbRef(db, "jars/" + uuidv7()), jar);
}
