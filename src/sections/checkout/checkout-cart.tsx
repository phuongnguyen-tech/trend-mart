import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Button, CardHeader, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import CheckoutCartProductList from './checkout-cart-product-list';

export default function CheckoutCart() {
  const checkout = useCheckoutContext();

  const empty = !checkout.items.length;

  return (
    <Grid>
      <Grid>
        <Card>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({checkout.totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />
          {empty ? (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              imgUrl="/assets/icons/empty/ic_cart.svg"
              sx={{ pt: 5, pb: 10 }}
            />
          ) : (
            <CheckoutCartProductList
              products={checkout.items}
              onDelete={checkout.onDeleteCart}
              onIncreaseQuantity={checkout.onIncreaseQuantity}
              onDecreaseQuantity={checkout.onDecreaseQuantity}
            />
          )}
        </Card>

        <Button
          component={RouterLink}
          href={paths.product.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid>
        <CheckoutSummary
          total={checkout.total}
          discount={checkout.discount}
          subTotal={checkout.subTotal}
          onApplyDiscount={checkout.onApplyDiscount}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={empty}
          onClick={checkout.onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
