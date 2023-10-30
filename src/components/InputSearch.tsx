import * as React from 'react';
import { Flex, Input } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../store/taskSlice';
import { selectSearchText, selectTasks } from '../store';

export const InputSearch = () => {
  const dispatch = useDispatch();
  const listTask = useSelector(selectTasks);
  const searchText = useSelector(selectSearchText);

  const onChangeCaption = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(event.target.value));
  }, []);

  return (
      <Flex justify={'flex-end'} align={'center'}  style={{ width: '45%' }}>
          <Input style={{ width: '50%' }}
                 onChange={onChangeCaption}
                 disabled={!searchText && !listTask.length}
                 value={searchText}
                 size={'large'} allowClear placeholder={'search'}  />
      </Flex>
  );
};
