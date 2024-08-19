import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import ProductShopDetailsView from 'src/sections/product/view/product-shop-details-view';

import { IProductItem } from 'src/types/product';

type Props = {
  params: {
    id: string;
  };
};

// Hàm để lấy chi tiết của sản phẩm
async function getProductDetails(id: string) {
  const res = await axios.get(`${endpoints.product.details}?productId=${id}`);

  return res.data?.product as IProductItem;
}

// Hàm để tạo metadata cho sản phẩm dựa trên tên sản phẩm
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProductDetails(id);

  return {
    title: `Product: ${product.name}`,
  };
}

export default async function ProductShopDetailsPage({ params }: Props) {
  const { id } = params;
  const product: IProductItem = await getProductDetails(id);

  return <ProductShopDetailsView id={id} productData={product} />;
}

// Hàm để tạo các tham số tĩnh
export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product: { id: string; name: string }) => ({
    id: product.id,
    name: paramCase(product.name),
  }));
}
