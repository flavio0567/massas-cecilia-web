import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';

import {
  FiPower,
  FiEdit,
  FiSearch,
  FiBellOff,
  FiBell,
  FiCamera,
  FiCheckSquare,
} from 'react-icons/fi';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Link } from 'react-router-dom';
import {
  MdChevronLeft,
  MdChevronRight,
  MdLocalGroceryStore,
  MdAccessTime,
} from 'react-icons/md';
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
  Orders,
  OrdersLabel,
  OrdersLinks,
  TimeFrame,
  TimeFrameLabel,
  ProductView,
  List,
  Products,
  AvatarInfo,
  SearchBox,
  SearchButton,
  InputSearch,
  ProductDetail,
  ActiveButton,
  ActionButtons,
  Pagination,
  PaginationButton,
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
  amount: number;
}

const Home: React.FC = () => {
  const { signOut, user } = useAuth();
  const [query, setQuery] = useState<string>();
<<<<<<< HEAD
  const [familyQuery, setFamilyQuery] = useState<string>();
=======
  const [familyQuery, setFamilyQuery] = useState<string>();
>>>>>>> 76fda6cee45cda6e251ccbde4c858a99387ae547
  const { addToast } = useToast();
  const [products, setProducts] = useState<ProductFormData[]>();
  const [selected, setSelected] = useState<ProductFormData[]>();
  const [contentLength, setContentLength] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const token = localStorage.getItem('@Massas:token');

  const loadProducts = useCallback(async () => {
    await api.get('/products', { params: { page, limit } }).then((response) => {
      setContentLength(response.data.product[1]);
      const productsFormatted = response.data.product[0].map((product: any) => {
        return {
          ...(product as Object),
          // priceFormatted: Intl.NumberFormat('pt-BR', {
          //   style: 'currency',
          //   currency: 'BRL',
          // }).format(product.sales_price),
        };
      });
      setSelected(productsFormatted);
      setProducts(productsFormatted);
    });
  }, [limit, page]);

  useEffect(() => {
    loadProducts();
    // setLimit(contentLength);
  }, [loadProducts, page, limit, contentLength]);

  const search = useCallback(async () => {
    // const newSelection = products?.filter(
    //   (prod: any) => prod.name.toLowerCase().indexOf(query) > -1,
    // );
    if (!query) {
      loadProducts();
    } else {
      const newSelection = await api.get('products/search', {
        params: { like: query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelected(newSelection.data);
      setProducts(newSelection.data);
    }
  }, [loadProducts, query, token]);

  const searchFamily = useCallback(async () => {
    if (!familyQuery) {
      loadProducts();
    } else {
      const newSelection = await api.get(
        `products/all-in-family/${familyQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSelected(newSelection.data);
      setProducts(newSelection.data);
    }
  }, [loadProducts, familyQuery, token]);

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

  const handleChangedSalesPrice = useCallback(
    (e, prod, index) => {
      if (!products) {
        throw new Error(`Produto não encontrado.${prod}`);
      }
      const newProductWithNewValue = { ...products[index] };

      newProductWithNewValue.sales_price = Number(e.target.value);

      const newListProducts = { ...products };

      newListProducts[index] = newProductWithNewValue;

      setProducts(newListProducts);
    },
    [products],
  );

  const handleChangedAmount = useCallback(
    (e, product, index) => {
      if (!products) {
        throw new Error('Produto não encontrado.');
      }

      const newProductWithNewValue = { ...products[index] };

      newProductWithNewValue.amount = Number(e.target.value);

      const newListProducts = { ...products };

      newListProducts[index] = newProductWithNewValue;

      setProducts(newListProducts);
    },
    [products],
  );

  const handleSubmitChange = useCallback(
    async (index) => {
      if (!products) {
        throw new Error('Produto não encontrado.');
      }

      try {
        const product: ProductFormData = products[index];

        const { sales_price, amount, name, unit } = product;

        await api
          .put(
            `/products/${product.id}`,
            { name, sales_price, amount, unit },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .then(() => {
            addToast({
              type: 'success',
              title: 'Dados do produto atualizados!',
            });
          });
      } catch (err) {
        console.log(err.message);
      }
    },
    [addToast, products, token],
  );

  const handlePagination = useCallback(
    async (p) => {
      if (page === 0 && p > 0) {
        setPage(page + p);
      } else if (page > 0 && page <= Math.round(contentLength / limit)) {
        setPage(page + p);
      } else {
        setPage(0);
      }

      const newPage = await api.get('products/', {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` },
      });
      setContentLength(newPage.data.product[1]);
      setSelected(newPage.data.product[0]);
      setProducts(newPage.data.product[0]);
    },
    [contentLength, limit, page, token],
  );

  return (
    <Container>
      <Header>
        <nav>
          <img src={logoIMG} alt="logo massas" />
          <Orders>
            <OrdersLabel>
              <MdLocalGroceryStore size={22} color="#ffe5b4" />
              <h1>Pedidos</h1>
            </OrdersLabel>
            <OrdersLinks>
              <Link to="/orders">
                <span>Abertos</span>
              </Link>
              <Link to="/ordersclosed">
                <span>Fechados</span>
              </Link>
            </OrdersLinks>
          </Orders>
          <TimeFrame>
            <TimeFrameLabel>
              <MdAccessTime size={22} color="#ffe5b4" />
              <Link to="/timeframe">
                <span>Horários</span>
              </Link>
            </TimeFrameLabel>
          </TimeFrame>
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
<<<<<<< HEAD
        <p style={{ color: '#999', paddingLeft: 650, paddingTop: 3 }}>
          Pesquisar Produto
        </p>
=======
      <p style={{ color: '#999', paddingLeft: 650, paddingTop: 3 }}>Pesquisar Produto</p>
>>>>>>> 76fda6cee45cda6e251ccbde4c858a99387ae547
        <SearchBox>
          <InputSearch
            name="query"
            type="text"
            value={query}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)}
          />
<<<<<<< HEAD
          <SearchButton
            type="submit"
            onClick={search}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
          >
=======
          <SearchButton type="submit" onClick={search} onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}>
>>>>>>> 76fda6cee45cda6e251ccbde4c858a99387ae547
            <FiSearch />
          </SearchButton>
        </SearchBox>

        <p style={{ color: '#999', paddingLeft: 650 }}>Pesquisar Família</p>
        <SearchBox>
          <InputSearch
            type="text"
            name="family"
            value={familyQuery}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
<<<<<<< HEAD
              setFamilyQuery(e.currentTarget.value)}
          />
          <SearchButton
            type="submit"
            onClick={searchFamily}
            onChange={(e) => {
              setFamilyQuery(e.currentTarget.value);
            }}
          >
