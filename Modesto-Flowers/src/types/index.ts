export interface Quiz {
  question: string
  radios?: Option[]
  checkboxes?: Option[]
  textarea?: Textarea
}

export interface Option {
  id: number
  content: string
  action?: OptionAction
}

export interface Textarea {
  placeholder: string
  activeWhenSelected?: number
  disabledWhenSelected?: number
}

interface OptionAction {
  redirectToStep: number
}

export type ObjectAny<T = any> = { [key: string]: T }
