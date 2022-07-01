import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {Input,Button,message,Steps,Upload,Tabs} from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import axios from 'axios';
import VueAxios from '../plugins/vueAxios'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Input)
app.use(Button)
app.use(Steps)
app.use(Upload)
app.use(Tabs)

app.use(VueAxios,axios)
app.provide('$http',app.config.globalProperties.axios)
app.config.globalProperties.$message=message;



app.mount('#app')
