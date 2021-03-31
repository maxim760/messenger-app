import React, { useState } from "react";
import { A } from "../../components/A";
import { FormBlock } from "../../components/FormBlock";
import { MainTemplate } from "../../components/Templates/Main";
import { ROUTES } from "../../utils/routes";

import styles from "./registration.module.scss";

const defaultValue = {name: "",
surname: "",
password: "",
email: ""}

const RegistrationPage: React.FC = ({}): React.ReactElement => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue((prev) => ({ ...prev, [name]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValue(defaultValue)
  }
  
  return (
    <MainTemplate className="full" title="Регистрация">
      <FormBlock text="Создать" onSubmit={onSubmit} title="Создайте аккаунт">
        <label>
          {value.name.length > 0 && <span>Имя</span>}

          <input
          value={value.name}
          onChange={onChange("name")}
          placeholder="Имя"
          className={styles.input}
          name="name"
          type="text"
          />
        </label>
        <label>
          {value.surname.length > 0 && <span>Фамилия</span>}

          <input
            value={value.surname}
            onChange={onChange("surname")}
            placeholder="Фамилия"
            className={styles.input}
            name="surname"
            type="text"
          />
        </label>
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
