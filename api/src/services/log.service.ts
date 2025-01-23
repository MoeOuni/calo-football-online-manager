import { LogModel } from '@/models/logs.model';

export class LogService {
  public async createLog(userId: string, action: string): Promise<void> {
    const newLog = new LogModel({ userId, action });
    await newLog.save();
  }
}
