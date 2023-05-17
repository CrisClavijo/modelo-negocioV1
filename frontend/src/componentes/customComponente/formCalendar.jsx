import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import PropTypes from "prop-types";

export const FormCalendar = ({ handleChangeCalendar, ...props }) => {
    const methods = useFormContext();

    const monthTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) => e.onChange(event.originalEvent, event.value)}
                style={{ lineHeight: 2 }}
                className="mr-2"
            />
        );
    };

    const yearTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) => e.onChange(event.originalEvent, event.value)}
                style={{ lineHeight: 2 }}
                className="mr-2"
            />
        );
    };
    addLocale("es", {
        firstDayOfWeek: 1,
        dayNames: [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
        ],
        dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        monthNamesShort: [
            "ene",
            "feb",
            "mar",
            "abr",
            "may",
            "jun",
            "jul",
            "ago",
            "sep",
            "oct",
            "nov",
            "dic",
        ],
        today: "Hoy",
        clear: "Limpiar",
    });
    const { control, errors } = methods;
    return (
        <Controller
            name={props.name || ""}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
                <div className={props.className}>
                    <span className="p-float-label ">
                        <Calendar
                            {...props}
                            value={value || props.value}
                            onChange={(e) => {
                                onChange(e.value);
                                handleChangeCalendar && handleChangeCalendar(e.value);
                            }}
                            className={`w-full ${classNames({
                                "p-invalid": fieldState.invalid,
                            })}`}
                            locale="es"
                            monthNavigatorTemplate={monthTemplate}
                            yearNavigatorTemplate={yearTemplate}
                            showIcon
                            view="month"
                            dateFormat="mm/yy"
                        />
                        <label
                            htmlFor={props.label || ""}
                            className="ml-2"
                            style={{ fontFamily: "inherit" }}
                        >
                            {props.label}
                            {props.isrequired ? (
                                <span
                                    className="text-xl "
                                    style={{ color: "red", marginLeft: "5px" }}
                                >
                                    *
                                </span>
                            ) : ''}
                        </label>
                    </span>
                    <ErrorMessage
                        errors={errors}
                        name={props.name}
                        render={({ message }) => (
                            <small className="p-error">{message}</small>
                        )}
                    />
                </div>
            )}
            rules={props.rules}
        />
    );
};

FormCalendar.propTypes = {
    name: PropTypes.string.isRequired,
    showIcon: PropTypes.bool,
    monthNavigator: PropTypes.bool,
    yearNavigator: PropTypes.bool,
    yearRange: PropTypes.string,
    showButtonBar: PropTypes.bool,
};