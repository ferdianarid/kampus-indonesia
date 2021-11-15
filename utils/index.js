import { toast } from "react-toastify";

// get first error from erray
export const getFirstErrorFromArray = (errors) => {
  return errors[Object.keys(errors)[0]][0];
};

export const commonErrorHandler = (error) => {
  if (error.response?.data) {
    const { errors, message } = error.response?.data;
    if (!!errors) {
      return toast(getFirstErrorFromArray(errors), {
        type: "error",
      });
    } else if (!!message) {
      return toast(message, {
        type: "error",
      });
    } else {
      return toast("Yahhh ada error nih", {
        type: "error",
      });
    }
  } else {
    return toast("Yahhh ada error nih", {
      type: "error",
    });
  }
};
