import React, { useState, ButtonHTMLAttributes, useCallback } from 'react';
import { MdCheck } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import {
  Button,
  Agreement,
  CheckBoxAgreement,
  Checkbox,
  TextAgreement,
} from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  orders: object;
  id: string;
};

const Dialog: React.FC<ButtonProps> = ({ id }) => {
  const token = localStorage.getItem('@Massas:token');
  const { addToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<number>(2);
  const [isCheckedCard, setIsCheckedCard] = useState<boolean>(false);
  const [isCheckedCash, setIsCheckedCash] = useState<boolean>(false);
  const history = useHistory();

  const handlePaymentMethod = useCallback(async () => {
    if (isCheckedCard || isCheckedCash) {
      await api
        .patch(
          `ordersclosed/${id}`,
          { paymentMethod },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then((res) => {
          addToast({
            type: 'success',
            title: 'Finalizar Pedido!',
            description: 'Pedido finalizado com sucesso.',
          });

          history.push('/');
        })
        .catch((err) => {
          addToast({
            type: 'error',
            title: 'Finalizar Pedido!',
            description: `Erro ao finalizar o pedido: ${err.message}`,
          });
        });
    }
  }, [
    addToast,
    history,
    id,
    isCheckedCard,
    isCheckedCash,
    paymentMethod,
    token,
  ]);

  return (
    <Agreement>
      <CheckBoxAgreement
        onClick={() => {
          setIsCheckedCard(true);
          setIsCheckedCash(false);
          setPaymentMethod(1);
        }}
      >
        <Checkbox>
          {isCheckedCard ? (
            <MdCheck name="check" size={20} color="#FF9000" />
          ) : (
            <MdCheck name="check" size={20} color="#F0F0F0F0" />
          )}
        </Checkbox>
      </CheckBoxAgreement>
      <TextAgreement>Cartão</TextAgreement>
      <CheckBoxAgreement
        onClick={() => {
          setIsCheckedCard(false);
          setIsCheckedCash(true);
          setPaymentMethod(2);
        }}
      >
        <Checkbox>
          {isCheckedCash ? (
            <MdCheck size={20} color="#FF9000" />
          ) : (
            <MdCheck size={20} color="#F0F0F0F0" />
          )}
        </Checkbox>
      </CheckBoxAgreement>
      <TextAgreement>Dinheiro</TextAgreement>
      <hr />
      <Button onClick={handlePaymentMethod}>
        <p style={{ color: ' #FF9000', fontSize: 20, marginLeft: 70 }}>
          Confirmar
        </p>
      </Button>
    </Agreement>
  );
};

export default Dialog;
