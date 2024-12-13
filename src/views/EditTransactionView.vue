<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  Button,
  Card,
  DatePicker,
  InputNumber,
  InputText,
  Message,
  Toolbar,
  Select,
  FloatLabel,
  ProgressSpinner,
} from "primevue";
import {
  addTransaction,
  getTransaction,
  jarsRef,
  updateTransaction,
  type Jar,
} from "@/data/firebaseHelpers";
import { useDatabaseList } from "vuefire";
import { onValue } from "firebase/database";

// TODO: remove PrimeVue Form code

const props = defineProps({
  txid: String,
});
const router = useRouter();

type txFormValues = {
  txid?: string;
  jarid: string;
  description: string;
  date: Date;
  amount: number;
  note: string;
};

const initialValues: txFormValues = {
  txid: undefined,
  jarid: "",
  description: "",
  date: new Date(),
  amount: 0,
  note: "",
};

const formValues = ref<txFormValues>(initialValues);
const isLoaded = ref<boolean>(false);

onMounted(() => {
  if (props.txid) {
    isLoaded.value = false;

    const txRef = getTransaction(props.txid);

    onValue(txRef, (snapshot) => {
      if (snapshot.exists()) {
        formValues.value = {
          txid: props.txid,
          jarid: snapshot.val().jar,
          description: snapshot.val().description,
          date: new Date(snapshot.val().date),
          amount: snapshot.val().amount,
          note: snapshot.val().note,
        };
      }
      isLoaded.value = true;
    });
  } else {
    isLoaded.value = true;
  }
});

// const resolver = ({ values }: any) => {
//   const errors: Record<string, any[]> = {
//     description: [],
//     date: [],
//     amount: [],
//   };

//   if (!values.jarid) {
//     errors.jarid = [{ message: "Jar is required." }];
//   }

//   if (!values.description) {
//     errors.description = [{ message: "Description is required." }];
//   }

//   if (!values.date) {
//     errors.date = [{ message: "Date is required." }];
//   }

//   if (!values.amount) {
//     errors.amount = [{ message: "Amount is required." }];
//   }

//   return {
//     errors,
//   };
// };

// function onFormSubmit(event: FormSubmitEvent) {
//   if (!event.valid) {
//     return;
//   }

//   if (event.states.txid) {
//     updateTransaction(event.states.txid.value, {
//       jar: event.states.jarid.value,
//       description: event.states.description.value,
//       date: event.states.date.value.toDateString(),
//       amount: event.states.amount.value,
//       note: event.states.note.value,
//     });
//   } else {
//     addTransaction({
//       jar: event.states.jarid.value,
//       description: event.states.description.value,
//       date: event.states.date.value.toDateString(),
//       amount: event.states.amount.value,
//       note: event.states.note.value,
//     });
//   }
//   router.push("/");
// }

function isValid(): boolean {
  if (!formValues.value.jarid) {
    return false;
  }
  if (!formValues.value.description) {
    return false;
  }
  if (!formValues.value.date) {
    return false;
  }
  if (!formValues.value.amount) {
    return false;
  }

  return true;
}

function onSubmit() {
  console.log(formValues.value);

  if (!isValid()) {
    return;
  }
  if (formValues.value.txid) {
    updateTransaction(formValues.value.txid, {
      jar: formValues.value.jarid,
      description: formValues.value.description,
      date: formValues.value.date.toDateString(),
      amount: formValues.value.amount,
      note: formValues.value.note,
    });
  } else {
    addTransaction({
      jar: formValues.value.jarid,
      description: formValues.value.description,
      date: formValues.value.date.toDateString(),
      amount: formValues.value.amount,
      note: formValues.value.note,
    });
  }
  router.push("/");
}

const jarsList = useDatabaseList<Jar>(jarsRef);
const jarsOptions = ref<{ label: string; jarid: string }[]>();
onValue(jarsRef, () => {
  jarsOptions.value = jarsList.value.map((jar) => ({
    label: jar.name,
    jarid: jar.id,
  }));
});
</script>

<template>
  <Toolbar class="p-1" style="margin-bottom: 1rem">
    <template #start>
      <Button @click="router.back()" title="Go Back"
        ><i class="pi pi-arrow-left"
      /></Button>
    </template>
  </Toolbar>

  <div class="flex justify-center">
    <Card class="w-6/12" v-if="isLoaded">
      <template #title>Transaction</template>
      <template #content>
        <div class="flex flex-col justify-center items-center gap-4">
          <div>
            <FloatLabel style="min-width: 12rem; margin-top: 1rem">
              <Select
                name="jarid"
                :options="jarsOptions"
                optionLabel="label"
                optionValue="jarid"
                v-model="formValues.jarid"
                fluid
              />
              <label for="jarid">Jar</label>
            </FloatLabel>
            <Message
              v-if="!formValues.jarid"
              severity="error"
              size="small"
              variant="simple"
            >
              Jar is required</Message
            >
          </div>

          <div>
            <InputText
              name="description"
              type="text"
              placeholder="Description"
              v-model="formValues.description"
              fluid
            />
            <Message
              v-if="!formValues.description"
              severity="error"
              size="small"
              variant="simple"
            >
              Description is required</Message
            >
          </div>

          <div>
            <DatePicker
              name="date"
              placeholder="Date"
              v-model="formValues.date"
              fluid
            />
            <Message
              v-if="!formValues.date"
              severity="error"
              size="small"
              variant="simple"
            >
              Date is required</Message
            >
          </div>

          <div>
            <InputNumber
              name="amount"
              inputId="integeronly"
              placeholder="Amount"
              v-model="formValues.amount"
              fluid
            />
            <Message
              v-if="!formValues.amount"
              severity="error"
              size="small"
              variant="simple"
            >
              Amount is required</Message
            >
            <Message
              v-if="formValues.amount <= 0"
              severity="error"
              size="small"
              variant="simple"
            >
              Amount must be positive</Message
            >
          </div>

          <div>
            <InputText
              name="note"
              type="text"
              placeholder="Note"
              v-model="formValues.note"
              fluid
            />
          </div>

          <Button type="submit" label="Done" @click="onSubmit"></Button>
        </div>
      </template>
    </Card>
    <ProgressSpinner v-else></ProgressSpinner>
  </div>
</template>
