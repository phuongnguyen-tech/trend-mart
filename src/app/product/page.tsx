import axiosInstance, { endpoints } from 'src/utils/axios';

import ProductShopView from 'src/sections/product/view/product-shop-view';

export const metadata = {
  title: 'Product: Shop',
};

export default async function ShopPage() {
  const productList = await getProductList();

  return <ProductShopView productList={productList} />;
}

async function getProductList() {
  const res = await axiosInstance.get(`${endpoints.product.list}`);
  return res.data;
}
