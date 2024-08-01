import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

import { IKanban, IKanbanTask, IKanbanColumn } from 'src/types/kanban';

const URL = endpoints.kanban;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function UseGetBoard() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      board: data?.board as IKanban,
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data?.board.ordered.length,
    }),
    [data?.board, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createColumn(columnData: IKanbanColumn) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const columns = {
        ...board.columns,
        [columnData.id]: columnData,
      };

      const ordered = [...board.ordered, columnData.id];

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          ordered,
        },
      };
    },
    false
  );
}

export async function updateColumn(columnId: string, columnName: string) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        [column.id]: {
          ...column,
          name: columnName,
        },
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
        },
      };
    },
    false
  );
}

export async function moveColumn(newOrdered: string[]) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const ordered = newOrdered;

      return {
        ...currentData,
        board: {
          ...board,
          ordered,
        },
      };
    },
    false
  );
}

export async function clearColumn(columnId: string) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { tasks } = board;

      const column = board.columns[columnId];

      column.taskIds.forEach((key: string) => {
        delete tasks[key];
      });

      const columns = {
        ...board.columns,
        [column.id]: {
          ...column,
          taskIds: [],
        },
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}

export async function deleteColumn(columnId: string) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { columns, tasks } = board;

      const column = columns[columnId];

      delete columns[columnId];

      column.taskIds.forEach((key: string) => {
        delete tasks[key];
      });

      const ordered = board.ordered.filter((id: string) => id !== columnId);

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
          ordered,
        },
      };
    },
    false
  );
}

export async function createTask(columnId: string, taskData: IKanbanTask) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        [columnId]: {
          ...column,
          taskIds: [...column.taskIds, taskData.id],
        },
      };

      const tasks = {
        ...board.tasks,
        [taskData.id]: taskData,
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}

export async function updateTask(taskData: IKanbanTask) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const tasks = {
        ...board.tasks,
        [taskData.id]: taskData,
      };

      return {
        ...currentData,
        board: {
          ...board,
          tasks,
        },
      };
    },
    false
  );
}

export async function moveTask(updateColumns: Record<string, IKanbanColumn>) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const columns = updateColumns;

      return {
        ...currentData,
        board: {
          ...board,
          columns,
        },
      };
    },
    false
  );
}

export async function deleteTask(columnId: string, taskId: string) {
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { tasks } = board;

      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        [column.id]: {
          ...column,
          taskIds: column.taskIds.filter((id: string) => id !== taskId),
        },
      };

      delete tasks[taskId];

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}
