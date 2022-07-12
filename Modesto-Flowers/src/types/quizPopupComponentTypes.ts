import { ObjectAny, Quiz } from "./index"

export interface Data {
  quizzes: Quiz[]
  step: number
  totalSteps: number
  answers: ObjectAny
}
