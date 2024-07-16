import {
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

interface Props extends DialogProps {
  onClose: VoidFunction;
}

export default function PaymentNewCardDialog({ onClose, ...other }: Props) {
  const popover = usePopover();

  return (
    <>
      <Dialog maxWidth="sm" onClose={onClose} {...other}>
        <DialogTitle>New Card</DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <Stack spacing={2.5}>
            <TextField
              autoFocus
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Card Holder"
              placeholder="JOHN DOE"
              InputLabelProps={{ shrink: true }}
            />

            <Stack spacing={2} direction="row">
              <TextField
                label="Expiration Date"
                placeholder="MM/YY"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="CVV/CVC"
                placeholder="***"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end" onClick={popover.onOpen}>
                        <Iconify icon="eva:info-outline" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
              Your transaction is secured with SSL encryption
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={onClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ maxWidth: 200, typography: 'body2', textAlign: 'center' }}
      >
        Three-digit number on the back of your VISA card
      </CustomPopover>
    </>
  );
}
