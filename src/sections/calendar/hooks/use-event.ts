import { merge } from 'lodash';
import { useMemo } from 'react';

import { CALENDAR_COLOR_OPTIONS } from 'src/_mock';

import { ICalendarEvent, ICalendarRange } from 'src/types/calendar';

export default function useEvent(
  events: ICalendarEvent[],
  selectEventId: string,
  selectedRange: ICalendarRange,
  openForm: boolean
) {
  const currentEvent = events.find((event) => event.id === selectEventId);

  const defaultValues: ICalendarEvent = useMemo(
    () => ({
      id: '',
      title: '',
      description: '',
      color: CALENDAR_COLOR_OPTIONS[1],
      allDay: false,
      start: selectedRange ? selectedRange.start : new Date().getTime(),
      end: selectedRange ? selectedRange.end : new Date().getTime(),
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}