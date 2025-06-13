import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post as PostModel } from './schema/post.schema';

describe('PostController', () => {
  let controller: PostController;

  const mockPost: Partial<PostModel> = {
    // _id: '1',
    title: 'Test Post',
    content: 'Test content',
  };

  const mockPostService = {
    create: jest.fn().mockResolvedValue(mockPost),
    consoleLog: jest.fn().mockResolvedValue('Console logged'),
    findAll: jest.fn().mockResolvedValue([mockPost]),
    findOne: jest.fn().mockResolvedValue(mockPost),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockPost, title: 'Updated Title' }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const result = await controller.create({
        title: 'Test',
        content: 'Content',
      });
      expect(result).toEqual(mockPost);
      expect(mockPostService.create).toHaveBeenCalledWith({
        title: 'Test',
        content: 'Content',
      });
    });
  });

  describe('findConsole', () => {
    it('should return console log response',async () => {
      const result = await controller.findConsole();
      expect(result).toBe('Console logged');
      expect(mockPostService.consoleLog).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockPost]);
      expect(mockPostService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one post', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockPost);
      expect(mockPostService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const result = await controller.update('1', { title: 'Updated Title' });
      expect(result).toEqual({ ...mockPost, title: 'Updated Title' });
      expect(mockPostService.update).toHaveBeenCalledWith('1', {
        title: 'Updated Title',
      });
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ deleted: true });
      expect(mockPostService.remove).toHaveBeenCalledWith('1');
    });
  });
});
