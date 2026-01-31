import { Test, TestingModule } from '@nestjs/testing';
import { LprController } from './lpr.controller';
import { LprService } from './lpr.service';

describe('LprController', () => {
  let controller: LprController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LprController],
      providers: [LprService],
    }).compile();

    controller = module.get<LprController>(LprController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
