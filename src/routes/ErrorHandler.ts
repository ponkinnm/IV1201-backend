import { ErrorRequestHandler, Express } from "express";

class ErrorHandler {

  /**
   * Fallback error handler - all errors should be caught by this handler (if not caught earlier)
   */
  private fallback: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    if(res.headersSent) {
      return next(err);
    }
    res.status(500).send('Server error, please try again later');
  }

  /**
   * Register error handlers
   * @param app The express app
   */
  registerErrorHandlers(app: Express) {
    app.use(this.fallback);
  }
}

export default new ErrorHandler();
