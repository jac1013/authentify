'use strict';

import expect from 'expect.js';
import UserStorage from '../../../src/user_authentication/contracts';


describe('User Storage Contract', () => {
  let userStorage = new UserStorage();

  it('Must have a function called findOne', () => {
    expect(userStorage.findOne).to.be.a(Function);
  });

  it('Must have a function called create', () => {
    expect(userStorage.create).to.be.a(Function);

  });
});