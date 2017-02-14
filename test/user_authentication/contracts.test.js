import expect from 'expect.js';
import UserStorage from '../../../src/user_authentication/user_storage_contract';


describe('User Storage Contract', () => {
  const userStorage = new UserStorage();

  it('Must have a function called findOne', () => {
    expect(userStorage.findOne).to.be.a(Function);
  });

  it('Must have a function called create', () => {
    expect(userStorage.create).to.be.a(Function);
  });
});
