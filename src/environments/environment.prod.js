import { StudentsRepository, MastersRepository, SessionsRepository } from '../data-access/app-write';
import { MockPlanRepository } from '../data-access/mock';

export default {
    studentsRepository: StudentsRepository,
    mastersRepository: MastersRepository,
    planRepository: MockPlanRepository,
    sessionRepository: SessionsRepository,
}