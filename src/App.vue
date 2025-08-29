<template>
  <div class="App"><h5 class="acertos">{{ counterAccuracies }} - Acertos</h5> <h5 class="erros"> {{ counterErrors }} - Erros</h5></div>
 <template v-if="this.question">
    <h1 v-html="this.question"></h1>
    <template v-for="(a, index) in this.answers" :key="index">
    <input 
      type="radio" 
      name="options" 
      :value="a" 
      v-model="this.chosen_answer"/>
    <label v-html="a"></label><br />
  </template>

</template>
  
  <button v-if="disableButtonSend()" @click="this.submitAnswer()"  class="send" type="button">Send</button>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      question: undefined,
      incorretAnswers: [],
      correctAnswers: '',
      chosen_answer: undefined,
      counterAccuracies: 0,
      counterErrors: 0
    }
  },
  computed: {
    answers(){
      var answers = [...this.incorretAnswers];
      answers.splice((Math.round(Math.random() * answers.length)),0,this.correctAnswers);
      return answers;
    }
  },
  methods:{
      created(){
        this.axios
        .get("https://opentdb.com/api.php?amount=10&category=18")
        .then((response) => {
          this.question = response.data.results[0].question;
          this.incorretAnswers = response.data.results[0].incorrect_answers;
          this.correctAnswers = response.data.results[0].correct_answer;

          this.chosen_answer = undefined;

      });
      },
      submitAnswer(){
        if(!this.chosen_answer){
          alert("Escolha uma resposta!")
        }else{
          if(this.chosen_answer == this.correctAnswers){
            alert("Acertou!");
            this.counterAccuracies ++;
          } else{
            alert("Errou!");
            alert("Resposta correta: "+ this.correctAnswers);
            this.counterErrors ++;
          }
          this.created();
        }
        
      },
      disableButtonSend(){
        if(!this.chosen_answer){
          return false;
        } else{
          return true;
        }
      },
      printCorrectAnswer(){
        if(this.chosen_answer != this.correctAnswers){
          return true;
        }
      }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;
 
}
 
input[type='radio']{
  margin: 12px 4px;
}
 
button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}
h5 {
    font-size: 1rem;
    margin: 0 10px;
    display: inline-block;
  }
#acertos {
  color: green;
}
</style>
