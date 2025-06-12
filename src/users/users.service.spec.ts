import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
// import { User } from './schemas/user.schema';

describe('UsersService - create', () => {
  let service: UsersService;
  const mockUserModel = jest.fn();
  const saveMock = jest.fn().mockResolvedValue({
    _id: '123',
    email: 'newuser',
    password: 'hashed-password',
  });

  beforeEach(() => {
    service = new UsersService(mockUserModel as any);
  });

  it('should hash the password and save the user', async () => {
    const userData = {
      email: 'newuser',
      password: 'secret',
    };

    const hashed = 'hashed-password';

    // ✅ FIXED LINE
    (
      jest.spyOn(bcrypt, 'hash') as unknown as jest.SpyInstance<
        Promise<string>,
        [string, number]
      >
    ).mockResolvedValueOnce(hashed);

    // Mock new UserModel instance
    mockUserModel.mockImplementation(() => ({
      save: saveMock,
    }));

    const result = await service.create(userData.email, userData.password);

    expect(mockUserModel).toHaveBeenCalledWith({
      email: userData.email,
      password: hashed,
    });

    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual({
      _id: '123',
      email: 'newuser',
      password: 'hashed-password',
    });
  });
});
