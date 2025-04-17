import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IEspecialidade, IFilial } from '@/api/types';

interface AgendaFiltersProps {
    dataInicial: Date | null;
    setDataInicial: (date: Date | null) => void;
    dataFinal: Date | null;
    setDataFinal: (date: Date | null) => void;
    selectedEspecialidade: IEspecialidade | null;
    setSelectedEspecialidade: (especialidade: IEspecialidade) => void;
    selectedFilial: IFilial | null;
    setSelectedFilial: ( filial : IFilial) => void;
}

export default function AgendaFilters({
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    selectedEspecialidade,
    setSelectedEspecialidade,
    selectedFilial,
    setSelectedFilial,
}: AgendaFiltersProps) {

    const Filiais = [
        { codigo: "SEDE", descricao: 'Sede', abreviatura: "SD" },
        { codigo: "FL1", descricao: 'Filial 1', abreviatura: "Filial 1" },
        { codigo: "FL2", descricao: 'Filial 2 - PartilhaResultados', abreviatura: "Filial 2 -PartRes" },
        { codigo: "FL3", descricao: 'Presc MCDT', abreviatura: "Presc MCDT" },
        { codigo: "FL4", descricao: 'Presc PEM', abreviatura: "Presc PEM" },
    ]

    useEffect(() => {
        if (!selectedFilial) {
            setSelectedFilial(Filiais[0]);
        }
    }, []);

    const [Especialidades, setEspecialidades] = useState<IEspecialidade[] | null>(null);

    async function fetchSpecialities(){
        try{
            const baseUrl = import.meta.env.VITE_API_URL;
            const url = `${baseUrl}Specialties?slug=crm`;
            const response = await fetch(url, { cache: 'no-cache' });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Expected JSON, got ${contentType}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setEspecialidades(data.data);
        } catch (error){
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        if (!Especialidades) {
            fetchSpecialities();
        }
    }, [Especialidades]);

    useEffect(() => {
        if (Especialidades && Especialidades.length > 0) {
            setSelectedEspecialidade(Especialidades[0]); // Set the first specialty if available
        }
    }, [Especialidades]);

    useEffect(() => {
        if(dataInicial && dataFinal && dataInicial > dataFinal) {
            const novaDataFinal = new Date(dataInicial);
            novaDataFinal.setDate(novaDataFinal.getDate() + 1);
            setDataFinal(novaDataFinal);
        }
    }, [dataInicial]);

    useEffect(() => {
        if(dataInicial && dataFinal && dataInicial > dataFinal) {
            const novaDataInicial = new Date(dataFinal);
            novaDataInicial.setDate(novaDataInicial.getDate() - 1);
            setDataInicial(novaDataInicial);
        }
    }, [dataFinal]);

    return (
        <div className='flex flex-row px-6 space-x-8 items-center w-full h-[60px]'>
            <div className='flex flex-row space-x-4 items-center'>
                <p className="whitespace-nowrap"> Data Incicial: </p>
                <DatePicker
                    selected={dataInicial}
                    onChange={(date) => setDataInicial(date)}
                    dateFormat="dd/MM/yyyy" 
                    placeholderText="Selecionar"
                    className="w-36 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
            </div>

            <div className='flex flex-row space-x-4 items-center'>
                <p className="whitespace-nowrap"> Data Final: </p>
                <DatePicker
                    selected={dataFinal}
                    onChange={(date) => setDataFinal(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecionar"
                    className="w-36 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
            </div>

            <div className='flex flex-row space-x-4 items-center'>
                <p> Especialidade: </p>
                <Listbox
                value={selectedEspecialidade}
                onChange={setSelectedEspecialidade}
                >
                {({ open }) => (
                    <>
                    <div className="relative">
                        <Listbox.Button className="bg-white w-36 cursor-default rounded-md py-1.5 px-2 text-gray-800 ring-1 ring-inset ring-white focus:outline-none focus:ring-2 focus:ring-lime-500 border border-gray-300 shadow-sm">
                        <span className="flex items-center justify-between">
                            <span className="block truncate">
                                {selectedEspecialidade?.title ?? 'A Carregar...'}
                            </span>
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-800"
                                aria-hidden="true"
                            />
                        </span>
                        </Listbox.Button>

                        <Transition show={open} as={Fragment}>
                            <Listbox.Options className="absolute w-auto max-h-[60vh] overflow-y-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {Especialidades?.map((especialidade) => (
                                    <Listbox.Option
                                        key={especialidade.id}
                                        value={especialidade}
                                        className={({ selected }) =>
                                        `relative cursor-default select-none py-2 px-4 ${
                                            selected
                                            ? 'bg-lime-500 text-white hover:bg-lime-600'
                                            : 'text-gray-900 hover:bg-gray-200'
                                        }`
                                        }
                                    >
                                        {especialidade.title}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                    </>
                )}
                </Listbox>
            </div>

            <div className='flex flex-row space-x-4 items-center'>
                <p>Unidade: </p>
                <Listbox
                value={selectedFilial}
                onChange={setSelectedFilial}
                >
                {({ open }) => (
                    <>
                    <div className="relative">
                        <Listbox.Button className="bg-white w-36 cursor-default rounded-md py-1.5 px-2 text-gray-800 ring-1 ring-inset ring-white focus:outline-none focus:ring-2 focus:ring-lime-500 border border-gray-300 shadow-sm">
                        <span className="flex items-center justify-between">
                            <span className="block truncate">
                                {selectedFilial?.descricao ?? 'A Carregar...'}
                            </span>
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-800"
                                aria-hidden="true"
                            />
                        </span>
                        
                        </Listbox.Button>

                        <Transition show={open} as={Fragment}>
                            <Listbox.Options className="absolute w-auto max-h-[60vh] overflow-y-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {Filiais.map((filial) => (
                                    <Listbox.Option
                                        key={filial.descricao}
                                        value={filial}
                                        className={({ selected }) =>
                                        `relative cursor-default select-none py-2 px-4 ${
                                            selected
                                            ? 'bg-lime-500 text-white hover:bg-lime-600'
                                            : 'text-gray-900 hover:bg-gray-200'
                                        }`
                                        }
                                    >
                                        {filial.descricao}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                    </>
                )}
                </Listbox>
            </div>
        </div>
    
    );
}
