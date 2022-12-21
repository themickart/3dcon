import { FC } from 'react';
import { Sortbar } from '../components/Sortbar/Sortbar';
import { CardsList } from '../components/CardsList/CardsList';

export const Projects: FC = () => {
    return (
        <div>
            <Sortbar params={['Цена', 'Формат']} />
            <CardsList />
        </div>
    );
};
