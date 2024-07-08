import { Container } from '@mui/material';
import { useGetProduct } from 'src/api/product';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/routes/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

type Props = {
  id: string;
};

export default function ProductEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.product.root },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm />
    </Container>
  );
}
