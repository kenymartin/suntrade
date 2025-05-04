import {useForm,SubmitHandler, UseFormReturn, FieldValues} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema} from "zod";

interface useSchemaReturn<T extends FieldValues>{
    formMethods:UseFormReturn<T>;
    onSumit:SubmitHandler<T>;
}

function useSchema<T extends FieldValues>(schema:ZodSchema<T>,defaultValues:T):useSchemaReturn<T>{
    const formMethods = useForm<T>({
      resolver: zodResolver(schema, defaultValues),
    });

    const onSumit:SubmitHandler<T>=(data:any)=>{
        console.log(data);
    }
    return { formMethods, onSumit };
}

export default useSchema
