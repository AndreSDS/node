import {Submission} from "../../domain/entities/submission";
import {ChallengeRepository} from "../repositories/ChallengesRepository";
import {StudentRepository} from "../repositories/StudentRepository";

type CreateChallengeSubmissionRequest = {
  studentId: string;
  challengeId: string;
};

export class CreateChallengeSubmission {
  constructor(
    private studentsRepository: StudentRepository,
    private challengesRepository: ChallengeRepository
  ) {}

  async execute({studentId, challengeId}: CreateChallengeSubmissionRequest) {
    const student = await this.studentsRepository.findById(studentId);
    const challenge = await this.challengesRepository.findById(challengeId);

    if (!student) {
      throw new Error("Student not found");
    }

    if (!challenge) {
      throw new Error("Challenge not found");
    }

    const submission = await Submission.create({
      studentId,
      challengeId,
    });

    return submission;
  }
}
