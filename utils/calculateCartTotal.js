export const calculateCartTotal = (courses) => {
	
	const total = courses.reduce((acc, el) => {
		acc += el.price * el.item_qty;
		return acc;
	}, 0);


	const totalos = courses.reduce((acc, el) => {
		acc += el.priceos * el.item_qty;
		return acc;
	}, 0);

	const totaldp = courses.reduce((acc, el) => {
		if(el.discountedprice){
		acc += el.discountedprice * el.item_qty;
		return acc;
		}
		else{
		acc += el.price * el.item_qty;
		return acc;
		}
	}, 0);

	const totaldp2 = courses.reduce((acc, el) => {
		if(el.discountedpriceos){
		acc += el.discountedpriceos * el.item_qty;
		return acc;
		}
		else{
		acc += el.priceos * el.item_qty;
		return acc;
		}
	}, 0);
	const cartTotal = ((total * 100) / 100).toFixed(0);
	const cartTotalos = ((totalos * 100) / 100).toFixed(0);
	const discTotal = ((totaldp * 100) / 100).toFixed(0);
	const discTotalos = ((totaldp2 * 100) / 100).toFixed(0);
	
	const stripeTotal = Number((total * 100).toFixed(0));
	// console.log("cctot24",totalos,discTotalos);

	return { cartTotal, stripeTotal, discTotal, cartTotalos, discTotalos };
};

export const calculateCartTotalMinus = (courses) => {
	const total = courses.reduce((acc, el) => {
		acc += el.regular_price * el.item_qty;
		return acc;
	}, 0);

	const totalos = courses.reduce((acc, el) => {
		acc += el.priceos * el.item_qty;
		return acc;
	}, 0);

	const cartTotalMinus = ((total * 100) / 100).toFixed(0);
	const cartTotalosMinus = ((totalos * 100) / 100).toFixed(0);

	return { cartTotalMinus, cartTotalosMinus};
};
