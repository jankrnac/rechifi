import { Resend } from 'resend';

export default eventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)

    const resend = new Resend(config.resendApiKey);

    const { data, error } = await resend.emails.send(body);

    if (error) {
        return error
    }

    return data
})