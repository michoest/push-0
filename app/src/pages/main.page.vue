<template>
  <q-page>
    <q-list>
      <q-item-label header>Subscriptions</q-item-label>
      <q-item>
        <q-item-section>
          <q-btn @click="onClickSubscriptions">Get subscriptions</q-btn>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{ $store.subscriptions }}
        </q-item-section>
      </q-item>
      <q-item-label header>Notifications</q-item-label>
      <q-item>
        <q-item-section>
          <q-btn @click="onClickNotify">Notify</q-btn>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input v-model="$store.global.id">
            <template v-slot:prepend>
              <q-icon name="fingerprint" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item v-for="notification in $store.notifications" :key="notification">
        <q-item-section>
          <q-item-label>{{ notification.title }}</q-item-label>
          <q-item-label caption>{{ notification.body }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label header>Store</q-item-label>
      <q-expansion-item>
        <q-item-section>
          {{ $store }}
        </q-item-section>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'MainPage'
});

import { ref, onMounted, inject } from 'vue';
import { useStore } from 'stores/store';
import { useRouter } from 'vue-router';

const $notify = inject('notify');
const $store = useStore();
const $router = useRouter();

const onClickNotify = async () => {
  await $store.notify();
};

const onClickSubscriptions = async () => {
  await $store.getSubscriptions();
};
</script>
