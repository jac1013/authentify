import expect from 'expect.js';
import Configurator from '../../../src/user_authentication/configurator';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '123456Ab';
const name = { name: 'john' };
const username = 'username';


function configure() {
  return new Configurator()
    .setEmail(email)
    .setPassword(password)
    .setUserStorage(new MockUserStorage())
}

describe('Configurator Success cases', () => {
  let configurator;
  before(() => {
    configurator = new Configurator();
  });

  it('Can set Email', () => {
    configurator.setEmail(email);
    expect(configurator.email).to.be(email);
  });

  it('Can set Password', () => {
    configurator.setPassword(password);
    expect(configurator.password).to.be(password);
  });

  it('Can set username', () => {
    configurator.setUsername(username);
    expect(configurator.username).to.be(username);
  });

  it('Can set Additional attributes', () => {
    configurator.setAdditionalAttributes(name);
    expect(configurator.additionalAttributes).to.eql(name);
  });

  it('Can set User Storage', () => {
    let mock = new MockUserStorage();
    configurator.setUserStorage(mock);
    expect(configurator.userStorage).to.eql(mock);
  });

  it('Can validate an Email', () => {
    let configurator = configure();
    configurator.setEmail('mock2@gmail.com');
    expect(configurator.validateEmail).to.not.throwException();
  });
});

describe('Configurator Failure cases', () => {
  let configurator;
  before(() => {
    configurator = new Configurator();
  });

  it('Must throw an InvalidEmailException when the email is not a valid one', () => {
    let configurator = configure();
    try {
      configurator.setEmail('wrongEmail');
    } catch (e) {
      expect(Configurator.isConfiguratorException(e)).to.be(true);
    }
  });

  it('Must throw an InvalidPasswordException when the password does not fit the criteria rules', () => {
    let configurator = configure();
    try {
      configurator.setPassword('short');
    } catch (e) {
      expect(Configurator.isConfiguratorException(e)).to.be(true);
    }
  });
})
