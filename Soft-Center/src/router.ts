import { createRouter, createWebHashHistory } from "vue-router";
import CardsPage from "./pages/CardsPage.vue";
import ReceiptsPage from "./pages/ReceiptsPage.vue";
import TransactionsPage from "./pages/TransactionsPage.vue";

const routes = [
  { path: "/", component: CardsPage },
  { path: "/transactions", component: TransactionsPage },
  { path: "/receipts", component: ReceiptsPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
