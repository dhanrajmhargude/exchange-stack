import {z} from "zod"

export const authschema = z.object({
    username :z.string({ message: "Username is required."}).trim().max(16).min(3),
    password :z.string({ message: "Password is required."}).min(3),
})

export type AuthBody = z.infer<typeof authschema> // AuthBody: TYPE generated from the schema, used at COMPILE TIME.
// and stays in sync with the schema automatically (one source of truth).
