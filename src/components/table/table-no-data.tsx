import { Theme, SxProps, TableRow, TableCell } from '@mui/material';

import EmptyContent from '../empty-content';

type Props = {
  notFound: boolean;
  sx?: SxProps<Theme>;
};

export default function TableNoData({ notFound, sx }: Props) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
