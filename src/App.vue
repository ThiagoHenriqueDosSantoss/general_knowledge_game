<template>

    <ScorerBoard
      :counter-accuracies="this.counterAccuracies"
      :counterErrors="this.counterErrors"/>

  <div class="App"></div>

 <template v-if="this.question">
    <h1 v-html="this.question"></h1>
    <template v-for="(a, index) in this.answers" :key="index">
    <input 
    :disabled="this.answersSubmited"
      type="radio" 
      name="options" 
      :value="a" 
      v-model="this.chosen_answer"/>
    <label v-html="a"></label><br />
  </template>
  
</template>
  
  <button v-if="this.chosen_answer || !this.answersSubmited" @click="this.submitAnswer()"  class="send" type="button">Send</button>

  <section v-if="this.answersSubmited" class="result">
    <h4 v-if="this.chosen_answer != this.correctAnswers" v-html="'&#10060; Desculpe, você errou a resposta, a escolhe correta seria '+ this.correctAnswers +'.'"></h4>
    <h4 v-else v-html="'&#9989; Parabéns, você acertou a resposta! '+ this.correctAnswers +'.'"></h4>
    <button @click="this.getNewQuestion()" class="send" type="button">Próxima questão</button>
  </section>
</template>

<script>
import ScorerBoard from './components/ScorerBoard.vue';



export default {
  name: 'App',
  components:{
    ScorerBoard
  },
  data(){
    return {
      question: undefined,
      incorretAnswers: [],
      correctAnswers: '',
      chosen_answer: undefined,
      counterAccuracies: 0,
      counterErrors: 0,
      answersSubmited: false
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
          this.answersSubmited = true
          if(this.chosen_answer == this.correctAnswers){
            this.counterAccuracies ++;
          } else{
            this.counterErrors ++;
          }
        }
      },
      printCorrectAnswer(){
        if(this.chosen_answer != this.correctAnswers){
          return true;
        }
      },
      nextQuestion(){
          this.created();
      },
      getNewQuestion(){
        this.answersSubmited = false;
        this.chosen_answer = undefined;
        this.question = undefined;

        this.axios
        .get("https://opentdb.com/api.php?amount=10&category=18")
        .then((response) => {
          this.question = response.data.results[0].question;
          this.incorretAnswers = response.data.results[0].incorrect_answers;
          this.correctAnswers = response.data.results[0].correct_answer;

          this.chosen_answer = undefined;

      });
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
button.nextQuestion {
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
