import { useNavbarAppDispatch } from "../../redux/hooks"
import { setAllPopupWindowClose } from "../../redux/storages/navbarSlice";


export const useNavbarActions = () => {
     const dispatch = useNavbarAppDispatch();

     
     return {
         closeAllPopups: () => dispatch(setAllPopupWindowClose())
     }
}