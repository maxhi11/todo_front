import * as React from 'react';
import { Button, Flex, Input, Modal } from 'antd';
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
    const keyCopy = listTask.filter((task) => task.caption === caption)?.[0];
    if (keyCopy) {
      Modal.confirm({
        title: 'Confirm',
        content: `Your task list includes "${caption}". Would you like add it as a copy?`,
        onOk: () => {
          dispatch(addTask(caption));
        },
        footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
        ),
      });
    } else {
      dispatch(addTask(caption));
    }
  }, [caption, dispatch]);

  return (
        <Flex justify={'space-between'} align={'center'} gap={10} style={{ width: '45%' }}>
            <Input
                style={{ width: 'calc(100% - 80px)' }}
                size={'large'}
                value={caption}
                onChange={onChangeCaption}
                placeholder={'caption'} />
            <Button onClick={onSetTask} disabled={!caption}
                size={'large'} type={'primary'}>Add</Button>
        </Flex>
  );
};
