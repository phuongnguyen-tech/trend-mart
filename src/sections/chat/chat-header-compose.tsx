import { useState, useCallback } from 'react';

import {
  Box,
  Chip,
  Stack,
  alpha,
  Avatar,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

import { IChatParticipant } from 'src/types/chat';

type Props = {
  constacts: IChatParticipant[];
  onAddRecipients: (selected: IChatParticipant[]) => void;
};

export default function ChatHeaderCompose({ constacts, onAddRecipients }: Props) {
  const [searchRecipients, setSearchRecipients] = useState('');

  const handleAddRecipients = useCallback(
    (selected: IChatParticipant[]) => {
      setSearchRecipients('');
      onAddRecipients(selected);
    },
    [onAddRecipients]
  );

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'text.primary', mr: 2 }}>
        To:
      </Typography>

      <Autocomplete
        sx={{ minWidth: 320 }}
        multiple
        limitTags={3}
        popupIcon={null}
        defaultValue={[]}
        disableCloseOnSelect
        noOptionsText={<SearchNotFound query={searchRecipients} />}
        onChange={(event, newValue) => handleAddRecipients(newValue)}
        onInputChange={(event, newValue) => setSearchRecipients(newValue)}
        options={constacts}
        getOptionLabel={(recipient) => recipient.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} placeholder="+ Recipients" />}
        renderOption={(props, recipient, { selected }) => (
          <li {...props} key={recipient.id}>
            <Box
              key={recipient.id}
              sx={{
                mr: 1,
                width: 32,
                height: 32,
                overflow: 'hidden',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              <Avatar alt={recipient.name} src={recipient.avatarUrl} sx={{ width: 1, height: 1 }} />

              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 1,
                  opacity: 0,
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  transition: (theme) =>
                    theme.transitions.create(['opacity'], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(selected && {
                    opacity: 1,
                    color: 'primary.main',
                  }),
                }}
              >
                <Iconify icon="eva:checkmark-fill" />
              </Stack>
            </Box>
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((recipient, index) => (
            <Chip
              {...getTagProps({ index })}
              key={recipient.id}
              label={recipient.name}
              avatar={<Avatar alt={recipient.name} src={recipient.avatarUrl} />}
              size="small"
              variant="soft"
            />
          ))
        }
      />
    </>
  );
}
