import { makeAutoObservable, observable, action, computed } from "mobx";

// Types
import { QuestionOptions } from '../types/voting-data';

export default class VotingPageStore {
    @observable question: string = '';
    @observable questionOptions: QuestionOptions[] = [];

    constructor() {
      makeAutoObservable(this);
    }

    @action addQuestion = (value: string) => {
      this.question = value;
    }

    @action addQuestionOption = (option: QuestionOptions) => {
      this.questionOptions.push(option);
    }

    @action removeQuestionOption = (i: number) => {
      this.questionOptions.splice(i, 1);
    }

    @action updateQuestionOption = (i: number, value: string) => {
      this.questionOptions[i].title = value;
    }

    @action resetQuestionOptions = () => {
      this.questionOptions = [];
      this.question = '';
    }

    @computed get getQuestionOptionsLength(): number {
      return this.questionOptions?.length || 0;
    }
}
