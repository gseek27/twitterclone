import Vue from "vue";
import Router from "vue-router";
import dashboard from "@/components/dashboard";
import newemployee from "@/components/newemployee";
import viewemployee from "@/components/viewemployee";
import editEmployee from "@/components/editEmployee";
import employeeList from "@/components/employeeList";
import Login from "@/components/Login";
import Register from "@/components/Register";
import firebase from "firebase/app";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/employeelist",
      name: "employeelist",
      component: employeeList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new",
      name: "new-employee",
      component: newemployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:employee_id",
      name: "edit-employee",
      component: editEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:employee_id",
      name: "view-employee",
      component: viewemployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//nav guards

router.beforeEach((to, from, next) => {
  //check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check if not logged in
    if (!firebase.auth().currentUser) {
      //go to login page
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //check if logged in
    if (firebase.auth().currentUser) {
      //go to login page
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else {
    //proceed to route
    next();
  }
});

export default router;
