import React from 'react'
import Link from 'next/link'

const CartItems = ({
  id,
  item_name,
  image,
  price,
  priceos,
  discountedprice,
  onRemove
}) => {
  function numberWithCommas (x) {
    if (x) {
      console.log('comma', x)
      var abc = Number(x).toLocaleString()
      console.log('abc', abc)
      return abc
    }
  }

  function numberWithCommas (x) {
    if (x) {
      if (x % 1) {
        return Number(x).toLocaleString('en-US', {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      } else {
        return Number(x).toLocaleString()
      }
    }
  }

  return (
    <tr>
      <td className='product-thumbnail'>
        <Link href='#'>
          <a>
            <img src={image} alt='item' />
          </a>
        </Link>
      </td>

      <td className='product-name'>
        <Link href='#'>
          <a>{item_name}</a>
        </Link>
      </td>

      <td className='product-price'>
        <span className='unit-amount'>INR {numberWithCommas(price)}</span>
      </td>

      <td
        className='product-price'
        style={{
          display: numberWithCommas(discountedprice) == null ? 'revert' : 'none'
        }}
      >
        <span className='unit-amount'>INR 0</span>
      </td>

      <td className='product-price'>
        <span className='unit-amount'>
          INR {numberWithCommas(price - discountedprice)}
        </span>
      </td>

      <td
        className='product-price'
        style={{ display: discountedprice > 0 ? 'revert' : 'none' }}
      >
        <span className='unit-amount'>
          INR {numberWithCommas(discountedprice)}
        </span>
      </td>

      <td
        className='product-price'
        style={{ display: discountedprice == 0 ? 'revert' : 'none' }}
      >
        <span className='unit-amount'>INR 0</span>
      </td>

      <td className='product-subtotal text'>
        <button onClick={() => onRemove(id)} className='remove'>
          <i className='bx bx-trash'></i>
        </button>
      </td>
    </tr>
  )
}

export default CartItems
