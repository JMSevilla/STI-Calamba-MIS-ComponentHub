import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import {
    Container,
    Typography,
    Grid,
    FormGroup,
    FormControlLabel,
  Checkbox,
} from '@mui/material'
import { ControlledTextField } from "../../TextField/TextField";
import {zodResolver} from '@hookform/resolvers/zod'
import BaseCard from "../../Card/Card";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { useAtom } from "jotai";
import { AccountSetupAtom } from "../../../core/atoms/account-setup-atom";
import { usePreviousValue } from "../../../core/hooks/usePreviousValue";
import { ControlledCheckbox } from "../../Checkbox/Checkbox";
import { PasswordStrengthMeter } from "../../PasswordStrengthMeter/PasswordStrengthMeter";
import { accountSetupSubSchema, AccountSetupCreation } from "../../../core/schema/account-setup";
import { ControlledMobileNumberField } from "../../TextField/MobileNumberField";
import LoadBackdrop from "../../Backdrop/Backdrop";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToastMessage } from "../../../core/context/ToastContext";
import { useMutation } from 'react-query'
import { AccountSetupProps } from "../../../core/types";
import { useApiCallback } from "../../../core/hooks/useApi";
import { Path } from "../../../router/path";

const options = {
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
};
zxcvbnOptions.setOptions(options);

const AccountSetupForm = () => {
    const {
        control, watch, resetField, trigger, getValues
    } = useFormContext<AccountSetupCreation>()
    const values = getValues()
    const hasNoMiddleName = watch('hasNoMiddleName')
    const streamPassword = watch('password')
    const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName)
    useEffect(() => {
        resetField('middleName')
        if(hasNoMiddleNamePrevValue){
            trigger('middleName')
        }
    }, [
        hasNoMiddleName,
        hasNoMiddleNamePrevValue,
        resetField,
        trigger
    ])
    useEffect(() => {}, [streamPassword])
    const result = zxcvbn(values.password == undefined ? "" : values.password);
    return (
        <>
            <Grid style={{justifyContent: 'center', marginTop : '10px'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
            <Grid item xs={4}>
                <ControlledTextField 
                    control={control}
                    required
                    shouldUnregister
                    name='firstName'
                    label='Firstname'
                />
            </Grid>
            <Grid item xs={4}>
                <ControlledTextField
                    control={control}
                    required={!hasNoMiddleName}
                    shouldUnregister
                    name="middleName"
                    label="Middlename"
                    disabled={hasNoMiddleName}
                />
                <ControlledCheckbox
                    control={control}
                    name="hasNoMiddleName"
                    label="I do not have a middlename"
                />
            </Grid>
            <Grid item xs={4}>
                <ControlledTextField
                    control={control}
                    required
                    shouldUnregister
                    name="lastName"
                    label="Lastname"
                />
            </Grid>
        </Grid>
        <Grid style={{justifyContent: 'center', marginTop : '10px'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
            <Grid item xs={4}>
                <ControlledTextField
                    control={control}
                    required
                    shouldUnregister
                    name="email"
                    label="Email"
                />
            </Grid>
            <Grid item xs={4}>
                <ControlledTextField
                    control={control}
                    required
                    shouldUnregister
                    name="username"
                    label="Username"
                />
            </Grid>
            <Grid item xs={4}>
                <ControlledMobileNumberField
                    control={control}
                    name='mobileNumber'
                    label='Mobile number'
                    required
                    shouldUnregister
                />
            </Grid>
        </Grid>
            <ControlledTextField
                control={control}
                required
                shouldUnregister
                name="password"
                label="Password"
                type="password"
            />
            <PasswordStrengthMeter result={result} />
            <ControlledTextField
                control={control}
                required
                shouldUnregister
                name="conpassword"
                label="Confirm Password"
                type="password"
            />
        </>
    )
}

export const AccountSetupAdditionalFormDetails = () => {
    const [accountsDetails, setAccountsDetails] = useAtom(AccountSetupAtom)
    const [loading, setLoading] = useState<Boolean>(false)
    const [contentLoad, setContentLoad] = useState<Boolean>(true)
    const form = useForm<AccountSetupCreation>({
        resolver: zodResolver(accountSetupSubSchema),
        mode: 'all',
        defaultValues: accountsDetails ?? { hasNoMiddleName : false }
    })
    const loadAccountSetup = useApiCallback(api => api.internal.AccountSetupFindAnyUsers())
    
    const apiCheckPrimaryDetails = useApiCallback(
        async (api, args: { email: string | undefined, username: string | undefined }) => await api.internal.checkPrimaryDetails(args)
    )
    
    function LoadAccountSetup(){
        loadAccountSetup.execute().then(res => {
            if(res?.data){
                setContentLoad(false)
                navigate(Path.login.path)
            } else {
                setContentLoad(false)
            }
        })
    }
    useEffect(() => {
        LoadAccountSetup()
    }, [])
    
    const {
        formState: { isValid },
        getValues
    } = form;
    const navigate = useNavigate()
    const handleContinue = () => {
        setLoading(!loading)
        const values = getValues()
        apiCheckPrimaryDetails.execute({
            email: values.email,
            username: values.username
        }).then(() => {
            setAccountsDetails(values)
            setLoading(false)
            setTimeout(() => navigate(Path.otp_entry_page.path), 2000)
        })
    }
    return (
        <>
            {contentLoad ? <LoadBackdrop open={contentLoad} />
            : 
            <Container>
            <div style={{ padding: '20px'}}>
                <BaseCard
                style={{
                    borderRadius: '30px 30px 30px 30px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <img
                                src="cl-signup.png"
                                style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "250px",
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <FormProvider {...form}>
                                <Container maxWidth="md" sx={{ padding: "50px" }}>
                                <div
                                    style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "50px",
                                    }}
                                >
                                    <img
                                        src="/sti.png"
                                        alt="logooo"
                                        className=" h-20 w-20 object-cover relative lg:-left-2 p-2  "
                                        
                                    />
                                    <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                                    Welcome to System Account Setup
                                    </Typography>
                                </div>
                                <AccountSetupForm />
                                <div className="flex justify-center items-center" style={{ marginTop: '5px'}}>
                                    <button
                                    disabled={!isValid}
                                    className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    style={{
                                        cursor: !isValid ? "not-allowed" : "pointer",
                                        backgroundColor: "#973B74",
                                        width: "150px",
                                    }}
                                    onClick={handleContinue}
                                    >
                                    Sign Up
                                    </button>
                                </div>
                                </Container>
                            </FormProvider>
                        </Grid>
                    </Grid>
                </BaseCard>
            </div>
            <LoadBackdrop open={loading} />
        </Container>}
        </>
    )
}