import React, { useEffect, useState } from 'react';
import { FiPower, FiEdit } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import logoIMG from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ProductView,
} from './styles';

interface ProductFormData {
  id: string;
  code: number;
  name: string;
  unit: string;
  sales_price: number;
  product_family: number;
  category: number;
  sub_category: number;
  nameFormatted: string;
  priceFormatted: string;
}

const Home: React.FC = () => {
  const { signOut, user } = useAuth();

  const [products, setProducts] = useState<ProductFormData[]>();

  useEffect(() => {
    api.get<ProductFormData[]>('/products').then((response) => {
      const productsFormatted = response.data.map((product) => {
        return {
          ...product,
          nameFormatted:
            product.name.charAt(0).toUpperCase() +
            product.name.slice(1).toLowerCase(),
          priceFormatted: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.sales_price),
        };
      });

      setProducts(productsFormatted);
      console.log(typeof productsFormatted);
    });
  }, []);

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

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <h1>Produtos cadastrados</h1>

        {products?.map((prod) => (
          <ProductView key={prod.id}>
            <ul>
              <li>
                <span>{prod.code}</span>
                <strong>{prod.nameFormatted}</strong>
                <strong>{prod.priceFormatted}</strong>
                <strong>{prod.unit}</strong>
                <span>
                  Família: <strong>{prod.product_family}</strong>
                </span>
                <span>
                  Categoria: <strong>{prod.category}</strong>
                </span>
                <span>
                  Sub_Categoria: <strong>{prod.sub_category}</strong>
                </span>
              </li>
            </ul>
            <Link
              to={{
                pathname: '/product',
                state: prod,
              }}
            >
              <FiEdit />
            </Link>
          </ProductView>
        ))}
      </Content>
    </Container>
  );
};

export default Home;
