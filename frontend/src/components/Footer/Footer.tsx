import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-black text-[#C3C3C3] h-[350px] py-12 px-[194px] mt-auto">
            <div className="flex text-xl pb-[27px] border-b-[3px] border-[#1A1A1A]">
                <div className="flex flex-col justify-around h-[147px] w-[174px]">
                    <div>
                        <Link to={'/'}>Категории</Link>
                    </div>
                    <div>
                        <Link to={'/'}>Форум</Link>
                    </div>
                    <div>
                        <Link to={'/'}>Реклама</Link>
                    </div>
                </div>
                <img
                    src={process.env.PUBLIC_URL + '/logo/footerLogo.svg'}
                    alt=""
                    className="ml-[393px] mr-[296px]"
                />
                <div className="flex flex-col justify-between h-[175px] w-[270px]">
                    <div className="ml-24 h-[95px] flex flex-col justify-around">
                        <div>
                            <Link to={'/'}>Компания</Link>
                        </div>
                        <div>
                            <Link to={'/'}>Стать партнером</Link>
                        </div>
                    </div>
                    <button className="w-full h-[50px] bg-[#242424] rounded-[10px]">
                        Свяжитесь с нами
                    </button>
                </div>
            </div>
            <div className="mt-[14px] flex justify-between">
                <div>ⓒ 2022, 3Dcon, Inc. Все права защищены.</div>
                <div className="w-[150px] flex justify-between">
                    <img
                        src={process.env.PUBLIC_URL + '/footer/socials/vk.svg'}
                        alt=""
                        width={33}
                    />
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            '/footer/socials/discord.svg'
                        }
                        alt=""
                        width={33}
                    />
                    <img
                        src={
                            process.env.PUBLIC_URL + '/footer/socials/mail.svg'
                        }
                        alt=""
                        width={33}
                    />
                </div>
            </div>
        </footer>
    );
};
