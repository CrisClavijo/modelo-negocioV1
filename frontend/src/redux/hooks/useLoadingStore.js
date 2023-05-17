import { useDispatch, useSelector } from "react-redux";
import { startLoader } from "../../redux/loadingSlice";
export const useLoadingStore = () => {
    const dispatch = useDispatch();

    const {
        loading
    } = useSelector((state) => state.loading);

    const startLoading = (data) => {
        dispatch(startLoader(data))
    }

    
    return {
        /**Propiedades **/
        loading,
        /** Métodos **/
        startLoading
    };

};
