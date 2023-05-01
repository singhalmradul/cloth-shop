import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
	Footer,
	Name,
	Price,
	ProductCardContainer,
} from './product-card.styles';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const addProductToCart = () => {
		dispatch(addItemToCart(cartItems, product));
	};
	return (
		<ProductCardContainer>
			<img
				src={imageUrl}
				alt={`${name}`}
			/>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
				item={product}
			>
				add to cart
			</Button>
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
		</ProductCardContainer>
	);
};
export default ProductCard;
