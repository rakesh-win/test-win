// export const fetchCartFromAPI = tempuid => async dispatch => {
//   try {
//     const url = `${API}/cartitems?tempuserid=${tempuid}`
//     const response = await axios.get(url)
//     dispatch({
//       type: types.ADD_TO_CART,
//       data: response.data.cartItems || [],
//     })
//   } catch (err) {
//     console.error('Error fetching cart:', err)
//   }
// }
