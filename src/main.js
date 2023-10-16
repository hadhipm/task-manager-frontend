import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

const routes = [
  { path: '/', component: TaskList },
  { path: '/add', component: TaskForm },
  {
    path: '/edit',
    component: TaskForm,
    props: {
      editMode: true 
    }
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
