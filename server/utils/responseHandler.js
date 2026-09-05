// server/utils/responseHandler.js

export const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  let errText = null;
  if (error) {
    errText = typeof error === 'string' ? error : (error.message || String(error));
  } else if (typeof message !== 'string') {
    errText = String(message);
  }

  const responseMessage = typeof message === 'string' ? message : (errText || 'Internal Server Error');

  return res.status(statusCode).json({
    success: false,
    message: responseMessage,
    error: errText
  });
};