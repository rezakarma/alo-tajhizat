import { profileActions } from "./profile-slice";
import { profileEditMoadalAction } from "./profileEditModal-slice";
import { uiActions } from "./ui-slice";
import { auth } from "@/auth";
export const fetchProfileData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const result = await fetch("/api/get-session");
      if (!result.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const response = await result.json();

      return response;
    };

    try {
      const seassion = await fetchData();
      if (seassion.status === "unauthenticated") {
        dispatch(
          profileActions.setProfile({
            profile: null,
          })
        );
      } else if (seassion.status === "authenticated" && seassion.user.profile) {
        dispatch(
          profileActions.setProfile({
            profile: seassion.user,
          })
        );
      } else {
        dispatch(
          profileActions.setProfile({
            profile: seassion.user,
          })
        );
      }
    } catch (error) {
      // error
      dispatch(
        profileActions.setProfile({
          profile: error,
        })
      );
    }
  };
};

export const changeUserName = (id, userName) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "درحال تغییر",
        })
      )
      const result = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          userName: userName,
        }),
      });

      if (!result.ok) {
        return { error: "خطایی رخ داده است لطفا بعدا مجدد تلاش کنید" };
      }

      const response = await result.json();
      return response;
    };

    try {
      const responseOfCHnageUserName = await sendRequest();

      if (responseOfCHnageUserName.success) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: responseOfCHnageUserName.success,
          })
        );
      } else if (responseOfCHnageUserName.error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: responseOfCHnageUserName.error,
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
        })
      );
      console.log(error)
    }
  };
};

export const changeEmail = (id, email) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "درحال تغییر",
        })
      )
      const result = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          email: email,
        }),
      });

      if (!result.ok) {
        return { error: "خطایی رخ داده است لطفا بعدا مجدد تلاش کنید" };
      }

      const response = await result.json();
      return response;
    };

    try {
      const responseOfCHnageUserName = await sendRequest();

      if (responseOfCHnageUserName.success) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: responseOfCHnageUserName.success,
          })
        );
      } else if (responseOfCHnageUserName.error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: responseOfCHnageUserName.error,
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
        })
      );
      console.log(error)
    }
  };
};

export const changeUserPassword = (password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "درحال تغییر",
        })
      )
      const result = await fetch(`/api/users/${password.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: password.id,
          password: {
            password : password.password,
            confirmPassword: password.confirmPassword,
            currentPassword: password.currentPassword
          }
          
        }),
      });

      if (!result.ok) {
        return { error: "خطایی رخ داده است لطفا بعدا مجدد تلاش کنید" };
      }

      const response = await result.json();
      return response;
    };

    try {
      const responseOfCHnageUserName = await sendRequest();

      if (responseOfCHnageUserName.success) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: responseOfCHnageUserName.success,
          })
        );
      } else if (responseOfCHnageUserName.error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: responseOfCHnageUserName.error,
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
        })
      );
      console.log(error)
    }
  };
};

export const changePhoneNumber = (id, phoneNumber , code, modalID) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "درحال تغییر",
        })
      )
      const result = await fetch(`/api/verify-code-change`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          phoneNumber,
          code
        }),
      });

      if (!result.ok) {
        return { error: "خطایی رخ داده است لطفا بعدا مجدد تلاش کنید" };
      }

      const response = await result.json();
      return response;
    };

    try {
      const responseOfCHnageUserName = await sendRequest();

      if (responseOfCHnageUserName.success) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: responseOfCHnageUserName.success,
          })

        );
        dispatch(profileEditMoadalAction.closeModal(modalID))

      } else if (responseOfCHnageUserName.error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: responseOfCHnageUserName.error,
          })
        );
      }
    } catch (error) {
      console.log(error)
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
        })
      );
      console.log(error)
    }
  };
};

export const changeProfile = (id, value) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "درحال تغییر",
        })
      )
      const result = await fetch(`/api/profile/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body:JSON.stringify(value),
      });

      if (!result.ok) {
        console.log('here: ' , result)
        return { error: "خطایی رخ داده است لطفا بعدا مجدد تلاش کنید" };
      }

      const response = await result.json();
      return response;
    };

    try {
      const responseOfCHnageUserName = await sendRequest();

      if (responseOfCHnageUserName.success) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: responseOfCHnageUserName.success,
          })
        );
      } else if (responseOfCHnageUserName.error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: responseOfCHnageUserName.error,
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "خطایی رخ داده است لطفا در زمانی دیگر مجدد تلاش کنید",
        })
      );
      console.log(error)
    }
  };
};




