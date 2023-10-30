import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChangedTask, selectDeletedTask, selectFlagClear, selectSearchText } from '../store';
import axios from 'axios';
import { URL_API_DELETE, URL_API_SAVE, URL_API_TASKS } from '../const';
import { deleteTaskFromList, loadListTask, reset, setFlagClear, setPreloader, updateListTask } from '../store/taskSlice';
import { message, Modal } from 'antd';
import { TaskType } from '../type';

interface IController {
  type?: number;
}

const config = {
  title: 'Error!',
  content: (
      <>
        <p>Houston, we have a problem.</p>
        <p>We lost connection to our server!</p>
        <p>Let's try again or reload page :)</p>
      </>
  ),
};

export const Controller: React.FC<IController> = () => {
  const dispatch = useDispatch();
  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();

  const changedTask = useSelector(selectChangedTask);
  const deletedTask = useSelector(selectDeletedTask);
  const flagClear = useSelector(selectFlagClear);
  const searchText = useSelector(selectSearchText);

  const wrapperFunction = useCallback(async (func: () => Promise<void>) => {
    try {
      dispatch(setPreloader(true));
      await func();
    } catch (e) {
      console.log(e);
      if (flagClear) {
        dispatch(setFlagClear(false));
      }
      modal.error(config);
    } finally {
      dispatch(setPreloader(false));
    }
  }, [flagClear]);

  useEffect(() => {
    (async () => {
      await wrapperFunction(async () => {
        const queryParams = `search_text=${searchText}`;
        const listTask = (await axios.get<TaskType[]>(`${URL_API_TASKS}?${queryParams}`)).data;

        if (Array.isArray(listTask)) {
          dispatch(loadListTask(listTask));
          if (searchText && !listTask.length) {
            modal.warning({
              title: 'Searching message ...',
              content: (
                  <>
                    <p>Sorry, but we can't find any task for your request "{searchText}"</p>
                    <p>Please change search text, and maybe next request will be successful :)</p>
                  </>
              ),
            });
          }
          //messageApi.success('Data loaded successfully!');
        }
      });
    })();
  }, [searchText]);

  useEffect(() => {
    (async () => {
      if (flagClear) {
        await wrapperFunction(async () => {
          const apiResult = await axios.post<boolean>(`${URL_API_DELETE}/clearAll`);
          if (apiResult) {
            dispatch(reset());
            messageApi.success('Data deleted successfully!');
          }
        });
      }
    })();
  }, [flagClear]);

  useEffect(() => {
    if (!changedTask) {
      return;
    }

    (async () => {
      await wrapperFunction(async () => {
        const apiResult = await axios.post<boolean>(`${URL_API_SAVE}`, changedTask);

        if (apiResult) {
          dispatch(updateListTask());
          messageApi.success('Changes saved successfully!');
        }
      });
    })();
  }, [changedTask]);

  useEffect(() => {
    if (!deletedTask) {
      return;
    }

    (async () => {
      await wrapperFunction(async () => {
        const apiResult = await axios.post<boolean>(`${URL_API_DELETE}/${deletedTask.id}`);

        if (apiResult) {
          dispatch(deleteTaskFromList(deletedTask.id));
          messageApi.success(`Task "${deletedTask.caption}" deleted successfully!`);
        }
      });
    })();
  }, [deletedTask]);

  return (
      <>
        {contextMessageHolder}
        {contextHolder}
      </>
  );
};
