import * as React from 'react';
import { Button, Flex, Input, Modal } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, changeCaptionTask } from '../store/taskSlice';
import { selectTasks } from '../store';
// eslint-disable-next-line import/named
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface IInputAdd {
  mode: 'add' | 'edit';
  size: SizeType,
  defaultText: string,
  id?: string
}

export const InputAdd: React.FC<IInputAdd> = ({ size, defaultText, mode, id }) => {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState(defaultText);
  const listTask = useSelector(selectTasks);

  useEffect(() => {
    if (mode === 'add') {
      setCaption('');
    }
  }, [listTask]);

  const onChangeCaption = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  }, []);

  const onSetTask = useCallback(async () => {
    const keyCopy = listTask.filter((task) => task.caption === caption && (!id || task.id !== id))?.[0];

    const setTask = () => {
      if (mode === 'add') {
        dispatch(addTask(caption));
      } else {
        dispatch(changeCaptionTask({ id: id!, caption }));
      }
    };

    if (keyCopy) {
      Modal.confirm({
        title: 'Confirm',
        content: `Your task list includes "${caption}". Would you like add it as a copy?`,
        onOk: () => {
          setTask();
        },
        footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
        ),
      });
    } else {
      setTask();
    }
  }, [caption, dispatch, mode, id]);

  return (
        <Flex justify={'space-between'} align={'center'} gap={10} style={{ width: mode === 'add' ? '45%' : '85%' }}>
            <Input
                style={{ width: `calc(100% - ${mode === 'add' ? 80 : 40 }px)`, marginLeft: mode === 'add' ? 0 : 19 }}
                size={size}
                value={caption}
                onChange={onChangeCaption}
                placeholder={'caption'} />
            <Button onClick={onSetTask} disabled={!caption}
                size={size} type={'primary'}>{mode === 'add' ? 'Add' : 'Save'}</Button>
        </Flex>
  );
};
