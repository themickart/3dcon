import { FC, useState } from 'react'
import Context from '../Context/ModalContext';
import { Header } from './Header/Header'
import ModalForm from './Modal/ModalForm';


const ModalItem: FC = () => {
  return (
    <Context.Provider value={useState(false)}>
      <Header />
      <ModalForm />
    </Context.Provider>
  );
}

export default ModalItem