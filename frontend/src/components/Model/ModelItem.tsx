import { useState, FC } from 'react';
import { IProduct } from '../../types/types';
import { ModelCard } from './ModelCard';
import ModelContext from './ModelContext';
import { ModelInfoEdit } from './ModelInfoEdit';

export const ModelItem: FC<Omit<IProduct, 'author' | 'gallery' | 'info'>> = ({
    category,
    coverUrl,
    description,
    viewsCount,
    name,
    price,
    id,
}) => {
    return (
        <ModelContext.Provider value={useState(false)}>
            <ModelCard
                category={category}
                coverUrl={coverUrl}
                description={description}
                name={name}
                price={price}
                viewsCount={viewsCount}
                id={id!}
            />
            <ModelInfoEdit
                category={category}
                id={id!}
                name={name}
                price={price}
            />
        </ModelContext.Provider>
    );
};
