export const ProfilePage = () => {
  return (
    <div className="w-[1436px] m-auto pt-3">
      <div className="flex justify-between">
        <div className="flex flex-col border rounded-[15px] w-[950px] h-[505px]">
          <p className="text-[32px] font-bold mx-[35px] mt-3">Заработок</p>
          <p className="text-xl text-center self-center w-[526px] h-[29px] mt-[188px]">
            График или другое отображение статистики
          </p>
        </div>
        <div className="border rounded-[15px] w-[466px] h-[505px]">
          <p className="flex text-[32px] font-bold ml-[29px] mt-3">Репутация</p>
          <button className="flex items-center justify-center rounded-[40px] w-[345px] h-[80px] m-[55px_60px_78px] bg-[#80E0A1] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <p className="text-2xl">99.98 %</p>
          </button>
          <div className="text-2xl ml-[74px]">
            <p className="mb-11">Отзывы за все время: 451</p>
            <p className="mb-11">Отзывы за этот месяц: 153</p>
            <p className="mb-14">Отзывы за эту неделю: 23</p>
          </div>
        </div>
      </div>
      <div className="w-auto h-[315px] mt-10 mb-[59px]">
        <p className="text-[32px] font-bold mb-5 ml-6">Мои модели</p>
        <div className="flex justify-between border border-solid rounded-[15px] h-[250px] pr-20">
          <img
            className="mx-[35px] my-[43px]"
            src={process.env.PUBLIC_URL + "/profile/example_model.png"}
            alt=""
          />
          <div className="flex flex-col py-[67px] justify-between">
            <p className="text-2xl ">Название</p>
            <p className="text-2xl ">Категория</p>
            <p className="text-2xl h-[29px] w-[113px]">Цена</p>
          </div>
          <p className="text-2xl p-[67px]">Продажи</p>
          <p className="text-2xl p-[67px]">Просмотры</p>
          <div className="flex justify-between w-[214px]">
            <button>
              <img src={process.env.PUBLIC_URL + "/profile/edit.svg"} alt="" />
            </button>
            <button className="p-8">
              <img src={process.env.PUBLIC_URL + "/profile/hide.svg"} alt="" />
            </button>
            <button>
              <img
                src={process.env.PUBLIC_URL + "/profile/delete.svg"}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
