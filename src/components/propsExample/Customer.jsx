import { useState } from "react";

const Customer = () => {
  const [customerId, setCustomerId] = useState(101);
  return (
    <>
      <h1>Customer</h1>
      <CustomerDetail customerId={customerId}></CustomerDetail>
    </>
  );
};

export default Customer;
