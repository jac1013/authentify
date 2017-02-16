import bcrypt from 'bcrypt';
import Configurator from './configurator';

class Login {
  user;
  email;
  username;
  password;

  constructor() {
    const setPassword = this.setPassword;
    Object.assign(this, new Configurator());
    this.setPassword = setPassword;
    this.hashLibrary = bcrypt;
  }

  async authenticate() {
    await this.findByEmailOrUsername();
    this.isUserNotFound();
    await this.isPasswordIncorrect();
    this.user.password = undefined;
    return this.user;
  }

  async findByEmailOrUsername() {
    this.checkUserStorageToBeSet();
    await this.findByEmail();
    await this.findByUsername();
  }

  async findByEmail() {
    if (this.email) {
      this.user = await this.userStorage.findOne({ email: this.email });
    }
  }

  async findByUsername() {
    if (this.username && !this.user) {
      this.user = await this.userStorage.findOne({ username: this.username });
    }
  }

  isUserNotFound() {
    if (!this.user) {
      Login.throwWrongCredentials();
    }
  }

  static throwWrongCredentials() {
    throw new UnauthorizedException();
  }

  async isPasswordIncorrect() {
    const isPasswordCorrect = await this.hashLibrary.compare(this.password, this.user.password);
    if (!isPasswordCorrect) {
      Login.throwWrongCredentials();
    }
  }

  static isLoginException(exception) {
    return this.isUnauthorizedException(exception)
      || Configurator.isConfiguratorException(exception);
  }

  static isUnauthorizedException(exception) {
    return exception instanceof UnauthorizedException;
  }

  setPassword(password) {
    this.password = password;
    return this;
  }
}

class UnauthorizedException {
  WRONG_EMAIL_OR_PASSWORD = 'Wrong Credentials, verify them and try again.';
  message;

  constructor() {
    this.message = this.WRONG_EMAIL_OR_PASSWORD;
  }
}

export default Login;
