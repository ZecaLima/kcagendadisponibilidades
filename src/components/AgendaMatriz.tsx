import React, { Fragment, useState } from 'react';
import { IEspecialidade } from '@/api/types';

interface AgendaMatrizProps {
  dataInicial: Date | null;
  dataFinal: Date | null;
  selectedEspecialidade: IEspecialidade | null;
  selectedUnidade: { id: number, name: string, unavailable: boolean } | null;
}

export default function AgendaMatriz({
  dataInicial,
  dataFinal,
  selectedEspecialidade,
  selectedUnidade,
}: AgendaMatrizProps) {

  return (
    <div className="flex flex-col h-full w-full bg-green-200">
      <h1>
          Matriz
      </h1>
      <h1>{dataInicial ? dataInicial.toDateString() : 'Sem data Inicial'}</h1>
      <h1>{dataFinal ? dataFinal.toDateString() : 'Sem data Final'}</h1>
      <h1>{selectedEspecialidade ? selectedEspecialidade.title : 'Sem Especialidade'}</h1>
      <h1>{selectedUnidade ? selectedUnidade.name : 'Sem Unidade'}</h1>
    </div>
  );
}
