<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Profile</h4>
      </li>

      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.name}}
        <router-link
          class="secondary-content"
          v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}"
        >See Options
          <!--<i class="fa fa-eye"></i>-->
        </router-link>
      </li>
    </ul>

<!--
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    -->
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "employeelist",
  data() {
    return {
      employees: []
    };
  },
  created() {
    db.collection("employees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      });
  }
};
</script>