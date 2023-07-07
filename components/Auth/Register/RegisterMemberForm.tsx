"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Dispatch, SetStateAction } from "react";

type RegisterMemberForm = {
    email: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
};

type RegisterMemberFormProps = {
    setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function RegisterMemberForm({ setShowForm }: RegisterMemberFormProps) {
    const [step, setStep] = useState<number>(1);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid },
    } = useForm<RegisterMemberForm>({
        mode: "all",
        defaultValues: {
            email: "",
            firstName: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const submitData = (data: RegisterMemberForm) => {
        console.log("This is the user data", data);
    };

    const handleGoBack = () => {
        if (step == 1) {
            setShowForm(false);
        } else {
            setStep(step - 1);
        }
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Label htmlFor='firstName'>Primeiro nome</Label>
                        <Input
                            key={1}
                            placeholder='John'
                            id='firstName'
                            type='text'
                            className='mt-2'
                            {...register("firstName", {
                                required: "Preencha este campo.",
                                minLength: {
                                    value: 2,
                                    message: "O nome não pode ser tão curto.",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "O nome não pode ser tão longo.",
                                },
                            })}
                        ></Input>
                        <p className='text-xs text-muted-foreground mt-2'>
                            Este nome não será publico
                        </p>
                        {errors.firstName && (
                            <p className='text-xs text-destructive mt-2'>
                                {errors.firstName.message}
                            </p>
                        )}

                        <Label htmlFor='username'>Nome de usuário</Label>
                        <Input
                            key={2}
                            placeholder='John_Doe'
                            id='username'
                            type='text'
                            className='mt-2'
                            {...register("username", {
                                required: "Preencha este campo.",
                                minLength: {
                                    value: 3,
                                    message: "O nome não pode ser tão curto.",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "O nome não pode ser tão longo.",
                                },
                            })}
                        ></Input>
                        <p className='text-xs text-muted-foreground mt-2'>
                            Este será seu nome de exibição
                        </p>
                        {errors.username && (
                            <p className='text-xs text-destructive mt-2'>
                                {errors.username.message}
                            </p>
                        )}
                    </>
                );

                break;
            case 2:
                return (
                    <>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            key={3}
                            placeholder='exemplo@email.com'
                            id='email'
                            type='email'
                            className='mt-2'
                            {...register("email", {
                                required: "Preencha este campo.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Este não é um email valido.",
                                },
                            })}
                        ></Input>
                        {errors.email && (
                            <p className='text-xs text-destructive mt-2'>{errors.email.message}</p>
                        )}
                    </>
                );
                break;
            case 3:
                return (
                    <>
                        <Label htmlFor='password'>Senha</Label>
                        <Input
                            key={4}
                            placeholder='••••••••'
                            id='password'
                            type='password'
                            className='mt-2'
                            {...register("password", {
                                required: "Preencha este campo.",
                                minLength: {
                                    value: 6,
                                    message: "A senha deve conter 6 ou mais caracteres.",
                                },
                                maxLength: {
                                    value: 40,
                                    message: "A senha deve ser menor.",
                                },
                                validate: {
                                    lowerCase: (value: string) =>
                                        /^(?=.*[a-z])/.test(value) ||
                                        "A senha deve conter uma letra minúscula.",
                                    upperCase: (value: string) =>
                                        /^(?=.*[A-Z])/.test(value) ||
                                        "A senha deve conter uma letra maiúscula.",
                                    number: (value: string) =>
                                        /^(?=.*[0-9])/.test(value) ||
                                        "A senha deve conter um número.",
                                },
                            })}
                        ></Input>
                        {errors.password && (
                            <p className='text-xs text-destructive mt-2'>
                                {errors.password.message}
                            </p>
                        )}

                        <Label htmlFor='confirmPassword'>Confirme a senha</Label>
                        <Input
                            key={5}
                            placeholder='••••••••'
                            id='confirmPassword'
                            type='password'
                            className='mt-2'
                            {...register("confirmPassword", {
                                required: "Preencha este campo.",
                                validate: (value: string) => {
                                    if (watch("password") != value) {
                                        return "As senhas não sao idênticas.";
                                    }
                                },
                            })}
                        ></Input>
                        {errors.confirmPassword && (
                            <p className='text-xs text-destructive mt-2'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </>
                );
                break;

            default:
                break;
        }
    };

    const renderButton = () => {
        switch (step) {
            case 1:
            case 2:
                return (
                    <>
                        <Button
                            className='w-full mt-5'
                            type='button'
                            onClick={() => setStep(step + 1)}
                            disabled={!isValid}
                        >
                            Próximo
                        </Button>
                    </>
                );
                break;
            case 3:
                return (
                    <>
                        <Button className='w-full mt-5' type='submit' disabled={!isValid}>
                            Cadastrar
                        </Button>
                    </>
                );
                break;
            default:
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit(submitData)} noValidate>
            <button className='block mb-4' onClick={handleGoBack}>
                <ArrowLeft className='inline-block' /> Voltar
            </button>
            {renderForm()}
            {renderButton()}
            <DevTool control={control} />
        </form>
    );
}
