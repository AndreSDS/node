import {Challenge} from "../../domain/entities/challenge";
import {Student} from "../../domain/entities/student";
import {ImMemoryChallengesRepository} from "../../tests/repositoryInMemoryChallenge-repository";
import {ImMemoryStudentRepository} from "../../tests/repositoryInMemoryStudent-repository";
import {CreateChallengeSubmission} from "./create-challenge-submission";

describe("Create challenge submission use case", () => {
  it("should create a challenge submission", async () => {
    const studentRepository = new ImMemoryStudentRepository();
    const challengeRepository = new ImMemoryChallengesRepository();

    const student = Student.create({
      name: "student-name",
      email: "student-email",
    });

    const challenge = Challenge.create({
      title: "challenge-title",
      urlInstructions: "challenge-url-instructions",
    });

    studentRepository.items.push(student);
    challengeRepository.items.push(challenge);

    const sut = new CreateChallengeSubmission(
      studentRepository,
      challengeRepository
    );

    const response = await sut.execute({
      studentId: student.id,
      challengeId: challenge.id,
    });

    expect(response).toBeTruthy();
  });
});
