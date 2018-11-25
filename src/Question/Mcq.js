import React, {Component} from 'react';

import auth0Client from '../Auth';
import quizQuestions from '../api/quizQuestions';
import Quiz from './Quiz';
import Result from './Result';

import Piechart from './piechart';

class Mcq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      difficulty: quizQuestions[0].difficulty,
      category:quizQuestions[0].category,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        correct: 0,
        wrong: 0,

      },
      result: '',
      Ncorrect:0,
      Nwrong : 0,
      checkingSession: true,
      cat:
      {
        qu:0,
        cir:0,
        prob:0,
        ap:0,
        re:0


      },
      nq:0,
      nc:0,
      np:0,
      na:0,
      nr:0,

    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;


    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;


      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    if(event.currentTarget.value===quizQuestions[this.state.questionId-1].correctanswer)
    {
      this.setUserAnswerCorrect(event.currentTarget.value);
    }
    else
    {
      this.setUserAnswerWrong(event.currentTarget.value);

    }

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswerCorrect(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        correct: state.answersCount["correct"] + 1
      },
      answer: answer
    }));
  }
  setUserAnswerWrong(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        wrong: state.answersCount["wrong"] + 1,

      },
      answer: answer,

    }));

    if(quizQuestions[this.state.questionId-1].category==="Circles")
    this.setState((state,props)=>({
      cat:{
        ...state.cat,
        cir:state.cat["cir"] + 1,
      }
    }))
    if(quizQuestions[this.state.questionId-1].category==="Arithmetic Progression")
    this.setState((state,props)=>({
      cat:{
        ...state.cat,
        ap:state.cat["ap"] + 1,
      }
    }))
    if(quizQuestions[this.state.questionId-1].category==="Quadratic Equations")
    this.setState((state,props)=>({
      cat:{
        ...state.cat,
        qu:state.cat["qu"] + 1,
      }
    }))
    if(quizQuestions[this.state.questionId-1].category==="Real Numbers")
    this.setState((state,props)=>({
      cat:{
        ...state.cat,
        re:state.cat["re"] + 1,
      }
    }))
    if(quizQuestions[this.state.questionId-1].category==="Probability")
    this.setState((state,props)=>({
      cat:{
        ...state.cat,
        prob:state.cat["prob"] + 1,
      }
    }))
    console.log(this.state.cat);
    console.log(this.state.answersCount);

  }
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      category:quizQuestions[counter].category,
      difficulty:quizQuestions[counter].difficulty,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }
  getResultscat() {
    const catCount = this.state.cat;
    const catCountKeys = Object.keys(catCount);
    const catCountValues = catCountKeys.map(key => catCount[key]);
    const maxAnswerCount = Math.max.apply(null, catCountValues);

    return catCountKeys.filter(key => catCount[key] === maxAnswerCount);
  }

  setResults(result) {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxcat=this.getResultscat();

    if (result.length === 1) {
      this.setState({
      result:result[0],
      Ncorrect: answersCountValues[0],
      Nwrong:answersCountValues[1],
      nq:this.state.cat["qu"],
      nc:this.state.cat["cir"],
      np:this.state.cat["prob"],
      na:this.state.cat["ap"],
      nr:this.state.cat["re"],
      });

    } else {
      this.setState({ result: 'Undetermined' });
    }

  }
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        difficulty={this.state.difficulty}
        category={this.state.category}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (<div class="container">
      <div ><Result quizResult={this.state.result}
                    correct={this.state.Ncorrect}
                    wrong={this.state.Nwrong}
                    nq={this.state.nq}
                    nc={this.state.nc}
                    np={this.state.np}
                    na={this.state.na}
                    nr={this.state.nr}/>
                    </div>
                    <div><Piechart  correct={this.state.Ncorrect}
    wrong={this.state.Nwrong} /></div>
                    </div>)  ;
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }









  render() {

    return (
        <div>

          <h2>MCQ Test</h2>

       {this.state.result ? this.renderResult() : this.renderQuiz()}

      </div>











    )
  }
}

export default Mcq;
