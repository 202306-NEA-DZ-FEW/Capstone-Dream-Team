import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import StoryCardList from "@/components/Blog/StoryCardList";

import Layout from "@/layout/Layout";
import { fetchData } from "@/util/newsApi";

export default function HomePage(props) {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <StoryCardList {...props.data} />
            {props.data.map((article, index) => (
                <div className='article' key={index}>
                    <h2 className='title'>{article.title}</h2>
                    <p className='author'>Author: {article.author}</p>
                    <p className='source'>
                        Source: {article.source.name || "Unknown"}
                    </p>
                    <p className='description'>{article.description}</p>
                    <p className='publishedAt'>
                        Published At:{" "}
                        {new Date(article.publishedAt).toLocaleString()}
                    </p>
                    <img
                        className='image'
                        src={article.urlToImage}
                        alt={article.title}
                    />
                    <p className='content'>{article.content}</p>
                    <a
                        className='read-more'
                        href={article.url}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Read More
                    </a>
                </div>
            ))}
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    const data = await fetchData(
        "everything?domains=unicef.org,data.unicef.org"
    );
    console.log("data", data);
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            data: data.articles,
        },
    };
}
