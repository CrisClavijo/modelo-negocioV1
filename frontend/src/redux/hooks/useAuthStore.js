import { useDispatch, useSelector } from "react-redux";
import { datosUsuario } from "../../redux/userSlice";
export const useAuthStore = () => {
    const dispatch = useDispatch();

    const startLogin = () => {
        dispatch(datosUsuario(JSON.parse(localStorage.getItem("AuthUser"))))
    }

    const onStartLogout = () => {
        dispatch(datosUsuario(null))
    }
    return {
        /**Propiedades **/
        /** Métodos **/
        startLogin,
        onStartLogout
    };

};
