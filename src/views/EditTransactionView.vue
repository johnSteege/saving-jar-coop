<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Button,
  Card,
  DatePicker,
  InputNumber,
  InputText,
  Message,
  Toolbar,
} from "primevue";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import {
  addJar,
  addTransaction,
  updateTransaction,
} from "@/data/firebaseHelpers";

const router = useRouter();

type txFormValues = {
  txid: string;
  jarid: string;
  description: string;
  date: Date;
  amount: number;
  note: string;
};

const initialValues = ref<txFormValues>({
  txid: "",
  jarid: "",
  description: "",
  date: new Date(),
  amount: 0,
  note: "",
});

const resolver = ({ values }: any) => {
  const errors: Record<string, any[]> = {
    description: [],
    date: [],
    amount: [],
  };

  if (!values.jarid) {
    errors.jarid = [{ message: "Jar is required." }];
  }

  if (!values.description) {
    errors.description = [{ message: "Description is required." }];
  }

  if (!values.date) {
    errors.date = [{ message: "Date is required." }];
  }

  if (!values.amount) {
    errors.amount = [{ message: "Amount is required." }];
  }

  return {
    errors,
  };
};

function onFormSubmit(event: FormSubmitEvent) {
  if (!event.valid) {
    return;
  }

  if (event.states.txid) {
    updateTransaction(event.states.txid.value, {
      jar: event.states.jarid.value,
      description: event.states.description.value,
      date: event.states.date.value.toDateString(),
      amount: event.states.amount.value,
      note: event.states.note.value,
    });
  } else {
    addTransaction({
      jar: event.states.jarid.value,
      description: event.states.description.value,
      date: event.states.date.value.toDateString(),
      amount: event.states.amount.value,
      note: event.states.note.value,
    });
  }
  router.push("/");
}
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
    <Card class="w-6/12">
      <template #title>Transaction</template>
      <template #content>
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
          <div class="flex flex-col justify-center items-center gap-4">
            <div>
              <InputText name="jarid" type="text" placeholder="Jar ID" fluid />
              <!-- @vue-ignore -->
              <Message
                v-if="$form.jarid?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <!-- @vue-ignore -->
                {{ $form.jarid.error.message }}</Message
              >
            </div>

            <div>
              <InputText
                name="description"
                type="text"
                placeholder="Description"
                fluid
              />
              <!-- @vue-ignore -->
              <Message
                v-if="$form.description?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <!-- @vue-ignore -->
                {{ $form.description.error.message }}</Message
              >
            </div>

            <div>
              <DatePicker name="date" placeholder="Date" fluid />
              <!-- @vue-ignore -->
              <Message
                v-if="$form.date?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <!-- @vue-ignore -->
                {{ $form.date.error.message }}</Message
              >
            </div>

            <div>
              <InputNumber
                name="amount"
                inputId="integeronly"
                placeholder="Amount"
                fluid
              />
              <!-- @vue-ignore -->
              <Message
                v-if="$form.amount?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <!-- @vue-ignore -->
                {{ $form.amount.error.message }}</Message
              >
            </div>

            <div>
              <InputText name="note" type="text" placeholder="Note" fluid />
              <!-- @vue-ignore -->
              <Message
                v-if="$form.note?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <!-- @vue-ignore -->
                {{ $form.note.error.message }}</Message
              >
            </div>

            <Button type="submit" label="Done"></Button>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
