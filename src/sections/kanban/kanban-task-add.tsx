import React, { useMemo, useState, useCallback } from 'react';

import { Paper, InputBase, inputBaseClasses, ClickAwayListener } from '@mui/material';

import uuidv4 from 'src/utils/uuidv4';

import { _mock } from 'src/_mock';

import { IKanbanTask } from 'src/types/kanban';

type Props = {
  status: string;
  onCloseAddTask: VoidFunction;
  onAddTask: (task: IKanbanTask) => void;
};

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask, status }: Props) {
  const [name, setName] = useState('');

  const defaultTask: IKanbanTask = useMemo(
    () => ({
      id: uuidv4(),
      status,
      name: name.trim(),
      priority: 'medium',
      attachments: [],
      labels: [],
      comments: [],
      assignee: [],
      due: [null, null],
      reporter: {
        id: _mock.id(16),
        name: _mock.fullName(16),
        avatarUrl: _mock.image.avatar(16),
      },
    }),
    [name, status]
  );

  const handleKeyUpAddTask = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (name) {
          onAddTask(defaultTask);
        }
      }
    },
    [defaultTask, name, onAddTask]
  );

  const handleClickAddTask = useCallback(() => {
    if (name) {
      onAddTask(defaultTask);
    } else {
      onCloseAddTask();
    }
  }, [defaultTask, name, onAddTask, onCloseAddTask]);

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAddTask}>
      <Paper
        sx={{
          borderRadius: 1.5,
          bgcolor: 'background.default',
          boxShadow: (theme) => theme.customShadows.z1,
        }}
      >
        <InputBase
          autoFocus
          multiline
          fullWidth
          placeholder="Task name"
          value={name}
          onChange={handleChangeName}
          onKeyUp={handleKeyUpAddTask}
          sx={{
            px: 2,
            height: 56,
            [`& .${inputBaseClasses.input}`]: {
              typography: 'subtitle2',
            },
          }}
        />
      </Paper>
    </ClickAwayListener>
  );
}
