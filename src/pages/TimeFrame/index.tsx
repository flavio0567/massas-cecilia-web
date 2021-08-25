import React, { useState } from 'react';

import Modal from 'react-modal';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTimeFrames } from '../../hooks/useTimeFrames';

import { Weekday } from '../../utils/weekday';

import { NewTransactionModal } from '../../components/NewTransactionModal';

import { Container, Header, Label } from './styles';

Modal.setAppElement('#root');

interface TimeFramesProps {
  id: string;
  start: string;
  end: string;
  weekday: string;
}

const TimeFrame: React.FC = () => {
  const { timeFrames } = useTimeFrames();

  const [weekday, setWeekday] = useState('');
  const [weekdayId, setWeekdayId] = useState('');

  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen,
  ] = React.useState(false);

  function handleOpenNewTransactionModal(id: string, today: string) {
    setWeekday(today);
    setWeekdayId(id);
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
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
        <Label style={{ marginLeft: 60, fontSize: 30 }}>
          Horário de funcionamento
          <span role="img" aria-label="order">
            ⏰
          </span>
        </Label>
      </Header>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        today={weekday}
        id={weekdayId}
      />
      <table>
        <thead>
          <tr>
            {Weekday.map((weekdayShow) => (
              <th key={weekdayShow}>{weekdayShow}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {timeFrames &&
              timeFrames.map((timeframe: TimeFramesProps) => (
                <td key={timeframe.id}>
                  {timeframe.start ? (
                    <button
                      key={timeframe.id}
                      type="button"
                      className="react-modal-selected"
                      onClick={() =>
                        handleOpenNewTransactionModal(
                          timeframe.id,
                          timeframe.weekday,
                        )}
                    >
                      {timeframe.start} - {timeframe.end}
                    </button>
                  ) : (
                    <button
                      key={timeframe.id}
                      type="button"
                      className="react-modal-selected"
                      onClick={() =>
                        handleOpenNewTransactionModal(
                          timeframe.id,
                          timeframe.weekday,
                        )}
                    >
                      <h3>Fechado</h3>
                    </button>
                  )}
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TimeFrame;
