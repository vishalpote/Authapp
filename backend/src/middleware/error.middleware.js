const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const extraDetails = err.extraDetails || "Backend Error";

  return res
    .status(status)
    .json({ message: message, extraDetails: extraDetails });
};

export default errorMiddleware;
