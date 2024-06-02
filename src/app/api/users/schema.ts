import { z } from 'zod'
import validator from "validator";

const schema = z.object({
    userName: z.string().min(4),
    phoneNumber: z.string().refine((val)=>(validator.isMobilePhone(val,["fa-IR"])),
    (val)=>({messag:`${val} این شماره معتبر نمی باشد`})
    ),
    email: z.string().email(),
    password: z.string().min(8),
})

export default schema

