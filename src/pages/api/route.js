import EmailTemplate from "@/components/Email-template/email-template";
import * as React from "react";
import nodemailer from "nodemailer";
import ReactDOMServer from "react-dom/server";

const email = process.env.EMAIL;
const pass = process.env.PASS;

export default async function route(request, response) {
    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: email,
            pass: pass,
        },
    });

    try {
        const object = request.body;
        // Use the EmailTemplate component properly
        const reactElement = <EmailTemplate object={object} />;

        // Convert the React element to a string using renderToStaticMarkup
        const reactString = ReactDOMServer.renderToString(reactElement);

        const data = await transporter.sendMail({
            from: email,
            to: [object[1]],
            subject: "Donation",
            html: reactString,
        });

        response.status(200).json(data);
    } catch (error) {
        response.status(400).json(error);
    }
}
