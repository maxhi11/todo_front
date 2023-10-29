import * as React from 'react';
import { Button, Flex, Input } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { selectTasks } from '../store';

export const InputAdd = () => {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState('');
  const listTask = useSelector(selectTasks);

  useEffect(() => {
    setCaption('');
  }, [listTask]);

  const onChangeCaption = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  }, []);

  const onSetTask = useCallback(async () => {
    dispatch(addTask(caption));
  }, [caption, dispatch]);

  return (
        <Flex justify={'space-between'} align={'center'} gap={10} style={{ width: '45%' }}>
            <Input
                style={{ width: 'calc(100% - 80px)' }}
                size={'large'}
                value={caption}
                onChange={onChangeCaption}
                placeholder={'caption'} />
            <Button onClick={onSetTask}
                size={'large'} type={'primary'}>Add</Button>
        </Flex>
  );
};
