import React from 'react';
import BasicRouter from "../../Router/BasicRouter";
import Layout from "../../Component/Layout/Layout";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <BasicRouter />
      </Layout>
    )
  }
}

export default App
