import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';

export interface Props {
    value: string | null;
    name: string;
    handler: (data: string) => void;
}

export function formated_date(value) {
    if (value) {
        return moment(value).format('DD MMMM YYYY');
    } else {
        return moment().format('DD MMMM YYYY');
    }
}

const DateEl: React.FC<Props> = ({ value, name, handler }: Props) => {
    const date_input = useRef<HTMLInputElement>(null);
    const [input_value, setInput_value] = useState<string | null>(null);

    useEffect(() => {
        setInput_value(value);

        return () => {
            setInput_value(null);
        };
    }, []);

    function date_handler() {
        if (date_input.current) {
            const input_value = date_input.current.value;
            setInput_value(input_value);
            handler(input_value);
        }
    }

    return (
        <label
            htmlFor={name}
            className="text-capitalize d-block date_custom_control"
        >
            <input
                type="date"
                ref={date_input}
                onFocus={(event) => event?.target?.showPicker()}
                id={name}
                name={name}
                onChange={date_handler}
                className="form-control"
            />
            <div className="form-control preview">
                {formated_date(input_value)}
            </div>
        </label>
    );
};

export default DateEl;
