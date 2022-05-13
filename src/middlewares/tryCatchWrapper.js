const tryCatchWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log('__TRY_CATCH_WRAPPER__: ', error);
      next(error);
    }
  };
};

module.exports = tryCatchWrapper;
