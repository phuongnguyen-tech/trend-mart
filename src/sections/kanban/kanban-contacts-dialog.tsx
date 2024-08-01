import { useState, useCallback } from 'react';

import {
  Box,
  Avatar,
  Button,
  Dialog,
  ListItem,
  TextField,
  Typography,
  DialogTitle,
  ListItemText,
  DialogContent,
  InputAdornment,
  ListItemAvatar,
} from '@mui/material';

import { _contacts } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';

import { IKanbanAssignee } from 'src/types/kanban';

const ITEM_HEIGHT = 64;

type Props = {
  open: boolean;
  onClose: VoidFunction;
  assignee?: IKanbanAssignee[];
};

export default function KanbanContactsDialog({ assignee = [], open, onClose }: Props) {
  const [searchContact, setSearchContact] = useState('');

  const handleSearchContacts = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContact(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: _contacts,
    query: searchContact,
  });

  const notFound = !dataFiltered.length && !!searchContact;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
        Contacts <Typography component="span">({_contacts.length})</Typography>
      </DialogTitle>

      <Box sx={{ xs: 3, md: 5 }}>
        <TextField
          fullWidth
          value={searchContact}
          onChange={handleSearchContacts}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {notFound ? (
          <SearchNotFound query={searchContact} sx={{ mt: 3, mb: 10 }} />
        ) : (
          <Scrollbar sx={{ px: 2.5, height: ITEM_HEIGHT * 6 }}>
            {dataFiltered.map((contact) => {
              const checked = assignee.map((person) => person.name).includes(contact.name);

              return (
                <ListItem
                  key={contact.id}
                  disableGutters
                  secondaryAction={
                    <Button
                      size="small"
                      color={checked ? 'primary' : 'inherit'}
                      startIcon={
                        <Iconify
                          width={16}
                          icon={checked ? 'eva:checkmark-fill' : 'mingcute:add-line'}
                          sx={{ mr: -0.5 }}
                        />
                      }
                    >
                      {checked ? 'Assigned' : 'Assign'}
                    </Button>
                  }
                  sx={{ height: ITEM_HEIGHT }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatarUrl} />
                  </ListItemAvatar>

                  <ListItemText
                    primaryTypographyProps={{
                      typography: 'subtitle2',
                      sx: { mb: 0.25 },
                    }}
                    secondaryTypographyProps={{ typography: 'caption' }}
                    primary={contact.name}
                    secondary={contact.email}
                  />
                </ListItem>
              );
            })}
          </Scrollbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

function applyFilter({ inputData, query }: { inputData: IKanbanAssignee[]; query: string }) {
  if (query) {
    inputData = inputData.filter(
      (contact) =>
        contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
