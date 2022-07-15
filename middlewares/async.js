const asyncWrapper = (fn) => {  //fn is the callback
    return async (req,res,next) => {
        try {
          await  fn(req,res,next);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper