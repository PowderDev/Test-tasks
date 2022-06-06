import { Status } from "../types";

export const getNextStatus = (status: Status) => {
  if (status === Status.REGISTERED) return Status.ACCEPTED;
  else if (status === Status.ACCEPTED) return Status.COMPLETED;
  else if (status === Status.COMPLETED) return Status.REJECTED;
  else return Status.REGISTERED;
};
