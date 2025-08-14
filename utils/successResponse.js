const successResponse = (res, data, message = "success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

export default successResponse;
