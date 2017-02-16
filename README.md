# Authentify
Simple module to register users and login providing a User Storage.

The first thing we need to do is to implement our UserStorage, this is very easy:

```JavaScript
import { UserStorage } from 'authentify';
import User from '../../models/user';

/**
 * This is an example of an implementation with MongoDB.
 * In this case we used a mongoose model.
 */
class MongoUserStorage extends UserStorage {
  findOne(criteria) {
    return User.findOne(criteria); //specific mongoose Implementation
  }

  create(attributes) {
    return User.create(attributes); //specific mongoose Implementation
  }
}

export default MongoUserStorage;

```

We extend the UserStorage _class_ and implement both methods ``findOne`` & ``create``.
``findOne`` should return a Promise which resolves to the user given a specific criteria (this will depend on your application).
``create`` should create a user and return a Promise which resolves to the user created.    

After this you just use what the module expose which is (I'm going to use _require_ here but we can use both, _require_ or _import_, it depends on the ECMAScript our project is using):

* UserStorage   
```JavaScript
// Just to extend it, this is basically a contract 'interface'
class MongoUserStorage extends (require('authentify').UserStorage)
```

* Registerer
```JavaScript
const user = new (require('authentify').Registerer)()
      .setEmail(email)
      .setUsername(username)
      .setPassword(password)
      .setUserStorage(new MongoUserStorage())
      .register()
      .catch(myCatchFunction);
```
* Login
```Javascript
const user = new (require('authentify').Login)()
      .setEmail(email)
      .setUsername(username)
      .setPassword(password)
      .setUserStorage(new MongoUserStorage())
      .authenticate()
      .catch(myCatchFunction);
```

## How To Handle errors
This module assumes that everything we are implementing in UserStorage is returning a Promise, that said every exception that could happen in the module will be thrown (literally, with ``throw``) so you must make sure that you are using ``catch`` in your promises.

both ``Login`` and ``Registerer`` expose API to know when an error is an exception of that type, let's check an example:
```JavaScript
import { Login } from 'authentify';

try {
// some login error happened here.
} catch(error) {
// this would normally be inside of a Promise.catch() and not a try-catch block.
  if (Login.isLoginException(error)) {
    // do something here.
  }
}
```
``Login`` throws an ``UnauthorizedException`` which happens when the user provides wrong credentials. It also throws other exceptions but these are because of _functionality extension_ through the ``Configurator``, it can throw ``InvalidEmailException`` or ``InvalidPasswordException``, ``Registerer`` also can.   

For checking ``Registerer`` exceptions its exactly what you would expect: ``Register.isRegistererException()``.

Lastly Both ``Login`` and ``Registerer`` expose API to check each specific exception separately:
```JavaScript
Login.isUnauthorizedException(e);
Registerer.isEmailAlreadyExistException(e);
Registerer.isUsernameAlreadyExistException(e);

// The Configurator exceptions which you must use through instances (they are not static methods in Login and Registerer).
// instance here could be either a Login or a Registerer object.

instance.isInvalidEmailException(e);
instance.isInvalidPasswordException(e);
instance.isUserStorageNotConfigureException(e);

```

## How to run build
``npm run build``

## How to run test
``npm test``

