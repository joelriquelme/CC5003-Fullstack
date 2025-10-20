import { useEffect, useState } from "react";
import type { StandingRow } from "../../../services/httpService";
import { getPuntajesPorDisciplina} from "../../../services/httpService";


export default function Puntajes() {
  const [rows, setRows] = useState<StandingRow[]>([]);

  useEffect(() => {
    getPuntajesPorDisciplina().then(setRows).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Puntajes por Disciplina</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Código</th>
            <th className="p-2">Carrera</th>
            <th className="p-2">Disciplina</th>
            <th className="p-2">PJ</th>
            <th className="p-2">PG</th>
            <th className="p-2">PE</th>
            <th className="p-2">PP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.code}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.discipline}</td>
              <td className="p-2 text-center">{r.PJ}</td>
              <td className="p-2 text-center">{r.PG}</td>
              <td className="p-2 text-center">{r.PE}</td>
              <td className="p-2 text-center">{r.PP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
