import type { Training } from '../types';

interface TrainingCardProps {
  training: Training;
  onEdit?: (training: Training) => void;
  onDelete?: (training: Training) => void;
}

const statusConfig = {
  planned: { label: 'Programada', bg: 'bg-blue-100', text: 'text-blue-800' },
  active: { label: 'En curso', bg: 'bg-green-100', text: 'text-green-800' },
  completed: { label: 'Finalizada', bg: 'bg-slate-100', text: 'text-slate-700' },
  cancelled: { label: 'Cancelada', bg: 'bg-red-100', text: 'text-red-800' },
};

function TrainingCard({ training, onEdit, onDelete }: TrainingCardProps) {
  const statusStyle = statusConfig[training.estado];

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-blue-700 font-medium uppercase tracking-wide truncate">
            {training.categoria}
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-1">{training.nombre}</h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><span className="font-medium text-slate-800">Instructor:</span> {training.instructor}</p>
        <p><span className="font-medium text-slate-800">Fechas:</span> {training.fechaInicio} al {training.fechaFin}</p>
        <p><span className="font-medium text-slate-800">Cupos:</span> {training.inscritos} de {training.cupoMaximo} inscritos</p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit?.(training)}
          className="px-3 py-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(training)}
          className="px-3 py-1.5 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default TrainingCard;