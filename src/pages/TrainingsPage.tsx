import { useState } from 'react';
import type { Training, TrainingStatus } from '../types';
import StatsBadge from '../components/StatsBadge';
import TrainingCard from '../components/TrainingCard';

const initialTrainings: Training[] = [
  {
    id: 1,
    nombre: 'Liderazgo y gestión de equipos',
    categoria: 'Habilidades directivas',
    instructor: 'Laura Méndez',
    fechaInicio: '2026-09-22',
    fechaFin: '2026-09-26',
    cupoMaximo: 20,
    inscritos: 14,
    estado: 'active',
  },
  {
    id: 2,
    nombre: 'Seguridad de la información',
    categoria: 'Tecnología',
    instructor: 'Carlos Martínez',
    fechaInicio: '2026-08-10',
    fechaFin: '2026-08-12',
    cupoMaximo: 30,
    inscritos: 30,
    estado: 'completed',
  },
  {
    id: 3,
    nombre: 'Comunicación efectiva',
    categoria: 'Desarrollo profesional',
    instructor: 'Daniela Ramos',
    fechaInicio: '2026-10-05',
    fechaFin: '2026-10-06',
    cupoMaximo: 25,
    inscritos: 8,
    estado: 'planned',
  },
];

function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | ''>('');
  const totalTrainings = trainings.length;
  const activeTrainings = trainings.filter(training => training.estado === 'active').length;
  const completedTrainings = trainings.filter(training => training.estado === 'completed').length;
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !selectedStatus || training.estado === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses: TrainingStatus[] = ['planned', 'active', 'completed', 'cancelled'];
  const statusLabels: Record<TrainingStatus, string> = {
    planned: 'Programada',
    active: 'En curso',
    completed: 'Finalizada',
    cancelled: 'Cancelada',
  };

  const handleEdit = (training: Training) => {
    window.alert(`Editar capacitación: ${training.nombre}`);
  };

  const handleDelete = (training: Training) => {
    if (!window.confirm(`¿Deseas eliminar "${training.nombre}"?`)) return;
    setTrainings(currentTrainings => currentTrainings.filter(item => item.id !== training.id));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Capacitaciones</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <StatsBadge label="Total de capacitaciones" value={totalTrainings} variant="blue" />
        <StatsBadge label="Capacitaciones en curso" value={activeTrainings} variant="green" />
        <StatsBadge label="Capacitaciones finalizadas" value={completedTrainings} variant="yellow" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-wrap items-end gap-3">
        <label className="flex-1 min-w-55">
          <span className="block text-sm font-medium text-slate-700 mb-1">Buscar</span>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>

        <label className="min-w-45">
          <span className="block text-sm font-medium text-slate-700 mb-1">Estado</span>
          <select
            value={selectedStatus}
            onChange={event => setSelectedStatus(event.target.value as TrainingStatus | '')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            {statuses.map(status => (
              <option key={status} value={status}>{statusLabels[status]}</option>
            ))}
          </select>
        </label>

        {(search || selectedStatus) && (
          <button
            type="button"
            onClick={() => { setSearch(''); setSelectedStatus(''); }}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filteredTrainings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTrainings.map(training => (
            <TrainingCard
              key={training.id}
              training={training}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-600 font-medium">
            {trainings.length === 0
              ? 'Aún no hay capacitaciones registradas.'
              : 'No se encontraron capacitaciones con esos filtros.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainingsPage;