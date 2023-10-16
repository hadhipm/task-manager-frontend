<template>
  <div>
    <div style="display: flex; justify-content: space-between; text-align: center; background-color: grey;">
      <h2>Task List</h2>
      <button>
        <router-link to="/add">Add Task</router-link>
      </button>
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-for="task in tasks" :key="task.id" :task="task">
        <tr class="task-row">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td class="actions">
            <button @click="editTask" style="color: blue;">Edit</button>
            <button @click="deleteTask" style="color: red;">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    editTask() {
      console.log("Edit task:", this.task);
      this.$router.push({
        path: '/edit'
      });


    },
    deleteTask() {
      const confirmation = confirm('Are you sure you want to delete this task?');

      if (confirmation) {
        axios.delete(`http://localhost:3000/tasks/3`)
          .then(response => {
            console.log('Task deleted:',response);
            alert('Task successfully deleted!');
            this.fetchTasks();
          })
          .catch(error => {
            console.error('Error deleting task:', error);
          });
      } else {
        console.log('Deletion canceled.');
        alert('Deletion canceled.');
      }
    },

    fetchTasks() {
      axios.get('http://localhost:3000/tasks')
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.task-table th {
  background-color: #f2f2f2;
  color: #333;
}

.task-table tr:hover {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  justify-content: space-around;
}

.actions button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
}

.actions button:hover {
  background-color: grey;
  color: #fff;
}

.task-row {
  background-color: #898787;
  transition: background-color 0.3s;
}

.task-row:hover {
  background-color: #ffffff;
}

.task-row td {
  padding: 12px;
  border-bottom: 1px solid #ffffff;
}

.task-row .actions button {
  padding: 6px 10px;
  margin: 0 4px;
  cursor: pointer;
}

.task-row .actions button:hover {
  background-color: #ffffff;
}
</style>
