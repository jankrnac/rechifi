import { Resend } from 'resend';

export default eventHandler(async (event) => {
    const body = await readBody(event)

    const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

    const { data, error } = await resend.emails.send(body);

    if (error) {
        return error
    }

    return data
})