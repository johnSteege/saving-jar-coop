<script setup lang="ts">
import {
  getDatabase,
  ref as dbRef,
  type DatabaseReference,
} from "firebase/database";
import { useDatabaseList } from "vuefire";

const db = getDatabase();
const jarsRef = useDatabaseList(dbRef(db, "jars"));
</script>

<template>
  <ul>
    <li v-for="jar in jarsRef" :key="jar.id">
      <span> {{ jar.id }}</span>
    </li>
  </ul>
</template>
