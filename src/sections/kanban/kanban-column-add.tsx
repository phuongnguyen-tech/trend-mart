import { useState, useCallback } from 'react';

import { Paper, Button, TextField, inputBaseClasses, ClickAwayListener } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import uuidv4 from 'src/utils/uuidv4';

import { createColumn } from 'src/api/kanban';

import Iconify from 'src/components/iconify';

export default function KanbanColumnAdd() {
  const [columnName, setColumnName] = useState('');

  const openAddColumn = useBoolean();

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  }, []);

  const handleCreateColumn = useCallback(async () => {
    try {
      if (columnName) {
        createColumn({
          id: uuidv4(),
          name: columnName,
          taskIds: [],
        });
        setColumnName('');
      }
      openAddColumn.onFalse();
    } catch (error) {
      console.error(error);
    }
  }, [columnName, openAddColumn]);

  const handleKeyUpCreateColumn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCreateColumn();
      }
    },
    [handleCreateColumn]
  );

  return (
    <Paper>
      {openAddColumn.value ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={columnName}
            onChange={handleChangeName}
            onKeyUp={handleKeyUpCreateColumn}
            sx={{
              [`& .${inputBaseClasses.input}`]: {
                typography: 'h6',
              },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
          onClick={openAddColumn.onTrue}
        >
          Add Section
        </Button>
      )}
    </Paper>
  );
}
