import { useNavbarAppDispatch } from "../../redux/hooks"
import { setAllPopupWindowClose } from "../../redux/storages/NavbarStore";


export const useNavbarActions = () => {
     const dispatch = useNavbarAppDispatch();

     
     return {
         closeAllPopups: () => dispatch(setAllPopupWindowClose())
     }
}