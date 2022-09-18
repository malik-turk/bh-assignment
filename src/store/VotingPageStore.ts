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

    @computed get getQuestionOptionsLength(): number {
      return this.questionOptions?.length || 0;
    }
}
