import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

import { FiCheckCircle } from 'react-icons/fi';
import { MdChevronLeft } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import {
  Container,
  Header,
  OrderList,
  Order,
  OrderDetail,
  Label,
  ButtonSection,
  Loja,
  Delivery,
  Detail,
} from './styles';

interface OrderDetail {
  id: string;
  order_id: string;
  product_id: string;
  sales_price: number;
  unit: string;
  amount: number;
  quantity: number;
  product_name: string;
  packing: string;
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
  date: Date;
}

interface DetailProps {
  id: string;
  name: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { addToast } = useToast();
  const history = useHistory();
  const token = localStorage.getItem('@Massas:token');

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const ordersFormatted = await response.data.map((order: any) => {
        return {
          ...(order as Object),
          delivery_date: format(new Date(order.delivery_date), 'dd/MM/yyyy'),
          order_total: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(order.order_total.replace('$', '')),
        };
      });
      setOrders(ordersFormatted);
    }
    loadOrders();
  }, [token]);

  const handleOrderClosed = useCallback(
    async (id: string) => {
      await api
        .patch(`ordersclosed/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('res.data:', res.data);
        });

      addToast({
        type: 'success',
        title: 'Confirmar Pedido!',
        description: 'Pedido confirmado conforme solicitado.',
      });

      history.push('/home');
    },
    [history, token, addToast],
  );

  return (
    <Container>
      <Header>
        <Link
          to={{
            pathname: '/home',
          }}
        >
          <MdChevronLeft size={36} color="#ff9000" />
        </Link>
        <Label style={{ marginLeft: 60, fontSize: 30 }}>
          Pedidos Abertos{' '}
          <span role="img" aria-label="order">
            🍝
          </span>
        </Label>
      </Header>
      <OrderList>
        {orders &&
          orders.map((order: OrderProps) => (
            <Order key={order.id}>
              <OrderDetail>
                <Label>Cliente:</Label>
                <time>{order.delivery_name}</time>
                <Label>Contato:</Label>
                <time>{order.delivery_mobile}</time>
                <ButtonSection>
                  {/* <div>
                    <Link
                      to={{
                        pathname: '/orderedit',
                        state: order,
                      }}
                    >
                      <FiEdit3
                        size={30}
                        style={{ color: '#f7ff56', margin: 10 }}
                      />
                    </Link>
                    <p>Alterar pedido</p>
                  </div> */}

                  <div>
                    <button
                      onClick={() => handleOrderClosed(order.id)}
                      type="submit"
                    >
                      <FiCheckCircle
                        size={30}
                        style={{
                          color: '#478559',
                          marginTop: 26,
                          marginLeft: -60,
                        }}
                      />
                    </button>
                    <p>Finalizar pedido</p>
                  </div>
                </ButtonSection>
              </OrderDetail>
              <OrderDetail>
                <Label>Endereço da entrega:</Label>
                {order.delivery_address1 ? (
                  <Delivery>
                    <h3>
                      {order.delivery_address1} {order.delivery_address2}
                    </h3>
                    <p>CEP: {order.delivery_zip_code}</p>
                  </Delivery>
                ) : (
                  <Loja>
                    <time>Retirar na Loja</time>
                  </Loja>
                )}
              </OrderDetail>
              <OrderDetail>
                <Label>Entregar em:</Label>
                <time>{order.delivery_date}</time>
                <time>{order.delivery_time}</time>
                <Label>Valor total do pedido:</Label>
                <time> {order.order_total}</time>
              </OrderDetail>
              <OrderDetail>
                {order.ordersdetail &&
                  order.ordersdetail.map((order_detail) => (
                    <Detail key={order_detail.id}>
                      {order_detail.product_name ? (
                        <>
                          <h2>{order_detail.product_name}</h2>
                          <p>{order_detail.packing}</p>
                        </>
                      ) : (
                        <Label>Nome do Produto</Label>
                      )}

                      <p>
                        Quantidade:
                        <span>
                          {' '}
                          {order_detail.quantity} {order_detail.unit}
                        </span>
                      </p>
                      <p>
                        Preço de venda:
                        <span> R{order_detail.sales_price}</span>
                      </p>
                      <p>
                        Estoque no momento da venda:{' '}
                        <span>
                          {' '}
                          {order_detail.amount} {order_detail.unit}{' '}
                        </span>
                      </p>
                    </Detail>
                  ))}
              </OrderDetail>
            </Order>
          ))}
      </OrderList>
    </Container>
  );
};

export default Orders;
