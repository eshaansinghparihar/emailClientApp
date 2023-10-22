import { useDispatch, useSelector } from "react-redux";
import { addToRead } from "../actions/emailListActions";
import { fetchEmailBody } from "../actions/bodyActions";
import { setEmailDetails } from "../actions/bodyActions";
import { getDateTimeFormat } from "../helper/formatDateTime";
import { getFilteredEmailList } from "../helper/filterEmailList";
import { EmailCard } from "./EmailItem";

export const EmailCardList = ({ showEmailBody, setShowEmailBody, currFilter }) => {
    const { show, emailId } = showEmailBody;
    const { 
        listLoading, 
        listLoadingError, 
        emailList, 
        favorites, 
        read 
    } = useSelector((state) => state.emailList);
    const dispatch = useDispatch();

    const filteredEmailList = getFilteredEmailList(emailList, currFilter, favorites, read)

    const emailCardClickHandler = (id, name, date, subject) => {
        if (show && emailId === id) {
            return setShowEmailBody({ show: false, emailId: ""});
        } 
        
        setShowEmailBody({ show: true, emailId: id});
        dispatch(addToRead(id));
        dispatch(setEmailDetails({ 
            initial: name[0].toUpperCase(),
            subject: subject,
            date: getDateTimeFormat(date),
        }))
        dispatch(fetchEmailBody(id));
    }

    return(
        <div className="ec-list-wr flexColumn">
            {
                listLoading && 
                <p>Loading mails...</p>
            }
            {
                listLoadingError && 
                <p>Unable to load emails.</p>
            }
            {
                filteredEmailList.length === 0 && !listLoading &&
                <p>No email matches this filter.</p>
            }
            {
                filteredEmailList.length > 0 && !listLoading && 
                filteredEmailList?.map((currEmail) => {
                    const { id, from, date, subject } = currEmail;
                    return(
                        <EmailCard 
                            key={id} 
                            currEmail={currEmail}
                            showEmailBody={showEmailBody}
                            onClick={() => emailCardClickHandler(id, from.name, date, subject)}
                        />  
                    );
                })
            }
        </div>
    );
}