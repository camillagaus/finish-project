import React from "react";
import { useSelector } from "react-redux";

export const Checkout = () => {
  const accessToken = useSelector((state) => state.user.login.accessToken)
  return (
    <>
    {accessToken ? <p>Du har tillträde till sidan </p> : <p>tyvärr har du inte tillgång till sidan</p>}
    </>
  )
}