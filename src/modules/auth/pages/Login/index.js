import { useCallback, useEffect,useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CContainer, CForm, CInputGroup } from "@coreui/react";

import { profile } from "src/apis/auth.api";
import { history } from "src/App";

import img from "_assets/images/login-image.webp";
import logo from "_assets/images/logo-icool.webp";
import { login, setPermission,setUser } from "_common/actions/auth.action";
import { CButton,CCheckbox, CInput } from "_components/controls";

import "../../assets/css/login.scss";

const Login = () => {
  //#region Datas
  const dispatch = useDispatch();

  const copyright = new Date().getFullYear();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  //#endregion

  //#region Events
  const remember = useCallback(() => {}, []);
  const forget = useCallback(() => {}, []);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    handleSubmit(
      async (data) => {
        setLoading(true);

        dispatch(
          login(data, (isSuccess) => {
            if (!isSuccess) {
              setLoading(false);
              return setError(true);
            }

            profile()
              .then(async (user) => {
                await dispatch(setUser(user));
                await dispatch(setPermission(user));

                // history.push("/summary");
                history.push("/inventory-slip/list");
              })
              .catch((err) => {
                setLoading(false);
                dispatch({ type: "SET_AUTHENTICATE" });
              });
          })
        );
      },
      (error) => {
        setError(true);
      }
    )();
  }, []);
  //#endregion

  return (
    <div
      id="login"
      className="c-app c-default-layout flex-row align-items-center"
    >
      <CContainer className="main">
        <div className="login-image">
          <img src={img} width="100%" height="100%" alt="background" />
        </div>
        <div className="position-relative login-content">
          <div className="text-center container">
            <div className="logo">
              <img width="auto" height="auto" src={logo} alt="Logo" />
            </div>
            <div className="title">
              <h5>Chào mừng đến với hệ thống</h5>
              <h1>QUẢN LÝ KHO</h1>
            </div>
            <CForm className="login-form" onSubmit={onSubmit}>
              <div className="position-relative">
                <div>
                  <CInputGroup>
                    <Controller
                      name={"username"}
                      control={control}
                      rules={{ required: true, minLength: 1 }}
                      defaultValue=""
                      render={({ field, fieldState: { invalid } }) => (
                        <CInput
                          type="text"
                          autoComplete="username"
                          placeholder="Nhập tên đăng nhập"
                          className={`w-100 mb-4 ${isError && "is-error"}`}
                          invalid={isError || invalid}
                          {...field}
                        />
                      )}
                    />
                  </CInputGroup>
                </div>
                <div>
                  <CInputGroup>
                    <Controller
                      name={"password"}
                      control={control}
                      rules={{ required: true, minLength: 1 }}
                      defaultValue=""
                      render={({ field, fieldState: { invalid } }) => (
                        <CInput
                          type="password"
                          autoComplete="current-password"
                          placeholder="Nhập mật khẩu"
                          className={`w-100 mb-4 ${isError && "is-error"}`}
                          invalid={isError || invalid}
                          {...field}
                        />
                      )}
                    />
                  </CInputGroup>
                </div>
                <div className="more">
                  {isError ? (
                    <div>
                      <div className="error">
                        Tên đăng nhập, mật khẩu của bạn chưa đúng.
                      </div>
                      <div className="text-gray">
                        Có thể bạn đã{" "}
                        <a href="#" className="forget-password text-blue">
                          Quên mật khẩu
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between pt-0 pt-sm-2">
                      <Controller
                        name={"isCheck"}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <CCheckbox
                            label="Nhớ đăng nhập"
                            value={field.value}
                            onChange={remember}
                            {...field}
                          />
                        )}
                      />
                      <a href="#" onClick={forget} className="forget-password">
                        Quên mật khẩu
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="btn-login">
                <CButton
                  type="submit"
                  disabled={!isValid || isLoading}
                  color={!isValid ? "secondary" : "primary"}
                  className="btn btn-fill btn-block py-2"
                >
                  <h5 className="my-1">Đăng nhập</h5>
                </CButton>
              </div>
            </CForm>
          </div>
          <div className="copy-right">
            Copyright {copyright}, All Rights Resened. Privacy | Terms &
            Conditions | Help
          </div>
        </div>
      </CContainer>
    </div>
  );
};

export default Login;
