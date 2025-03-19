import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './users.service';

const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'hashedpassword',
  isAdmin: true,
} as User;

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //buscar usuario por username
  it('findOne by username', async () => {
    const result = await service.findOne('testuser');
    expect(result).toEqual(mockUser);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { username: 'testuser' },
    });
  });

  //buscar usuario por username - usuario no encontrado
  it('username not fount', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
    const result = await service.findOne('unknownuser');
    expect(result).toBeNull();
  });
});
