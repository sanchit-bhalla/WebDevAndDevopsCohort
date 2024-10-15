// Promise based
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// try-catch (async-await) version
/*
  const asyncHandler = (fn) => async (req, res, next) => {
      try{
          await fn(req, res, next)
      } catch(err) {
          res.status(err.code || 500).json({
              success: false,
              message: err.message
          })
      }
  }
*/

module.exports = { asyncHandler };
