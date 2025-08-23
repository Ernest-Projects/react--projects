export const upgradeDataObject = {
    fist: {
        name: "doubleClickLVL",
        header: "double click",
        image: "../public/double-click-icon.png",
        id: 0,
        // multiplier coefficient for increase upgrade price
        coefficient: 2,
        description: "Gives a chance to double-click! <br> The higher the level, the greater the chance."
    },
    second:  {
        name: "autoclickerLVL",
        id: 1,
        // multiplier coefficiet for increase upgrade price
        coefficient: 5,
        image: "../public/autoclicker-icon.png",
        header: "autoclicker",
        description: "Automatically clicks for you. <br> The higher the level, the faster it clicks."
    }
    ,third: {
        name: "profitableLVL",
        id: 2,
        coefficient: 4,
        image: "../public/profitable-icon.png",
        header: "profit click",
        description: "Increases profit from each click. <br> Each level adds +0.1 to earnings."
    },
    //  fourth: {
    //     id: 2,
    //     image: "../public/profitable-icon.png",
    //     header: "profitable click",
    //     description: "Increases profit from each click. Each level adds +0.1 to earnings."
    // },
}