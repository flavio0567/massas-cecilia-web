import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiPhone, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  mobile: number;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          mobile: Yup.string().min(10, 'Informe o número do celular com ddd.'),
          password: Yup.string().min(
            6,
            'Senha obrigatória, mínimo 6 caracteres.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          mobile: data.mobile,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu erro ao fazer logon, cheque suas credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Massas-Trigo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input
              name="mobile"
              icon={FiPhone}
              placeholder="Número do celular"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <a href="signup">
            <FiLogIn />
            Criar conta
          </a>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
