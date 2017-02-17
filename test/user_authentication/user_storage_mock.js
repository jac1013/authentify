import bcrypt from 'bcrypt';
import UserStorage from '../../src/user_authentication/user_storage_contract';

const email = 'mock@email.com';
const password = '123456Ab';
const id = 1;

class MockUserStorage extends UserStorage {
  findOne() { //eslint-disable-line
    return new Promise((fulfill) => {
      bcrypt.hash(password, 5).then((hashedPassword) => {
        fulfill({ email, password: hashedPassword });
      });
    });
  }

  create() { //eslint-disable-line
    return new Promise((fulfill) => {
      fulfill({ id });
    });
  }
}

export default MockUserStorage;
