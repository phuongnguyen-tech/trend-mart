import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import ProductShopDetailsView from 'src/sections/product/view/product-shop-details-view';

import { IProductItem } from 'src/types/product';

type Props = {
  params: {
    name: string;
  };
};

// Hàm để lấy chi tiết của sản phẩm
async function getProductByName(name: string) {
  const res = await axios.get(`${endpoints.product.details}?name=${name}`);

  return res.data?.product as IProductItem;
}

// Hàm để tạo metadata cho sản phẩm dựa trên tên sản phẩm
export async function generateMetadata({ params }: { params: { name: string } }) {
  const { name } = params;
  const product = await getProductByName(name);

  return {
    title: `Product: ${product.name}`,
    description: product.description || 'No description available for this product.',
    metadataBase: new URL(`https://template-shopping.vercel.app/product/${product.id}`),
    openGraph: {
      title: `Product: ${product.name}`,
      description: product.description || 'No description available for this product.',
      url: `https://template-shopping.vercel.app/product/${product.id}`,
      images: [
        {
          url:
            product.coverUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsibd6v7lZ6qjvFkWnPj2mCRcxvqz2qaqtRQ&s',
          width: 800,
          height: 600,
          alt: product.name || 'Default Product Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourtwitterhandle',
      title: `Product: ${product.name}`,
      description: product.description || 'No description available for this product.',
      image:
        product.coverUrl ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsibd6v7lZ6qjvFkWnPj2mCRcxvqz2qaqtRQ&s',
    },
    robots: {
      index: true,
      follow: true,
    },
    canonical: `https://template-shopping.vercel.app/product/${product.id}`,
  };
}

export default async function ProductShopDetailsPage({ params }: Props) {
  const { name } = params;
  const product: IProductItem = await getProductByName(name);

  return <ProductShopDetailsView name={name} productData={product} />;
}

// Hàm để tạo các tham số tĩnh
export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product: { id: string; name: string }) => ({
    id: product.id,
    name: paramCase(product.name),
  }));
}
