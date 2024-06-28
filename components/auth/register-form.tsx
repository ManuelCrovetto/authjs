"use client"

import {CardWrapper} from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {register} from "@/actions/register";


export const RegisterForm = () => {
    const [ isPending, startTransition ] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
          register(values)
              .then((data) => {
                  setError(data.error)
                  setSuccess(data.success)
              })
        })
    }

    return (
        <CardWrapper
            headerLabel={"Create an account"}
            backButtonLabel={"Already have an account?"}
            backButtonHref={"/auth/login"}
            showSocial
        >

            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type={"text"}
                                            placeholder={"John Doe"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                            name={"name"}
                        />
                        <FormField
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type={"email"}
                                            placeholder={"Email"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                            name={"email"}
                        />
                        <FormField
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type={"password"}
                                            placeholder={"*****"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                            name={"password"}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>

                    <Button
                        disabled={isPending}
                        type={"submit"}
                        className="w-full"
                    >
                        Register
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}