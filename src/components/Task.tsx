import * as React from 'react';
import { Button, Checkbox, Modal } from 'antd';
import styled from 'styled-components';
import { useCallback } from 'react';
import { changeStatusTask, deleteTask } from '../store/taskSlice';
import { useDispatch } from 'react-redux';

interface ITask {
  check?: boolean;
  title: string
  id: string
}

const CheckBoxStyle = styled(Checkbox)`
  padding: 8px;
  transform: scale(1.3);
`;

const BoxTaskStyle = styled.div`
  position: relative;
  
  &:hover {
    background-color: #eeeeee;
  }
`;

const BoxCheckLabelStyle = styled.div`
  cursor: pointer;
  display: inline-block;
  width: calc(100% - 70px);
`;

const ButtonDeleteStyle = styled(Button)`
  display: none;
  position: absolute;
  right: 4px;
  top: 7px;
  ${BoxTaskStyle}:hover & {
    display: inline-block;
  }
`;

export const Task: React.FC<ITask> = ({ check, title, id }) => {
  const dispatch = useDispatch();

  const onClickChecked = useCallback(() => {
    dispatch(changeStatusTask(id));
  }, [id, dispatch]);

  const onClickDelete = useCallback(() => {
    Modal.confirm({
      title: 'Confirm',
      content: `Would you like delete tasks "${title}"?`,
      onOk: () => {
        dispatch(deleteTask(id));
      },
      footer: (_, { OkBtn, CancelBtn }) => (
          <>
              <CancelBtn />
              <OkBtn />
          </>
      ),
    });

  }, [id, dispatch]);

  return (
        <BoxTaskStyle>
            <BoxCheckLabelStyle onClick={onClickChecked}>
                <CheckBoxStyle  checked={!!check} />{title}
            </BoxCheckLabelStyle>
            <ButtonDeleteStyle
                disabled={!!check}
                onClick={onClickDelete}
                type={'default'} danger
                size={'small'}>Delete</ButtonDeleteStyle>
        </BoxTaskStyle>
  );
};
