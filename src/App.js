import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EmailCardList } from "./components/EmailList";
import { EmailBody } from "./components/EmailBody";
import { fetchEmailList } from "./actions/emailListActions";
import './App.css'

function App() {
    const [currFilter, setCurrFilter] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [showEmailBody, setShowEmailBody] = useState({ show: false, emailId: ""});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmailList(currPage));
    }, [currPage]);

    return (
        <div className="App pageGap flexColumn">
            <header className="flexRow flexAlignSpaceBetween">
                <section className="headerSection flexRow flexAlignCenter">
                    <h3>Filter By:</h3>
                    <button 
                        className={`headerButton ${currFilter === "UNREAD" ? "headerButtonOnselected" : ""}`}
                        onClick={() => setCurrFilter("UNREAD")}
                    >
                        Unread
                    </button>
                    <button 
                        className={`headerButton ${currFilter === "READ" ? "headerButtonOnselected" : ""}`}
                        onClick={() => setCurrFilter("READ")}
                    >
                        Read
                    </button>
                    <button 
                        className={`headerButton ${currFilter === "FAVORITES" ? "headerButtonOnselected" : ""}`}
                        onClick={() => setCurrFilter("FAVORITES")}
                    >
                        Favorites
                    </button>
                    <button 
                        className="headerButton"
                        onClick={() => setCurrFilter("CLEAR")}
                    >
                        Clear filter
                    </button>
                </section>

                <section className="headerSection flexRow flexAlignCenter">
                    <h3>Page:</h3>  
                    <button 
                        className={`headerButton ${currPage === 1 ? "headerButtonOnselected" : ""}`}
                        onClick={() => setCurrPage(1)}
                    >1</button>
                    <button 
                        className={`headerButton ${currPage === 2 ? "headerButtonOnselected" : ""}`}
                        onClick={() => setCurrPage(2)}
                    >2</button>
                </section>
            </header>

            <div className={`page-content-wr ${showEmailBody.show ? "pageContentGrid" : ""}`}>
                <aside className="aside-ec-list">
                    <EmailCardList 
                        showEmailBody={showEmailBody}
                        setShowEmailBody={setShowEmailBody}
                        currFilter={currFilter}
                    />
                </aside>
                {
                    showEmailBody.show &&
                    <main className="main-emailBody">
                        <EmailBody />
                    </main>
                }
            </div>
        </div>
    );
}

export default App;