import { Controller, useFormContext } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { ErrorMessage } from "@hookform/error-message";
import PropTypes from "prop-types";
import { classNames } from "primereact/utils";

export const FormInputTextarea = ({
    label,
    handleChangeText,
    values,
    ...props
}) => {
    const methods = useFormContext();
    const { control, errors } = methods;

    return (
        <>
            <Controller
                name={props.name}
                control={control}
                render={({ field, fieldState }) => (
                    <div>
                        <span className="p-float-label ">
                            <InputTextarea
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    handleChangeText && handleChangeText(e);
                                }}
                                rows={5}
                                className={`w-full ${classNames({
                                    "p-invalid": fieldState.invalid,
                                })}`}
                                autoResize
                                value={values ? values : field.value || ""}
                                {...props}
                            //disabled={captura}
                            />
                            <label
                                htmlFor={props.label || ""}
                                className="ml-2"
                                style={{ fontFamily: "inherit" }}
                            >
                                {label}
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
        </>
    );
};

FormInputTextarea.prototype = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    // className: PropTypes.string,
};