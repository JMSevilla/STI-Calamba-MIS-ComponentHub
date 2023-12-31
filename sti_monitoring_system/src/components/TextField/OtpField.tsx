import {
    Stack, TextField, TextFieldProps, StackProps, Typography
} from '@mui/material'
import type { Theme } from '@mui/material/styles';
import {
    useRef,
    RefObject,
    useEffect,
    createRef,
    useState,
    KeyboardEventHandler,
    ChangeEventHandler,
} from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { ControlledField } from '.';
import { InputLabel, FormHelperText } from './TextField';

type Props = TextFieldProps & 
    Pick<StackProps, 'gap'> & {
        digits?: number
        value?: string
        helperText?: string
        label?: string
        error?: boolean
        onChange?: (_value: string) => void
        onBlur?: () => void
        onResend?: () => void;
        resendRemainingTime?: number
        noLabel?: string
    }

const OTP_DIGIT_COUNT = 6;

const isSingleDigitNumber = (value: string) => /^\d$/.test(value)

const ResendButton: React.FC<{
    onClick?: Props['onResend']
}> = ({ onClick }) => {
    const handleClick = () => {
        onClick?.()
    }
    return (
        <Typography
        onClick={handleClick}
        alignSelf='start'
        fontSize='0.8rem'
        fontWeight='bold'
        mt={1}
        color='primary'
        sx={{
            cursor: 'pointer'
        }}
        >Send new code</Typography>
    )
}

const FormattedTime: React.FC<{seconds: number, hideCanResend: boolean}> = ({ seconds: remainingSeconds, hideCanResend = false }) => {
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = `${remainingSeconds % 60}`.padStart(2, '0')

    const formatted = `${minutes}:${seconds}`
    const canResend = remainingSeconds <= 0

    return (
        <FormHelperText sx={{ fontWeight: 560, color: (theme) => theme.palette.grey[500] }}>
            {!canResend ? `Resend Code: ${formatted}` : !hideCanResend && "Didn't receive the code?"}
        </FormHelperText>
    )
}

export const HelperText: React.FC<
    Pick<Props, 'onResend' | 'error' | 'helperText'> & { seconds : number, hideCanResend: boolean }
> = ({ onResend, seconds: remainingSeconds, helperText, error, hideCanResend = false }) => {
    const canResend = remainingSeconds <= 0;

    return (
        <Stack>
            {helperText ? (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            ): (
                <FormattedTime seconds={remainingSeconds} hideCanResend={hideCanResend} />
            )}
            {!hideCanResend && canResend && <ResendButton onClick={onResend} />}
        </Stack>
    )
}

export const OtpField: React.FC<Props & { hideCanResend: boolean }> = ({
    error,
    digits = OTP_DIGIT_COUNT,
    value,
    helperText,
    onChange,
    onResend,
    variant = 'outlined',
    label,
    gap = 1,
    resendRemainingTime = 0,
    sx,
    inputProps,
    noLabel = false,
    hideCanResend = false,
    ...rest
}) => {
    const [pin, setPin] = useState<string[]>([])
    const refs = useRef<RefObject<HTMLInputElement>[]>([])

    useEffect(() => {
        refs.current = Array(digits)
        .fill(0)
        .map(() => createRef())

        return () => {
            refs.current = []
        }
    }, [digits])
    useEffect(() => {
        const arr = value?.slice(0, digits + 1).split('') ?? [];
        const p = Array(digits)
        .fill(0)
        .map((_, i) => arr[i] ?? '')
        setPin(p)
    }, [value, digits])

    const handleChange = 
        (index: number): ChangeEventHandler<HTMLInputElement> =>
        (event) => {
            const text = event.target.value;
            const isNumberOrEmpty = isSingleDigitNumber(text) || text === '';

            if(!isNumberOrEmpty){
                return event.preventDefault()
            }

            setPin((prevPin) => {
                const newValue = prevPin.map((val, i) => {
                    if(index === i) return text;
                    return val;
                })
                onChange?.(newValue.join(''))
                return newValue
            })
        }

    const moveToNext = 
        (index: number) : KeyboardEventHandler<HTMLInputElement> => 
        (event) => {
            const { key } = event;

            if(key === 'Backspace' || key === 'Delete') {
                setPin((prevPin) => prevPin.map((v, i) => (index === i ? '' : v)));
                const prev = index - 1
                if(prev > -1 && pin[index] === ''){
                    refs.current[prev].current?.focus()
                }
                return;
            }

            if(!isSingleDigitNumber(key)) return;

            if(index < digits - 1) {
                refs.current[index + 1].current?.focus()
            }
        }
    
        return (
            <Stack sx={{ width: '100%' }}>
                <Stack direction='column' mx='auto'>
                    {label && <InputLabel error={error}>{label}</InputLabel>}
                    <Stack maxWidth={350} p={0.5} gap={gap} direction='row' justifyContent='space-around'>
                        {pin.map((v, i) => (
                            <TextField 
                                sx={{
                                    width: [40, 50],
                                    height: [50, 60],
                                    ...sx
                                }}
                                tabIndex={i + 1}
                                inputRef={refs.current[i]}
                                inputProps={{
                                    autoComplete: 'off',
                                    sx: {
                                        px: 1,
                                        py: 1.3,
                                        textAlign: 'center',
                                        fontSize: (theme: Theme) => theme.typography.h6.fontSize,
                                        ...inputProps?.sx
                                    }
                                }}
                                variant={variant}
                                key={i}
                                autoFocus={i === 0}
                                onKeyDown={moveToNext(i)}
                                onChange={handleChange(i)}
                                value={v}
                                error={error}
                                {...rest}
                            />
                        ))}
                    </Stack>
                    {!noLabel && (
                        <HelperText 
                            error={error}
                            helperText={helperText}
                            onResend={onResend}
                            seconds={resendRemainingTime}
                            hideCanResend={hideCanResend}
                        />
                    )}
                </Stack>
            </Stack>
        )
}

type ControlledOtpFieldProps<T extends FieldValues> = ControlledField<T> & Props & { hideCanResend: boolean };

export function ControlledOtpField<T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledOtpFieldProps<T>) {
    return (
        <Controller 
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error }}) => {
                return (
                    <OtpField 
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(error?.message)}
                        helperText={error?.message?.trim()}
                        {...rest}
                    />
                )
            }}
        />
    )
}