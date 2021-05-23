import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { A } from "../../components/A";
import { AppAlert, IAlert } from "../../components/AppAlert";
import { FormBlock } from "../../components/FormBlock";
import { MainTemplate } from "../../components/Templates/Main";
import { usePassword } from "../../hooks/usePassword";
import {
  AUTH_TYPE,
  selectAuthError,
  selectAuthStatus,
} from "../../store/ducks/user/selectors";
import {
  fetchLoginUser,
  setAuthLoginStatus,
} from "../../store/ducks/user/slice";
import { STATUS } from "../../types";
import { FORM } from "../../utils/form";
import { ROUTES } from "../../utils/routes";

import styles from "./login.module.scss";

type Inputs = {
  password: string;
  email: string;
};

const LoginPage: React.FC = ({}): React.ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    selectAuthStatus(AUTH_TYPE.LOGIN)
  );
  const {
    input: passwordInput,
    button: passwordBtn,
    Icon: PasswordIcon,
  } = usePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>();
  const errorInfo = useSelector(selectAuthError(AUTH_TYPE.LOGIN));
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthLoginStatus(STATUS.NEVER));
      router.push(ROUTES.MESSENGER);
    }
  }, [isSuccess]);
  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Почта",
      validate: {
        required: FORM.isRequired,
        pattern: FORM.isEmail,
      },
    },
    {
      name: "password",
      type: passwordInput.type,
      placeholder: "Пароль",
      isPassword: true,
      validate: {
        required: FORM.isRequired,
      },
    },
  ];
  const onSubmit = (data: Inputs) => {
    dispatch(fetchLoginUser(data));
  };

  return (
    <MainTemplate className="full" title="Авторизация">
      <FormBlock
        text="Войти"
        onSubmit={handleSubmit(onSubmit)}
        title={"Войдите"}
      >
        {isError ? (
          <AppAlert className="fullscreen mb-1" type={IAlert.ERROR}>
            {errorInfo || "Ошибки при регистрации"}
          </AppAlert>
        ) : isLoading ? (
          <AppAlert className="fullscreen mb-1" type={IAlert.INFO}>
            Идёт загрузка
          </AppAlert>
        ) : null}
        {inputs.map(({ isPassword, name, validate, ...props }, i) => (
          <label className={styles.label} key={i}>
            {!!watch(name as keyof Inputs) && <span>{props.placeholder}</span>}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                name={name}
                {...props}
                {...register(name as any, validate)}
              />
              {isPassword && !!watch(name as keyof Inputs) && (
                <button type="button" className={styles.passwordBtn} {...passwordBtn}>
                  <PasswordIcon />
                </button>
              )}
            </div>
            {!!errors[name] && (
              <span className="error">{errors[name].message}</span>
            )}
          </label>
        ))}
        <span>
          Нет Аккаунта?
          <A href={ROUTES.REGISTRATION} className={styles.link}>
            Зарегистрируйтесь
          </A>
        </span>
      </FormBlock>
    </MainTemplate>
  );
};

export default LoginPage;
