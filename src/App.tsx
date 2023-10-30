import React from 'react';
import styled from 'styled-components';
import { Flex } from 'antd';
import { InputAdd } from './components/InputAdd';
import { InputSearch } from './components/InputSearch';
import { ListTask } from './components/ListTask';
import { Header } from './components/Header';
import { Controller } from './components/Controller';

const BoxStyle = styled.div`
  margin: 40px auto;
  width: 60%;
  background-color: #f5f4f4;
  border-radius: 6px;
  border: 1px solid #7f7f7f;
  padding: 20px;
`;

function App() {
  return (
      <BoxStyle>
          <Header />
          <Flex justify={'space-between'} align={'center'} style={{ padding: '20px 0' }}>
              <InputAdd mode={'add'} size={'large'} defaultText={''} />
              <InputSearch />
          </Flex>
          <Flex justify={'space-between'} align={'flex-start'}>
              <ListTask title={'To Do'} />
              <ListTask title={'Done'} check={true} />
          </Flex>
          <Controller />
      </BoxStyle>
  );
}

export default App;
