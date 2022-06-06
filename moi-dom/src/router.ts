import FormPageVue from "./page/FormPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ReportListPageVue from "./page/ReportListPage.vue";
import ReportPageVue from "./page/ReportPage.vue";

const routes = [
  { path: "/", component: ReportListPageVue },
  { path: "/form", component: FormPageVue },
  { path: "/report/:id", component: ReportPageVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
