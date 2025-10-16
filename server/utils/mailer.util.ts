export const getMailOption = (
    source: string,
    destination: string, 
    subject: string, 
    htmlContent: string
) => {
    return {
        from: source,
        to: destination,
        subject: subject,
        html: htmlContent
    }
}