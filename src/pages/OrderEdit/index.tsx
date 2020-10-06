import React, { useRef, useEffect, useState } from 'react';
import {
  FiLogOut,
  FiShoppingBag,
  FiTag,
  FiSettings,
  FiDollarSign,
  FiLayers,
  FiBellOff,
  FiPhoneCall,
  FiBookOpen,
  FiCalendar,
  FiShoppingCart,
  FiPlusSquare,
  FiHome,
  FiUser,
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
  OrderDetail,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface OrderDetail {
  order_id: string;
  product_id: string;
  sales_price: number;
  unit: string;
  amount: number;
  quantity: number;
}

export interface OrderProps {
  id: string;
  delivery_name: string;
  delivery_mobile: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  delivery_date: string;
  delivery_time: string;
  order_total: number;
  is_delivered: number;
  is_order_delivering: number;
  ordersdetail: OrderDetail[];
  totalFormatted: number;
  date: Date;
}

const OrderEdit: React.FC = () => {
  const { state } = useLocation<OrderProps | null>();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [order, setOrder] = useState<OrderProps | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  useEffect(() => {
    setOrder(state);

    formRef.current?.setData({
      delivery_name: order?.delivery_name,
      delivery_mobile: order?.delivery_mobile,
      delivery_address1: order?.delivery_address1,
      delivery_address2: order?.delivery_address2,
      delivery_city: order?.delivery_city,
      delivery_state: order?.delivery_state,
      delivery_zip_code: order?.delivery_zip_code,
      delivery_date: order?.delivery_date,
      delivery_time: order?.delivery_time,
      order_total: order?.order_total,
      orderDetail,
    });
  }, [
    order?.delivery_address1,
    order?.delivery_address2,
    order?.delivery_city,
    order?.delivery_date,
    order?.delivery_mobile,
    order?.delivery_name,
    order?.delivery_state,
    order?.delivery_time,
    order?.delivery_zip_code,
    order?.order_total,
    orderDetail,
    state,
  ]);

  async function handleSubmit(data: OrderProps) {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      console.log('order', order?.id, data);
      // data.order_detail.map((detail: any) => {
      //   const schema = Yup.object().shape({
      //     quantity: Yup.number().min(0.25, 'Quantidade mínima não aceita.'),
      //   });

      //   await schema.validate(data, {
      //     abortEarly: false,
      //   });
      //   return detail;
      // });

      const token = localStorage.getItem('@Massas:token');

      if (!token) {
        throw new Error('Token não informado.');
      }

      await api.put(`/orders/${order?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      history.push('/orders');

      addToast({
        type: 'success',
        title: 'Alteração no pedido realizada!',
        description: 'Pedido alterado conforme solicitado.',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro na autualização do pedido',
        description: `Ocorreu erro ao atualizar o pedido, cheque as informações.`,
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
                initialData={{ order, ordersdetail: order.ordersdetail }}
                onSubmit={handleSubmit}
              >
                <h1>Alterar os dados do pedido</h1>
                <Input name="delivery_name" icon={FiUser} placeholder="Nome" />
                <Input
                  name="delivery_mobile"
                  icon={FiPhoneCall}
                  placeholder="Celular"
                />
                <Input
                  name="delivery_address1"
                  icon={FiHome}
                  placeholder="Endereço de entrega"
                />
                <Input
                  name="delivery_address2"
                  icon={FiHome}
                  placeholder="Complemento"
                />
                <Input
                  name="delivery_city"
                  icon={FiHome}
                  placeholder="Cidade"
                />
                <Input
                  name="delivery_state"
                  icon={FiHome}
                  placeholder="Estado"
                />
                <Input
                  name="delivery_zip_code"
                  icon={FiHome}
                  placeholder="CEP"
                />
                <Input
                  name="delivery_date"
                  icon={FiCalendar}
                  placeholder="R$"
                />
                <Input
                  name="delivery_time"
                  icon={FiCalendar}
                  placeholder="R$"
                />
                <Input
                  name="order_total"
                  icon={FiDollarSign}
                  placeholder="R$"
                />

                {order.ordersdetail &&
                  order.ordersdetail.map((ordersdetail, index) => (
                    <OrderDetail>
                      <h3>Produto</h3>
                      <Input
                        name={`ordersdetail[${index}].quantity`}
                        icon={FiShoppingCart}
                        placeholder="Quantidade"
                      />
                      <Input
                        name={`ordersdetail[${index}].amount`}
                        icon={FiPlusSquare}
                        placeholder="Estoque"
                      />
                      <Input
                        name={`ordersdetail[${index}].sales_price`}
                        icon={FiDollarSign}
                        placeholder="Preço de venda"
                      />
                    </OrderDetail>
                  ))}

                <Button type="submit" loading={loading}>
                  Confirmar
                </Button>
                <Link to="/orders">
                  <FiLogOut />
                  Retornar a lista de pedidos
                </Link>
              </Form>
            )}
          </Aside>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default OrderEdit;
