import React, { useRef, useEffect, useState } from 'react';
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
  Aside,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface OrderFormData {
  delivery_name: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  delivery_date: Date;
  delivery_mobile: string;
  delivery_time: string;
  order_total: number;
}

const OrderEdit: React.FC = () => {
  const { state } = useLocation<OrderFormData | null>();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [order, setOrder] = useState<OrderFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  // useEffect(() => {
  //   setOrder(state);

  //   formRef.current?.setData({
  //     delivery_name: order?.delivery_name,
  //     delivery_address1: order?.delivery_address1,
  //     delivery_address2: order?.delivery_address2,
  //     delivery_city: order?.delivery_city,
  //     delivery_state: order?.delivery_state,
  //     delivery_zip_code: order?.delivery_zip_code,
  //     delivery_date: order?.delivery_date,
  //     delivery_mobile: order?.delivery_mobile,
  //     delivery_time: order?.delivery_time,
  //     order_total: order?.order_total,
  //   });
  // }, [state, order]);

  async function handleSubmit(data: OrderFormData) {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      // const schema = Yup.object().shape({
      //   name: Yup.string().min(
      //     2,
      //     'Tamanho mínimo do nome do produto, 2 caracteres.',
      //   ),
      //   sales_price: Yup.number().required(
      //     'Valor de venda do produto obrigatório.',
      //   ),
      //   unit: Yup.string().required('Informe a unidade.'),
      //   amount: Yup.number().required('Informe algum valor para estoque.'),
      //   is_inactive: Yup.number(),
      //   product_family: Yup.number(),
      //   category: Yup.number(),
      //   sub_category: Yup.number(),
      // });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      const token = localStorage.getItem('@Massas:token');

      if (!token) {
        throw new Error('Token não informado.');
      }

      // await api.put(`/products/${product?.id}`, data, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

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
        description: `Ocorreu erro ao atualizar o produto, cheque as informações.`,
      });
    } finally {
      setLoading(false);
    }
  }

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
          <Aside>
            {order && (
              <Form
                ref={formRef}
                initialData={{ order }}
                onSubmit={handleSubmit}
              >
                {/* <h1>Alterar os dados do produto</h1>

                <Input name="name" icon={FiShoppingBag} placeholder="Nome" />

                <Input
                  name="sales_price"
                  icon={FiDollarSign}
                  placeholder="R$"
                />

                <Input name="unit" icon={FiSettings} placeholder="Unidade" />

                <Input
                  name="amount"
                  icon={FiLayers}
                  placeholder="Quantidade em estoque"
                />

                <Input
                  name="is_inactive"
                  icon={FiBellOff}
                  placeholder="Produto inativo? (1-sim 0-não)"
                />

                <Input
                  name="product_family"
                  icon={FiTag}
                  placeholder="Família do produto (ex.: 1-massas, 2-molhos,...)"
                />

                <Input
                  name="category"
                  icon={FiTag}
                  placeholder="Categoria (ex.: 1-Lasanha, 2-Nhoque, ...)"
                />
                <Input
                  name="sub_category"
                  icon={FiTag}
                  placeholder="Sub categoria (ex.: 1-Lasanha bolonhesa, ...)"
                />

                <Button type="submit" loading={loading}>
                  Confirmar
                </Button>
                <Link to="/home">
                  <FiLogOut />
                  Retornar a lista de produtos
                </Link> */}
              </Form>
            )}

            {/* {product?.avatar_url ? (
              <img src={product.avatar_url} alt={product.name} />
            ) : null} */}
          </Aside>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default OrderEdit;
