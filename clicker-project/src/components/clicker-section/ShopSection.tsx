import { UpgradeClicker } from "../UpgradeClicker";
import { upgradeDataObject } from "../../gameData";


// type upgradeDataObjectProps = {
//     name: string;
//     description: string;
//     id: number;
//     header: string
// }

type Upgrader = {
  [key: string]: number;
};

type ShopSectionProps = {
  isVisible: boolean;
  mode: boolean;

  increaseLevels: Upgrader;
  onIncreaseLevels: React.Dispatch<React.SetStateAction<Upgrader>>;
};

export const ShopSection = ({
  isVisible,
  mode,
  onIncreaseLevels,
  increaseLevels,
}: ShopSectionProps) => {


  return (
    <>
      <section
        className={`z-10 ${
          mode === true ? `bg-[rgb(205, 205, 205)] text-black` : `bg-[rgb(20, 20, 20)] text-white`
        } ${isVisible === true ? "left-[0%]" : "left-[50%]"} duration-200 z-[10] rounded-br-xl rounded-tr-xl w-[50%] transition-[left] h-[96%] absolute my-[1%]`}
      >
        <header className="text-5xl font-mono text-center my-[4rem]">
          Upgrage clicker
        </header>
        <div
          className={`w-full h-[70%] p-[2rem] bg-[rgb(20,20,20)] gap-[2rem] grid grid-col bottom-[1rem]`}
        >
          {Object.values(upgradeDataObject).map((upgrader) => {
            return (
              <UpgradeClicker
                level={increaseLevels[upgrader.name]}

                increaseLevel={() =>  onIncreaseLevels((prev) => ({
                  ...prev,
                  [upgrader.name]: prev[upgrader.name] + 1,
                }))
            }
                key={upgrader.id}
                name={upgrader.header}
                description={upgrader.description}
                image={upgrader.image}
              ></UpgradeClicker>
            );
          })}
        </div>
      </section>
    </>
  );
};
