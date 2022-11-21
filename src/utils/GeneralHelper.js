import Head from "next/head";

class GeneralHelper {
  
  generateHead (title = "Home", description = "The next gen to-dp app") {
    
    return (
      <>
        <Head>
          <title>{`${title} | Hoopla`}</title>
          <meta property="og:title" content={`${title} | Hoopla`}/>
          <meta name="description" content={description}/>
          <meta property="og:description" content={description}/>
        </Head>
      </>
    );
  }
}

export default new GeneralHelper();