import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Table, Button, Divider, PageHeader } from 'antd';
import SearchForm from './components/SearchForm';
import TableList from './components/TableList';
// import UpdateForm from './components/UpdateForm';

function CastListPage({
  data,
  tableLoading,
  createLoading,
  getCastList,
  setFliterParams,
  createOrUpdateCast,
}) {
  const [updateModalShow, setUpdateModalShow] = useState(false);

  const handleSearch = (fliterParams) => {
    setFliterParams(fliterParams);
  };

  const handleCreateClick = () => {
    setUpdateModalShow(true);
  };

  const onPageChange = (params) => {
    getCastList(params);
  };

  useEffect(() => {
    getCastList();
  }, [getCastList]);

  return (
    <>
      <SearchForm onFinish={handleSearch} onCreate={handleCreateClick} />
      <Divider />
      <TableList data={data} loading={tableLoading} onPageChange={onPageChange} />

      {/* <UpdateForm initData={null} loading={createLoading} onSubmit={createOrUpdateCast} /> */}
    </>
  );
}

const mapStateToProps = ({ cast, loading }) => ({
  data: cast.data,
  tableLoading: Boolean(loading.effects['cast/getCastList']),
  // createLoading: Boolean(loading.effects['cast/createOrUpdateCast']),
});

const mapDispatchToProps = (dispatch) => ({
  getCastList: (payload = {}) => {
    return dispatch({
      type: 'cast/getCastList',
      payload,
    });
  },

  setFliterParams: (payload = {}) => {
    return dispatch({
      type: 'cast/setFliterParams',
      payload,
    });
  },

  // createOrUpdateCast: (payload) => {
  //   return dispatch({
  //     type: 'cast/createOrUpdateCast',
  //     payload,
  //   });
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(CastListPage);
