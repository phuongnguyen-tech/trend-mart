import FullCalendar from '@fullcalendar/react';
import { useCallback, useRef, useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { ICalendarRange, ICalendarView } from 'src/types/calendar';

export default function useCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  const calendarEl = calendarRef.current;

  const smUp = useResponsive('up', 'sm');

  const [date, setDate] = useState(new Date());

  const [openForm, setOpenForm] = useState(false);

  const [selectEventId, setSelectEventId] = useState('');

  const [selectedRange, setSelectedRange] = useState<ICalendarRange>(null);

  const [view, setView] = useState<ICalendarView>(smUp ? 'dayGridMonth' : 'listWeek');

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false)
    setSelectedRange(null)
    setSelectEventId('')
  }, [])

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      const newView = smUp ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView)
      setView(newView)
    }
  },[calendarEl, smUp])

  const onChangeView = useCallback(
    (newView: ICalendarView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi()

        calendarApi.changeView(newView)
        setView(newView)
      }
    },[calendarEl]
  )

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  
}
