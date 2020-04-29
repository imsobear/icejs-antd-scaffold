import React from 'react';
import ProLayout, {
  DefaultFooter
} from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Link } from 'ice';
import { asideMenuConfig } from './menuConfig';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};
const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

export default function BasicLayout({ children }) {
  return (
    <ProLayout
      title="icejs & antd"
      style={{
        minHeight: '100vh',
      }}
      menuDataRender={() => loopMenuItem(asideMenuConfig)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>
      }}
      footerRender={() => (
        <DefaultFooter
          links={[
            { key: 'icejs', title: 'icejs', href: 'https://github.com/ice-lab/icejs' },
            { key: 'antd', title: 'antd', href: 'https://github.com/ant-design/ant-design' },
          ]}
          copyright="by icejs & antd"
        ></DefaultFooter>
      )}
    >
      <div style={{minHeight: '60vh'}}>
        { children }
      </div>
    </ProLayout>
  );
}