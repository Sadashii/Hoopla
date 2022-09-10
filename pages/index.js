import * as React from "react";
import { Layout } from "../src/components/atoms";
import { RedirectToAppIfLoggedIn, WelcomeContainer } from "../src/components/molecules";

const Index = () => {
  return (
    <Layout>
      <RedirectToAppIfLoggedIn />
      <WelcomeContainer/>
    </Layout>
  );
};

export default Index;