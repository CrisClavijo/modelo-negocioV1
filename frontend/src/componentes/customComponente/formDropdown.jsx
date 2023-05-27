import { Dropdown } from "primereact/dropdown";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { classNames } from "primereact/utils";
import { ErrorMessage } from "@hookform/error-message";

export const FormDropdown = ({
    handleChangeDropdown,
    values,
    hidden,
    ...props
}) => {
    const methods = useFormContext();
    const { control, errors } = methods;
    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
                <div>
                    <span className="p-float-label texto-drop">
                        <Dropdown
                            onChange={(e) => {
                                onChange(e.value);
                                handleChangeDropdown && handleChangeDropdown(e.value);
                            }}
                            className={classNames({
                                "p-invalid": fieldState.invalid,
                            })}
                            disabled={props.disabled}
                            value={values ? values : value || ""}
                            {...props}
                        />
                        <label
                            className={`ml-2 -mt-3 ${hidden && "hidden"}`}
                            htmlFor={props.label || ""}
                        >
                            <p className="text-md">
                                {props.label}
                                {props.isrequired === "true" ? (
                                    <span
                                        className="text-xl"
                                        style={{ color: "red", marginLeft: "5px" }}
                                    >
                                        *
                                    </span>
                                ) : (
                                    ""
                                )}
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
            getFormErrorMessage={props.label}
        />
    );
};

FormDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionLabel: PropTypes.string,
    rules: PropTypes.object,
};