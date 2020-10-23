import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
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

interface ProductProps {
  id: string;
  code: string;
  name: string;
  sales_price: string;
  unit: string;
  barcode: string;
  ncm: 49029000;
  amount: number;
  product_family: number;
  category: number;
  sub_category: number;
  is_inactive: number;
  avatar: string;
}

interface OrderDetail {
  id: string;
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

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [details, setDetails] = useState<ProductProps[]>([]);

  const token = localStorage.getItem('@Massas:token');

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');

      const ordersFormatted = response.data.map((order: any) => {
        return {
          ...(order as Object),
          delivery_date: format(new Date(order.delivery_date), 'dd/MM/yyyy'),
          totalFormatted: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(order.order_total),
        };
      });

      setOrders(ordersFormatted);
    }
    loadOrders();
  }, []);

  async function getName(orderdetail_id: string) {
    api
      .get(`ordersdetail/${orderdetail_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const updateProductName = orders.map((o: any) =>
          o.id === orderdetail_id ? { ...o, name: res.data.product.name } : o,
        );

        console.log(updateProductName);
        setDetails(res.data.product.name);
      });
  }

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
                  <div>
                    <Link
                      to={{
                        pathname: '/orderedit',
                        state: order,
                      }}
                    >
                      <FiEdit size={30} style={{ color: '#f7ff56' }} />
                    </Link>
                    <p>alterar</p>
                  </div>

                  <div>
                    <Link
                      to={{
                        pathname: '/home',
                      }}
                    >
                      <FiCheckSquare size={30} style={{ color: '#478559' }} />
                    </Link>
                    <p>confirmar</p>
                  </div>
                </ButtonSection>
              </OrderDetail>
              <OrderDetail>
                <Label>Endereço da entrega:</Label>
                {order.delivery_address1 ? (
                  <Delivery>
                    <h3>{order.delivery_address1}</h3>
                    <h3>{order.delivery_address2}</h3>
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
                <Label>Preço sugerido do pedido:</Label>
                <time> R{order.order_total}</time>
              </OrderDetail>
              <OrderDetail>
                {order.ordersdetail &&
                  order.ordersdetail.map((order_detail) => (
                    <Detail key={order_detail.id}>
                      <Label>Produto: {}</Label>
                      <p>
                        Quantidade: <span>{order_detail.quantity}</span>
                        {order_detail.unit}
                      </p>
                      <p>
                        Estoque: <span>{order_detail.amount}</span>
                      </p>
                      <p>
                        Preço de venda: <span>R{order_detail.sales_price}</span>{' '}
                      </p>
                      <button
                        type="button"
                        onClick={() => getName(order_detail.id)}
                      >
                        Name : {details}
                      </button>
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
