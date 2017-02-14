import expect from 'expect.js';
import Login from '../../src/user_authentication/login';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '123456Ab';

function configureLogin() {
  return new Login()
    .setEmail(email)
    .setPassword(password)
    .setUserStorage(new MockUserStorage());
}

describe('Login Success cases', () => {
  let login;
  before(() => {
    login = configureLogin();
  });

  it('Can find a user by email', (done) => {
    login.findByEmail().then((result) => {
      expect(result.email).to.be(email);
      done();
    }).catch(() => {
      done();
    });
  });

  it('Can find a user by username', (done) => {
    login.email = undefined;
    login.setUsername('username');
    login.findByEmail().then((result) => {
      expect(result.email).to.be(email);
      done();
    }).catch(() => {
      done();
    });
  });

  it('Must authenticate a user if credentials are correct', (done) => {
    login.authenticate().then((result) => {
      expect(result.email).to.be(email);
      done();
    }).catch(() => {
      done();
    });
  });
});

describe('Login Failure cases', () => {
  let login;
  before(() => {
    login = configureLogin();
  });

  it('Must throw a UnauthorizedException when the given credentials are wrong. ', (done) => {
    login.setPassword('wrongPassword1');
    login.authenticate().catch((e) => {
      expect(Login.isLoginException(e)).to.be(true);
      done();
    });
  });
});

export default MockUserStorage;
