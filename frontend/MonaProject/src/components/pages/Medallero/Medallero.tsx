import { useEffect, useState } from "react";
import type { MedalRow } from "../../../services/httpService";
import { getMedalRows } from "../../../services/httpService";


export default function Medallero() {
  const [rows, setRows] = useState<MedalRow[]>([]);

  useEffect(() => {
    getMedalRows().then(setRows).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medallero General</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Código</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">🥇</th>
            <th className="p-2">🥈</th>
            <th className="p-2">🥉</th>
            <th className="p-2">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.code}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2 text-center">{r.gold}</td>
              <td className="p-2 text-center">{r.silver}</td>
              <td className="p-2 text-center">{r.bronze}</td>
              <td className="p-2 text-center font-bold">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