=======
              setFamilyQuery(e.currentTarget.value)} />
            <SearchButton type="submit" onClick={searchFamily} onChange={(e) => {
              setFamilyQuery(e.currentTarget.value);
            }}>
>>>>>>> 76fda6cee45cda6e251ccbde4c858a99387ae547
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
        <Pagination>
          <PaginationButton type="button" onClick={() => handlePagination(-1)}>
            <MdChevronLeft size={42} color="#ff9000" />
          </PaginationButton>

          <PaginationButton type="button" onClick={() => handlePagination(1)}>
            <MdChevronRight size={42} color="#ff9000" />
          </PaginationButton>
        </Pagination>
        <input
          onChange={(e) => {
            setLimit(Number(e.target.value));
          }}
          value={limit}
          style={{
            marginTop: -40,
            marginLeft: 60,
            height: 30,
            width: 42,
            fontSize: 18,
            borderStyle: 'solid',
            borderColor: '#ff9000',
            color: '#ff9000',
            backgroundColor: '#ffe5b4',
          }}
        />
        {selected?.map((prod, index) => (
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
                      onChange={(e) => handleAvatarChange(prod, e)}
                    />
                  </label>

                  <span>{prod.code}</span>
                </AvatarInfo>
                <ProductDetail>
                  <strong>{prod.name}</strong>
                  <div>
                    <div>
                      <span>Família</span>
                      <span>Categoria</span>
                      <span style={{ marginLeft: -10 }}>Sub</span>
                      <span style={{ marginLeft: -30 }}>Preço</span>
                      <span style={{ marginLeft: 10 }}>Estoque</span>
                      <span>Unidade</span>
                      <span>Exceção</span>
                    </div>

                    <div>
                      <span>{prod.product_family}</span>
                      <span>{prod.category}</span>
                      <span>{prod.sub_category}</span>
                      <input
                        defaultValue={prod.sales_price}
                        onChange={(e) =>
                          handleChangedSalesPrice(e, prod, index)}
                      />
                      <input
                        defaultValue={prod.amount}
                        style={{ marginLeft: 80 }}
                        onChange={(e) => handleChangedAmount(e, prod, index)}
                      />
                      <ActiveButton
                        style={{
                          background: '#ffe5b4',
                          position: 'relative',
                          top: -74,
                          right: -190,
                        }}
                        onClick={() => {
                          handleSubmitChange(index);
                        }}
                      >
                        <FiCheckSquare color="#532000" />
                      </ActiveButton>
                      <span>{prod.unit}</span>
                      {prod.exception ? <span>Sim</span> : <span>Não</span>}
                    </div>
                  </div>
                </ProductDetail>
              </Products>
            </List>
            <ActionButtons>
              <Link
                to={{
                  pathname: '/product',
                  state: prod,
                }}
              >
                <FiEdit color="#ff8400" />
              </Link>

              <ActiveButton
                onClick={() => {
                  handleActivateProduct(prod);
                }}
              >
                {prod.is_inactive ? (
                  <FiBellOff color="#ff0000" />
                ) : (
                  <FiBell color="#009900" />
                )}
              </ActiveButton>
            </ActionButtons>
          </ProductView>
        ))}
      </Content>
    </Container>
  );
};

export default Home;
