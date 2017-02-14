/**
 * We just need to extend this class and implement both methods
 * with whatever DB library we are using.
 */
class UserStorage {
  /**
   * This function receives an object with attributes specifying by what
   * fields we are going to search, the keys are the field in which we
   * want to search and the value of the object the value we want
   * to search: {field: 'fieldValue'}
   *
   * Depending on the library you are going to use you will have to transform
   * this criteria depending on your needs.
   * @param criteria
   */
  findOne(criteria) { //eslint-disable-line
  }

  create(attributes) { //eslint-disable-line
  }
}

export default UserStorage;
