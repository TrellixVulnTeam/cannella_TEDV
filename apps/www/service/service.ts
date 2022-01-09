import { AddCustomerFormInputs } from "components/addCustomerForm/AddCustomerForm";

export const addCustomer = ({
  firstName,
}: AddCustomerFormInputs): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(firstName);
      resolve();
    }, 500);
  });
};
