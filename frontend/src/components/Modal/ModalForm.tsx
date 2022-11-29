import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Input, OutlinedInput, TextField} from '@mui/material';
import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import context from '../../Context/ModalContext';
import { IProduct } from '../ProductCard/ProductCard';
import { addModel } from '../../store/actionCreators';
import { useAppSelector } from '../../hooks/reduxHooks';


interface IModal extends IProduct {

}

const ModalForm = () => {
    const { register, handleSubmit, reset, control } = useForm<IModal>();
    const [isShow, setIsShow] = useContext(context)
    const token = useAppSelector(state => state.authReducer.token);

    const modalSubmitHandler: SubmitHandler<IProduct> = (data: IProduct) => {
        addModel({
            ...data
        }, token)
        console.log(data);
        reset()
    }

    return (
        <div className='wrapper'>
            <div className='modal'>
                {isShow && (
                    <>
                        <form onSubmit={handleSubmit(modalSubmitHandler)}>
                            <Controller
                                name={'name'}
                                control={control}
                                render={() => <Input {...register('name')}/>}
                            />
                            <div>
                                <Dialog open={isShow} onClose={() => setIsShow(false)}>
                                    <DialogContent>
                                        <DialogContentText style={{ marginBottom: "10px" }}>
                                            Создание модели
                                        </DialogContentText>
                                        <Input
                                            {...register('name')}
                                            autoFocus
                                            placeholder='Название'
                                            type="text"
                                            fullWidth
                                            style={{ marginBottom: "10px" }}
                                        />
                                        {/* <Input
                                            {...register('category')}
                                            autoFocus
                                            placeholder='Категория'
                                            type="text"
                                            fullWidth
                                            style={{ marginBottom: "10px" }}
                                        />
                                        <Input
                                            {...register('price')}
                                            autoFocus
                                            placeholder='Цена'
                                            type="text"
                                            fullWidth
                                        /> */}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setIsShow(false)}>Назад</Button>
                                        <Button type="submit" >Добавить</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </form>
                    </>)}
            </div>
        </div>
    )
}

export default ModalForm

// БАГ! - при переходе /profile вылезает модальное окно