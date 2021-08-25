import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import api from '../services/api';

interface TimeFrames {
  id: string;
  start: string;
  end: string;
  weekday: string;
}

type TimeFrameInput = Omit<TimeFrames, 'weekday'>;

interface TimeFramesProviderProps {
  children: ReactNode;
}

interface TimeFramesContextData {
  timeFrames: TimeFrames[];
  updateTimeFrame: (timeframe: TimeFrameInput) => Promise<void>;
}

const TimeFramesContext = createContext<TimeFramesContextData>(
  {} as TimeFramesContextData,
);

const TimeFramesProvider: React.FC<TimeFramesProviderProps> = ({
  children,
}: TimeFramesProviderProps) => {
  const [timeFrames, setTimeFrames] = useState<TimeFrames[]>([]);

  useEffect(() => {
    api.get('timeframes').then((response) => setTimeFrames(response.data));
  }, []);

  async function updateTimeFrame({ id, start, end }: TimeFrameInput) {
    await api.patch(`timeframes/${id}`, {
      start,
      end,
    });

    await api.get('timeframes').then((resp) => setTimeFrames(resp.data));

    //   .then((response) => {
    //     const startUpdated = response.data.start;
    //     setTimeFrames(
    //       timeFrames.map((timeFrame) =>
    //         timeFrame.id !== id
    //           ? { ...timeFrame, start: startUpdated }
    //           : timeFrame,
    //       ),
    //     );
    //   });
  }

  return (
    <TimeFramesContext.Provider value={{ timeFrames, updateTimeFrame }}>
      {children}
    </TimeFramesContext.Provider>
  );
};

function useTimeFrames(): TimeFramesContextData {
  const context = useContext(TimeFramesContext);

  if (!context) {
    throw Error('useTimeFrame must be used whitin a TimeFrameProvider');
  }

  return context;
}

export { TimeFramesProvider, useTimeFrames };
