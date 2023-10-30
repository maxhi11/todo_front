import * as React from 'react';
import { Button, Flex, Modal } from 'antd';
import { Title } from './Title';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFlagClear } from '../store/taskSlice';
import { selectTasks } from '../store';

const title = 'Marvelous v2.0';
const titleLink = 'Delete all task';

export const Header = () => {
  const dispatch = useDispatch();
  const listTask = useSelector(selectTasks);

  const onClickClear = useCallback(() => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Would you like delete all tasks?',
      onOk: () => {
        dispatch(setFlagClear(true));
      },
      footer: (_, { OkBtn, CancelBtn }) => (
          <>
              <CancelBtn />
              <OkBtn />
          </>
      ),
    });
  }, []);

  return (
        <Flex justify={'space-between'} align={'center'}>
            <Title size={30} title={title} />
            <Button type={'link'} size={'large'} onClick={onClickClear} disabled={!listTask.length}>
                {titleLink}
            </Button>
        </Flex>
  );
};
