import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  FiLogOut,
  FiShoppingBag,
  FiTag,
  FiSettings,
  FiDollarSign,
  FiLayers,
  FiBellOff,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useLocation, Link, useHistory } from 'react-router-dom';
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
import api from '../../services/api';

interface ProductFormData {
  id: string;
  code: string;
  name: string;
  sales_price: number;
  unit: string;
  amount: number;
  is_active: number;
  product_family: number;
  sub_category: number;
  category: number;
  nameFormatted: string;
  priceFormatted: number;
}

const ProductEdit: React.FC = () => {
  const { state } = useLocation<ProductFormData | null>();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const { user } = useAuth();
  const history = useHistory();

  const [name, setName] = useState();
  const [sales_price, setSalesPrice] = useState();
  const [unit, setUnit] = useState();
  const [amount, setAmount] = useState();
  const [is_inactive, setIsInactive] = useState();
  const [product_family, setProductFamily] = useState();
  const [category, setCategory] = useState();
  const [sub_category, setSubCategory] = useState();

  useEffect(() => {
    setLoading(true);
    setProduct(state);
    setLoading(false);
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
            'Tamanho mínimo do nome do produto, 5 caracteres.',
          ),
          sales_price: Yup.number().required(
            'Valor de venda do produto obrigatório.',
          ),
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
          throw new Error('Token não informado.');
        }

        await api.post(`/products/${data.id}`, data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Alteração no produto realizada!',
          description: 'Produto alterado conforme solicitado.',
        });
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
    [addToast, history],
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
              <span>Bem-vinda(o),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <AnimationContainer>
          {product && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Alterar os dados do produto</h1>

              <Input
                name="name"
                icon={FiShoppingBag}
                value={product.nameFormatted}
                onChange={() => setName}
              />

              <Input
                name="sales_price"
                icon={FiDollarSign}
                value={product.sales_price}
                placeholder="R$"
                onChange={() => setSalesPrice}
              />

              <Input name="unit" icon={FiSettings} value={product.unit} />

              <Input
                name="amount"
                icon={FiLayers}
                value={product.amount}
                placeholder="Quantidade em estoque"
                onChange={() => setAmount}
              />

              <Input
                name="is_inactive"
                icon={FiBellOff}
                placeholder="Produto inativo? (1-sim 0-não)"
                value={product.is_active}
                onChange={() => setIsInactive}
              />

              <Input
                name="product_family"
                icon={FiTag}
                placeholder="Família do produto (ex.: 1-massas, 2-molhos,...)"
                value={product.product_family}
                onChange={() => setProductFamily}
              />

              <Input
                name="category"
                icon={FiTag}
                placeholder="Categoria (ex.: 1-Lasanha, 2-Nhoque, ...)"
                value={product.category}
                onChange={() => setCategory}
              />
              <Input
                name="sub_category"
                icon={FiTag}
                placeholder="Sub categoria (ex.: 1-Lasanha bolonhesa, ...)"
                value={product.sub_category}
                onChange={() => setSubCategory}
              />

              <Button type="submit" loading={loading}>
                Enviar
              </Button>
            </Form>
          )}
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
