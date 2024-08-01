import { Stack, TextField, IconButton, StackProps, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify';

type Props = StackProps & {
  onOpenNav: VoidFunction;
  onOpenMail: VoidFunction | null;
};

export default function MailHeader({ onOpenNav, onOpenMail, ...other }: Props) {
  return (
    <Stack spacing={2} direction="row" alignItems="center" sx={{ py: 1 }} {...other}>
      <Stack direction="row" alignItems="center">
        <IconButton onClick={onOpenNav}>
          <Iconify icon="solar:chat-round-dots-bold" />
        </IconButton>

        {onOpenMail && (
          <IconButton onClick={onOpenMail}>
            <Iconify icon="solar:chat-round-dots-bold" />
          </IconButton>
        )}
      </Stack>

      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
