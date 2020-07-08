import React, { useEffect, useState, useCallback } from 'react';
import { FiPower, FiEdit, FiSearch } from 'react-icons/fi';

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
  List,
  SearchBox,
  SearchButton,
  InputSearch,
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
  const [query, setQuery] = useState<string>();

  const [products, setProducts] = useState<ProductFormData[]>();

  const [selected, setSelected] = useState<ProductFormData[]>();

  const search = useCallback(async () => {
    const newSelection = products?.filter(
      (prod: any) => prod.name.toLowerCase().indexOf(query) > -1,
    );
    setSelected(newSelection);
  }, [products?.filter, query]);

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

      setSelected(productsFormatted);
      setProducts(productsFormatted);
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
              <span>Bem-vinda(o),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>

        <SearchBox>
          <InputSearch
            name="query"
            type="text"
            value={query}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
          />
          <SearchButton type="submit" onClick={search}>
            <FiSearch />
          </SearchButton>
        </SearchBox>
      </Header>
      <Content>
        <h1>Lista de Produtos 📱 Massas da Cecilia</h1>

        {selected?.map((prod) => (
          <ProductView key={prod.id}>
            <List>
              <span>{prod.code}</span>
              <strong>{prod.nameFormatted}</strong>
              <span>{prod.priceFormatted}</span>
              <span>{prod.unit}</span>
              <span>
                Família: <span>{prod.product_family}</span>
              </span>
              <span>
                Categoria: <span>{prod.category}</span>
              </span>
              <span>
                Sub_Categoria: <span>{prod.sub_category}</span>
              </span>
            </List>
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
