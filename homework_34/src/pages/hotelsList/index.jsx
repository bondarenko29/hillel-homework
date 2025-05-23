import React, { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotelsRequest, clearHotelsList } from '@/store/hotelsList/hotelsListSlice';
import HotelCard from '@/pages/hotelsList/components/hotelCard';
import clsx from 'clsx';

const HotelsListPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { hotels, loading, error } = useSelector(state => state.hotelsList);

  useEffect(() => {
    dispatch(fetchHotelsRequest());
    return () => {
      dispatch(clearHotelsList());
    };
  }, [dispatch]);

  const location = searchParams.get('location')?.toLowerCase() || '';
  const priceFrom = parseInt(searchParams.get('priceFrom')) || 0;
  const priceTo = parseInt(searchParams.get('priceTo')) || Infinity;
  const filteredHotels = hotels.filter(hotel => {
    const matchLocation = hotel.location.toLowerCase().includes(location);
    const matchPrice = hotel.price >= priceFrom && hotel.price <= priceTo;
    return matchLocation && matchPrice;
  });

  if (loading) {
    return <p className="text-center text-yellow-400">Hotels loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">Error: {error}</p>;
  }

  if (!filteredHotels.length) {
    return <p className="text-center text-gray-400">No hotels found for this query.</p>;
  }

  return (
    <section>
      {!!searchParams.size && (
        <button
          className="text-yellow-400 hover:underline self-start mb-6"
          onClick={() => setSearchParams('')}
        >
          Clear filters
        </button>
      )}

      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Available hotels</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <HotelCard key={hotel.id} {...hotel} className={clsx(hotel.booked && 'grayscale')} />
        ))}
      </div>
    </section>
  );
};

export default HotelsListPage;
