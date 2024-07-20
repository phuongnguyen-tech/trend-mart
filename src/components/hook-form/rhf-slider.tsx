import { Controller, useFormContext } from 'react-hook-form';

import { Slider, SliderProps, FormHelperText } from '@mui/material';

type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
};

export default function RHFSlider({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
