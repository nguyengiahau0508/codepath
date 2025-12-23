// infrastructure/queue/queues/judge.queue.ts
import { BullModule } from '@nestjs/bullmq';

export const JudgeQueue = BullModule.registerQueue({
  name: 'judge',
});

