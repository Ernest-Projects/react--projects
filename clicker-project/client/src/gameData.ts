export const upgradeDataObject = {
    fist: {
        name: "doubleClickLVL",
        header: "double click",
        image: "../public/double-click-icon.png",
        id: 0,
        // multiplier coefficient for increase upgrade price
        coefficient: 1.4,
        description: "Gives a chance to double-click time! <br> The higher the level, the greater the chance."
    },
    second:  {
        name: "autoclickerLVL",
        id: 1,
        coefficient: 2.7,
        image: "../public/autoclicker-icon.png",
        header: "autoclicker",
        description: "Automatically clicks for you. <br> The higher the level, the faster it clicks."
    }
    ,third: {
        name: "profitableLVL",
        id: 2,
        coefficient: 3,
        image: "../public/profitable-icon.png",
        header: "profit click",
        description: "Increases profit from each click. <br> Each level adds X2 to earnings."
    },
    //  fourth: {
    //     id: 2,
    //     image: "../public/profitable-icon.png",
    //     header: "profitable click",
    //     description: "Increases profit from each click. Each level adds +0.1 to earnings."
    // },
}