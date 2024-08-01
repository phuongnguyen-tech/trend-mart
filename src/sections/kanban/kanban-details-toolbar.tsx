import { useState, useCallback } from 'react';

import { Stack, Button, Tooltip, MenuItem, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

type Props = {
  liked: boolean;
  taskName: string;
  taskStatus: string;
  onLike: VoidFunction;
  onDelete: VoidFunction;
  onCloseDetails: VoidFunction;
};

export default function KanbanDetailsToolbar({
  liked,
  onLike,
  taskName,
  onDelete,
  taskStatus,
  onCloseDetails,
}: Props) {
  const smUp = useResponsive('up', 'sm');

  const confirm = useBoolean();

  const popover = usePopover();

  const [status, setStatus] = useState(taskStatus);

  const handleChangeStatus = useCallback(
    (newValue: string) => {
      popover.onClose();
      setStatus(newValue);
    },
    [popover]
  );

  return (
    <>
      <Stack>
        {!smUp && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {['To Do', 'In Progress', 'Ready To Test', 'Done'].map((option) => (
          <MenuItem
            key={option}
            selected={status === option}
            onClick={() => {
              handleChangeStatus(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {taskName} </strong>?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
