import AgendaFilters from '@/components/AgendaFilters';
import AgendaMatriz from '@/components/AgendaMatriz';
import React, { useState } from 'react';
import { IEspecialidade } from '@/api/types';

interface AgendaPageProps {
}

export default function AgendaPage({

}: AgendaPageProps) {
  const [dataInicial, setDataInicial] = useState<Date | null>(new Date());
  const [dataFinal, setDataFinal] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() + 7)));

  const [selectedUnidade, setSelectedUnidade] = useState<{ id: number, name: string, unavailable: boolean } | null>(null);

  const [selectedEspecialidade, setSelectedEspecialidade] = useState<IEspecialidade | null>(null);

  return (
    <div className='flex flex-col w-full h-full'>
      <AgendaFilters
      dataInicial={dataInicial}
      setDataInicial={setDataInicial}
      dataFinal= {dataFinal}
      setDataFinal={setDataFinal}
      selectedEspecialidade={selectedEspecialidade}
      setSelectedEspecialidade={setSelectedEspecialidade}
      selectedUnidade={selectedUnidade}
      setSelectedUnidade={setSelectedUnidade}
      />
      <AgendaMatriz
      dataInicial={dataInicial}
      dataFinal={dataFinal}
      selectedEspecialidade={selectedEspecialidade}
      selectedUnidade={selectedUnidade}
      />
    </div>
  );
}
