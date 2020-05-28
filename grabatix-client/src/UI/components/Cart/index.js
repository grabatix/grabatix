/** @format */

import React, { useContext } from 'react'
import { TransactionContext } from '../../../providers/TransactionProvider'
import InputGroup from '../FormComponents/InputGroup'
import FlexContainer from '../FlexContainer'
import Button from '../Button'

import './index.css'

const Cart = props => {
  const { cart, updateItemQuantity, checkout } = useContext(TransactionContext)
  const handleQuantityChange = e => {
    updateItemQuantity(e.target.id, e.target.value)
  }
  const validateInput = e => {}
  const handleQuantitySubmit = e => e.preventDefault()
  const totalCost = cart.items.reduce((amt, { subTotal }) => (amt += subTotal), 0)
  return (
    <>
      <h2>My Cart</h2>
      <FlexContainer>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(({ label, itemId, quantity, subTotal = 0.0 }) => {
              subTotal = subTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: `currency`,
                currency: `USD`,
              })
              return quantity > 0 ? (
                <tr key={`tr-${itemId}`}>
                  <td>{label}</td>
                  <td>
                    <form id={`quantity-form-${itemId}`} onSubmit={handleQuantitySubmit}>
                      <InputGroup
                        id={itemId}
                        label="Update Quantity"
                        required={true}
                        type="number"
                        min={0}
                        step={1}
                        inputMode="numeric"
                        validation="[0-9]*"
                        disabled={false}
                        handleBlur={validateInput}
                        handleInputChange={handleQuantityChange}
                        value={quantity}
                        error={``}
                      />
                    </form>
                  </td>
                  <td>{subTotal}</td>
                </tr>
              ) : null
            })}
          </tbody>
        </table>
        <FlexContainer>
          <h3>Total Amount Due: {totalCost}</h3>
        </FlexContainer>
      </FlexContainer>
    </>
  )
}

export default Cart
