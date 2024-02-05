import CustomerEmploymentDetail from "./CustomerEmploymentDetails";

const CustomerDetail = ({ customerId }) => {
  return (
    <>
      <h1>Customer Details for {customerId}</h1>
      <CustomerEmploymentDetail customerId={customerId} />
    </>
  );
};

export default CustomerDetail;
