import React from 'react';

function BaseLayout({ children }) {
  return (
    <>
      <h1>头部</h1>
      <p>标题</p>
      {children}
    </>
  );
}

export default BaseLayout;
