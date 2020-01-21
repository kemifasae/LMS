import UserController from './controllers/user';
import BookController from './controllers/book';
import authorize from './middlewares/authorize';

const Route = (app) => {
  // Endpoints for users
  app.post('/api/v1/users/login', UserController.login);
  app.post('/api/v1/users/signUp', UserController.create);

  // Endpoints for Books
  app.post('/api/v1/books', authorize, BookController.create);
  app.get('/api/v1/books', authorize, BookController.getAllBooks);
   // Get one book
   app.get('/api/v1/books/:bookId', authorize, BookController.getBook);

   // route to update book details
   app.put(
     '/api/v1/books/:bookId', authorize,
          BookController.updateBook
   );
   // route to delete book
   app.delete(
     '/api/v1/books/:bookId', authorize,
     BookController.deleteBook
   );

   //route to borrow a book
   //app.post('/api/v1/books/:bookId/borrow', authorize, BookController.borrowBook);


//   // Endpoints for centers
//   app.post('/api/v1/s', Middleware.authorize, RecipeController.create);
//   app.get('/api/v1/events', RecipeController.getAllRecipes);
//   // Get one event
//   app.get('/api/v1/events/:eventId', RecipeController.getRecipe);

//   // route for put
//   app.put('/api/v1/events/:eventId', Middleware.authorize, RecipeController.updateRecipe);
//   // route for delete
//   app.delete('/api/v1/recipes/:recipeId', Middleware.authorize, RecipeController.deleteRecipe);
};
export default Route;
