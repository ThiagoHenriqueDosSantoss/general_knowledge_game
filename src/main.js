import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

export default{
    name:'Axios',
    methods: {
        /**
         Este metodo realiza a requisição para a API do Open Trivia,
         e  retorna os dados com as perguntas;
         */
        getInfo() {
            axios
            .get("https://opentdb.com/api.php?amount=10&category=18")
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
