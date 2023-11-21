import Head from "next/head";
import * as React from "react";

const EmailTemplate = ({ object }) => {
    const [name, email, total, cart] = object;

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const today = new Date();
    const formattedDate = formatDate(today);

    return (
        <>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='true'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
                    rel='stylesheet'
                />
            </Head>

            <div
                style={{
                    padding: "24px",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                    color: "black",
                }}
            >
                <div>
                    <div style={{ width: "100%", display: "flex" }}>
                        <img
                            src='https://capstone-dream-team-git-85-meals-74d28e-merzoukfatimas-projects.vercel.app/_next/image?url=%2Fimages%2Fhome%2FNavbar%2Flogo.png&w=96&q=75'
                            alt='logo'
                            style={{ height: "80px", width: "80px" }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <p style={{ marginBottom: "5px", marginTop: "0px" }}>
                        {formattedDate}
                    </p>
                    <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        Dear {name},
                    </p>
                    <p>
                        We want to express our sincere gratitude for your
                        donation of ${total} on {formattedDate}. Your kindness
                        has made a meaningful impact, helping us provide
                        nourishment to those in need. Thank you for being a
                        beacon of compassion and support in our community.{" "}
                    </p>
                </div>

                <div
                    style={{
                        marginBottom: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
                        Your donation details:
                    </p>
                    <table
                        style={{
                            width: "100%",
                            border: "1px solid #e2e8f0",
                            marginBottom: "10px",
                            overflow: "scroll",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: "#1a4b8a",
                                    color: "white",
                                }}
                            >
                                <th
                                    style={{
                                        padding: "12px",
                                        border: "1px solid #1a4b8a",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Meal
                                </th>
                                <th
                                    style={{
                                        padding: "12px",
                                        border: "1px solid #1a4b8a",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Restaurant Name
                                </th>
                                <th
                                    style={{
                                        padding: "12px",
                                        border: "1px solid #1a4b8a",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Quantity
                                </th>
                                <th
                                    style={{
                                        padding: "12px",
                                        border: "1px solid #1a4b8a",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {cart.map((meal, index) => (
                                <tr key={index}>
                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #1a4b8a",
                                            textAlign: "center",
                                        }}
                                    >
                                        {meal.name}
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #1a4b8a",
                                            textAlign: "center",
                                        }}
                                    >
                                        {meal.restaurantName}
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #1a4b8a",
                                            textAlign: "center",
                                        }}
                                    >
                                        {meal.quantity}
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #1a4b8a",
                                            textAlign: "center",
                                        }}
                                    >
                                        ${meal.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p style={{ fontWeight: "bold" }}>
                        Your total donation: ${total}
                    </p>
                </div>

                <p style={{ marginBottom: "5px" }}>
                    You truly make a difference.
                </p>
                <p style={{ marginBottom: "2px", fontWeight: "bold" }}>
                    Sincerely,
                </p>
                <p style={{ marginBottom: "0px" }}>Buy me a meal Team</p>

                <a
                    href='mailto:buymeamealorg@gmail.com'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    buymeamealorg@gmail.com
                </a>
                <br />
                <a href='https://capstone-dream-team-git-85-meals-74d28e-merzoukfatimas-projects.vercel.app/'>
                    Buy me a meal website
                </a>
                <p style={{ marginTop: "0px" }}>Algeria.</p>
            </div>
        </>
    );
};

export default EmailTemplate;
