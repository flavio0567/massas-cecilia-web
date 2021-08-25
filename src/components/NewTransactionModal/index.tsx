import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { FiPlay, FiTrash } from 'react-icons/fi';
import imgClose from '../../assets/close.svg';
import { TimeFrame } from '../../utils/timeframe';
import { useToast } from '../../hooks/toast';

import { Container, TransactionTypeContainer, SelectTime } from './styles';
import { useTimeFrames } from '../../hooks/useTimeFrames';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  today: string;
  id: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function NewTransactionModal({
  isOpen,
  onRequestClose,
  today,
  id,
}: NewTransactionModalProps) {
  const { updateTimeFrame } = useTimeFrames();

  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const { addToast } = useToast();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (timeStart > timeEnd || !timeStart || !timeEnd) {
      addToast({
        type: 'error',
        title: 'Erro ao selecionar horário',
        description:
          'Ocorreu erro ao seleconar horário, cheque suas informações e tente novamente.',
      });
    } else {
      await updateTimeFrame({ id, end: timeEnd, start: timeStart });

      setTimeStart('');
      setTimeEnd('');
      onRequestClose();
    }
  }

  async function handleCloseTimeFrame(event: FormEvent) {
    event.preventDefault();

    await updateTimeFrame({ id, end: '', start: '' });
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Selecionar horário</h2>
        <h3>{today}</h3>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={imgClose} alt="Fechar modal" />
        </button>

        <SelectTime>
          <div>
            <p>Abertura</p>
            <select
              className="react-modal-selected"
              onChange={(event) => setTimeStart(event.target.value)}
            >
              {TimeFrame.map((timeframe) => (
                <option key={timeframe.time} value={timeframe.time}>
                  {timeframe.time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Fechamento</p>
            <select
              className="react-modal-selected"
              onChange={(event) => setTimeEnd(event.target.value)}
            >
              {TimeFrame.map((timeframe) => (
                <option key={timeframe.time} value={timeframe.time}>
                  {timeframe.time}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={handleCloseTimeFrame}>
            <FiTrash size={26} />
          </button>
        </SelectTime>

        <TransactionTypeContainer>
          <button type="submit">
            <FiPlay />
            <span>Adicionar</span>
          </button>
        </TransactionTypeContainer>
      </Container>
    </Modal>
  );
}
