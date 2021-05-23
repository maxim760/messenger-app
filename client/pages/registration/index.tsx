import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../../components";
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
  fetchRegisterUser,
  setAuthRegisterStatus,
} from "../../store/ducks/user/slice";
import { STATUS } from "../../types";
import { ACCEPTS } from "../../utils/consts";
import { FORM } from "../../utils/form";
import { ROUTES } from "../../utils/routes";

import styles from "./registration.module.scss";

type Inputs = {
  email: string;
  name: string;
  surname: string;
  password: string;
  password2: string;
  image: File
};



const RegistrationPage: React.FC = ({}): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    input: passwordInput,
    button: passwordBtn,
    Icon: PasswordIcon,
  } = usePassword();
  const {
    input: repeatPasswordInput,
    button: repeatPasswordBtn,
    Icon: RepeatPasswordIcon,
  } = usePassword();
  const { isLoading, isError, isSuccess } = useSelector(
    selectAuthStatus(AUTH_TYPE.REGISTER)
  );
  const errorInfo = useSelector(selectAuthError(AUTH_TYPE.REGISTER));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Имя",
      validate: { required: FORM.isRequired },
    },
    {
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      validate: { required: FORM.isRequired },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Почта",
      validate: {
        required: FORM.isRequired ,
      pattern: FORM.isEmail
      },
    },
    {
      name: "password",
      type: passwordInput.type,
      placeholder: "Пароль",
      isPassword: {
        value: true,
        Component: PasswordIcon,
        btnProps: passwordBtn
      },
      validate: {
        required: FORM.isRequired,
        minLength: {
          value: 4,
          message: "Минимальная длина пароля - 4 символа",
        },
      },
    },
    {
      name: "password2",
      type: repeatPasswordInput.type,
      placeholder: "Повторите пароль",
      isPassword: {
        value: true,
        Component: RepeatPasswordIcon,
        btnProps: repeatPasswordBtn
      },
      validate: {
        required: FORM.isRequired,
        validate: (value) =>
          value === watch("password") || "Пароли не совпадают",
      },
    },
  ];
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthRegisterStatus(STATUS.NEVER));
      router.push(ROUTES.LOGIN);
    }
  }, [isSuccess]);
  const [avatarUrl, setAvatarUrl] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0] 
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(file)
      setAvatarUrl(url)
    }
  }

  const onSubmit = (data: Inputs) => {
    const formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key])
    }
    formData.append("image", avatar)
    dispatch(fetchRegisterUser(formData));
  };

  return (
    <MainTemplate className="full" title="Регистрация">
      <FormBlock
        text="Создать"
        onSubmit={handleSubmit(onSubmit)}
        title="Создайте аккаунт"
      >
        <label className={"flex flex-column w100 aic pointer"} >

          <Avatar src={avatarUrl} width="75px" height="75px" />
          <p className={styles.avatarLabel}>Выберите аватарку</p>
          <input hidden type="file" name="image" accept={ACCEPTS.IMAGE} onChange={ onChangeImage }/>
        </label>
        {isError ? (
          <AppAlert className="fullscreen" type={IAlert.ERROR}>
            {errorInfo || "Ошибки при регистрации"}
          </AppAlert>
        ) : isLoading ? (
          <AppAlert className="fullscreen" type={IAlert.INFO}>
            Идёт загрузка
          </AppAlert>
        ) : null}
        {inputs.map(({ isPassword = {}, name, validate, ...props }, i) => (
          <label className={styles.label} key={i}>
            {!!watch(name as keyof Inputs) && <span>{props.placeholder}</span>}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                name={name}
                {...props }
                {...register(name as any, validate)}
              />
              {isPassword.value && !!watch(name as keyof Inputs) && (
                <button type="button" className={styles.passwordBtn} {...isPassword.btnProps}>
                  <isPassword.Component />
                </button>
              )}
            </div>
            {!!errors[name] && (
              <span className="error">{errors[name].message}</span>
            )}
          </label>
        ))}
        <span className={styles.info}>
          Есть аккаунт?
          <A href={ROUTES.LOGIN} className={styles.link}>
            Войдите
          </A>
        </span>
      </FormBlock>
    </MainTemplate>
  );
};

export default RegistrationPage;
