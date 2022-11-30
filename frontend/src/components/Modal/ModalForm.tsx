import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Input } from '@mui/material';
import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import context from '../../Context/ModalContext';

import { useAppSelector } from '../../hooks/reduxHooks';
import { addModel } from "../../store/actionCreators";
import { IProduct } from "../../types/types";


interface IModal extends IProduct {

}

const ModalForm = () => {
	const {register, handleSubmit, reset, control} = useForm<IModal>();
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
						<form>
							<div>
								<Dialog open={isShow} onClose={() => setIsShow(false)}>
									<DialogContent>
										<DialogContentText style={{marginBottom: "10px"}}>
											Создание модели
										</DialogContentText>
										{/* <Input
                                            {...register('name')}
                                            autoFocus
                                            placeholder='Название'
                                            type="text"
                                            fullWidth
                                            style={{ marginBottom: "10px" }}
                                        /> */}
										<Controller
											name='name'
											control={control}
											render={() =>
												<><Input
													{...register('name')}
													autoFocus
													placeholder='Название'
													type="text"
													fullWidth
													style={{marginBottom: "10px"}}/><Input
													{...register('category')}
													autoFocus
													placeholder='Категория'
													type="text"
													fullWidth
													style={{marginBottom: "10px"}}/></>
											}
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
										<Button type="submit"
										        onClick={handleSubmit(modalSubmitHandler)}>Добавить</Button>
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
