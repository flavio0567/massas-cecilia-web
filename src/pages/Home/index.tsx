import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import {
  FiPower,
  FiEdit,
  FiSearch,
  FiBellOff,
  FiBell,
  FiCamera,
} from 'react-icons/fi';

import { Link } from 'react-router-dom';
import Notifications from '../Notifications';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import logoIMG from '../../assets/logo.svg';

import {
  Container,
  Header,
  Profile,
  Content,
  ProductView,
  List,
  Products,
  AvatarInfo,
  SearchBox,
  SearchButton,
  InputSearch,
  ProductDetail,
  ActiveButton,
} from './styles';

interface ProductFormData {
  id: string;
  code: number;
  name: string;
  unit: string;
  sales_price: number;
  is_inactive: number;
  product_family: number;
  category: number;
  avatar_url: string;
  sub_category: number;
  priceFormatted: string;
  exception: number;
}

const Home: React.FC = () => {
  const { signOut, user } = useAuth();

  const [query, setQuery] = useState<string>();

  const { addToast } = useToast();

  const [products, setProducts] = useState<ProductFormData[]>();

  const [selected, setSelected] = useState<ProductFormData[]>();

  const token = localStorage.getItem('@Massas:token');

  const loadProducts = useCallback(async () => {
    await api.get('/products').then((response) => {
      const productsFormatted = response.data.product.map((product: any) => {
        return {
          ...(product as Object),
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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const search = useCallback(() => {
    const newSelection = products?.filter(
      (prod: any) => prod.name.toLowerCase().indexOf(query) > -1,
    );
    setSelected(newSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products?.filter, query, products]);

  const handleActivateProduct = useCallback(
    async (product: ProductFormData) => {
      if (!token) {
        throw new Error('Token não informado.');
      }

      await api.patch(`/products/activate/${product?.id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadProducts();
    },
    [loadProducts, token],
  );

  const handleAvatarChange = useCallback(
    (id, e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch(`products/avatar/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            addToast({
              type: 'success',
              title: 'Avatar do produto atualizado!',
            });

            loadProducts();
          });
      }
    },
    [addToast, token, loadProducts],
  );

  return (
    <Container>
      <Header>
        <nav>
          <img src={logoIMG} alt="logo massas" />
          <Link to="/orders">PEDIDOS ABERTOS</Link>
          <Link to="/ordersclosed">PEDIDOS FECHADOS</Link>
        </nav>
        <Notifications />
        <aside>
          <Profile>
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
            />
            <div>
              <span>Bem-vinda(o),</span>
              <strong>{user.name}</strong>
            </div>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </aside>
      </Header>

      <Content>
        <SearchBox>
          <InputSearch
            name="query"
            type="text"
            value={query}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)}
          />
          <SearchButton type="submit" onClick={search}>
            <FiSearch />
          </SearchButton>
        </SearchBox>
        <h1>
          Lista de Produtos
          <span role="img" aria-label="mobile">
            📱
          </span>
          Massas da Cecilia
        </h1>

        {selected?.map((prod) => (
          <ProductView key={prod.id}>
            <List>
              <Products>
                <AvatarInfo>
                  {prod.avatar_url ? (
                    <img src={prod.avatar_url} alt={prod.name} />
                  ) : (
                    <img
                      src="https:////images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"
                      alt="product avatar"
                    />
                  )}
                  <label htmlFor={prod.id}>
                    <FiCamera />

                    <input
                      type="file"
                      id={prod.id}
                      onChange={(e) => handleAvatarChange(prod.id, e)}
                    />
                  </label>

                  <span>{prod.code}</span>
                </AvatarInfo>
                <ProductDetail>
                  <strong>{prod.name}</strong>
                  <div>
                    <div>
                      <span>Familia</span>
                      <span>Categoria</span>
                      <span>Sub</span>
                      <span>Preço</span>
                      <span>Unidade</span>
                      <span>Exceção</span>
                    </div>

                    <div>
                      <span>{prod.product_family}</span>
                      <span>{prod.category}</span>
                      <span>{prod.sub_category}</span>
                      <span>{prod.priceFormatted}</span>
                      <span>{prod.unit}</span>
                      {prod.exception ? <span>Sim</span> : <span>Não</span>}
                    </div>
                  </div>
                </ProductDetail>
              </Products>
            </List>
            <Link
              to={{
                pathname: '/product',
                state: prod,
              }}
            >
              <FiEdit />
            </Link>

            <ActiveButton
              onClick={() => {
                handleActivateProduct(prod);
              }}
            >
              {prod.is_inactive ? <FiBellOff color="#ff0000" /> : <FiBell />}
            </ActiveButton>
          </ProductView>
        ))}
      </Content>
    </Container>
  );
};

export default Home;
