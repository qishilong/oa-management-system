import React from 'react';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import { selectLayout } from 'utils/selectLayout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Layout({ children, history, location }) {
  console.log(location);
  console.log(children);
  const layoutMap = { BaseLayout, LoginLayout };
  const Container = layoutMap[selectLayout(location.pathname)];
  return <Container>{children}</Container>;
}
export default Layout;
