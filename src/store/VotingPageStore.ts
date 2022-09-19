import { makeAutoObservable, observable, action, computed } from "mobx";

// Constants
import {
  MAX_NUMBER_OF_OPTIONS,
  MIN_NUMBER_OF_OPTIONS,
} from "../constants/default.constants";

// Types
import { QuestionOptions } from "../types/voting-data";

export default class VotingPageStore {
  @observable question: string = "";
  @observable questionOptions: QuestionOptions[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action addQuestion = (value: string) => {
    this.question = value;
  };

  @action addQuestionOption = (option: QuestionOptions) => {
    this.questionOptions.push(option);
  };

  @action removeQuestionOption = (i: number) => {
    this.questionOptions.splice(i, 1);
  };

  @action updateQuestionOption = (i: number, value: string) => {
    this.questionOptions[i].title = value;
  };

  @action resetQuestionOptions = () => {
    this.questionOptions = [];
    this.question = "";
  };

  @action increaseVoteCounter = (i: number) => {
    this.questionOptions[i].voteCount += 1;
  };

  @computed get getQuestionOptionsLength(): number {
    return this.questionOptions?.length || 0;
  }

  @computed get isOptionsBelowMin(): boolean {
    return this.getQuestionOptionsLength < MIN_NUMBER_OF_OPTIONS;
  }

  @computed get maxOptionsReached(): boolean {
    return this.getQuestionOptionsLength === MAX_NUMBER_OF_OPTIONS;
  }
}
