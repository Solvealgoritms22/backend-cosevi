import { Test, TestingModule } from '@nestjs/testing';
import { LprService } from './lpr.service';

describe('LprService', () => {
  let service: LprService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LprService],
    }).compile();

    service = module.get<LprService>(LprService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
