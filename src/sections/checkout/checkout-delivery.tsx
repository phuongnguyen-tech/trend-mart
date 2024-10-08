import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  Card,
  Paper,
  Stack,
  CardProps,
  CardHeader,
  PaperProps,
  ListItemText,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { ICheckoutDeliveryOption } from 'src/types/checkout';

type Props = CardProps & {
  options: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;
};

export default function CheckoutDelivery({ options, onApplyShipping, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Card {...other}>
      <CardHeader title="Delivery" />

      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <Box
            columnGap={2}
            rowGap={2.5}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ p: 3 }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.label}
                option={option}
                selected={field.value === option.value}
                onClick={() => {
                  field.onChange(option.value);
                  onApplyShipping(option.value);
                }}
              />
            ))}
          </Box>
        )}
      />
    </Card>
  );
}

type OptionItemProps = PaperProps & {
  option: ICheckoutDeliveryOption;
  selected: boolean;
};

function OptionItem({ option, selected, ...other }: OptionItemProps) {
  const { value, label, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        display: 'flex',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      {label === 'Free' && <Iconify icon="carbon:bicycle" width={32} />}
      {label === 'Standard' && <Iconify icon="carbon:delivery" width={32} />}
      {label === 'Express' && <Iconify icon="carbon:rocket" width={32} />}

      <ListItemText
        sx={{ ml: 2 }}
        primary={
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>
            <Box component="span" sx={{ typography: 'h6' }}>{`$${value}`}</Box>
          </Stack>
        }
        secondary={description}
        primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
        secondaryTypographyProps={{ typography: 'body2' }}
      />
    </Paper>
  );
}
