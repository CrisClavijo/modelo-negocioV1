import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export const FormInputText = ({
    label,
    handleChangeText,
    values,
    ...props
}) => {
    const methods = useFormContext();
    const {
        control,
        formState: { errors },
    } = methods;

    return (
        <Controller
            name={props.name || ""}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
                <div className={props.className}>
                    <span className="p-float-label ">
                        <InputText
                            onChange={(e) => {
                                onChange(e.target.value);
                                handleChangeText && handleChangeText(e.target.value);
                            }}
                            className={classNames({
                                "p-invalid": fieldState.error,
                            })}
                            {...props}
                            {...methods.register(props.name)}
                            label={label}
                            value={values ? values : value || ""}
                            autoComplete="off"
                            maxLength={props.maxLength || ""}
                            keyfilter={props.keyfilter || ""}
                        />
                        <label
                            htmlFor={props.label || ""}
                            className={`ml-2 ${props.isrequired ? "-mt-3" : "-mt-4"} `}
                            style={{ fontFamily: "inherit" }}
                        >
                            <p className="text-md">
                                {label}
                                {props.isrequired ? (
                                    <span
                                        className="text-xl "
                                        style={{ color: "red", marginLeft: "5px" }}
                                    >
                                        *
                                    </span>
                                ) : null}
                            </p>
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

FormInputText.prototype = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
};