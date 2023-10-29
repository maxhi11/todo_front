import * as React from 'react';
import { Divider, Empty, Spin } from 'antd';
import { Task } from './Task';
import styled from 'styled-components';
import { Title } from './Title';
import { useSelector } from 'react-redux';
import { selectPreloader, selectTasks } from '../store';

interface IListTask {
  check?: boolean;
  title: string
}

const BoxWrapperStyle = styled.div`
  width: 45%;
`;

const BoxScrollStyle = styled.div`
  height: 390px;
  max-height: 390px;
  overflow: auto;
`;

const DividerStyle = styled(Divider)`
  border-block-color: #7f7f7f;
  margin: 15px 0;
`;

const limitRecord = 10;
export const ListTask: React.FC<IListTask> = ({ check, title }) => {
  const listTask = useSelector(selectTasks);
  const preloader = useSelector(selectPreloader);

  const listFilter = listTask
    .filter((task) => task.checked === !!check)
    .sort((task1, task2) => task1.caption.localeCompare(task2.caption));

  return (
        <BoxWrapperStyle>
            <Spin spinning={preloader} tip="Loading...">
                <Title size={20} title={title} />
                <DividerStyle/>
                <BoxScrollStyle>
                    {
                        listFilter.length
                          ? listFilter
                            .map((task, index) =>
                              !check || index < limitRecord
                                ? <Task key={task.id} check={check} title={task.caption} id={task.id} />
                                : null,
                            )
                          : <Empty description={<Title size={14} title={'No task'} />} />
                    }
                </BoxScrollStyle>
            </Spin>
        </BoxWrapperStyle>
  );
};
