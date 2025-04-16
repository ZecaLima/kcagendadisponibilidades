import React, { useEffect, useState } from 'react';
import { getCookie } from 'react-use-cookie';

import Nav from './components/Nav';

import useStore from './store';
import AgendaPage from './pages/agenda';

export default function App() {
  const store = useStore();

  const [showProfile, setShowProfile] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showAppointmentDelete, setShowAppointmentDelete] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [refreshDay, setRefreshDay] = useState(false);

  function handleLogedIn() {
    setIsLogedIn(true);
  }

  useEffect(() => {
    const apiToken = getCookie('API-TOKEN');
    if (apiToken != '') {
      setIsLogedIn(true);
    }
  }, [isLogedIn]);

  function setNewAppointment() {
    store.setAppointmentNumber('');
    store.setAppointmentUserCode('');
    store.setAppointmentUserName('');
    store.setAppointmentServiceCode('');
    store.setAppointmentServiceName('');
    store.setAppointmentEntityType('U');
    store.setAppointmentEntityCode('');
  }

  function handleNewAppointment(action: string) {
    switch (action) {
      case 'I':
        setNewAppointment();

      case 'E':
        setShowAppointment(true);
        break;

      case 'R':
        setShowAppointmentDelete(true);
        break;

      default:
        break;
    }
  }

  const handleSaveSuccess = () => {
    setRefreshDay(!refreshDay);

    setShowAppointment(false);
  };

  return (
    <>
      <Nav
        isLogedIn={isLogedIn}
        onProfile={() => setShowProfile(true)}
        onLogout={() => setIsLogedIn(false)}
      />

      <main className='bg-white h-[100vh-66px]' style={{ height: 'calc(100vh - 66px)' }}>
          <AgendaPage/>
      </main>
    </>
  );
}
