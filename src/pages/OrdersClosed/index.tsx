import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';

import { MdChevronLeft } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  Header,
  SearchBox,
  SearchButton,
  InputSearch,
  OrderList,
  Order,
  OrderDetail,
  Label,
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
  payment_method: number;
  paymentMethod: string;
}

const OrdersClosed: React.FC = () => {
  const [deliveryMobile, setDeliveryMobile] = useState<string>();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const token = localStorage.getItem('@Massas:token');

  const loadOrders = useCallback(async () => {
    await api
      .get('ordersclosed', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const ordersFormatted = response.data.map((order: any) => {
          return {
            ...(order as Object),
            paymentMethod: order.payment_method !== 1 ? 'Cartão' : 'Dinheiro',
            delivery_date: format(new Date(order.delivery_date), 'dd/MM/yyyy'),
            order_total: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(order.order_total.replace('$', '')),
          };
        });
        setOrders(ordersFormatted);
      });
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const searchMobile = useCallback(async () => {
    if (!deliveryMobile) {
      loadOrders();
    } else if (token) {
      api
        .get(`ordersclosed/mobile/${deliveryMobile}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const ordersFormatted = response.data.map((order: any) => {
            return {
              ...(order as Object),
              paymentMethod: order.payment_method !== 1 ? 'Cartão' : 'Dinheiro',
              delivery_date: format(
                new Date(order.delivery_date),
                'dd/MM/yyyy',
              ),
              order_total: Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(order.order_total.replace('$', '')),
            };
          });
          setOrders(ordersFormatted);
        });
    }
  }, [deliveryMobile, token, loadOrders]);

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
          Pedidos Fechados{' '}
          <span role="img" aria-label="order">
            📦
          </span>
        </Label>
        <SearchBox>
          <InputSearch
            name="query"
            type="text"
            value={deliveryMobile}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setDeliveryMobile(e.currentTarget.value)}
          />
          <SearchButton
            type="submit"
            onClick={searchMobile}
            onChange={(e) => {
              setDeliveryMobile(e.currentTarget.value);
            }}
          >
            <FiSearch />
          </SearchButton>
        </SearchBox>
      </Header>
      <p style={{ color: '#999', paddingLeft: 660 }}>Pesquisar por contato</p>
      <OrderList>
        {orders &&
          orders.map((order: OrderProps) => (
            <Order key={order.id}>
              <OrderDetail>
                <Label>Cliente:</Label>
                <time>{order.delivery_name}</time>
                <Label>Contato:</Label>
                <time>{order.delivery_mobile}</time>
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
                <Label>Forma de pagamento:</Label>
                <time>{order.paymentMethod}</time>
              </OrderDetail>
              <OrderDetail>
                {order.ordersdetail &&
                  order.ordersdetail.map((order_detail) => (
                    <Detail key={order_detail.id}>
                      {order_detail.product_name ? (
                        <h2>{order_detail.product_name}</h2>
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

export default OrdersClosed;
