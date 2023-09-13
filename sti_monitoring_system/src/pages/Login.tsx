import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useApiCallback } from '../core/hooks/useApi'
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { LoginSchema, loginToAtom } from '../core/schema/login';
import { loginAtom } from '../core/atoms/login-atom';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai'
import { ControlledTextField } from '../components';
import LoadBackdrop from '../components/Backdrop/Backdrop';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Path } from '../router/path';
import { workWithCoolDowns } from '../core/utils/migration';


export const Login: React.FC = () => {
    const [login, setLogin] = useAtom(loginAtom)
    const [load, setLoad] = useState<Boolean>(true)
    const loadAccountSetup = useApiCallback(api => api.internal.AccountSetupFindAnyUsers())
    const [processLoad, setProcessLoad] = useState<Boolean>(false)
    const imageStyle: React.CSSProperties = {
        display: 'block', // This makes the image behave like a block element
        margin: '0 auto', // This centers the image horizontally
    };
    const navigate = useNavigate()
    const {
        getValues,
        control,
        formState: { isValid }
    } = useForm<loginToAtom>({
        mode: 'all',
        resolver: zodResolver(LoginSchema),
        defaultValues: login
    })
    const enterKeyTrigger = (event: KeyboardEvent<HTMLInputElement>) => {
        const value = getValues();
        if (event.key === 'Enter') {
            if (value.password != '') {
                // handleSignin();
            }
        }
    }
    function LoadAccountSetup(){
        loadAccountSetup.execute().then(res => {
            if(res?.data){
                setLoad(false)
            }
            else 
            {
                navigate(Path.accountsetup.path)
            }
        })
    }
    const preloadedCooldowns = async () => {
        const preloadedcooled = await workWithCoolDowns()
        return {
            data : {
                preloadedcooled
            }
        }
    }
    useEffect(() => {
        LoadAccountSetup()
        // preloadedCooldowns()
    }, [])
    return (
       <>
            {load ? (
                <LoadBackdrop open={load} />
            ) : (
                <div className='min-h-screen top-0 left-0 bg-gradient-to-t from-[#b7497e] to-[#f7d48c]'>
                    <div className='w-full lg:max-w-screen space-y-8'>
                        <div className='container mx-auto py-24 sm:py-20 md:py-20 lg:py-[4rem]'>
                            <div className='flex justify-center items-center'>
                                <div className='bg-white  h-[400px] lg:h-[710px] lg:w-[683px] shadow-l-lg lg:rounded-l-md  overflow-hidden   hidden  sm:hidden md:hidden lg:block'>
                                    <img
                                        src="/clienttheme.png"
                                        alt="theme"
                                        className=" h-full w-full object-cover p-4 fade-in  "
                                    />
                                </div>
                                <div className='bg-white px-[60px] lg:px-[90px] py-10  md:py-12 lg:py-20   h-[650px] md:h-[680px] lg:h-[710px] lg:rounded-r-lg w-[450px]  md:w-[400px] lg:w-[693px]  shadow-r-lg'>
                                <img
                                        src="/sti.png"
                                        alt="logooo"
                                        className=" h-20 w-20 object-cover relative lg:-left-2 p-2  "
                                        
                                    />
                                    <Typography className='mt-4 text-left text-2xl font-bold tracking-tight text-gray-900'>
                                        Sign in
                                    </Typography>
                                    <p className='mt-2 text-left text-sm text-[#808080]'>
                                        Welcome back! Please enter your credential details
                                    </p>
                                    <div className='mt-6 space-y-6'>
                                        <input type='hidden' name='remember' defaultValue='true' />
                                        <div className='-space-y-px rounded-md shadow-sm'>
                                            <div className='py-2'>
                                                <label
                                                    htmlFor="label"
                                                    className="text-[#808080] text-[15px]  ">
                                                    Email
                                                </label>
                                            </div>
                                            <ControlledTextField 
                                                control={control}
                                                name='username'
                                                required
                                                shouldUnregister
                                            />
                                            <div className="py-2">
                                                <label
                                                htmlFor="label"
                                                className="text-[#808080] text-[15px] ">
                                                Password
                                                </label>
                                            </div>
                                            <ControlledTextField 
                                                control={control}
                                                name='password'
                                                shouldUnregister
                                                type='password'
                                                onKeyPress={enterKeyTrigger}
                                            />
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center'>
                                                <input 
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded-sm text-[#8B255B] focus:ring-[#8b255bc8]"
                                                />
                                                <label
                                                    htmlFor="remember-me"
                                                    className="ml-2 block text-[13px] text-gray-900">
                                                    Remember me
                                                </label>
                                            </div>
                                            <div className='text-sm'>
                                                <Link 
                                                    to={{}}
                                                    className='font-medium text-[#8B255B] text-[13px] hover:text-[#5e2855]'
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                            disabled={!isValid}
                                            className="group relative flex w-full px-6 mt-5 justify-center rounded-md border border-transparent bg-[#8B255B] py-2 text-sm font-medium text-white hover:bg-[#e152a8] focus:outline-none focus:ring-2 focus:ring-[#8B255B] cus:ring-offset-2"
                                            >Sign in</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <LoadBackdrop open={processLoad} />
       </>
    )
}

export default Login