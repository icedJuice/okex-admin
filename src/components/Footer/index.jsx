// import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const currentYear = new Date().getFullYear();
  return <p style={{ textAlign: 'center', color: 'gray' }}>OKEX Admin {currentYear}</p>;
};
