import {StudentRepository} from "../applications/repositories/StudentRepository";
import {Student} from "../domain/entities/student";

export class ImMemoryStudentRepository implements StudentRepository {
  public items: Student[] = [];

  async findById(id: string): Promise<Student | null> {
    const student = this.items.find((item) => item.id === id);

    if (!student) {
      return null;
    }

    return student;
  }
}
