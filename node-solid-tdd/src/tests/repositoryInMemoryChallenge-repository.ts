import {ChallengeRepository} from "../applications/repositories/ChallengesRepository";
import {Challenge} from "../domain/entities/challenge";

export class ImMemoryChallengesRepository implements ChallengeRepository {
  items: Challenge[] = [];

  async findById(id: string): Promise<Challenge | null> {
    const challenge = this.items.find((item) => item.id === id);

    if (!challenge) {
      return null;
    }

    return challenge;
  }
}
