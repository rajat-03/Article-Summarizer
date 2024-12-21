
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import axios from "axios";

const Demo2 = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const openAiKey = import.meta.env.VITE_OPENAI_API_KEY;

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("allArticles")
        );
        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true);
        setError(null);

        try {
            // Call OpenAI ChatGPT API
            const response = await axios.post("https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4", // Use "gpt-3.5-turbo" if preferred
                    messages: [
                        {
                            role: "system",
                            content: `Summarize the content of this URL: ${article.url}`,
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${openAiKey}`, 
                    },
                }
            );

            const summary = response.data.choices[0].message.content;

            // Save the summary to state and localStorage
            const newArticle = { ...article, summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            localStorage.setItem("allArticles", JSON.stringify(updatedAllArticles));
        } catch (err) {
            console.error("Error fetching summary:", err);
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setIsFetching(false);
        }
    };

    // copy the url and toggle the icon for user feedback
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };


    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}

            <div className="flex flex-col w-full gap-2">
                <form
                    className="relative flex justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt="link_icon"
                        className="absolute left-0 my-2 ml-3 w-5"
                    />

                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={(e) => {
                            setArticle({ ...article, url: e.target.value });
                        }}
                        required
                        className="url_input peer"
                    />

                    <button
                        type="submit"
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        ➤
                    </button>
                </form>

                {/* Browse URL History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.reverse().map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className="link_card"
                        >
                            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                    className="w-[40%] h-[40%] object-contain"
                                />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Result */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">
                        Well, that wasn't supposed to happen...
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Article <span className="blue_gradient">Summary</span>
                            </h2>
                            <div className="summary_box">
                                <p className="font-inter font-medium text-sm text-gray-700">
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Demo2;
