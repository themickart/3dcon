import { FC, useState } from 'react';
import Context from './ModelAddContext';
import { Header } from '../Header/Header';
import ModelAddForm from './ModelAddForm';

const ModelAddItem: FC = () => {
    return (
        <Context.Provider value={useState(false)}>
            <Header />
            <ModelAddForm />
        </Context.Provider>
    );
};

export default ModelAddItem;
