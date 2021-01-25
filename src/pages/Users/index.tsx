import React, { useCallback, useEffect, useState } from 'react';
import { produce } from 'immer';
import api from '../../services/api';
import { Container } from './styles';

interface Users {
  id: string;
  name: string;
  is_admin: number;
  mobile: number;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('@Massas:token');

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.user);
    }
    loadUsers();
  }, [token]);

  const handleUser = useCallback(() => {
    // e.preventDefault();
    console.log('user', users);
  }, [users]);

  return (
    <Container>
      <h2>Usuarios:</h2>
      {users &&
        users.map((user: Users, index: number) => (
          <>
            <div key={user.id}>
              <ul key={user.id}>
                <li>
                  <p>{user.name}</p>
                  <p>{user.mobile}</p>
                  <p>Usuário é admin:{user.is_admin === 0 ? 'Não' : 'Sim'}</p>
                  {/* <input
                    placeholder="Nome"
                    onChange={(e) => {
                      const name = e.target.value;
                      setUsers((currentUser) =>
                        produce(currentUser, (val: Users[]) => {
                          // eslint-disable-next-line no-param-reassign
                          val[index].name = name;
                        }),
                      );
                    }}
                    value={user.name}
                  /> */}
                  {/* <input
                    placeholder="Administrador"
                    onChange={(e) => {
                      const is_admin = Number(e.target.value);
                      setUsers((currentUser) =>
                        produce(currentUser, (val: Users[]) => {
                          // eslint-disable-next-line no-param-reassign
                          val[index].is_admin = is_admin;
                        }),
                      );
                    }}
                    value={user.is_admin === 0 ? 'Não' : 'Sim'}
                  /> */}
                  <strong>Usuário é administrador: </strong>
                  <select
                    style={{ margin: 10 }}
                    value={user.is_admin === 0 ? 'Não' : 'Sim'}
                    onChange={(e) => {
                      let is_admin: number;
                      if (e.target.value === 'Não') {
                        is_admin = 1;
                      } else {
                        is_admin = 2;
                      }
                      setUsers((currentUser) =>
                        produce(currentUser, (val: Users[]) => {
                          // eslint-disable-next-line no-param-reassign
                          val[index].is_admin = is_admin;
                        }),
                      );
                    }}
                  >
                    <option value="">Select o status</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                  {/* <select
                    style={{ margin: 10 }}
                    value={user.is_admin === 0 ? 'Não' : 'Sim'}
                    onChange={(e) => {
                      let is_admin: number;
                      if (e.target.value === 'Não') {
                        is_admin = 1;
                      } else {
                        is_admin = 2;
                      }
                      setUsers((currentUser) =>
                        produce(currentUser, (val: Users[]) => {
                          // eslint-disable-next-line no-param-reassign
                          val[index].is_admin = is_admin;
                        }),
                      );
                    }}
                  >
                    <option value="is_admin"> Não </option>
                    <option value="is_admin"> Sim </option>
                  </select> */}
                  <button type="submit" onClick={() => handleUser()}>
                    Confirmar
                  </button>
                </li>
              </ul>
            </div>
          </>
        ))}
    </Container>
  );
};

export default Users;
