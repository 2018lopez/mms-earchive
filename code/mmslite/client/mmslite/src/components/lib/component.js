import { TextField, Autocomplete} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const AutoCompleteFieldController = ({ name, errors, label, rules, control, options}) => {
    return <Controller
        control={control}
        defaultValue=""
        name={name}
        rules={rules}
        render={({ field }) => (
            <Autocomplete
                // {...field}
                value={field.value}
                onChange={(e, data) => field.onChange(data)}
                fullWidth
                style={{ width: "100%" }}
                disablePortal
                isOptionEqualToValue={(option, value) => value === "" ? true : option.id === value.id ? true : false }
                getOptionLabel={(option) => option.label || ""}
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField 
                    {...params} 
                    label={label} error={!!errors} helperText={errors?.message || ''}/>}
                />
        )}
    />
}