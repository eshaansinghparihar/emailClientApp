import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { addToFavorites, removeFromFavorites } from "../actions/emailListActions";
import './EmailBody.css'

export const EmailBody = () => {
    const { 
        bodyLoading, 
        bodyLoadingError, 
        emailBody : { id, body },
        initial,
        subject,
        date
    } = useSelector((state) => state.emailBody);
    const { favorites } = useSelector((state) => state.emailList);
    const dispatch = useDispatch();

    const bodyContent = body ? parse(body) : "";

    return(
        bodyLoading ? (
            <p>Loading email contents...</p>
        ) : (
            bodyLoadingError ? (
                <p>Unable to fetch email contents.</p>
            ) : (
                <div className="emailBodyWr currentEmailWr flexRow">
                    <div className="avatar flexCenter">{initial}</div>
                    
                    <div className="emailBody flexColumn">
                        <header className="emailBody-header flexRow flexAlignSpaceBetween flexAlignCenter">
                            <h1 className="emailBody-subject">{subject}</h1>
                            {
                                favorites.includes(id) ?
                                <button 
                                    className="emailBodyButton"
                                    onClick={() => dispatch(removeFromFavorites(id))}
                                >
                                    Remove from favorite
                                </button> :
                                <button 
                                    className="emailBodyButton"
                                    onClick={() => dispatch(addToFavorites(id))}
                                >
                                    Mark as favorite
                                </button>
                            }
                        </header>

                        <section className="flexRow">
                            <p>{date}</p>
                            {
                                favorites.includes(id) &&
                                <p className="emailFavorite">Favorite</p>
                            }
                        </section>

                        <section className="emailBodyContent">
                            {bodyContent}
                        </section>
                    </div>
                </div>
            )
            
        )
        
    );
}