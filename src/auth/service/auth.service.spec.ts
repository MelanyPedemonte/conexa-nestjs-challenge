import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  //Prueba login
  describe('login', () => {
    //OK
    it('login', async () => {
      const loginDto = { username: 'testuser', password: 'password' };
      const user = {
        username: 'testuser',
        password: await bcrypt.hash('password', 10),
        id: 1,
        isAdmin: false,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await authService.login(loginDto);

      expect(result).toEqual('jwt-token');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'testuser',
        sub: 1,
        isAdmin: false,
      });
    });

    //Usuario no encontrado
    it('User not found', async () => {
      const loginDto = { username: 'testuser', password: 'password' };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Credenciales inválidas'),
      );
    });

    //Contraseña incorrecta
    it('Incorrect password', async () => {
      const loginDto = { username: 'testuser', password: 'password' };
      const user = {
        username: 'testuser',
        password: await bcrypt.hash('wrongpassword', 10),
        id: 1,
        isAdmin: false,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Credenciales inválidas'),
      );
    });
  });

  //Prueba registro
  describe('register', () => {
    //OK
    it('register', async () => {
      const registerDto = {
        username: 'testuser',
        password: 'password',
        isAdmin: false,
      };
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const newUser = { ...registerDto, password: hashedPassword };

      mockUserRepository.findOne.mockResolvedValue(null); // No existing user

      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await authService.register(registerDto);

      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        username: 'testuser',
        password: hashedPassword,
        isAdmin: false,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    });

    //Usuario existente
    it('username already exists', async () => {
      const registerDto = {
        username: 'testuser',
        password: 'password',
        isAdmin: false,
      };

      mockUserRepository.findOne.mockResolvedValue({ username: 'testuser' });

      await expect(authService.register(registerDto)).rejects.toThrow(
        new ConflictException('El nombre de usuario ya está registrado'),
      );
    });
  });
});
