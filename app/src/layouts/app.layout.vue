<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-2 text-primary">
      <q-separator />
      <q-input v-model="api" placeholder="API URL" class="q-mx-sm">
        <template v-slot:append>
          <q-btn round dense flat icon="network_check" :color="apiStatus ? 'positive' : 'negative'" @click="checkAPI" />
          <q-btn round dense flat color="primary" icon="sync" @click="setAPI" />
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script setup>
defineOptions({ name: 'AppLayout' });

import { ref, onMounted, onUnmounted, inject } from 'vue';
import { useStore } from 'stores/store';

const $store = useStore();
const $notify = inject('notify');

onMounted(async () => {
  api.value = $store.persistent.api;
  await checkAPI();

  navigator.serviceWorker.addEventListener('message', handlePushMessage);
});

onUnmounted(() => {
  navigator.serviceWorker.removeEventListener('message', handlePushMessage);
});

const api = ref('');
const apiStatus = ref(false);

const checkAPI = async () => {
  apiStatus.value = await $store.checkAPI(api.value);
};

const setAPI = () => {
  $store.setAPI(api.value);
  $notify(`API updated!`);
}

const handlePushMessage = (event) => {
  if (event.data && event.data.type === 'PUSH_RECEIVED') {
    $store.handlePush(event.data.payload);
  }
};
</script>
