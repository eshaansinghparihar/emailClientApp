import { useSelector } from "react-redux";
import { getDateTimeFormat } from "../helper/formatDateTime";
import "./EmailItem.css";

export const EmailCard = ({ currEmail, showEmailBody, onClick }) => {
    const { 
        id, 
        from, 
        date, 
        subject, 
        short_description 
    } = currEmail;
    const { name, email } = from;

    const { favorites, read } = useSelector((state) => state.emailList);
    const { emailBody } = useSelector((state) => state.emailBody);

    const initial = name[0].toUpperCase()
    const formattedDate = getDateTimeFormat(date);
    
    return(
        <div 
            className={`
                emailCard currentEmailWr flexRow
                ${read.includes(id) ? "emailCardRead" : ""}
                ${id === emailBody.id && showEmailBody.show ? "currentEmailCard" : ""}
            `}
            onClick={onClick}
        >
            <div className="avatar flexCenter">{initial}</div>
            
            <div className="emailCardContent flexColumn">
                <p>From: <strong><span>{name}</span> <span>&lt;{email}&gt;</span></strong></p>
                <p>Subject: <strong>{subject}</strong></p>
                <p>{short_description}</p>
                <section className="flexRow">
                    <p>{formattedDate}</p>
                    {
                        favorites.includes(id) &&
                        <p className="emailFavorite"><strong>Favorite</strong></p>
                    }
                </section>
            </div>
        </div>
    );
}