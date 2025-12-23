
// submissions/enums/submission-status.enum.ts
export enum SubmissionStatus {
  QUEUED = 'queued',
  JUDGING = 'judging',
  ACCEPTED = 'accepted',
  WRONG_ANSWER = 'wrong_answer',
  TLE = 'tle',
  MLE = 'mle',
  RUNTIME_ERROR = 'runtime_error',
  COMPILE_ERROR = 'compile_error',
  INTERNAL_ERROR = 'internal_error',
}
