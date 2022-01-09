import { Layout } from "components/shared/layout/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="m-auto">
        <p>Pracownicy</p>
        <p>Klienci</p>
        <p>Usługi</p>
      </div>
    </Layout>
  );
};

export default Home;
