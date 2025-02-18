import Image from "next/image";

const Sidebar = ({
  switchTo1,
  switchTo2,
  switchTo3,
  header,
  text1,
  text2,
  text3,
  iconSrc1,
  iconSrc2,
  iconSrc3,
}: {
  header: string;
  text1: string;
  text2: string;
  text3?: string;
  iconSrc1?: string;
  iconSrc2?: string;
  iconSrc3?: string;
  switchTo1: () => void;
  switchTo2: () => void;
  switchTo3?: () => void;
}) => {
  return (
    <div className="  invisible max-w-0 bg-ci-light-gray md:visible md:w-1/3 md:max-w-screen-2xl lg:w-2/5 xl:w-1/4 ">
      <div className="large-text my-3 flex w-full justify-center p-4 font-bold">
        {header}
      </div>
      <div
        className="flex h-14 w-full cursor-pointer flex-row justify-center space-x-2 p-4 hover:bg-ci-gray"
        onClick={switchTo1}
      >
        {iconSrc1 ? (
          <div className="mx-0 flex items-center xl:mx-3">
            (
            <Image src={iconSrc1} alt={"first icon"} width={18} height={18} />)
          </div>
        ) : null}
        <div className="medium-text flex  w-full  items-center justify-center">
          {text1}
        </div>
      </div>

      <div
        className="flex h-14 w-full cursor-pointer flex-row space-x-2 p-4 hover:bg-ci-gray"
        onClick={switchTo2}
      >
        {iconSrc2 ? (
          <div className="mx-0 flex items-center xl:mx-3 ">
            <Image src={iconSrc2} alt={"second icon"} width={18} height={18} />
          </div>
        ) : null}
        <div className="medium-text flex w-full items-center justify-center">
          {text2}
        </div>
      </div>
      {text3 ? (
        <div
          className="flex h-14 w-full cursor-pointer flex-row space-x-2 p-4 hover:bg-ci-gray"
          onClick={switchTo3}
        >
          {iconSrc3 ? (
            <div className="mx-0 flex items-center xl:mx-3 ">
              (
              <Image src={iconSrc3} alt={"third icon"} width={18} height={18} />
              )
            </div>
          ) : null}

          <div className="medium-text flex  w-full items-center justify-center">
            {text3}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Sidebar;
