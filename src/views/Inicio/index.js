import React from "react";
import Logo from './Logo';
import Updates from './Updates';

function Home() {
  return (
    <div className="animated fadeIn">
      <Logo width={'60%'}/>
      <Updates />
    </div>
  );
}

export default Home;