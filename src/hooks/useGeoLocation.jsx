import { useState, useEffect } from 'react';

function useGeolocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      const success = (position) => {
        if(longitude === null && latitude === null) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }
      };

      const onError = (err) => {
        setError('Unable to retrieve your location');
      };

      navigator.geolocation.getCurrentPosition(success, onError);
    };

    getLocation();
  }, []);

  return { latitude, longitude, error };
}

export default useGeolocation;
