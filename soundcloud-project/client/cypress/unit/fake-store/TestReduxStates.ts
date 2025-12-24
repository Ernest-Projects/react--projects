import { createTestStore } from "./createTestStore"
import { AuthorzationProps } from "../../../src/redux/storages/authSlice";

// scenaries
export const storeWithUser = createTestStore({
    home_page: {
        isToolsOpened: true
    },
    authorization: {
        isUserLogged: true
    },
    
    
    player: {
         currentTrack: {
         id: 3,
          audio: "Get_Away_w_CNQR.mp3",
          image: "artworks-cKp9DnXYoVNyB8Ya-5Gb30w-t500x500.jpeg",
          title: {
            name: "Get Away (w/ CNQR+)",
            subtitle: "Hugeloud"
          },
          liked: true,
          setted: true,
          playable: false
      },

    }

});

export const storeWithGuest = createTestStore({
     authorization: {
        isUserLogged: false,
        isAuthorizationWindowOpened: true,
        authorizationWindowId: 1 
    },
    home_page: {
        isToolsOpened: true
    },
     navbar: {
        activeButtonId: 0
    }
});
export const storeWithOpenedRegistrationWithId1 = createTestStore({
  authorization: {
    isAuthorizationWindowOpened: true,
    authorizationWindowId: 1,
    isUserLogged: false,
    userGoogleData: null,

    userInputData: {
      userEmail: "",
      userPassword: "",
      userDisplayName: "",
      userAge: null,
      userGender:"male",
    },

    validationErrors: {
      userEmail: null,
      userPassword: null,
      userDisplayName: null,
      userAge: null,
    },
  },
});

export const storeWithOpenedRegistrationWithId2 = createTestStore({
  authorization: {
    isAuthorizationWindowOpened: true,
    authorizationWindowId: 2,
    isUserLogged: false,
    userGoogleData: null,

    userInputData: {
      userEmail: "",
      userPassword: "",
      userDisplayName: "",
      userAge: null,
      userGender:"male",
    },

    validationErrors: {
      userEmail: null,
      userPassword: null,
      userDisplayName: null,
      userAge: null,
    },
  },
});

export const storeWithOpenedRegistrationWithId3 = createTestStore({
  authorization: {
    isAuthorizationWindowOpened: true,
    authorizationWindowId: 3,
    isUserLogged: false,
    userGoogleData: null,

    userInputData: {
      userEmail: "test@mail.com",
      userPassword: "",
      userDisplayName: "",
      userAge: null,
      userGender:"male",
    },

    validationErrors: {
      userEmail: null,
      userPassword: null,
      userDisplayName: null,
      userAge: null,
    },
  },
});


export const storeWithOpenedRegistrationWithId4 = createTestStore({
  authorization: {
    isAuthorizationWindowOpened: true,
    authorizationWindowId: 4,
    isUserLogged: false,
    userGoogleData: null,

    userInputData: {
      userEmail: "test@mail.com",
      userPassword: "pomelloWith123",
      userDisplayName: "",
      userAge: null,
      userGender:"male",
    },

    validationErrors: {
      userEmail: null,
      userPassword: null,
      userDisplayName: null,
      userAge: null,
    },
  },
});