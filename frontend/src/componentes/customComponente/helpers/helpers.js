import Swal from "sweetalert2";

export const alertNotification = ({ title, icon, text, ...props }) => {
    Swal.fire({
        title,
        text,
        icon,
        ...props,
    });
};