import React, { Suspense } from 'react';
import ReactLoading from "react-loading";
const Main = React.lazy(() => import('../../../components/Blockades/BlockBuyer/Main'));

const BlockBuyer = () => {
  return (
    <Suspense fallback={
      <ReactLoading
      type={"spinningBubbles"}
      color={"#054785"}
      height={100}
      width={100}
      className="spinnerStyle"/>}
      ><Main />
    </Suspense>
  );
}

export default BlockBuyer;