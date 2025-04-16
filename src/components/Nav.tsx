import React, { FormEvent, useEffect, useState, useRef } from 'react';
import { User } from 'phosphor-react';
import { getCookie, setCookie } from 'react-use-cookie';

import useStore from '../store';
import { IClient } from '../api/types';
import logo from '../assets/logo.svg';
import { authApi } from '../api/authApi';

interface NavProps {
  isLogedIn: boolean;
  onLogout: () => void;
  onProfile: () => void;
}

export default function Nav({ isLogedIn, onProfile, onLogout }: NavProps) {
  const store = useStore();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [clients, setClients] = useState<IClient[]>([]);
  const [email, setEmail] = useState('');
  const [selClient, setSelClient] = useState<IClient | undefined>(undefined);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeClass = 'text-white bg-[#93C01F] font-bold';
  const inactiveClass =
    'text-gray-800 font-medium hover:text-gray-800 hover:font-bold hover:bg-gray-300';

  useEffect(() => {
    const apiToken = getCookie('API-TOKEN');

    if (apiToken != '') {
      const decode = getParsedJwt(apiToken);

      if (decode != undefined) {
        setEmail(decode.email);
        store.setAuthUser({
          name: '',
          email: email,
          id: '',
          createdAt: '',
          photo: '',
          role: '',
          updatedAt: '',
          _id: '',
          __v: -1,
        });

        const url = '/Client/?userId=' + decode?.nameid;

        const config = {
          headers: { Authorization: `Bearer ${apiToken}` },
        };

        authApi
          .get(url, config)
          .then((response) => {
            processResponse(response.data.data);
          })
          .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log('Error response:');
              console.error(error.response.data);
              console.error(error.response.status);
              console.error(error.response.headers);
              if (error.response.status === 401) {
                handleLogout();
              }
            }
          });
      }
    }
  }, [isLogedIn]);

  useEffect(()=>{
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  function processResponse(content: any) {
    try {
      const data = content as Array<IClient>;
      setClients(data);

      const client = data[0];

      setSelClient(client);

      store.setClient(client);
    } catch (error) {
      console.log(error);
    }
  }

  function getParsedJwt<T extends object = { [k: string]: string }>(
    token: string
  ): T | undefined {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return undefined;
    }
  }

  function handleLogout(e: React.FormEvent<Element> | undefined = undefined) {
    if (e) e.preventDefault;

    setCookie('API-TOKEN', '', { days: 0 });

    store.setClient(null);

    setShowProfileMenu(false);
    setShowMenu(false);

    onLogout();
  }

  function handleProfile() {
    setShowProfileMenu(false);

    onProfile();
  }

  function handleClientSelect(client: IClient) {
    store.setRequestLoading(true);

    setSelClient(client);

    store.setClient(client);
  }

  return (
    <nav className="bg-white sticky top-0 z-10 border-b-2 border-solid"
    style={{borderImage: 'linear-gradient(to right, #93C01F, transparent 80%) 1'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={logo} alt="Logo" />
            </div>
            <div className={`hidden sm:block ${isLogedIn ? '' : 'invisible'}`}>
              <div className="ml-10 flex items-baseline space-x-4">
                {clients.map((client, i) => (
                  <button
                    key={client.code}
                    onClick={() => handleClientSelect(client)}
                    className={`px-3 py-2 rounded-md text-sm enabled:transition enabled:transform ${
                      selClient?.code === client.code
                        ? activeClass
                        : inactiveClass
                    } ${i > 0 && 'ml-4'}`}
                  >
                    {client.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="ml-4 flex items-center">
              {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>  */}

              {/* <div className={`flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end ${haveToken ? '' : 'invisible'}`} > */}
              {/* <div className={`max-w-lg w-full lg:max-w-xs ${haveToken ? '' : 'invisible'}`}>
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MagnifyingGlass size={16} className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-lime-600 focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Pesquisa"
                    type="search"
                    name="search"
                    onChange={(event) => {
                      handleSearchChange(event);
                    }}
                  />
                </div>
              </div> */}
              {/* </div> */}

              {/* Profile dropdown */}
              <div className={`ml-3 relative ${isLogedIn ? '' : 'invisible'} `}>
                <div className="flex flex-row items-center gap-x-4">
                  <div className="flex flex-col gap-y-1 text-right">
                    <div className="text-base font-medium leading-none text-gray-800">
                      {selClient?.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {email}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-white rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-800"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      onClick={(event) => {
                        setShowProfileMenu(!showProfileMenu)
                        event.stopPropagation();
                      }}
                      ref={buttonRef}
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                      <User color="#1e2939" size={28} />
                    </button>
                  </div>
                </div>

                {showProfileMenu && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    ref={profileMenuRef}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div
                      className="py-1 rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        onClick={handleProfile}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Perfil
                      </a>
                      {/* <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>  */}
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Terminar sessão
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`-mr-2 flex sm:hidden disabled ${
              isLogedIn ? '' : 'invisible'
            }`}
          >
            {/* Mobile menu button */}
            {/* <div className={`max-w-lg w-full px-1`}>
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MagnifyingGlass size={16} className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-lime-600 focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Pesquisa"
                    type="search"
                    name="search"
                    onChange={(event) => {
                      handleSearchChange(event);
                    }}
                  />
                </div>
              </div> */}

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu open: "block", Menu closed: "hidden" */}
      <div
        className={`sm:hidden ${showMenu ? 'block' : 'hidden'} ${
          isLogedIn ? '' : 'invisible'
        }`}
      >
        <div className="px-2 pt-2 pb-2 sm:px-2">
          {clients.map((client, i) => (
            <button
              key={client.code}
              onClick={() => setSelClient(client)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                selClient?.code === client.code ? activeClass : inactiveClass
              } ${i > 0 && 'mt-1'}`}
            >
              {client.name}
            </button>
          ))}
        </div>

        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <User color="#1e2939" size={24} />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-gray-800">
                {selClient?.name}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {email}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              onClick={handleProfile}
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700"
            >
              Perfil
            </a>
            {/* 
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Settings
            </a> */}
            <button
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700"
            >
              Terminar sessão
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
