import bcrypt from 'bcrypt';
import Configurator from './configurator';

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
      .then(this.deletePassword);
  }

  async checkDuplicatedEmail() {
    let user = await this.findUser({ email: this.email });
    if (user) {
      throw new EmailAlreadyExistException();
    }
  }

  async findUser(criteria) {
    this.checkUserStorageToBeSet();
    return await this.userStorage.findOne(criteria);
  }

  checkUserStorageToBeSet() {
    if (!this.userStorage) {
      throw new UserStorageNotConfigureException();
    }
  }

  async checkDuplicatedUsername() {
    let user = await this.findUser({ username: this.username });
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

  deletePassword(user) {
    user.password = undefined;
    return user;
  }

  static isRegisterException(exception) {
    return Configurator.isConfiguratorException(exception)
      || exception instanceof EmailAlreadyExistException
      || exception instanceof UsernameAlreadyExistException
      || exception instanceof UserStorageNotConfigureException;
  }
}

class EmailAlreadyExistException {
  message = 'The email is already chosen.';
}

class UsernameAlreadyExistException {
  message = 'The username is already chosen.';
}

class UserStorageNotConfigureException {
  message = 'You must set a User Storage before calling functions that require to find a user.';
}

export default Registerer;
