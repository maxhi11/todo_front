import * as React from 'react';
import { Flex, Input } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../store/taskSlice';

export const InputSearch = () => {
  const dispatch = useDispatch();

  const onChangeCaption = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(event.target.value));
  }, []);

  return (
      <Flex justify={'flex-end'} align={'center'}  style={{ width: '45%' }}>
          <Input style={{ width: '50%' }}
                 onChange={onChangeCaption}
                 size={'large'} allowClear placeholder={'search'}  />
      </Flex>
  );
};
