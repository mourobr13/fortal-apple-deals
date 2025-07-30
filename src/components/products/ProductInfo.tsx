
interface ProductInfoProps {
  name: string;
  category: string;
  price: number;
}

export const ProductInfo = ({ name, category, price }: ProductInfoProps) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-sm text-apple-blue mb-1 uppercase font-medium">{category}</p>
        <h3 className="font-semibold text-xl">{name}</h3>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-1">valor:</p>
        <p className="font-bold text-xl">${price}</p>
      </div>
    </div>
  );
};
