import React, { useCallback, useRef } from 'react';
import { FiLogOut, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  mobile: number;
  email?: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().min(4, 'Nome obrigatório.'),
          mobile: Yup.string().min(10, 'Informe o número do celular com ddd.'),
          email: Yup.string().email('Informe um endereço de e-mail válido.'),
          password: Yup.string().min(
            6,
            'Senha obrigatória, mínimo 6 caracteres.',
          ),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senhas não conferem, tente novamente',
          ),
          is_admin: Yup.number().default(1),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadatro realizado!',
          description:
            'Novo usuário cadastrado, já pode ser utilizado para logon.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu erro ao cadastrar, cheque suas informações e tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Massas-Trigo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="mobile"
              icon={FiPhone}
              placeholder="Número do celular"
            />
            <Input name="email" icon={FiMail} placeholder="E-mail (opcional)" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme a senha"
            />

            <Button type="submit">Confirmar</Button>
          </Form>

          <Link to="/">
            <FiLogOut />
            Retornar ao logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
