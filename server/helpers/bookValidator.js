// allow update
// allow delete
// allow create

export default class BookValidator {
  static allowAdmin(request, response) {
    if (request.loggedInUser.isAdmin !== true) {
      response.status(403).send({
        message: 'Only Admin Access Pls',
      });
      return false;
    }
    return true;
  }
}
