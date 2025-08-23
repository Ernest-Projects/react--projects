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
  bodyWidth: number;
  moneyBalance: number;


  upgradePrices: Upgrader;
  onUpgradePrices: React.Dispatch<React.SetStateAction<Upgrader>>;

  increaseLevels: Upgrader;
  onIncreaseLevels: React.Dispatch<React.SetStateAction<Upgrader>>;
};

export const ShopSection = ({
  isVisible,
  mode,
  onIncreaseLevels, increaseLevels,
  bodyWidth,
  moneyBalance,
  onUpgradePrices, upgradePrices, 
}: ShopSectionProps) => {
  return (
    <>
      <section
        className={` ${
          mode === true
            ? "bg-[rgb(240,240,240)] text-black"
            : "bg-[rgb(20,20,20)] text-white"
        } ${
          (isVisible === true) ? "left-[0%]" : "left-[-60%]"
        } duration-200 z-[10] rounded-br-xl rounded-tr-xl w-[50%] transition-[left] h-[96%] absolute my-[1%]`}
      >
        <header className="text-5xl font-mono duration-200 text-center my-[4rem]">
          Upgrage clicker
        </header>
        <div
          className={`w-full h-[70%] p-[2rem] gap-[2rem] grid grid-col bottom-[1rem]`}
        >
          {Object.values(upgradeDataObject).map((upgrader) => {
            return (
              <UpgradeClicker
              mode = {mode}
              money = {moneyBalance}
                level={increaseLevels[upgrader.name]}

                price = {upgradePrices[upgrader.name]}
                increasePrice = {() => onUpgradePrices((prev) => ({...prev, [upgrader.name]: Number(prev[upgrader.name] * upgrader.coefficient)}))}
              
                  
                increaseLevel={() =>
                  onIncreaseLevels((prev) => ({
                    ...prev,
                    [upgrader.name]: prev[upgrader.name] + 1,
                  }))
                }
                key={upgrader.id}
                name={upgrader.header}
                description={upgrader.description}
                image={upgrader.image}
                width = {bodyWidth}
              ></UpgradeClicker>
            );
          })}
        </div>
      </section>
    </>
  );
};
