import bcrypt from 'bcrypt';
import Configurator from './configurator';

class EmailAlreadyExistException {
  message = 'The email is already chosen.';
}

class UsernameAlreadyExistException {
  message = 'The username is already chosen.';
}

class Registerer {
  email;
  username;
  password;

  constructor() {
    Object.assign(this, new Configurator());
    this.hashLibrary = bcrypt;
  }

  async register() {
    await this.checkDuplicatedEmail();
    await this.checkDuplicatedUsername();
    const hashedPassword = await this.hashPassword();
    return this.userStorage.create(this.mergeExtraAttributes(hashedPassword))
      .then(Registerer.deletePassword);
  }

  async checkDuplicatedEmail() {
    const user = await this.findUser({ email: this.email });
    if (user) {
      throw new EmailAlreadyExistException();
    }
  }

  async findUser(criteria) {
    this.checkUserStorageToBeSet();
    return await this.userStorage.findOne(criteria);
  }

  async checkDuplicatedUsername() {
    const user = await this.findUser({ username: this.username });
    if (user) {
      throw new UsernameAlreadyExistException();
    }
  }

  async hashPassword() {
    return this.hashLibrary.hash(this.password, 5);
  }

  mergeExtraAttributes(hashedPassword) {
    return Object.assign(this.additionalAttributes, {
      email: this.email,
      password: hashedPassword,
      username: this.username
    });
  }

  static deletePassword(user) {
    user.password = undefined;
    return user;
  }

  static isRegisterException(exception) {
    return this.isEmailAlreadyExistException(exception)
      || this.isUsernameAlreadyExistException(exception)
      || Configurator.isConfiguratorException(exception);
  }

  static isEmailAlreadyExistException(exception) {
    return exception instanceof EmailAlreadyExistException;
  }

  static isUsernameAlreadyExistException(exception) {
    return exception instanceof UsernameAlreadyExistException;
  }
}

export default Registerer;
