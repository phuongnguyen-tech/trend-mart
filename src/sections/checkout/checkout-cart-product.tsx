import {
  Box,
  Stack,
  Avatar,
  Divider,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from '../product/common/incrementer-button';

type Props = {
  row: ICheckoutItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }: Props) {
  const { name, size, price, colors, coverUrl, quantity, available } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar variant="rounded" alt={name} src={coverUrl} sx={{ width: 64, height: 64, mr: 2 }} />

        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.secondary' }}
        >
          size: <Label sx={{ ml: 0.5 }}>{size}</Label>
          <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
          <ColorPreview colors={colors} />
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= available}
          />

          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            available: {available}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
