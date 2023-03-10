export const errorHandler = (error) => {
  console.log(error);

  if (error?.response) {
    const response = error.response;
    const { message } = response.data;
    const status = response.status;
    return {
      message,
      status,
    };
  } else if (error?.request) {
    return {
      message: "Server not responing",
      status: 503,
    };
  } else {
    return { message: "opps! something went wrong while setting up request" };
  }
};
