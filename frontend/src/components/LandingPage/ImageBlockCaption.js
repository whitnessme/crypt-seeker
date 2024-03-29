import { NavLink } from "react-router-dom";
import ListingEditModal from "../Listings/ListingEditModal";
import { useDispatch, useSelector} from "react-redux";
import {deleteBooking, getBookingsByUser} from '../../store/booking'

const ImageBlockCaption = ({
  caption,
  caption0Class,
  caption1Class,
  buttonText,
  buttonLink,
  hauntId,
  relativeLink,
  listing,
  booking,
  bookingId,
  trip
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)

  const handleDelete = async (e) => {
      e.preventDefault();

      if(bookingId){
        await dispatch(deleteBooking(parseInt(bookingId)))
        await dispatch(getBookingsByUser(sessionUser?.id));
      }
  }

  return (
    <div className="block-info-container">
{/* No button */}
      {caption && hauntId && !buttonText && (
        <>
          <p className={caption0Class}>{caption[0]}</p>
         <p className={caption1Class}>{caption[1]}</p>
        {booking &&
          <button onClick={handleDelete} className="booking-delete delete-button"><i className="fa-solid fa-trash-can"></i></button>
        }
        </>
      )}
      {caption && hauntId && buttonText && (
        <>
          <p className={caption0Class}>{caption[0]}</p>
          <div className="block-button-container">
            <p className={caption1Class}>{caption[1]}</p>
            {listing ? 
             <ListingEditModal hauntId={hauntId} />
             :
            // booking ? 
            //   <TripEditModal bookingId={bookingId} trip={trip} />
            //  :
             <NavLink exact to={relativeLink} className="block-button">
              {buttonText}
            </NavLink>
            }

          </div>
        </>
      )}
{/* Button but not hauntId */}
      {caption && !hauntId && buttonText && (
        <>
            <p className={caption0Class}>{caption[0]}</p>
            <p className={caption1Class}>{caption[1]}</p>
            <div className="block-button-container">
                {buttonText && (
                <>
                    {buttonLink && (
                        <NavLink to={buttonLink} className="block-button">
                            {buttonText}
                        </NavLink>
                    )}
                </>
                )}
      </div>
        </>
        )}
    </div>
  );
};

export default ImageBlockCaption;
