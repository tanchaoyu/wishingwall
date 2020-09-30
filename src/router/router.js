import vue from "vue";
import Router from "vue-router";
const index = () => import("../components/index.vue");
const publish = () => import("../components/publish.vue");
const edit = () => import("../components/edit.vue");
const person = () => import("../components/person");
const wishinfo = () => import("../components/wishinfo");
vue.use(Router);
const router = new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      redirect: { name: "index" },
    },
    {
      path: "/index",
      name: "index",
      component: index,
    },
    {
      path: "/publish",
      name: "publish",
      component: publish,
    },
    {
      path: "/edit",
      name: "edit",
      component: edit,
    },
    {
      path: "/person",
      name: "person",
      component: person,
    },
    {
      path: "/wishinfo",
      name: "wishinfo",
      component: wishinfo,
    },
  ],
});

/*export default {
  router
};*/
export default router;
