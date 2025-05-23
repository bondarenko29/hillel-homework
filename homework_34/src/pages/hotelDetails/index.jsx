import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/axiosService';
import clsx from 'clsx';

const HotelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const fetchHotel = useCallback(async () => {
    try {
      const response = await api.get(`/hotels/${id}`);
      setHotel(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHotel();
  }, [fetchHotel, id]);

  const handleBooking = async () => {
    if (!hotel || hotel.booked) return;

    setBookingInProgress(true);

    try {
      await api.patch(`/hotels/${id}`, { booked: true });
      await fetchHotel();
    } catch (error) {
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return <p className="text-center text-yellow-400">Loading...</p>;
  }

  if (!hotel) {
    return <p className="text-center text-red-400">Hotel is not found</p>;
  }

  return (
    <section className="flex flex-col gap-6">
      <button
        onClick={() => navigate('/hotels')}
        className="text-yellow-400 hover:underline self-start"
      >
        ← Back to list
      </button>

      <img src={hotel.image} alt={hotel.title} className="w-full h-96 object-cover rounded-lg" />

      <div>
        <h2 className="text-3xl font-bold text-yellow-400 mb-2">{hotel.title}</h2>
        <p className="text-gray-400 mb-2">{hotel.location}</p>
        <p className="text-yellow-300 font-semibold text-xl mb-4">${hotel.price} / night</p>
        <p className="text-white text-lg leading-relaxed">{hotel.description}</p>
      </div>

      <button
        onClick={handleBooking}
        disabled={hotel.booked || bookingInProgress}
        className={clsx(
          'mt-4 w-full py-3 text-lg font-bold rounded transition',
          hotel.booked
            ? 'bg-gray-700 text-gray-400 !cursor-not-allowed'
            : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300',
        )}
      >
        {hotel.booked ? 'Already booked' : bookingInProgress ? 'Booking...' : 'Book'}
      </button>
    </section>
  );
};

export default HotelDetailsPage;
