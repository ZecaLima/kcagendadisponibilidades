import AgendaFilters from '@/components/AgendaFilters';
import AgendaMatriz from '@/components/AgendaMatriz';
import React, { Fragment, useState } from 'react';

interface AgendaPageProps {
}

export default function AgendaPage({

}: AgendaPageProps) {

  return (
    <div className='flex flex-col w-full h-full'>
      <AgendaFilters/>
      <AgendaMatriz/>
    </div>
  );
}
