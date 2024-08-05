import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  MenuItem,
  TextField,
  IconButton,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { IInvoice } from 'src/types/invoice';

import InvoicePDF from './invoice-pdf';

type Props = {
  invoice: IInvoice;
  currentStatus: string;
  onChangeStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  statusOptions: {
    value: string;
    label: string;
  }[];
};

export default function InvoiceToolbar({
  invoice,
  currentStatus,
  statusOptions,
  onChangeStatus,
}: Props) {
  const router = useRouter();

  const view = useBoolean();

  const handleEdit = useCallback(() => {
    router.push(paths.dashboard.invoice.edit(invoice.id));
  }, [invoice.id, router]);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack direction="row" spacing={1} flexGrow={1} sx={{ width: 1 }}>
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton onClick={view.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} currentStatus={currentStatus} />}
            fileName={invoice.invoiceNumber}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:cloud-download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>

          <Tooltip title="Print">
            <IconButton>
              <Iconify icon="solar:printer-minimalistic-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send">
            <IconButton>
              <Iconify icon="iconamoon:send-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon="solar:share-bold" />
            </IconButton>
          </Tooltip>
        </Stack>

        <TextField
          fullWidth
          select
          label="Status"
          value={currentStatus}
          onChange={onChangeStatus}
          sx={{
            maxWidth: 160,
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} currentStatus={currentStatus} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
