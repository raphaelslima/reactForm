import React from "react";

import { useForm } from "react-hook-form";
import validator from "validator";

const BadForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const watchPassword = watch("password");

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Campo Obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">Campo Obrigatório</p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="error-message">Email inválido</p>
        )}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { required: true, minLength: 5 })}
        />
        {errors?.password?.type === "required" && (
          <p className="error-message">Campo Obrigatório</p>
        )}

        {errors?.password?.type === "minLength" && (
          <p className="error-message">
            Senha precisa ser maior que 5 caracteres
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Confirmação de senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Digite sua senha novamente"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => {
              return value === watchPassword;
            },
          })}
        />

        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">Campo Obrigatório</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">Senhas diferentes</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          className={errors?.profession && "input-error"}
          {...register("profession", {
            validate: (value) => {
              return value !== "0";
            },
          })}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type && (
          <p className="error-message">Selecione uma profissão</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", { required: true })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && (
          <p className="error-message">Campo Obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default BadForm;
