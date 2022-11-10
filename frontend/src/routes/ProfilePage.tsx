import imageModel from '../images/model.png';
import imageEdit from '../images/edit-svgrepo-com 1.png';
import imageHide from '../images/hide-svgrepo-com 1.png';
import imageTrash from '../images/trash-svgrepo-com 1.png';

const ProfilePage = () => {
    return (<div className="wrapper flex">
        <div className="flex">
            <div
                className="flex border rounded-[15px] w-[950px] h-[505px] left-[256px] top-[163px] mx-[246px] mr-7"

            >
                <p className="absolute text-[32px] font-bold mx-[35px] mt-[19px]">Заработок</p>
                <div className="absolute text-[20px] w-[526px] h-[29px] top-[401px] mx-[209px]">
                    График или другое отоброжение статистики
                </div>
            </div>
            <div className="border rounded-[15px] w-[466px] h-[505px]">
                <p className="flex text-[32px] font-bold ml-[29px] mt-[18.41px]">Репутация</p>
                <div className="border rounded-[40px] w-[345px] h-[80px] ml-[60px] mt-[117px] bg-[#80E0A1] mb-[35px]">
                    <p className="text-[24px] font-style:normal-case ml-[127px] my-[26px]">99.98 %</p>
                </div>
                <div className="text-[24px] font-style: normal-case mx-[74px]">
                    <p>Отзывы за все время: 451</p>
                    <p className="pt-[44px]">Отзывы за этот месяц: 153</p>
                    <p className="pt-[44px]">Отзывы за эту неделю: 23</p>
                </div>
            </div>
            <div className="absolute w-[1436px] h-[315px] left-[243px] top-[640px]">
                <p className="text-[24px] font-bold my-[20px] mx-[20px]">Мои модели</p>
                <div className="border border-solid rounded-[15px] h-[250px]">
                    <img className="mx-[35px] my-[43px]" src={imageModel} alt="" />
                    <div className='container'>
                        <p className='absolute text-[24px] font-style: normal-case left-[500px] top-[100px] h-[29px] w-[113px]'>Название</p>
                        <p className='absolute text-[24px] font-style: normal-case left-[500px] top-[140px] h-[29px] w-[113px]'>Категория</p>
                        <p className='absolute text-[24px] font-style: normal-case left-[500px] top-[180px] h-[29px] w-[113px]'>Цена</p>
                    </div>
                    <p className='absolute text-[24px] font-style: normal-case left-[700px] top-[100px] h-[29px] w-[113px]'>Продажи</p>
                    <p className='absolute text-[24px] font-style: normal-case left-[900px] top-[100px] h-[29px] w-[113px]'>Просмотры</p>
                    <div className='container mx-[1129px] mt-[-200px]'>
                        <button>
                            <img src={imageEdit} alt="" />
                        </button>
                        <button className='p-[32px]'>
                            <img src={imageHide} alt="" />
                        </button>
                        <button>
                            <img src={imageTrash} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ProfilePage;