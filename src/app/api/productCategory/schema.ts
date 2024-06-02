import { z } from "zod";


const schema = z.object({
    persianCategory : z.string(),
    englishCategory : z.string()
})

export default schema