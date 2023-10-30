import * as React from 'react';
import { Button, Checkbox, Modal } from 'antd';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { changeStatusTask, deleteTask } from '../store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdd } from './InputAdd';
import { selectChangedTask } from '../store';

interface ITask {
  check?: boolean;
  title: string
  id: string
}

const CheckBoxStyle = styled(Checkbox)`
  padding: 1px 3px;
  margin-right: 5px;
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
  padding: 7px 5px;
`;

const ButtonGroupStyle = styled.div`
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
  const [statusEdit, setStatusEdit] = useState(false);
  const changedTask = useSelector(selectChangedTask);

  useEffect(() => {
    if (changedTask && changedTask.id === id) {
      setStatusEdit(false);
    }
  }, [changedTask]);

  const onClickChecked = useCallback(() => {
    if (!statusEdit) {
      dispatch(changeStatusTask(id));
    }
  }, [id, dispatch, statusEdit]);

  const onClickEdit = useCallback(() => {
    setStatusEdit(true);
  }, []);

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
                {
                    !statusEdit
                      ? <><CheckBoxStyle  checked={!!check} />{title}</>
                      : <InputAdd mode={'edit'} size={'small'} defaultText={title} id={id} />
                }
            </BoxCheckLabelStyle>
            <ButtonGroupStyle>
                {
                    !statusEdit &&
                  <Button style={{ marginRight: 5 }}
                          disabled={!!check}
                          onClick={onClickEdit}
                          type={'default'}
                          size={'small'}>Edit</Button>
                }
                <Button
                    disabled={!!check}
                    onClick={onClickDelete}
                    type={'default'} danger
                    size={'small'}>Delete</Button>
            </ButtonGroupStyle>
        </BoxTaskStyle>
  );
};
