import {
  Box,
  Card,
  Stack,
  Avatar,
  Button,
  CardProps,
  CardHeader,
  ListItemText,
} from '@mui/material';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

type ItemProps = {
  id: string;
  title: string;
  description: string;
  postedAt: Date | number;
  coverUrl: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AnalyticsNews({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar>
        {list.map((news) => (
          <NewsItem key={news.id} news={news} />
        ))}
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

type NewsItemProps = {
  news: ItemProps;
};

function NewsItem({ news }: NewsItemProps) {
  const { coverUrl, title, description, postedAt } = news;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        py: 2,
        px: 3,
        minWidth: 640,
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Avatar
        variant="rounded"
        alt={title}
        src={coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={title}
        secondary={description}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          component: 'span',
        }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(postedAt)}
      </Box>
    </Stack>
  );
}
