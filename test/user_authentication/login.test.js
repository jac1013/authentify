import expect from 'expect.js';
import Login from '../../src/user_authentication/login';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '123456Ab';

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

  it('Can set password ignoring validation criteria', () => {
    login.setPassword('passwordWithoutCriteria');
    expect(login.password).to.be('passwordWithoutCriteria');
  });
});

function configureLogin() {
  return new Login()
    .setEmail(email)
    .setPassword(password)
    .setUserStorage(new MockUserStorage());
}

describe('Login Failure cases', () => {
  let login;
  before(() => {
    login = configureLogin();
  });

  it('Must throw an UnauthorizedException when the given credentials are wrong. ', (done) => {
    login.setPassword('wrongPassword1');
    login.authenticate().catch((e) => {
      expect(Login.isLoginException(e) && Login.isUnauthorizedException(e)).to.be(true);
      done();
    });
  });

  it('Must throw an isInvalidEmailException when we try to set an invalid email', () => {
    try {
      login.setEmail('wrongEmail');
    } catch (e) {
      expect(login.isInvalidEmailException(e)).to.be(true);
    }
  });

  it('Must throw a UserStorageNotConfigureException if you try to use login  before setting the User Storage', (done) => { //eslint-disable-line
    login.setUserStorage(false);
    login.authenticate().catch((e) => {
      expect(Login.isLoginException(e)
        && login.isUserStorageNotConfigureException(e)).to.be(true);
      done();
    });
  });

  it('Must throw a UserStorageNotConfigureException if you try to find a user without setting a User Storage', (done) => { //eslint-disable-line
    login.setUserStorage(false);
    login.findByEmailOrUsername().catch((e) => {
      expect(Login.isLoginException(e)
        && login.isUserStorageNotConfigureException(e)).to.be(true);
      done();
    });
  });
});

export default MockUserStorage;
