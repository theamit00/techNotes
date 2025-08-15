const successResponse = (
  res,
  { data = null, message = "success", statusCode = 200 }
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
};

export default successResponse;
