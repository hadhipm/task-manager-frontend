<template>
  <div class="task-form">
    <h2>{{ editMode ? "Edit Task" : "Add Task" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Task Name:</label>
        <input v-model="localTask.title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="localTask.description" id="description" required></textarea>
      </div>

      <button type="submit">{{ editMode ? "Update Task" : "Add Task" }}</button>
      <button @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    editMode: Boolean,
    task: Object,
  },
  data() {
    return {
      localTask: {
        title: this.task ? this.task.title : '',
        description: this.task ? this.task.description : ''
      }
    };
  },
  watch: {
    task: {
      handler(newValue) {
        this.localTask = { ...newValue };
      },
      immediate: true,
    },
  },
  methods: {
    cancel() {
      this.$router.push('/');
    },
    handleSubmit() {
      if (this.editMode) {
        axios.put(`http://localhost:3000/tasks/1`, this.localTask)
          .then(response => {
            console.log('Task updated:', response.data);
            alert('Task successfully updated');
            this.$router.push({ path: '/' });
          })
          .catch(error => {
            console.error('Error updating task:', error);
          });
      } else {
        axios.post('http://localhost:3000/create-tasks', this.localTask)
          .then(response => {
            console.log('Task added:', response.data);
            alert('Task successfully created');
            this.$router.push({ path: '/' });
          })
          .catch(error => {
            console.error('Error adding task:', error);
          });
      }
    },
  },
};
</script>


<style scoped>
.task-form {
  max-width: 400px;
  margin: 0 auto;
}

.task-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.task-form input,
.task-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
}

.task-form button {
  padding: 10px 20px;
  cursor: pointer;
}

.task-form button:hover {
  background-color: #333;
  color: #fff;
}

button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
