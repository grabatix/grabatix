/** @format */

import React, { useContext } from 'react'
import { Link } from '@reach/router'
import { TransactionContext } from '../../../providers/TransactionProvider'
import { AuthContext } from '../../../providers/AuthProvider'
import InputGroup from '../FormComponents/InputGroup'
import FlexContainer from '../FlexContainer'
import SubmitButton from '../FormComponents/SubmitButton'
import paths from '../../../config/paths'

import './index.css'

const Cart = props => {
  const { cart, updateItemQuantity, checkout } = useContext(TransactionContext)
  const { isLoggedIn } = useContext(AuthContext)
  const handleQuantityChange = e => {
    updateItemQuantity(e.target.id, e.target.value)
  }
  const validateInput = e => {}
  const handleQuantitySubmit = e => e.preventDefault()
  const formatCurrency = num =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: `currency`,
      currency: `USD`,
    })
  const totalCost = formatCurrency(cart.items.reduce((amt, { subTotal }) => (amt += subTotal), 0))
  const {
    consumerPaths: { loginPath, signupPath },
  } = paths
  return (
    <>
      <h2 class="my-3">My Cart</h2>
      <FlexContainer flexClasses="row justify-between align-start">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(({ label, itemId, quantity, subTotal = 0.0 }) => {
              subTotal = formatCurrency(subTotal)
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
        <div className="cart-purchase-block p-3">
          <FlexContainer flexClasses="column justify-center align-content-start">
            <FlexContainer
              utilityClasses="bold mb-3"
              flexClasses="row justify-between align-center"
            >
              <div>Total Amount Due:</div>
              <div>{totalCost}</div>
            </FlexContainer>
            {totalCost === `$0.00` && <SubmitButton handleClick={checkout} value="Checkout" />}
            {!isLoggedIn && (
              <div className="mt-3">
                Please <Link to={loginPath}>Log-In</Link> or <Link to={signupPath}>Sign-Up</Link>
                {` `}
                for the best experience in storing and retrieving your transactions.
              </div>
            )}
          </FlexContainer>
        </div>
      </FlexContainer>
    </>
  )
}

export default Cart
