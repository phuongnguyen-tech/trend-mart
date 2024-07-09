import { ReactQuillProps } from 'react-quill';

import { Theme, SxProps } from '@mui/material';

export interface EditorProps extends ReactQuillProps {
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
}
