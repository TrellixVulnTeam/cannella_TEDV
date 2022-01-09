import type { NextPage } from "next";
import { AddCustomerForm } from "components/addCustomerForm/AddCustomerForm";
import { Layout } from "components/shared/layout/Layout";
import { addCustomer } from "service/service";

const AddCustome: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <AddCustomerForm addCustomer={addCustomer}/>
      </div>
    </Layout>
  );
};

export default AddCustome;
