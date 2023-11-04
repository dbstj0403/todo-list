import React from "react";

import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
	
`;
function App() {
  return (
    <>
      <GlobalStyle />
    </>
  );
}

export default App;
