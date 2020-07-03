import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  FiLogOut,
  FiShoppingBag,
  FiTag,
  FiSettings,
  FiDollarSign,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useLocation, Link } from 'react-router-dom';
import logoIMG from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  AnimationContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ProductFormData {
  id: string;
  code: string;
  name: string;
  unit: string;
  sales_price: string;
  is_active: string;
  product_family: string;
  category: string;
  sub_category: string;
  nameFormatted: string;
  priceFormatted: string;
}

const ProductEdit: React.FC = () => {
  const { state } = useLocation<ProductFormData | null>();
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setProduct(state);
    console.log('product:', state);
  }, [state]);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().min(
            5,
            'Tamanho mínimo do nome do produto, 5 caracteres..',
          ),
          sales_price: Yup.number().required('Nome do produto obrigatório.'),
          unit: Yup.string().required(),
          product_family: Yup.number(),
          category: Yup.number(),
          sub_ategory: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = localStorage.getItem('@Massas:token');

        if (!token) {
          throw new Error('Error from api.');
        }
        // Fazer a atualizacao
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autualização do produto',
          description:
            'Ocorreu erro ao atualizar o produto, cheque as infromações.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoIMG} alt="logo massas" />

          <Profile>
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo(a),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Alterar os dados do produto</h1>

            <Input
              name="name"
              icon={FiShoppingBag}
              value={product?.nameFormatted}
            />

            <Input
              name="sales_price"
              icon={FiDollarSign}
              value={product?.sales_price}
              placeholder="R$"
            />

            <Input name="unit" icon={FiSettings} value={product?.unit} />

            <Input
              name="is_active"
              icon={FiTag}
              placeholder="Produto ativo?"
              value={product?.is_active}
            />

            <Input
              name="product_family"
              icon={FiTag}
              placeholder="Família do produto"
              value={product?.product_family}
              defaultValue={0}
            />

            <Input
              name="category"
              icon={FiTag}
              placeholder="Category"
              value={product?.category}
              defaultValue={0}
            />
            <Input
              name="sub_category"
              icon={FiTag}
              placeholder="Sub categoria"
              value={product?.sub_category}
              defaultValue={0}
            />

            <Button type="submit">Enviar</Button>
          </Form>
        </AnimationContainer>
        <Link to="/home">
          <FiLogOut />
          Retornar a lista de produtos
        </Link>
      </Content>
    </Container>
  );
};

export default ProductEdit;
