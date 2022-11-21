import * as React from "react";
import { Layout } from "../src/components/atoms";
import { RedirectToAppIfLoggedIn, WelcomeContainer } from "../src/components/molecules";
import GeneralHelper from "../src/utils/GeneralHelper";

const Index = () => {
  return (
    <Layout>
      <RedirectToAppIfLoggedIn/>
      {GeneralHelper.generateHead()}
      <WelcomeContainer/>
    </Layout>
  );
};

export default Index;