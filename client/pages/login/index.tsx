import React, { useState } from "react";
import { A } from "../../components/A";
import { FormBlock } from "../../components/FormBlock";
import { MainTemplate } from "../../components/Templates/Main";
import { ROUTES } from "../../utils/routes";

import styles from "./login.module.scss";

const defaultValue = { password: "", email: "" };

const LoginPage: React.FC = ({}): React.ReactElement => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue((prev) => ({ ...prev, [name]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(defaultValue);
  };

  return (
    <MainTemplate className="full" title="Авторизация">
      <FormBlock text="Войти" onSubmit={onSubmit} title={"Войдите"}>
        <label>
          {value.email.length > 0 && <span>Почта</span>}
          <input
            value={value.email}
            onChange={onChange("email")}
            placeholder="Почта"
            className={styles.input}
            name="email"
            type="email"
          />
        </label>
        <label>
          {value.password.length > 0 && <span>Пароль</span>}
          <input
            value={value.password}
            onChange={onChange("password")}
            placeholder="Пароль"
            className={styles.input}
            name="password"
            type="password"
          />
        </label>
        <span className={styles.info}>
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
