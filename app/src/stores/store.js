// stores/store.js
import { defineStore } from "pinia";
import { api as $api } from "boot/axios";
import { notify as $notify } from "boot/notify";
import _ from "lodash";

export const useStore = defineStore("store", {
  state: () => ({
    global: {
      notificationSubscription: null,
      id: '123'
    },
    persistent: {
      api: "http://localhost:3000",
    },
    notifications: [],
    subscriptions: []
  }),
  getters: {},
  actions: {
    async checkAPI(url) {
      try {
        await $api.get(`${url}/ping`, { baseURL: "" });

        return true;
      } catch (err) {
        return false;
      }
    },
    setAPI(url) {
      this.persistent.api = url;
      $api.defaults.baseURL = url;
    },
    async getSubscriptions() {
      try {
        const response = await $api.get('/subscriptions');
        this.subscriptions = response.data;
        $notify('Subscriptions fetched!');

      } catch (err) {
        $notify(err, { type: 'negative' });
      }
    },
    async notify() {
      try {
        const response = await $api.post('/notify', { notification: { title: `Schallo from ${this.global.id}`, body: 'Schie weht?' } });
        $notify(JSON.stringify(response.data.stats));

      } catch (err) {
        $notify(err, { type: 'negative' });
      }
    },
    async handlePush(payload) {
      console.log("handlePush", payload);
      $notify(JSON.stringify(payload));
      this.notifications.push(payload);
    },
  },
  persist: {
    storage: sessionStorage,
    pick: ["persistent"],
    afterHydrate: (ctx) => {
      $api.defaults.baseURL = ctx.store.persistent.api;
    },
  },
});
